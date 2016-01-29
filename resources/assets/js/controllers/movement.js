/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('MovementController', ['$scope', '$routeParams', 'FolderService', 'MovementService', 'Rover', 'Utilities',
    function($scope, $routeParams, FolderService, MovementService, Rover, Utilities) {
        Utilities.info('MovementController');

        // Fetching movement data flag.
        Utilities.data.isFetchingMovementData = false;

        // Setup namespaces.
        Utilities.createDataNamespace('movementFiles');
        Utilities.createDataNamespace('movementFolders');
        Utilities.createDataNamespace('selectedMovementFiles');
        Utilities.createDataNamespace('selectedMovementFolders');

        // Setup layout data.
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
        $scope.files = [];
        $scope.folders = [];
        $scope.parentFolder = false;
        $scope.rootProfile = false;

        // Other scope variables.
        $scope.newFolderName = '';

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
         * Generates the location hash for a folder.
         *
         * @param object folder
         * @param object parent
         */
        $scope.getHash = function(folder, parent) {

            var hash = '#/movements/' + folder.profileId + '/';

            // Add the folder ID.
            hash += parent ? parent.id : folder.id;

            // Add the pathname.
            if (folder.path != '/') {
                hash += '/' + folder.path.substr(1).replace('/', '_').replace(/\s+/g, '-');
            }

            // If no parent was passed, include the current folder name.
            if (!parent) {
                hash += (folder.path == '/' ? '/' : '_') + folder.name.replace(/\s+/g, '-');
            }

            return hash;
        };

        /**
         * Updates the view with the root folders (one for each profile).
         *
         * @param object profiles
         */
        $scope.updateRootFolders = function(profiles) {

            // List of profiles.
            profiles = profiles || Utilities.getDataList('profile');

            // Reset data.
            Utilities.resetDataNamespace('movementFiles');
            Utilities.resetDataNamespace('movementFolders');
            Utilities.resetDataNamespace('selectedMovementFiles');
            Utilities.resetDataNamespace('selectedMovementFolders');

            if (profiles.length)
            {
                angular.forEach(profiles, function(profile) {
                    if (profile.id && profile.id > 0)
                    {
                        Utilities.setData('movementFolders', profile.id, {
                            name: profile.firstName + ' ' + profile.lastName,
                            href: '#/movements/' + profile.id
                        });
                    }
                });
            }

            $scope.movements = Utilities.getDataArray('movementFiles');
            $scope.folders = Utilities.getDataArray('movementFolders');

            Utilities.data.isFetchingMovementData = false;
        };

        /**
         * Updates the view with non-root folders.
         *
         * @param array folders
         */
        $scope.updateFolders = function(folders) {

            // Reset data.
            Utilities.resetDataNamespace('movementFolders');
            Utilities.resetDataNamespace('selectedMovementFolders');

            if (folders && folders.length)
            {
                angular.forEach(folders, function(folder) {

                    // Set hash.
                    folder.href = $scope.getHash(folder);

                    Utilities.setData('movementFolders', folder.id, folder);
                });
            }
            $scope.folders = Utilities.getDataArray('movementFolders');
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

            FolderService.get($scope.rootProfile.id, folderId, ['parent', 'children', 'movements']).then(
                function(response) {
                    Utilities.timeEnd('Fetching Movement Data');

                    // Update folders.
                    $scope.updateFolders(response.data.children);

                    // Set parent folder
                    $scope.parentFolder = {
                        href: '#/movements/' + $scope.rootProfile.id
                    };

                    if (response.data.parent)
                    {
                        $scope.parentFolder.name = response.data.parent.name;
                        $scope.parentFolder.href = $scope.getHash(response.data, response.data.parent);
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
                    angular.forEach(response.data.movements, function(movement) {
                        Utilities.setData('movementFiles', movement.id, movement);
                    });
                    $scope.movements = Utilities.getDataArray('movementFiles');

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
         * Selects a movement file or folder.
         *
         * @param string type
         * @param object resource
         */
        $scope.toggleSelect = function(type, resource) {

            // Toggle all resources.
            if (!type && !resource)
            {
                angular.forEach(Utilities.getDataList('movementFiles'), function(movement) {
                    if (movement && movement.id)
                    {
                        movement.selected = !movement.selected;
                        Utilities.setData('selectedMovementFiles', movement.id, {id: movement.id});
                    }
                });

                angular.forEach(Utilities.getDataList('movementFolders'), function(folder) {
                    if (folder && folder.id)
                    {
                        folder.selected = !folder.selected;
                        Utilities.setData('selectedMovementFolders', folder.id, {id: folder.id});
                    }
                });

                return;
            }

            var namespace, data;
            switch (type)
            {
                case 'movement':
                    namespace = 'selectedMovementFiles';
                    break;

                case 'folder':
                    namespace = 'selectedMovementFolders';
                    break;

                default:
                    Utilities.log('Invalid resource type: ' + type);
                    return;
            }

            // Toggle selected
            resource.selected = !resource.selected;

            // Update selected list.
            Utilities.setData(namespace, resource.id, (resource.selected ? {id: resource.id} : null));
        };

        /**
         * Opens the thumbnail overlay.
         */
        $scope.selectThumbnail = function() {
            Rover.openThumbnailSelector();
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
         * Creates a new folder.
         *
         * @param string name
         */
        $scope.createFolder = function(name) {

            // Performance check.
            if (name.length < 1) {
                return;
            }

            Utilities.time('Creating Folder');
            Utilities.data.isFetchingMovementData = true;

            Utilities.log('Creating folder "'+ name +'"');
            Utilities.log('Under the parent "'+ $routeParams.folderId +'"');
            Utilities.log('For the profile "'+ $scope.rootProfile.id +'"');

            FolderService.create($scope.rootProfile.id, {
                name: name,
                folderId: $routeParams.folderId
            }).then(

                // On success
                function(response) {
                    Utilities.timeEnd('Creating Folder');

                    // Add new folder to folder list.
                    Utilities.setData('movementFolders', response.data.id, response.data);
                    Utilities.log(response.data);
                    Utilities.log(Utilities.getDataArray('movementFolders'));
                    $scope.updateFolders(Utilities.getDataArray('movementFolders'));

                    Utilities.data.isFetchingMovementData = false;
                },

                // On failure.
                function(response) {
                    Utilities.timeEnd('Creating Folder');
                    Utilities.error('Could not create folder: ' + response.responseText);
                    Utilities.alert('Could not create folder. Please try again later.');
                    Utilities.data.isFetchingMovementData = false;
                }
            );
        };

        /**
         * Deletes one or more resources.
         *
         * @param string type
         * @param object resource
         */
        $scope.deleteResource = function(type, resource) {

            // Delete a specified resource.
            if (type && resource)
            {
                switch (type)
                {
                    case 'folder':
                    case 'folders':
                        $scope.deleteFolders([resource.id]);
                        break;

                    case 'movement':
                    case 'movements':
                        $scope.deleteMovements([resource.id]);
                        break;
                }
            }

            // Delete selected resources.
            else
            {
                // Delete folders.
                if (Utilities.getDataLength('selectedMovementFolders')) {
                    $scope.deleteFolders(Utilities.getDataArray('selectedMovementFolders').map(
                        function(folder) {
                            return folder.id;
                        }
                    ));
                }

                // Delete movements.
                if (Utilities.getDataLength('selectedMovementFiles')) {
                    $scope.deleteMovements(Utilities.getDataArray('selectedMovementFiles').map(
                        function(movement) {
                            return movement.id;
                        }
                    ));
                }
            }
        };

        /**
         * Deletes the specified folders.
         *
         * @param array IDs
         */
        $scope.deleteFolders = function(IDs) {
            Utilities.time('Deleting Folders');

            // Turn on flag
            Utilities.data.isFetchingMovementData = true;

            Utilities.log('Deleting folders "'+ IDs.join() +'"');
            Utilities.log('For the profile "'+ $scope.rootProfile.id +'"');

            FolderService.destroy($scope.rootProfile.id, IDs.join()).then(

                // On success, update profile list and browse to selected group.
                function(response) {
                    Utilities.timeEnd('Deleting Folders');

                    // Remove deleted folders.
                    for (var i = 0; i < IDs.length; i++) {
                        Utilities.setData('movementFolders', IDs[i], null);
                        Utilities.setData('selectedMovementFolders', IDs[i], null);
                    }
                    $scope.folders = Utilities.getDataArray('movementFolders');

                    Utilities.data.isFetchingMovementData = false;
                },

                // On failure.
                function(response) {
                    Utilities.timeEnd('Deleting Folders');
                    Utilities.error('Could not delete folders: ' + response.responseText);
                    Utilities.alert('Could not delete folders. Please try again later.');
                    Utilities.data.isFetchingMovementData = false;
                }
            );
        };

        /**
         * Deletes the specified movements.
         *
         * @param array IDs
         */
        $scope.deleteMovements = function(IDs) {
            Utilities.time('Deleting Movements');

            // Turn on flag
            Utilities.data.isFetchingMovementData = true;

            MovementService.destroy(IDs.join()).then(

                // On success, update profile list and browse to selected group.
                function(response) {
                    Utilities.timeEnd('Deleting Movements');

                    // Remove deleted movements.
                    for (var i = 0; i < IDs.length; i++) {
                        Utilities.setData('movementFiles', IDs[i], null);
                        Utilities.setData('selectedMovementFiles', IDs[i], null);
                    }
                    $scope.movements = Utilities.getDataArray('movementFiles');

                    Utilities.data.isFetchingMovementData = false;
                },

                // On failure.
                function(response) {
                    Utilities.timeEnd('Deleting Movements');
                    Utilities.error('Could not delete movements: ' + response.responseText);
                    Utilities.alert('Could not delete movements. Please try again later.');
                    Utilities.data.isFetchingMovementData = false;
                }
            );
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
