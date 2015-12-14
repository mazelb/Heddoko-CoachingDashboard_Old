/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Angular directive for file explorers.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.directives')

/**
 *
 */
.directive('uiExplorer', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'directive-partials/ui-explorer/container.html',
        scope: {
            footer: '@'
        },
        controller: ['$scope',
            function($scope) {

                // ...
            }
        ]
    };
})


/**
 *
 */
.directive('uiExplorerFolder', ['$filter', '$timeout', '$http', 'Rover',
    function($filter, $timeout, $http, Rover) {
        return {
            require: '^uiExplorer',
            restrict: 'E',
            scope: {
                title: '@',
                href: '@'
            },
            link: function(scope, element, attrs, controller) {

                // ...
            },
            templateUrl: 'directive-partials/ui-explorer/folder.html'
        };
    }
])

/**
 *
 */
.directive('uiExplorerItem', ['$filter', '$timeout', '$http', 'Rover',
    function($filter, $timeout, $http, Rover) {
        return {
            require: '^uiExplorer',
            restrict: 'E',
            scope: {},
            link: function(scope, element, attrs, controller) {

                // ...
            },
            templateUrl: 'directive-partials/ui-explorer/item.html'
        };
    }
]);
