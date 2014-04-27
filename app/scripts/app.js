(function() {
  'use strict';
  var __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Date.prototype.getWeek = function() {
    var date, week1;
    date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  angular.module('ngTestingApp', ['ngRoute', 'ngResource', 'ngAnimate']);

  angular.module('ngTestingApp').animation('.panel-body', function() {
    var DISTANCE, DURATION, animateUp;
    DURATION = 300;
    DISTANCE = 50;
    animateUp = function(element, className, done) {
      var direction, dublicateElment;
      direction = (function() {
        switch (className) {
          case 'up':
            return 1;
          case 'down':
            return -1;
        }
      })();
      if (direction == null) {
        return;
      }
      element.stop();
      element.css({
        top: 0,
        opacity: 1
      });
      dublicateElment = jQuery("<div>").addClass(element.attr('class')).css({
        position: 'absolute',
        top: element.offset().top,
        left: element.offset().left,
        opacity: 1,
        width: element.outerWidth(),
        'z-index': 100,
        'text-align': 'center'
      }).html(element.text()).appendTo(jQuery('body'));
      element.css({
        top: DISTANCE * direction,
        opacity: 0
      });
      dublicateElment.animate({
        top: dublicateElment.position().top - (DISTANCE * direction),
        opacity: 0
      }, DURATION, function() {
        return dublicateElment.remove();
      });
      element.animate({
        top: 0,
        opacity: 1
      }, DURATION, done());
      return function(cancel) {
        if (cancel) {
          return element.stop();
        }
      };
    };
    return {
      addClass: animateUp
    };
  });

  angular.module('ngTestingApp').config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/about', {
        templateUrl: 'views/about.html'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

  angular.module('ngTestingApp').controller('MainCtrl', [
    '$scope', 'Sections', 'ControlTypes', '$timeout', function($scope, Sections, ControlTypes, $timeout) {
      var changeCurrentSection;
      $scope.sections = Sections.getAll();
      $scope.sections.$promise.then(function() {
        return $scope.currentSection = $scope.sections[0];
      });
      $scope.isHasValidationError = function(errorObject) {
        var e, k;
        for (k in errorObject) {
          if (!__hasProp.call(errorObject, k)) continue;
          e = errorObject[k];
          if (e) {
            return e;
          }
        }
        return false;
      };
      $scope.getControlTypeUrl = function(type) {
        return ControlTypes.getByType(type);
      };
      changeCurrentSection = function(direction) {
        $scope.panelBodyAction = direction;
        $timeout(function() {
          return $scope.panelBodyAction = '';
        }, 300);
        return Sections.changeValue($scope.currentSection, direction);
      };
      $scope.incrementCurrentSection = function() {
        return changeCurrentSection('up');
      };
      $scope.decrementCurrentSection = function() {
        return changeCurrentSection('down');
      };
      return $scope;
    }
  ]);

  angular.module('ngTestingApp').directive('dateInput', [
    'dateFilter', function(dateFilter) {
      return {
        require: 'ngModel',
        template: '<input type="date"></input>',
        replace: true,
        link: function(scope, elm, attrs, ngModelCtrl) {
          ngModelCtrl.$formatters.unshift(function(modelValue) {
            return dateFilter(modelValue, 'yyyy-MM-dd');
          });
          return ngModelCtrl.$parsers.unshift(function(viewValue) {
            return new Date(viewValue);
          });
        }
      };
    }
  ]);

  angular.module('ngTestingApp').factory('ControlTypes', function() {
    var types;
    types = ['number', 'select', 'date', 'panel'];
    return {
      getAll: function() {
        return types;
      },
      getByType: function(type) {
        return "views/controls/" + (__indexOf.call(types, type) >= 0 ? type : 'number') + ".html";
      }
    };
  });

  angular.module('ngTestingApp').factory('Sections', [
    '$resource', function($resource) {
      var sections;
      sections = $resource('data/sections.json').query(function() {
        var _today;
        _today = new Date();
        sections[0].value = _today.getFullYear();
        sections[1].value = sections[1].availibleValues[Math.ceil((_today.getMonth() + 1) / 3) - 1];
        sections[2].value = sections[2].availibleValues[_today.getMonth()];
        sections[3].value = _today.getWeek();
        sections[4].value = _today;
        if (sections[4].range != null) {
          return sections[4].range = {
            min: new Date(sections[4].range.min),
            max: new Date(sections[4].range.max)
          };
        }
      });
      return {
        getAll: function() {
          return sections;
        },
        getById: function(id) {
          var s, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = sections.length; _i < _len; _i++) {
            s = sections[_i];
            if (s.id === id) {
              _results.push(s);
            }
          }
          return _results;
        },
        changeValue: function(value, direction) {
          var newValue;
          switch (value.type || 'number') {
            case 'number':
              newValue = value.value + (direction === 'down' ? -1 : 1);
              break;
            case 'date':
              newValue = new Date(value.value.getTime() + (24 * 60 * 60 * 1000) * (direction === 'down' ? -1 : 1));
              break;
            case 'select':
              newValue = value.availibleValues[value.availibleValues.indexOf(value.value) + (direction === 'down' ? -1 : 1)];
              if (newValue == null) {
                newValue = value.value;
              }
          }
          if ((value.range == null) || ((value.range != null) && (value.range.min <= newValue && newValue <= value.range.max))) {
            return value.value = newValue;
          }
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=app.js.map
