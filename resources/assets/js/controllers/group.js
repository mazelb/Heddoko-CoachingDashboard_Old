/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief       Controller for group pages.
 * @author      Francis Amankrah (frank@heddoko.com)
 * @date        October 2015
 */
angular.module('app.controllers')

.controller('GroupController',
    ['$scope', '$location', 'GroupService', 'Teams', 'Upload', 'Rover', 'assetVersion', 'isLocalEnvironment',
    function($scope, $location, GroupService, Teams, Upload, Rover, assetVersion, isLocalEnvironment) {

        Rover.debug('GroupController');

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
            $scope.group = $scope.global.state.group.selected;
        }

        // Shortcut to the list of groups.
        $scope.groups = $scope.global.state.group.list;

        // Shortcut to the list of sports.
        // $scope.sports = $scope.global.state.sport.list;

        // Submits the "new group" form.
        $scope.submitGroupForm = function() {
            return $scope.group.id > 0 ? $scope.updateGroup() : $scope.createGroup();
        };

        // Creates a new group in the database.
        $scope.createGroup = function() {

            Rover.debug("Creating group...");
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
                        $scope.global.state.group.list = response.data.list;

                        // Navigate to newly created group.
                        var newGroupIndex = response.data.list.length - 1;
                        Rover.browseTo.group($scope.global.state.group.list[newGroupIndex]);
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
                $scope.global.state.group.selected.id,
                $scope.global.state.group.selected
            );
        };

        // Callback for uiEditableListContainer directive.
        $scope.saveGroupDetailsCallback = function(saved) {

            // Update group list.
            if (saved) {
                $scope.global.state.group.list = $scope.groups = this.list;

                // Navigate to group page.
                Rover.browseTo.group();
            }

            //
            else {
                Rover.alert('Could not save profile details. Please try again later.');
            }

            Rover.doneBackgroundProcess();
        };

        // Updates the details for an existing group.
        $scope.updateGroup = function() {

            Rover.debug('Updating group...');
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
                    Rover.debug('Could not update group: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Deletes a group and its profiles.
        $scope.deleteGroup = function() {

            Rover.debug('Deleting group...');

            // Show loading animation.
            Rover.addBackgroundProcess();

            // Teams.destroy($scope.global.state.group.selected.id).then(
            GroupService.destroy($scope.global.state.group.selected.id).then(

                // On success, update group list and browse to groups page.
                function(response) {

                    if (response.status === 200)
                    {
                        $scope.global.state.group.list = response.data;

                        // Update selected group.
                        if (response.data.length > 0) {
                            $scope.global.state.group.selected = response.data[0];
                        }
                    }

                    Rover.doneBackgroundProcess();
                    Rover.browseTo.path('/group/list');
                },

                // On failure.
                function(response) {
                    Rover.debug('Could not delete group: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // POST endpoint for avatar uploads.
        $scope.uploadAvatarEndpoint = '/api/group/'+ $scope.group.id +'/avatar';

        // Callback for avatar uploads.
        $scope.uploadAvatarCallback = function() {

            // Update the avatar on the currently selected group.
            $scope.global.state.group.selected.avatar_src = $scope.group.avatar_src = this.avatar_src;

            // Update the list of groups.
            $scope.global.state.group.list = this.list;
        };

        $scope.$watch('global.state.group.selected', function(newGrp, oldGrp)
        {
            // Performance check.
            if (newGrp.id === oldGrp.id) {
                return;
            }

            // Shortcut for the currently selected group.
            $scope.group = $scope.global.state.group.selected;
        });
    }
]);
