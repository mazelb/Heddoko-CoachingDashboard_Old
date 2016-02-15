/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   Angular directive for movement playbacks.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.directives')

.directive('uiMovementPlayback', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/ui-movement/playback.html',
        scope: {
            title: '=',
            titleClass: '@?',

            previousMovement: '=?',
            nextMovement: '=?'
        },
        controller: ['$scope', 'Rover', 'Utilities',
            function($scope, Rover, Utilities) {

                // Defaults.
                $scope.titleAlign = $scope.titleAlign || 'left';
                $scope.previousMovement = typeof $scope.previousMovement == 'function' ?
                    $scope.previousMovement : false;
                $scope.nextMovement = typeof $scope.nextMovement == 'function' ?
                    $scope.nextMovement : false;

                Utilities.log($scope.title);
                Utilities.log(typeof $scope.previousMovement);
                Utilities.log(typeof $scope.nextMovement);

            }
        ]
    };
})

.directive('uiMovementPreview', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/ui-movement/preview.html',
        scope: {
            ratio: '='
        },
        controller: ['$scope', 'Rover',
            function($scope, Rover) {

            }
        ]
    };
})

.directive('uiMovementPlaceholder', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/ui-movement/placeholder.html',
        scope: {
            ratio: '='
        },
        controller: ['$scope', 'Rover',
            function($scope, Rover) {

            }
        ]
    };
});
