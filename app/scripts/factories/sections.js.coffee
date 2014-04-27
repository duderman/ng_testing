angular.module 'ngTestingApp'
  .factory 'Sections', ['$resource', ($resource) ->
    sections = $resource('data/sections.json').query ->
      _today = new Date()
      sections[0].value = _today.getFullYear()
      sections[1].value = sections[1].availibleValues[Math.ceil((_today.getMonth()+1)/3)-1]
      sections[2].value = sections[2].availibleValues[_today.getMonth()]
      sections[3].value = _today.getWeek()
      sections[4].value = _today

    {
      getAll: -> sections
      getById: (id) -> (s for s in sections when s.id is id)
      changeValue: (value, direction) ->
        switch (value.type || 'number')
          when 'number'
            newValue = value.value + (if direction is 'down' then -1 else 1)
          when 'date'
            newValue = new Date(value.value.getTime() + \
                (24 * 60 * 60 * 1000)*(if direction is 'down' then -1 else 1));
          when 'select'
            newValue = value.availibleValues[value.availibleValues.indexOf(value.value) + \
              (if direction is 'down' then -1 else 1)]
            newValue = value.value if not newValue?
        value.value = newValue if not value.range? or (value.range? and value.range.min <= newValue <= value.range.max)

    }
  ]
