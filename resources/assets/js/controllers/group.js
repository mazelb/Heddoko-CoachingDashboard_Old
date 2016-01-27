/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief       Controller for group pages.
 * @author      Francis Amankrah (frank@heddoko.com)
 * @date        October 2015
 */
angular.module('app.controllers')

.controller('GroupController',
    ['$scope', '$routeParams', 'GroupService', 'Upload', 'Utilities', 'Rover', 'isLocalEnvironment', '$timeout',
    function($scope, $routeParams, GroupService, Upload, Utilities, Rover, isLocalEnvironment, $timeout) {
        Utilities.info('GroupController');

        // Currently displayed group.
        $scope.group = {id: 0};
        if ($routeParams.groupId > 0)
        {
            if (Utilities.hasData('group', $routeParams.groupId))
            {
                $scope.global.selectGroup($routeParams.groupId);
                $scope.group = Utilities.getData('group', $routeParams.groupId);
            }

            // If we're still loading groups, wait for those results.
            else if (Utilities.data.isFetchingGroups)
            {
                // TODO: fix this watcher.
                var stopWatchingGroups = $scope.$watch('global.data.isFetchingGroups', function(status) {

                    // Update group.
                    if (Utilities.hasData('group', $routeParams.groupId))
                    {
                        $scope.global.selectGroup($routeParams.groupId);
                        $scope.group = Utilities.getData('group', $routeParams.groupId);
                    }

                    // Remove $watch binding.
                    stopWatchingGroups();
                });
            }
        }

        // Model for new group details.
        $scope.newGroup = {
            id: 0,
            name: ''
        };

        /**
         * Adds a group record to the database.
         */
        $scope.createGroup = function() {
            Utilities.time('Creating Group');
            Rover.addBackgroundProcess();

            var form = $scope.newGroup;

            GroupService.create(form).then(

                // On success.
                function(response) {
                    Utilities.timeEnd('Creating Group');
                    Rover.doneBackgroundProcess();

                    if (response.status === 200) {

                        // Update the group list
                        // Rover.state.group.list[response.data.id] = response.data;
                        // Rover.setState('group', response.data.id, response.data);
                        Utilities.setData('group', response.data.id, response.data);

                        // Navigate to newly created group.
                        Rover.browseTo.group(response.data);
                    }
                },

                // On failure.
                function(response) {
                    Utilities.timeEnd('Creating Group');
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Saves a profile through the uiEditableListContainer directive.
        $scope.saveGroupDetails = function() {
            // return GroupService.update(
            //     $scope.global.getSelectedGroup().id,
            //     $scope.global.getSelectedGroup()
            // );
            return GroupService.update($scope.group.id, $scope.group);
        };

        // Callback for uiEditableListContainer directive.
        $scope.saveGroupDetailsCallback = function(saved) {

            // Update group list.
            if (saved) {
                // $scope.global.state.group.list[this.id] = this;
                // Rover.setState('group', this.id, this);
                Utilities.setData('group', this.id, this);

                // Navigate to group page.
                Rover.browseTo.path('/group/' + this.id);
            }

            //
            else {
                Utilities.alert('Could not save profile details. Please try again later.');
            }

            Rover.doneBackgroundProcess();
        };

        // Updates the details for an existing group.
        $scope.updateGroup = function() {
            Utilities.time('Updating Group');
            Rover.addBackgroundProcess();

            var form = $scope.group;

            GroupService.update(form.id, form).then(

                // On success.
                function(response) {
                    Utilities.timeEnd('Updating Group');
                    Rover.doneBackgroundProcess();

                    if (response.status === 200)
                    {
                        // Navigate to group page.
                        Rover.browseTo.group();
                    }
                },

                // On failure.
                function(response) {
                    Utilities.timeEnd('Updating Group');
                    Utilities.error('Could not update group: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        /**
         * Deletes a group and its profiles.
         *
         * @param int groupId
         */
        $scope.deleteGroup = function(groupId) {
            Utilities.time('Deleting Group');

            // Show loading animation.
            Rover.addBackgroundProcess();

            GroupService.destroy(groupId || $scope.group.id).then(

                // On success, update profile list and browse to selected group.
                function(response) {
                    Utilities.timeEnd('Deleting Group');

                    // Update group list.
                    Utilities.setData('group', $scope.group.id, null);
                    $scope.global.updateFilteredProfiles();

                    // Unselect profile by default.
                    Utilities.store.groupId = 0;

                    Rover.browseTo.path('/group');
                    Rover.doneBackgroundProcess();
                },

                // On failure.
                function(response) {
                    Utilities.timeEnd('Deleting Group');
                    Utilities.error('Could not delete group: ' + response.responseText);
                    Utilities.alert('Could not delete group. Please try again later.');
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
            // $scope.global.state.group.list[this.group.id].avatarSrc = this.avatarSrc;
            Utilities.getData('group', this.group.id).avatarSrc = this.avatarSrc;
        };
    }
]);
