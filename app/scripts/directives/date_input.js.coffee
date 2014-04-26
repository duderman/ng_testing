angular.module('ngTestingApp')
  .directive 'dateInput', ['dateFilter', (dateFilter) ->
    {
      require: 'ngModel'
      template: '<input type="date"></input>'
      replace: true
      link: (scope, elm, attrs, ngModelCtrl) ->
          ngModelCtrl.$formatters.unshift (modelValue) ->
            dateFilter(modelValue, 'yyyy-MM-dd');

          ngModelCtrl.$parsers.unshift (viewValue) ->
            new Date(viewValue);
    }
  ]
