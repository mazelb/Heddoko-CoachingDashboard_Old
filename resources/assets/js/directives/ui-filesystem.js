/**
 * Copyright Heddoko(TM) 2016, all rights reserved.
 *
 * @brief   Angular directive for filesystem layouts
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 * @note    Use as:
 *              <div
 *                  data-ui-filesystem
 *                  data-id="myFilesystemContainer"
 *                  data-files="myFiles">
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

            config: '=?',

            largeTileTemplate: '@?',

            defaultLayout: '@?',
            hideLocation: '=?',
            hideToolbar: '=?',
            hideLargeTilesLayout: '=?',
            hideSmallTilesLayout: '=?'
        },
        controller: ['$scope', '$timeout', 'Utilities', function($scope, $timeout, Utilities) {

            // Storage namespace.
            var namespace = $scope.namespace = $scope.id || 'ui-filesystem';

            // Configuration.
            var layoutKey = namespace + '-layout';
            $scope.config = $scope.config || {};
            $scope.config.toolbar = $scope.config.toolbar || {};
            $scope.config.detailsLayoutTitles = $scope.config.detailsLayoutTitles || {
                title: 'Title',
                updatedAt: 'Modified'
            };

            // Defaults.
            $scope.defaultLayout = $scope.defaultLayout || 'details';
            $scope.hideLocation = ($scope.hideLocation);
            $scope.hideToolbar = ($scope.hideToolbar);
            $scope.hideLargeTilesLayout = ($scope.hideLargeTilesLayout);
            $scope.hideSmallTilesLayout = ($scope.hideSmallTilesLayout);

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
        templateUrl: 'partials/directives/ui-filesystem/container.html'
    };
});
