angular.module 'directives', []

.directive 'searchFocus', ->
    restrict: 'A'
    link: (scope, el, attrs) ->
        el.on 'focus', ->
            el.parent().addClass 'focus'
        el.on 'blur', ->
            el.parent().removeClass 'focus'
