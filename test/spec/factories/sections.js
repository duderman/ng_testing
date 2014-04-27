'use strict';

describe('Factories: Sections', function () {
  // load the controller's module
  beforeEach(module('ngTestingApp', 'SectionsMock'));

  var MainCtrl,
    scope,
    $httpBackend,
    SECTIONS_COUNT = 5;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, defaultJSON) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('data/sections.json').respond(defaultJSON);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  describe('getting sections', function () {

    beforeEach(function () {
      $httpBackend.flush();
    });

    describe('getAll', function () {
      it('should return something', function () {
        expect(scope.sections).not.toBe(null);
      });
      it('should return all sections', function () {
        expect(scope.sections.length).toBe(SECTIONS_COUNT);
      });
    });

    describe('inc/dec', function () {
      var prevValue;
      angular.forEach([0, 1, 2, 3, 4], function (sect) {
        beforeEach(function () {
          scope.currentSection = scope.sections[sect];
          if (scope.currentSection.type === 'select')
            scope.currentSection.value = scope.currentSection.availibleValues[1];
          prevValue = scope.currentSection.value;
        });
        describe('increment', function () {
          beforeEach(function () {
            scope.incrementCurrentSection();
          });
          it('increments', function () {
            if (scope.currentSection.type === 'select')
              expect(scope.currentSection.value).not.toBe(prevValue);
            else
              expect(scope.currentSection.value).toBeGreaterThan(prevValue);
          });
          it('increments within ranges', function () {
            if (scope.currentSection.type === 'select')
              prevValue = scope.currentSection.value =
                scope.currentSection.availibleValues[scope.availibleValues.length - 1];
            else
              prevValue = scope.currentSection.value = scope.currentSection.range.max;
            scope.incrementCurrentSection();
            expect(scope.currentSection.value).toEqual(prevValue);
          });
        });

        describe('decrement', function () {
          beforeEach(function () {
            scope.decrementCurrentSection();
          });
          it('decrements', function () {
            if (scope.currentSection.type === 'select')
              expect(scope.currentSection.value).not.toBe(prevValue);
            else
              expect(scope.currentSection.value).toBeLessThan(prevValue);
          });
          it('increments within ranges', function () {
            if (scope.currentSection.type === 'select')
              prevValue = scope.currentSection.value =
                scope.currentSection.availibleValues[0];
            else
              prevValue = scope.currentSection.value = scope.currentSection.range.min;
            scope.decrementCurrentSection();
            expect(scope.currentSection.value).toEqual(prevValue);
          });
        });
      });
    });
  });

});
