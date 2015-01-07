angular.module('citrix-test', ['ngRoute', 'main', 'templates']).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
});

angular.module('directives', []).directive('searchFocus', function() {
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      el.on('focus', function() {
        return el.parent().addClass('focus');
      });
      return el.on('blur', function() {
        return el.parent().removeClass('focus');
      });
    }
  };
});

'common service goes here';


angular.module('main', ['ngRoute', 'directives']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}).directive('repeatWatch', function() {
  return {
    priority: 1001,
    link: function(scope, el, attrs) {
      console.log(el);
      return scope.$watch(function() {
        return scope;
      }, function() {
        if (scope.$last) {
          return scope.$eval(attrs.repeatWatch);
        }
      });
    }
  };
}).controller('MainCtrl', function($scope, $http) {
  $http.get('assets/spaces.json').success(function(data) {
    return $scope.data = data;
  });
  $scope.canViewOrg = function(org) {
    var _ref;
    return !$scope.filter || ((_ref = org.name) != null ? typeof _ref.toLowerCase === "function" ? _ref.toLowerCase().indexOf($scope.filter.toLowerCase()) : void 0 : void 0) > -1 || _.some(org.spaces, function(e) {
      var _ref1;
      return ((_ref1 = e.name) != null ? typeof _ref1.toLowerCase === "function" ? _ref1.toLowerCase().indexOf($scope.filter.toLowerCase()) : void 0 : void 0) > -1;
    });
  };
  $scope.canViewSpace = function(org) {
    return function(space) {
      var _ref, _ref1;
      return !$scope.filter || ((_ref = org.name) != null ? typeof _ref.toLowerCase === "function" ? _ref.toLowerCase().indexOf($scope.filter.toLowerCase()) : void 0 : void 0) > -1 || ((_ref1 = space.name) != null ? typeof _ref1.toLowerCase === "function" ? _ref1.toLowerCase().indexOf($scope.filter.toLowerCase()) : void 0 : void 0) > -1;
    };
  };
  return $scope.$watch('filter', function(value) {
    var items, matches;
    $('.highlight').contents().unwrap();
    if (!value) {
      return;
    }
    items = $('.spaces li').filter(function() {
      return $(this).text().toLowerCase().indexOf($scope.filter.toLowerCase()) > -1;
    });
    matches = new RegExp(value, 'gi');
    return items.each(function(k, v) {
      var str;
      str = $(v).text().replace(matches, function($1) {
        return "<span class=\"highlight\">" + $1 + "</span>";
      });
      return $(v).html(str);
    });
  });
});
