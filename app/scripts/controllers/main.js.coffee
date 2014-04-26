angular.module('ngTestingApp')
  .controller 'MainCtrl', ['$scope', 'Sections', 'ControlTypes', ($scope, Sections, ControlTypes) ->
      $scope.sections = Sections.getAll()
      $scope.currentSection = $scope.sections[0]
      $scope.isHasValidationError = (errorObject) ->
        return e for own k,e of errorObject when e
      $scope.getControlTypeUrl = (type) ->
        ControlTypes.getByType(type)
      $scope.incrementCurrentSection = ->
        Sections.changeValue $scope.currentSection, 'up'
      $scope.decrementCurrentSection = ->
        Sections.changeValue $scope.currentSection, 'down'
      $scope
    ]
