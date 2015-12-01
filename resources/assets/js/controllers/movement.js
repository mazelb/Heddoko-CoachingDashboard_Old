/**
 * @brief   Controller for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('MovementController', ['$scope', 'Rover', 'Utilities',
    function($scope, Rover, Utilities) {
        Rover.debug('MovementController');

        // Opens the movement editor overlay.
        $scope.editMovement = function() {
            Rover.openMovementEditor();
        };

        // TODO: share movement.
        $scope.shareMovement = function(id) {
            Rover.debug('Sharing movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };

        // Deletes a movement.
        $scope.deleteMovement = function(id) {
            Rover.debug('Deleting movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };
    }
]);
