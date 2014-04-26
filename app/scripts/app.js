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

  angular.module('ngTestingApp', ['ngRoute']).config([
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
    '$scope', 'Sections', 'ControlTypes', function($scope, Sections, ControlTypes) {
      var changeValue;
      $scope.sections = Sections.getAll();
      $scope.currentSection = $scope.sections[0];
      $scope.isHasValidationError = function(errorObject) {
        debugger;
        var e, k;
        for (k in errorObject) {
          if (!__hasProp.call(errorObject, k)) continue;
          e = errorObject[k];
          if (e) {
            return e;
          }
        }
      };
      $scope.getControlTypeUrl = function(type) {
        return ControlTypes.getByType(type);
      };
      changeValue = function(direction) {
        var newValue;
        switch ($scope.currentSection.type || 'number') {
          case 'number':
            newValue = $scope.currentSection.value + (direction === 'down' ? -1 : 1);
            break;
          case 'date':
            newValue = new Date($scope.currentSection.value.getTime() + (24 * 60 * 60 * 1000) * (direction === 'down' ? -1 : 1));
            break;
          case 'select':
            newValue = $scope.currentSection.availibleValues[$scope.currentSection.availibleValues.indexOf($scope.currentSection.value) + (direction === 'down' ? -1 : 1)];
            if (newValue == null) {
              newValue = $scope.currentSection.value;
            }
        }
        debugger;
        if (($scope.currentSection.range == null) || (($scope.currentSection.range != null) && ($scope.currentSection.range.min < newValue && newValue < $scope.currentSection.range.max))) {
          return $scope.currentSection.value = newValue;
        }
      };
      $scope.incrementCurrentSection = function() {
        return changeValue('up');
      };
      $scope.decrementCurrentSection = function() {
        return changeValue('down');
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

  angular.module('ngTestingApp').factory('Sections', function() {
    var sections, _today;
    _today = new Date();
    sections = [
      {
        id: 'year',
        name: 'Год',
        value: _today.getFullYear()
      }, {
        id: 'quarter',
        name: 'Квартал',
        value: 'Первый',
        type: 'select',
        availibleValues: ['Первый', 'Второй', 'Третий', 'Четвертый']
      }, {
        id: 'month',
        name: 'Месяц',
        type: 'select',
        value: 'Январь',
        availibleValues: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      }, {
        id: 'week',
        name: 'Неделя',
        value: _today.getWeek(),
        range: {
          max: 52,
          min: 1
        }
      }, {
        id: 'day',
        name: 'День',
        value: _today,
        type: 'date',
        range: {
          min: new Date('1900-01-01'),
          max: new Date('2100-01-01')
        }
      }
    ];
    sections[1].value = sections[1].availibleValues[Math.ceil((_today.getMonth() + 1) / 3) - 1];
    sections[2].value = sections[2].availibleValues[_today.getMonth()];
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
      }
    };
  });

}).call(this);

//# sourceMappingURL=app.js.map
