angular.module 'main',['ngRoute', 'directives']

.config ($routeProvider) ->
  $routeProvider
    .when '/',
      templateUrl: 'main/main.html'
      controller: 'MainCtrl'

.controller 'MainCtrl', ($scope, $http) ->
  $http.get 'assets/spaces.json'
  .success (data) ->
    $scope.data = data

  $scope.canViewOrg = (org) ->
    not $scope.filter or
    org.name?.toLowerCase?().indexOf($scope.filter.toLowerCase()) > -1 or
    _.some org.spaces, (e) ->
      e.name?.toLowerCase?().indexOf($scope.filter.toLowerCase()) > -1

  $scope.canViewSpace = (org) ->
    (space) ->
      not $scope.filter or
      org.name?.toLowerCase?().indexOf($scope.filter.toLowerCase()) > -1 or
      space.name?.toLowerCase?().indexOf($scope.filter.toLowerCase()) > -1

  $scope.$watch 'filter', (value) ->
    $('.highlight').contents().unwrap()
    return unless value

    items = $('.spaces li').filter ->
      $(this).text().toLowerCase().indexOf($scope.filter.toLowerCase()) > -1

    matches = new RegExp(value, 'gi')
    items.each (k,v) ->
      str = $(v).text().replace matches, ($1) -> "<span class=\"highlight\">#{$1}</span>"
      $(v).html str
