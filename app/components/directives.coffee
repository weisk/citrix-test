angular.module 'directives', []

.directive 'searchFocus', ->
    restrict: 'A'
    link: (scope, el, attrs) ->
        el.on 'focus', ->
            el.parent().addClass 'focus'
        el.on 'blur', ->
            el.parent().removeClass 'focus'

.directive 'dropdownToggle', ->
    restrict: 'A'
    compile: (tEl, tAttrs, tFn) ->
        state = tEl.find('#state')
        (scope, el, attrs) ->
            dropdown = $(attrs.dropdownToggle)

            scope.$on 'dropdown:hide', ->
                dropdown.dropdown 'hide'

            dropdown.on 'show', ->
                state.removeClass('ion-chevron-down').addClass 'ion-chevron-up'
                state.parent().addClass 'toggled'

            dropdown.on 'hide', ->
                state.removeClass('ion-chevron-up').addClass 'ion-chevron-down'
                state.parent().removeClass 'toggled'

.directive 'dropdownKeyListen', ->
    restrict: 'A'
    compile: (tEl, tAttrs, tFn) ->
        index = min = 0
        (scope, el, attrs) ->
            getElements = (visible) ->
                elements = el.find('.spaces > *')
                if visible then elements = elements.not('.ng-hide')
                elements

            moveFocus = (i) ->
                getElements().removeClass 'focus'
                getElements(true).eq(i).addClass 'focus'
                calcOffset()

            calcOffset = ->
                highlighted = $('.spaces .focus')
                maxTop = $('.orgs').offset().top + $('.orgs').height()
                currentTop = $('.orgs').scrollTop()
                elementTop = highlighted.offset().top + highlighted.height()
                if elementTop > maxTop
                    $('.orgs').scrollTop(currentTop + elementTop - maxTop)
                else if currentTop > elementTop
                    $('.orgs').scrollTop(elementTop - highlighted.height())

            window.onresize = -> calcOffset()

            el.on 'show', ->
                el.find('input').focus()
                moveFocus index

            el.on 'keydown', (evt) ->
                max = getElements().length - 1
                switch evt.keyCode
                    when 38
                        if index > min then moveFocus --index
                    when 40
                        if index < max then moveFocus ++index
                    when 13
                        target = getElements(true).eq(index)
                        childScope = target.scope()
                        scope.$apply -> childScope.$eval target.attr 'ng-enter'
                    else
                        index = 0
                        moveFocus index
