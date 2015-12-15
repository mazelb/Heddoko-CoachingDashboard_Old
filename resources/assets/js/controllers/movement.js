/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('MovementController', ['$scope', '$routeParams', 'FolderService', 'Rover', 'Utilities',
    function($scope, $routeParams, FolderService, Rover, Utilities) {
        Utilities.debug('MovementController');

        // Initial setup.
        $scope.global.data.isFetchingMovementData = true;
        $scope.layout = {
            name: Rover.getConfig('movements.layout', 'large-tiles'),
            list: [
                {
                    name: 'large-tiles',
                    icon: 'th-large'
                },
                {
                    name: 'small-tiles',
                    icon: 'th'
                },
                {
                    name: 'details',
                    icon: 'list'
                },
            ]
        };

        // Setup path data.
        $scope.path = '/';
        $scope.folders = [];
        $scope.movements = [];
        $scope.parentFolder = false;
        $scope.rootProfile = false;

        /**
         * Updates the view with the root folders (one for each profile).
         *
         * @param object profiles
         */
        $scope.updateRootFolders = function(profiles) {

            // List of profiles.
            profiles = profiles || $scope.global.state.profile.list;

            $scope.folders = [];
            if (profiles.length)
            {
                angular.forEach(profiles, function(profile) {
                    if (profile.id && profile.id > 0)
                    {
                        $scope.folders.push({
                            name: profile.firstName + ' ' + profile.lastName,
                            href: '#/movements/' + profile.id
                        });
                    }
                });
            }

            $scope.global.data.isFetchingMovementData = false;
        };

        /**
         * Updates the view with non-root folders.
         *
         * @param array folders
         */
        $scope.updateFolders = function(folders) {

            $scope.folders = [];
            if (folders.length)
            {
                angular.forEach(folders, function(folder) {
                    $scope.folders.push({
                        name: folder.name,
                        href: '#/movements/' +
                                $routeParams.rootId + '/' +
                                folder.id + '/' +
                                folder.path.replace('/', ';')
                    });
                });
            }
        };

        /**
         * Retrieves movement data from the API.
         *
         * @param int folderId
         */
        $scope.fetchMovementData = function(folderId) {
            Utilities.debug('Fetching movement data...');

            $scope.global.data.isFetchingMovementData = true;

            folderId = folderId || 0;

            FolderService.get($routeParams.rootId, folderId).then(
                function(response) {

                    // Update folders.
                    $scope.updateFolders(response.data.folders);

                    // Update movment data.
                    $scope.movements = response.data.movements;

                    $scope.global.data.isFetchingMovementData = false;
                },
                function(response) {
                    Utilities.alert('Could not retrieve movement data. Please try again later.');
                    Utilities.debug(response.responseText);

                    $scope.global.data.isFetchingMovementData = false;
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

        // If a root folder was selected, try to display its contents or sub-contents.
        if ($routeParams.rootId && Rover.state.profile.list[$routeParams.rootId])
        {
            $scope.rootProfile = Rover.state.profile.list[$routeParams.rootId];

            // Update path name.
            $scope.path += ' ' + $scope.rootProfile.firstName + ' ' + $scope.rootProfile.lastName;

            // Virtual path.
            if ($routeParams.path)
            {
                // Update path name.
                $scope.path += ' / ' + $routeParams.path.replace(';', ' / ');

                // Parent folder.
                $scope.parentFolder = {href: '#/movements'};
            }

            // Root path.
            else
            {
                // Parent folder.
                $scope.parentFolder = {href: '#/movements'};

                // Retrieve movement data.
                $scope.fetchMovementData();
            }
        }

        // If no root folder was selected, display the root folders.
        else if (!$routeParams.rootId)
        {
            // Wait for the profile list to be loaded. We will setup a watcher later in case
            // the list gets updated or modified.
            if ($scope.global.data.isFetchingProfiles === false) {
                $scope.updateRootFolders();
            }
        }

        // If a folder was selected, but the profile doesn't exit, redirect the user to the root
        // folders.
        else
        {
            // If we're still loading profiles, keep waiting.
            if ($scope.global.data.isFetchingProfiles === true) {
                Utilities.debug('Still loading progiles...');
            }

            else {
                Rover.browseTo.path('/movements');
            }
        }

        // Watches the global profile list.
        $scope.$watch('global.profile.list', function(newList, oldList) {

            // If we're displaying root folders, update the view with the new list.
            if (!$routeParams.rootId) {
                $scope.updateRootFolders(newList);
            }
        });

        // Saves the layout as it changes.
        $scope.$watch('layout.name', function(name) {
            Rover.setConfig('movements.layout', name);
        });

        Utilities.debug('test a');
    }
]);
