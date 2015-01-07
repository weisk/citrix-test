angular.module 'main',['ngRoute']

  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'main/main.html'
        controller: 'MainCtrl'

  .controller 'MainCtrl', ($scope, $http) ->
    $http.get 'assets/spaces.json'
    .success (data) ->
      $scope.data = data
      window.x = data

    $scope.canViewOrg = (org) ->
      not $scope.filter or
      org.name?.toLowerCase?().indexOf($scope.filter.toLowerCase()) > -1 or
      _.some org.spaces, (e) ->
        e.name?.toLowerCase?().indexOf($scope.filter.toLowerCase()) > -1

    $scope.canViewSpace = (space) ->
      true
