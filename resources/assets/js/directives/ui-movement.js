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

.directive('uiMovementPlaceholder', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'directive-partials/ui-movement-placeholder.html',
        scope: {
            ratio: '='
        },
        controller: ['$scope', 'Rover',
            function($scope, Rover) {

            }
        ]
    };
});
