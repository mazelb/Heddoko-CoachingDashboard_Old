/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('MovementController', ['$scope', '$routeParams', 'MovementService', 'Rover', 'Utilities',
    function($scope, $routeParams, MovementService, Rover, Utilities) {
        Utilities.debug('MovementController');

        // Setup path data.
        $scope.path = '/';
        $scope.folders = false;
        $scope.parentFolder = false;
        $scope.rootProfile = false;

        // If a folder was selected, try to display its contents.
        if ($routeParams.root && Rover.state.profile.list[$routeParams.root])
        {
            $scope.rootProfile = Rover.state.profile.list[$routeParams.root];

            // Update path name.
            $scope.path += ' ' + $scope.rootProfile.firstName + ' ' + $scope.rootProfile.lastName;

            // Virtual path.
            if ($routeParams.path)
            {
                // Update path name.
                $scope.path += ' / ' + $scope.virtualPath.replace(';', ' / ');

                // Parent folder.
                $scope.parentFolder = {href: '#/movements'};
            }

            // Root path.
            else
            {
                // Parent folder.
                $scope.parentFolder = {href: '#/movements'};
            }
        }

        // If no folder was selected, display the root folders.
        else if (!$routeParams.root)
        {
            // Root folders.
            $scope.folders = [];
            if (Rover.state.profile.list.length)
            {
                angular.forEach(Rover.state.profile.list, function(profile) {
                    if (profile.id && profile.id > 0)
                    {
                        $scope.folders.push({
                            name: profile.firstName + ' ' + profile.lastName,
                            href: '#/movements/' + profile.id
                        });
                    }
                });
            }
        }

        // If a folder was selected, but the profile doesn't exit, redirect the user to the root
        // folders.
        else
        {
            // If we're still loading profiles, keep waiting.
            if (Rover.data.isFetchingProfiles === true) {
                Utilities.debug('Still loading progiles...');
            }

            else {
                Rover.browseTo.path('/movements');
            }
        }







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

        // // Fetch movement data.
        // if ($scope.global.data.movement.loaded === false) {
        //     $scope.fetchMovements();
        // }
    }
]);
