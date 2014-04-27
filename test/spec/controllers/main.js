'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ngTestingApp', 'SectionsMock'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, defaultJSON) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('data/sections.json').respond(defaultJSON);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of sections to the scope', function () {
    expect(scope.sections.length).toBe(0);
    $httpBackend.flush();
    expect(scope.sections.length).toBe(5);
  });
  it('should assign currentSection', function () {
    expect(scope.currentSection).toBeUndefined();
    $httpBackend.flush();
    expect(scope.currentSection).not.toBe(null);
  });
  it('initial currentSection must be year', function () {
    $httpBackend.flush();
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
