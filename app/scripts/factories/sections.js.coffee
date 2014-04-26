angular.module('ngTestingApp')
  .factory 'Sections', ->
    _today = new Date()
    sections = [
      {
        id: 'year'
        name: 'Год'
        value: _today.getFullYear()
      },{
        id: 'quarter'
        name: 'Квартал'
        value: 'Первый'
        type: 'select'
        availibleValues: [
          'Первый'
          'Второй'
          'Третий'
          'Четвертый'
        ]
      },{
        id: 'month'
        name: 'Месяц'
        type: 'select'
        value: 'Январь'
        availibleValues: [
          'Январь'
          'Февраль'
          'Март'
          'Апрель'
          'Май'
          'Июнь'
          'Июль'
          'Август'
          'Сентябрь'
          'Октябрь'
          'Ноябрь'
          'Декабрь'
        ]
      },{
        id: 'week'
        name: 'Неделя'
        value: _today.getWeek()
        range:
          max: 52
          min: 1
      },{
        id: 'day'
        name: 'День'
        value: _today
        type: 'date'
        range:
          min: new Date('1900-01-01')
          max: new Date('2100-01-01')
      }
    ]

    sections[1].value = sections[1].availibleValues[Math.ceil((_today.getMonth()+1)/3)-1]
    sections[2].value = sections[2].availibleValues[_today.getMonth()]

    {
      getAll: -> sections
      getById: (id) -> (s for s in sections when s.id is id)
    }