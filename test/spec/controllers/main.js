'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ngTestingApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of sections to the scope', function () {
    expect(scope.sections.length).toBe(5);
  });
  it('should assign currentSection', function () {
    expect(scope.currentSection).not.toBe(null);
  });
  it('initial currentSection must be year', function () {
    expect(scope.currentSection.id).toBe('year');
  });
  it('should have needed functions', function () {
    angular.forEach(['isHasValidationError', 'getControlTypeUrl',
        'incrementCurrentSection', 'decrementCurrentSection'
      ],
      function (foo) {
        expect(scope[foo]).not.toBe(null);
        expect(scope[foo]).toBeDefined();
      });
  });

  describe('controller methods', function () {
    describe('inc/dec', function () {
      var prevValue;
      beforeEach(function () {
        prevValue = scope.currentSection.value;
      });
      it('should incrementCurrentSection', function () {
        scope.incrementCurrentSection();
        expect(scope.currentSection.value).not.toBe(prevValue);
      });
      it('should decrementCurrentSection', function () {
        scope.decrementCurrentSection();
        expect(scope.currentSection.value).not.toBe(prevValue);
      });
    });
    describe('getControlTypeUrl', function () {
      it('should return proper url', function () {
        expect(scope.getControlTypeUrl('number')).toMatch(/number.html/);
      });
      it('should return default url', function () {
        expect(scope.getControlTypeUrl()).toMatch(/[a-z]?.html/);
      });
    });
    describe('isHasValidationError', function () {
      it('should return true when errors present', function () {
        expect(scope.isHasValidationError({
          number: true,
          required: false
        }))
          .toEqual(true);
      });
      it('should return false when errors not present', function () {
        expect(scope.isHasValidationError({
          number: false,
          required: false
        }))
          .toEqual(false);
      });
    });
  });
});
