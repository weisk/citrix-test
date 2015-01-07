angular.module('citrix-test', ['ngRoute', 'main', 'templates']).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
});

'common service goes here';


angular.module('main', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}).controller('MainCtrl', function($scope, $http) {
  $http.get('assets/spaces.json').success(function(data) {
    $scope.data = data;
    return window.x = data;
  });
  $scope.canViewOrg = function(org) {
    var _ref;
    return !$scope.filter || ((_ref = org.name) != null ? typeof _ref.toLowerCase === "function" ? _ref.toLowerCase().indexOf($scope.filter.toLowerCase()) : void 0 : void 0) > -1 || _.some(org.spaces, function(e) {
      var _ref1;
      return ((_ref1 = e.name) != null ? typeof _ref1.toLowerCase === "function" ? _ref1.toLowerCase().indexOf($scope.filter.toLowerCase()) : void 0 : void 0) > -1;
    });
  };
  return $scope.canViewSpace = function(space) {
    return true;
  };
});
