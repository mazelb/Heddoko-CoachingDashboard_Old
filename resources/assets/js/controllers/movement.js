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
        Utilities.info('MovementController');

        // Initial setup.
        Utilities.data.isFetchingMovementData = false;
        $scope.layout = {
            name: Utilities.getConfig('movements.layout', 'large-tiles'),
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
         * Saves the layout
         *
         * @param string layout
         */
        $scope.setLayout = function(layout) {
            $scope.layout.name = layout;
            Utilities.setConfig('movements.layout', layout);
        };

        /**
         * Updates the view with the root folders (one for each profile).
         *
         * @param object profiles
         */
        $scope.updateRootFolders = function(profiles) {

            // List of profiles.
            profiles = profiles || Utilities.getDataList('profile');

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

            Utilities.data.isFetchingMovementData = false;
        };

        /**
         * Updates the view with non-root folders.
         *
         * @param array folders
         */
        $scope.updateFolders = function(folders) {

            $scope.folders = [];
            if (folders && folders.length)
            {
                angular.forEach(folders, function(folder) {
                    $scope.folders.push({
                        name: folder.name,
                        href: '#/movements/' +
                                folder.profileId + '/' +
                                folder.id + '/' +
                                folder.path.replace('/', '_').replace(/\s+/g, '-') + '_' +
                                folder.name.replace(/\s+/g, '-')
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
            Utilities.time('Fetching Movement Data');

            Utilities.data.isFetchingMovementData = true;

            folderId = folderId || 0;

            FolderService.get($scope.rootProfile.id, folderId).then(
                function(response) {
                    Utilities.timeEnd('Fetching Movement Data');

                    // Update folders.
                    $scope.updateFolders(response.data.children);

                    // Set parent folder
                    $scope.parentFolder = {
                        href: '#/movements'
                    };

                    if (response.data.parent)
                    {
                        $scope.parentFolder.name = response.data.parent.name;
                        $scope.parentFolder.href +=
                            '/' + response.data.profileId +
                            '/' + response.data.parent.id +
                            '/' + response.data.path.replace('/', '_').replace(/\s+/g, '-');
                    }

                    // Update virtual path.
                    if (response.data.path)
                    {
                        if (response.data.path.length > 1)
                        {
                            $scope.path += response.data.path.replace('/', ' / ') + ' / ' +
                                            response.data.name;
                        }
                        else
                        {
                            $scope.path += ' / ' + response.data.name;
                        }
                    }

                    // Update movment data.
                    $scope.movements = response.data.movements;

                    Utilities.data.isFetchingMovementData = false;
                },
                function(response) {
                    Utilities.timeEnd('Fetching Movement Data');
                    Utilities.alert('Could not retrieve movement data. Please try again later.');
                    Utilities.data.isFetchingMovementData = false;
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
            Utilities.log('Sharing movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };

        /**
         * Deletes a movement.
         *
         * @param int id
         */
        $scope.deleteMovement = function(id) {
            Utilities.log('Deleting movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };

        // If a root folder was selected, try to display its contents or sub-contents.
        var unbindWatcher;
        if ($routeParams.rootId)
        {
            if (Utilities.hasData('profile', $routeParams.rootId))
            {
                // Update path name and retrive movement data.
                $scope.rootProfile = Utilities.getData('profile', $routeParams.rootId);
                $scope.fetchMovementData($routeParams.folderId);
                $scope.path += ' ' + $scope.rootProfile.firstName + ' ' + $scope.rootProfile.lastName;
            }

            // If we're still loading profiles, wait for the results.
            else if (Utilities.data.isFetchingProfiles)
            {
                unbindWatcher = $scope.$watch('global.data.isFetchingProfiles',
                    function(status) {
                        if (status === false)
                        {
                            unbindWatcher();

                            // Update path name and retrive movement data.
                            $scope.rootProfile = Utilities.getData('profile', $routeParams.rootId);
                            $scope.fetchMovementData($routeParams.folderId);
                            $scope.path += ' ' + $scope.rootProfile.firstName + ' ' + $scope.rootProfile.lastName;
                        }
                    }
                );
            }

            // If a folder was selected, but the profile doesn't exit,
            // redirect the user to the root folders.
            else {
                Rover.browseTo.path('/movements');
            }
        }

        // If no root folder was selected, show the root folders.
        else
        {
            if (Utilities.data.isFetchingProfiles === true)
            {
                unbindWatcher = $scope.$watch('global.data.isFetchingProfiles',
                    function(status) {
                        if (status === false) {
                            unbindWatcher();
                            $scope.updateRootFolders();
                        }
                    }
                );
            }

            else {
                $scope.updateRootFolders();
            }
        }
    }
]);
