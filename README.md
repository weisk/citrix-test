Citrix Puzzle
=============

Podio SpaceSwitcher Component

### Implementation details

Following is the planning I did to implement all of this, split by the different tasks.

1. **Project scaffolding & build system**

    The first thing to do was choose a foler structure, and design a building
    task to make development much easier. Yeoman helped to create the folder
    structure, which is divided into:

    - **app/**
        All the application code lies here.

    - **bower_components**
        Application libraries get installed here

    - **node_modules**
        Developer libraries get installed here

    Once the folder structure is set, Gulp is used as a task runner to build
    the application. The file gulpfile.js describes the building process:

    - Start a connect local server to serve the application.
    - Wire & Join all dependencies and application code into the folder **build/**
    - Watch for changes in the code, re-build everytime it detects a change

2. **Application framework**

    As told before, all the application is inside the **app/** folder. I used
    Angular.js to build the application, with Coffeescript code, Jade as an
    HTML templating engine and LESS as a css preprocessor.

    Relevant files:

    - **app.coffee**:
        The root of the angular application. Defines the application, the
        dependencies and the routes it will have, in our case only one route.

    - **index.jade**:
        The main HTML file.

    - **app.less**:
        The main CSS file

    - **assets/**
        Assets such as images, fonts ,...

    - **components/**
        In this folder there are the shared components for the application. In
        case of AngularJS, that is directives, services, filters ...

    - **main/**
        The main route of the application.

3. **Filtering visible orgs & spaces**

    To do this I use the angular built-in directive `ng-show`. This is an HTML
    attribute that accepts an Angular Expression, which will be evaluated in
    every digest cycle. This expression must return a boolean value, and show
    or hide the element based on it.

    In my case, the functions that decide it are on the file **main.coffee**
    and I named them `canViewOrg` and `canViewSpace`. The only thing they do
    is watch for changes on the input, and after that return true only for
    those elements that contain a part of the string, using the javascript
    `indexOf` method.

4. **Highlighting of matching space names**

    To achieve this functionality, I watch the input model for any changes and
    everytime it changes I use a Regular Expression to find all elements that
    match the query. The code for this is on the file **main.coffee**, the
    function `$scope.$watch 'filter'`.

    As you can see there, I use the regular expression with the flags 'g' (for
    global) and 'i' (case insensitive), and then I replace all the occurrences
    with the same strings but wrapped in a `<span>` which has the css class
    `highlight` on it.

5. **Dropdown system**

    For the dropdown I used the library **jquery-Dropdown**. Along with the
    directive `dropdownToggle`, found in **app/components/directives.coffee**,
    that handles css class changes.

6. **Keyboard navigation**

    I created a directive in **app/components/directives.coffee** named
    `dropdownKeyListen`. It basically listens for keyboard events, and keeps
    track of the selected index. It also calculates at every move if the
    element is visible on the viewport, scrolling if necessary.

7. **Scrolling behaviour**

    All the scrolling and repositioning is done by CSS in the file **app/main/main.less**.


### Missing things

If I had more time to work in this I'd probably do the following things:

- Code comments
- Unit tests
- Functional tests

### Development
* [Node.js] - Manage dev dependencies
* [Yeoman] - Kickstart/scaffold webapp
* [Bower] - Manage dependencies
* [Gulp] - Task runner - compile, build, wire, minify, preview

### Technology

* [AngularJS] - to separate responsibilities in a MVC fashion
* [Coffeescript] - better javascript code
* [jQuery] - toolset
* [Lodash] - functional toolset
* [jQuery-dropdown] - very lightweight dropdown library
* [Ionicons] - CSS Images & Icons

### Installation

Dev dependencies defined in `package.json`, build dependencies defined in `bower.json`.

Therefore, `npm` and `bower` are needed to setup the dev environment.

```sh
$ node install
$ bower install
```

### Usage

```sh
$ gulp
```

Navigate to http://localhost:9000 et voilà!


