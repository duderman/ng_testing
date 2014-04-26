angular.module('ngTestingApp')
  .factory 'ControlTypes', ->
    types = ['number','select','date','panel']

    {
      getAll: -> types
      getByType: (type) ->
        "views/controls/#{if type in types then type else 'number'}.html"
    }
