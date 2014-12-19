angular.module('citrix-test', ['ngRoute', 'citrix-test-main', 'templates']).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
});

'app controller goes here';


'common service goes here';


angular.module('citrix-test-main', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}).controller('MainCtrl', function($scope) {
  return $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Coffeescript', 'Less', 'Jade'];
});
