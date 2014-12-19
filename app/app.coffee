angular.module 'citrix-test', [ 'ngRoute','citrix-test-main','templates' ]

  .config ($routeProvider) ->

    $routeProvider
      .otherwise
        redirectTo: '/'