/**
 * @brief   Controller for movement data import.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('ImportController', ['$scope', 'Rover',
    function($scope, Rover) {
        Rover.debug('ImportController');

        // Sample uploads.
        $scope.uploadedMovements = [
            {
                scorable: false
            },
            {
                scorable: false
            },
            {
                scorable: false
            },
        ];

    }
]);
