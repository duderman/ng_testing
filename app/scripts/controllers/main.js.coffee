angular.module('ngTestingApp')
  .controller 'MainCtrl', ['$scope', 'Sections', 'ControlTypes', ($scope, Sections, ControlTypes) ->
      $scope.sections = Sections.getAll()
      $scope.currentSection = $scope.sections[0]
      $scope.isHasValidationError = (errorObject) ->
        debugger;
        return e for own k,e of errorObject when e
      $scope.getControlTypeUrl = (type) ->
        ControlTypes.getByType(type)
      changeValue = (direction) ->
        switch ($scope.currentSection.type || 'number')
          when 'number'
            newValue = $scope.currentSection.value + (if direction is 'down' then -1 else 1)
          when 'date'
            newValue = new Date($scope.currentSection.value.getTime() + \
                (24 * 60 * 60 * 1000)*(if direction is 'down' then -1 else 1));
          when 'select'
            newValue = $scope.currentSection.availibleValues[ \
              $scope.currentSection.availibleValues.indexOf($scope.currentSection.value) + \
              (if direction is 'down' then -1 else 1)]
            newValue = $scope.currentSection.value if not newValue?
        debugger
        $scope.currentSection.value = newValue if not $scope.currentSection.range? or
          ($scope.currentSection.range? and
          $scope.currentSection.range.min < newValue <$scope.currentSection.range.max)


      $scope.incrementCurrentSection = ->
        changeValue 'up'
      $scope.decrementCurrentSection = ->
        changeValue 'down'
      $scope
    ]
