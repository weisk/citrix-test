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
}).directive('dropdownToggle', function() {
  return {
    restrict: 'A',
    compile: function(tEl, tAttrs, tFn) {
      var state;
      state = tEl.find('#state');
      return function(scope, el, attrs) {
        var dropdown;
        dropdown = $(attrs.dropdownToggle);
        scope.$on('dropdown:hide', function() {
          return dropdown.dropdown('hide');
        });
        dropdown.on('show', function() {
          state.removeClass('ion-chevron-down').addClass('ion-chevron-up');
          return state.parent().addClass('toggled');
        });
        return dropdown.on('hide', function() {
          state.removeClass('ion-chevron-up').addClass('ion-chevron-down');
          return state.parent().removeClass('toggled');
        });
      };
    }
  };
}).directive('dropdownKeyListen', function() {
  return {
    restrict: 'A',
    compile: function(tEl, tAttrs, tFn) {
      var index, min;
      index = min = 0;
      return function(scope, el, attrs) {
        var calcOffset, getElements, moveFocus;
        getElements = function(visible) {
          var elements;
          elements = el.find('.spaces > *');
          if (visible) {
            elements = elements.not('.ng-hide');
          }
          return elements;
        };
        moveFocus = function(i) {
          getElements().removeClass('focus');
          getElements(true).eq(i).addClass('focus');
          return calcOffset();
        };
        calcOffset = function() {
          var currentTop, elementTop, highlighted, maxTop;
          highlighted = $('.spaces .focus');
          maxTop = $('.orgs').offset().top + $('.orgs').height();
          currentTop = $('.orgs').scrollTop();
          elementTop = highlighted.offset().top + highlighted.height();
          if (elementTop > maxTop) {
            return $('.orgs').scrollTop(currentTop + elementTop - maxTop);
          } else if (currentTop > elementTop) {
            return $('.orgs').scrollTop(elementTop - highlighted.height());
          }
        };
        window.onresize = function() {
          return calcOffset();
        };
        el.on('show', function() {
          el.find('input').focus();
          return moveFocus(index);
        });
        return el.on('keydown', function(evt) {
          var childScope, max, target;
          max = getElements().length - 1;
          switch (evt.keyCode) {
            case 38:
              if (index > min) {
                return moveFocus(--index);
              }
              break;
            case 40:
              if (index < max) {
                return moveFocus(++index);
              }
              break;
            case 13:
              target = getElements(true).eq(index);
              childScope = target.scope();
              return scope.$apply(function() {
                return childScope.$eval(target.attr('ng-enter'));
              });
            default:
              index = 0;
              return moveFocus(index);
          }
        });
      };
    }
  };
});

'common service goes here';


angular.module('main', ['ngRoute', 'directives']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
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
  $scope.$watch('filter', function(value) {
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
  $scope.selectOrg = function(org) {
    $scope.$broadcast('dropdown:hide');
    $scope.selectedOrg = org;
    return $scope.selectedSpace = null;
  };
  return $scope.selectSpace = function(space) {
    $scope.$broadcast('dropdown:hide');
    $scope.selectedSpace = space;
    return $scope.selectedOrg = null;
  };
});
