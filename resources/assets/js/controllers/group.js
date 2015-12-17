/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief       Controller for group pages.
 * @author      Francis Amankrah (frank@heddoko.com)
 * @date        October 2015
 */
angular.module('app.controllers')

.controller('GroupController',
    ['$scope', '$location', 'GroupService', 'Upload', 'Utilities', 'Rover', 'assetVersion', 'isLocalEnvironment',
    function($scope, $location, GroupService, Upload, Utilities, Rover, assetVersion, isLocalEnvironment) {
        Utilities.debug('GroupController');

        // Current URL path.
        $scope.currentPath = $location.path();

        // Empty group object for "new group" form.
        if ($scope.currentPath == '/group/create')
        {
            $scope.group =
            {
                id: 0,
                name: ''
            };
        }

        // Shortcut for the currently selected group.
        else {
            $scope.group = $scope.global.getSelectedGroup();
        }

        // Shortcut to the list of groups.
        $scope.groups = $scope.global.state.group.list;

        // Submits the "new group" form.
        $scope.submitGroupForm = function() {
            return $scope.group.id > 0 ? $scope.updateGroup() : $scope.createGroup();
        };

        // Creates a new group in the database.
        $scope.createGroup = function() {

            Utilities.debug("Creating group...");
            Rover.addBackgroundProcess();

            var form = $scope.group;

            // Teams.create(form).then(
            GroupService.create(form).then(

                // On success.
                function(response) {
                    Rover.doneBackgroundProcess();

                    if (response.status === 200)
                    {
                        // Update the group list
                        // $scope.global.state.group.list = response.data.list;
                        $scope.global.state.group.list[response.data.group.id] = response.data.group;

                        // Navigate to newly created group.
                        Rover.browseTo.group(response.data.group);
                    }
                },

                // On failure.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Saves a profile through the uiEditableListContainer directive.
        $scope.saveGroupDetails = function() {
            return GroupService.update(
                $scope.global.getSelectedGroup().id,
                $scope.global.getSelectedGroup()
            );
        };

        // Callback for uiEditableListContainer directive.
        $scope.saveGroupDetailsCallback = function(saved) {

            // Update group list.
            if (saved) {
                $scope.global.state.group.list[this.group.id] = this.group;

                // Navigate to group page.
                Rover.browseTo.group();
            }

            //
            else {
                Utilities.alert('Could not save profile details. Please try again later.');
            }

            Rover.doneBackgroundProcess();
        };

        // Updates the details for an existing group.
        $scope.updateGroup = function() {

            Utilities.debug('Updating group...');
            Rover.addBackgroundProcess();

            var form = $scope.group;

            // Teams.update(form.id, form).then(
            GroupService.update(form.id, form).then(

                // On success.
                function(response) {
                    Rover.doneBackgroundProcess();

                    if (response.status === 200)
                    {
                        // Navigate to group page.
                        Rover.browseTo.group();
                    }
                },

                // On failure.
                function(response) {
                    Utilities.debug('Could not update group: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Deletes a group and its profiles.
        $scope.deleteGroup = function() {
            Utilities.debug('Deleting group...');

            // Show loading animation.
            Rover.addBackgroundProcess();

            GroupService.destroy($scope.global.getSelectedGroup().id).then(

                // On success, update group list and browse to groups page.
                function(response) {

                    if (response.status === 200)
                    {
                        Rover.state.group.list = {length: 0};
                        angular.forEach(response.data, function(group) {
                            Rover.state.group.list.length++;
                            Rover.state.group.list[group.id] = group;
                        });

                        // Update selected group.
                        if (response.data.length > 0) {
                            Rover.store.groupId = response.data[0].id;
                        }
                    }

                    Rover.doneBackgroundProcess();
                    Rover.browseTo.path('/group/list');
                },

                // On failure.
                function(response) {
                    Utilities.debug('Could not delete group: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // POST endpoint for avatar uploads.
        $scope.uploadAvatarEndpoint = $scope.global.getSelectedGroup() ?
            '/api/v1/groups/'+ $scope.global.getSelectedGroup().id +'/avatar' : '';

        // Callback for avatar uploads.
        $scope.uploadAvatarCallback = function() {

            // Update the avatar on the currently selected group.
            $scope.global.getSelectedGroup().avatarSrc = this.avatarSrc;

            // Update the list of groups.
            $scope.global.state.group.list[this.group.id].avatarSrc = this.avatarSrc;
        };

        $scope.$watch('global.store.groupId', function(newGrp, oldGrp)
        {
            // Performance check.
            if (newGrp === oldGrp) {
                return;
            }

            // Shortcut for the currently selected group.
            $scope.group = $scope.global.getSelectedGroup();
        });
    }
]);
