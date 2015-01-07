angular.module 'citrix-test', [ 'ngRoute','main','templates' ]

  .config ($routeProvider) ->

    $routeProvider
      .otherwise
        redirectTo: '/'
