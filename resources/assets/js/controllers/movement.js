/**
 * @brief   Controller for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('MovementController', ['$scope', 'MovementService', 'Rover', 'Utilities',
    function($scope, MovementService, Rover, Utilities) {
        Utilities.debug('MovementController');

        // Setup movement data.
        $scope.global.data.movement = $scope.global.data.movement || {};
        $scope.global.data.movement.loaded = $scope.global.data.movement.loaded || false;
        $scope.global.data.movement.list = $scope.global.data.movement.list || [];
        $scope.global.data.movement.total = $scope.global.data.movement.total || 0;
        $scope.global.data.movement.query = $scope.global.data.movement.query || '';
        $scope.global.data.movement.offset = $scope.global.data.movement.offset || 0;
        $scope.global.data.movement.limit = $scope.global.data.movement.limit || 16;

        // List of movements.
        $scope.global.data.movements = $scope.global.data.movements || [];

        // Fetching movements flag.
        $scope.global.data.isFetchingMovements = $scope.global.data.isFetchingMovements || false;

        /**
         * Retrieves a list of movements.
         */
        $scope.fetchMovements = function() {
            Utilities.debug('Fetching list of movements...');

            // Turn on movements flag.
            $scope.global.data.isFetchingMovements = true;

            MovementService.search({
                query: $scope.global.data.movement.query,
                offset: $scope.global.data.movement.offset,
                limit: $scope.global.data.movement.limit,
                order: null
            }).then(

                // On success, update movement data and turn off "fetching" flag.
                function(response) {
                    $scope.global.data.movement.list = response.data.results;
                    $scope.global.data.movement.total = response.data.total;
                    $scope.global.data.isFetchingMovements = false;
                },
                function(response) {

                    // Log error.
                    Utilities.debug(response.responseText);
                    Utilities.alert('Could not retrieve your movements. Please try again later.');

                    // Reset movement data.
                    $scope.global.data.movement.list = [];
                    $scope.global.data.movement.total = 0;
                    $scope.global.data.movement.loaded = false;
                    $scope.global.data.isFetchingMovements = false;
                }
            );
        };

        /**
         * Opens the movement editor overlay.
         */
        $scope.editMovement = function() {
            Rover.openMovementEditor();
        };

        /**
         * TODO: share movement.
         *
         * @param int id
         */
        $scope.shareMovement = function(id) {
            Utilities.debug('Sharing movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };

        /**
         * Deletes a movement.
         *
         * @param int id
         */
        $scope.deleteMovement = function(id) {
            Utilities.debug('Deleting movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };

        // Fetch movement data.
        if ($scope.global.data.movement.loaded === false) {
            $scope.fetchMovements();
        }
    }
]);
