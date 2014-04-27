'use strict';

describe('Factories: Sections', function () {
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

  describe('getControlTypeUrl', function () {
    it('should have all types', function () {
      angular.forEach(['number', 'select', 'panel'], function (type) {
        expect(scope.getControlTypeUrl(type)).toMatch(new RegExp(type + '.html'));
      });
    });
    it('should return default url', function () {
      expect(scope.getControlTypeUrl()).toMatch(/[a-z]?.html/);
    });
  });

});
