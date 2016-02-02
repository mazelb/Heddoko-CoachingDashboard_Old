/**
 * Copyright Heddoko(TM) 2016, all rights reserved.
 *
 * @brief   Angular directive for filesystem layouts
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 * @note    Use as:
 *              <div data-ui-filesystem data-id="myFilesystemContainer">
 *                  ...
 *              </div>
 */
angular.module('app.directives')

// Main container
.directive('uiFilesystem', function() {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            id: '@?',

            files: '=',
            folders: '=',
            parentFolder: '=?',

            defaultLayout: '@?',
            hideLocation: '=?',
            hideToolbar: '=?',
            hideLargeTilesLayout: '=?',
            hideSmallTilesLayout: '=?',
            listParams: '=?'
        },
        controller: ['$scope', '$timeout', 'Utilities', function($scope, $timeout, Utilities) {

            // Storage namespace.
            var namespace = $scope.namespace = $scope.id || 'ui-filesystem';

            // Config keys.
            var layoutKey = namespace + '-layout';

            // Defaults.
            $scope.defaultLayout = $scope.defaultLayout || 'details';
            $scope.hideLocation = ($scope.hideLocation);
            $scope.hideToolbar = ($scope.hideToolbar);
            $scope.hideLargeTilesLayout = ($scope.hideLargeTilesLayout);
            $scope.hideSmallTilesLayout = ($scope.hideSmallTilesLayout);
            $scope.listParams = $scope.listParams || {
                title: 'Title',
                updatedAt: 'Modified'
            };

            // Setup layout data.
            $scope.layout = {
                name: '',
                list: []
            };

                // Large tile layout.
                if (!$scope.hideLargeTilesLayout) {
                    $scope.layout.list.push({
                        name: 'large-tiles',
                        icon: 'th-large'
                    });
                }

                // Small tile layout.
                if (!$scope.hideSmallTilesLayout) {
                    $scope.layout.list.push({
                        name: 'small-tiles',
                        icon: 'th'
                    });
                }

                // List layout (default).
                $scope.layout.list.push({
                    name: 'details',
                    icon: 'list'
                });

                // Selected layout.
                $scope.layout.name = Utilities.getConfig(layoutKey, $scope.defaultLayout);

            /**
             * Updates the current layout.
             *
             * @param string layout
             */
            $scope.setLayout = function(layout) {
                $timeout(function() {
                    $scope.layout.name = layout;
                });
                Utilities.setConfig(layoutKey, layout);
            };
        }],
        templateUrl: 'directive-partials/ui-filesystem/container.html'
    };
});
