angular
  .module 'ngTestingApp', [
    'ngRoute'
    'ngResource'
  ]
  .config ['$routeProvider', ($routeProvider) ->
    $routeProvider
      .when '/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }
      .when '/about', {
        templateUrl: 'views/about.html'
      }
      .otherwise {
        redirectTo: '/'
      }
    ]
