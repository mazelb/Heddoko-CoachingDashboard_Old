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
                title: 'Trial 001',
                tags: []
            },
            {
                title: 'File 0001134',
                tags: []
            },
            {
                title: 'Raw File 0001135',
                tags: []
            },
        ];

    }
]);
