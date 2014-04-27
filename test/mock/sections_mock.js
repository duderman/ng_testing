'use strict';

angular.module('SectionsMock', [])
  .value('defaultJSON', [{
    "id": "year",
    "name": "Год",
    "value": 2014,
    "range": {
      "min": 1900,
      "max": 2100
    }
  }, {
    "id": "quarter",
    "name": "Квартал",
    "value": "Второй",
    "type": "select",
    "availibleValues": [
      "Первый",
      "Второй",
      "Третий",
      "Четвертый"
    ]
  }, {
    "id": "month",
    "name": "Месяц",
    "type": "select",
    "value": "Апрель",
    "availibleValues": [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ]
  }, {
    "id": "week",
    "name": "Неделя",
    "value": 12,
    "range": {
      "max": 52,
      "min": 1
    }
  }, {
    "id": "day",
    "name": "День",
    "value": "2014-04-27T09:25:04.304Z",
    "type": "date",
    "range": {
      "min": "1900-01-01T00:00:00.000Z",
      "max": "2100-01-01T00:00:00.000Z"
    }
  }]);
