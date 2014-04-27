angular.module 'ngTestingApp'
  .controller 'MainCtrl', ['$scope', 'Sections', 'ControlTypes', '$timeout', ($scope, Sections, ControlTypes, $timeout) ->
      $scope.sections = Sections.getAll()
      $scope.sections.$promise.then ->
        $scope.currentSection = $scope.sections[0]
      $scope.isHasValidationError = (errorObject) ->
        return e for own k,e of errorObject when e
        false
      $scope.getControlTypeUrl = (type) ->
        ControlTypes.getByType(type)

      changeCurrentSection = (direction) ->
        $scope.panelBodyAction = direction
        $timeout ->
          $scope.panelBodyAction = ''
        , 300
        Sections.changeValue $scope.currentSection, direction
      $scope.incrementCurrentSection = ->
        changeCurrentSection 'up'
      $scope.decrementCurrentSection = ->
        changeCurrentSection 'down'
      $scope
    ]

