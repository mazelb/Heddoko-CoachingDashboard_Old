/**
 * @brief   Controller for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('MovementController', ['$scope', 'Rover', 'Utilities',
    function($scope, Rover, Utilities) {
        Utilities.debug('MovementController');

        // List of movements.
        $scope.global.data.movements = $scope.global.data.movements || [];

        // Retrieves a list of movements.
        $scope.fetchMovements = function(offset, limit, order) {
            Utilities.debug('Fetching list of movements...');

            // TODO
        };
        if ($scope.global.data.movements.length === 0) {
            $scope.fetchMovements(0, 16);
        }

        // Opens the movement editor overlay.
        $scope.editMovement = function() {
            Rover.openMovementEditor();
        };

        // TODO: share movement.
        $scope.shareMovement = function(id) {
            Utilities.debug('Sharing movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };

        // Deletes a movement.
        $scope.deleteMovement = function(id) {
            Utilities.debug('Deleting movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };
    }
]);
