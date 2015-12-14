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
        restrict: 'AE',
        transclude: true,
        templateUrl: 'directive-partials/ui-explorer/container.html',
        scope: {
            folders: '=?',
            parent: '=?',
            path: '@'
        },
        controller: ['$scope', 'Rover',
            function($scope, Rover) {

                // Defaults.
                Rover.store.uiExplorerLayout = Rover.store.uiExplorerLayout || 'small-tiles';
                $scope.layout = Rover.store.uiExplorerLayout;
                $scope.folders = $scope.folders || [];

                $scope.$watch('layout', function(newLayout) {
                    Rover.store.uiExplorerLayout = newLayout;
                });
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
            restrict: 'AE',
            scope: {
                href: '@',
                name: '@?',
                icon: '@?'
            },
            link: function(scope, element, attrs, controller) {

                // Defaults.
                scope.name = scope.name || '';
                scope.icon = scope.icon || 'folder-open';
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
            restrict: 'AE',
            scope: {},
            link: function(scope, element, attrs, controller) {

                // ...
            },
            templateUrl: 'directive-partials/ui-explorer/item.html'
        };
    }
]);
