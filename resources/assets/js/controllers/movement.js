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

        // Setup controller.
        $scope.folderId = $routeParams.folderId;
        $scope.newFolder = {
            name: ''
        };

        // Config for uiFilesystem.
        $scope.path = '/';
        $scope.files = [];
        $scope.folders = [];
        $scope.parentFolder = false;
        $scope.uiFilesystemConfig = {
            toolbar: {
                createModal: $routeParams.rootId ? 'createFolderForm' : false,
                createModalIcon: 'plus'
            },

            /**
             * Selects a resource
             *
             * @param stinrg type
             * @param object resource
             */
            onSelect: function(type, resource) {
                var namespace, data;

                switch (type)
                {
                    case 'file':
                        namespace = 'selectedMovementFiles';
                        break;

                    case 'folder':
                        namespace = 'selectedMovementFolders';
                        break;

                    default:
                        Utilities.log('Invalid resource type: ' + type);
                        return;
                }

                // Update selected list.
                Utilities.setData(namespace, resource.id, (resource.selected ? {id: resource.id} : null));
            },

            /**
             * Deletes the specified movements.
             *
             * @param array IDs
             */
            onDeleteFile: function(IDs) {
                Utilities.time('Deleting Movements');

                // Turn on flag
                Utilities.data.isFetchingMovementData = true;

                MovementService.destroy(IDs.join()).then(

                    // On success, update profile list and browse to selected group.
                    function(response) {
                        Utilities.timeEnd('Deleting Movements');

                        // Remove deleted movements.
                        var newList = [], i;
                        for (i = 0; i < $scope.files.length; i++)
                        {
                            Utilities.setData('selectedMovementFiles', IDs[i], null);

                            if (IDs.indexOf($scope.files[i].id) === -1) {
                                newList.push($scope.files[i]);
                            }
                        }

                        $scope.files = newList;

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
            },

            /**
             * Deletes the specified folders.
             *
             * @param array IDs
             */
            onDeleteFolders: function(IDs) {
                Utilities.time('Deleting Folders');

                // Turn on flag
                Utilities.data.isFetchingMovementData = true;

                FolderService.destroy($scope.rootProfile.id, IDs.join()).then(

                    // On success, update profile list and browse to selected group.
                    function(response) {
                        Utilities.timeEnd('Deleting Folders');

                        // Remove deleted folders.
                        var newList = [], i;
                        for (i = 0; i < $scope.folders.length; i++)
                        {
                            Utilities.setData('selectedMovementFolders', IDs[i], null);

                            if (IDs.indexOf($scope.folders[i].id) === -1) {
                                newList.push($scope.folders[i]);
                            }
                        }

                        $scope.folders = newList;

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
            },

            /**
             *
             */
            onDelete: function() {
                Utilities.log('Deleting selected resources...');

                // Delete folders.
                if (Utilities.getDataLength('selectedMovementFolders')) {
                    this.onDeleteFolders(Utilities.getDataArray('selectedMovementFolders').map(Utilities.getId));
                }

                // Delete movements.
                if (Utilities.getDataLength('selectedMovementFiles')) {
                    this.onDeleteFiles(Utilities.getDataArray('selectedMovementFiles').map(Utilities.getId));
                }
            }
        };

        // Fetching movement data flag.
        Utilities.data.isFetchingMovementData = false;

        // Setup namespaces.
        Utilities.createDataNamespace('selectedMovementFiles');
        Utilities.createDataNamespace('selectedMovementFolders');

        $scope.rootProfile = false;

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
            if (folder.path && folder.path != '/') {
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
            $scope.files = [];
            $scope.folders = [];
            Utilities.resetDataNamespace('selectedMovementFiles');
            Utilities.resetDataNamespace('selectedMovementFolders');

            if (profiles.length)
            {
                for (var key in profiles)
                {
                    if (profiles[key].id && profiles[key].id > 0)
                    {
                        $scope.folders.push({
                            title: profiles[key].firstName + ' ' + profiles[key].lastName,
                            createdAt: profiles[key].createdAt,
                            updatedAt: profiles[key].updatedAt,
                            href: '#/movements/' + profiles[key].id
                        });
                    }
                }
            }

            Utilities.data.isFetchingMovementData = false;
        };

        /**
         * Updates the view with non-root folders.
         *
         * @param array folders
         */
        $scope.updateFolders = function(folders) {

            // Reset data.
            $scope.folders = [];
            Utilities.resetDataNamespace('selectedMovementFolders');

            if (folders && folders.length)
            {
                for (var i = 0; i < folders.length; i++)
                {
                    $scope.folders.push({
                        id: folders[i].id,
                        title: folders[i].name,
                        createdAt: folders[i].createdAt,
                        updatedAt: folders[i].updatedAt,
                        href: $scope.getHash(folders[i]),
                    });
                }
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

            FolderService.get($scope.rootProfile.id, folderId, ['parent', 'children', 'movements']).then(
                function(response) {
                    Utilities.timeEnd('Fetching Movement Data');

                    // Update folders.
                    $scope.updateFolders(response.data.children);

                    // Set parent folder
                    $scope.parentFolder = {
                        href: '#/movements'
                    };
                    if (folderId > 0) {
                        $scope.parentFolder.href += '/' + $scope.rootProfile.id;
                    }

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

                    // Update movement data.
                    $scope.files = response.data.movements;
                    Utilities.resetDataNamespace('selectedMovementFiles');

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

            // Reference to $scope.
            var scope = this;

            Utilities.time('Creating Folder');
            Utilities.data.isFetchingMovementData = true;

            Utilities.log('Creating folder "'+ name +'"');
            Utilities.log('Under the parent "'+ scope.folderId +'"');
            Utilities.log('For the profile "'+ scope.rootProfile.id +'"');

            FolderService.create(scope.rootProfile.id, {
                name: name,
                folderId: scope.folderId
            }).then(

                // On success
                function(response) {
                    Utilities.timeEnd('Creating Folder');

                    // Add new folder to folder list.
                    scope.folders.push(response.data);
                    scope.updateFolders(scope.folders);

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
        }.bind($scope);

        // If a root folder was selected, try to display its contents.
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
                Rover.waitForFlag('isFetchingProfiles', false, $scope, function() {

                    // Update path name and retrive movement data.
                    $scope.rootProfile = Utilities.getData('profile', $routeParams.rootId);
                    $scope.fetchMovementData($routeParams.folderId);
                    $scope.path += ' ' + $scope.rootProfile.firstName + ' ' + $scope.rootProfile.lastName;
                });
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
            Rover.waitForFlag('isFetchingProfiles', false, $scope, $scope.updateRootFolders);
        }
    }
]);
