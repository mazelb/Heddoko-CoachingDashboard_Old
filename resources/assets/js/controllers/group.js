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
        if ($routeParams.groupId > 0 && Utilities.hasData('group', $routeParams.groupId))
        {
            // Utilities.store.groupId = $routeParams.groupId;
            $scope.global.selectGroup($routeParams.groupId);
            $scope.group = Utilities.getData('group', $routeParams.groupId);
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

        // Deletes a group and its profiles.
        $scope.deleteGroup = function() {
            Utilities.log('Deleting group...');

            Utilities.log('TODO: update group list update on success...');

            Utilities.alert('In Development.');

            return false;

            // // Show loading animation.
            // Rover.addBackgroundProcess();
            //
            // GroupService.destroy($scope.global.getSelectedGroup().id).then(
            //
            //     // On success, update group list and browse to groups page.
            //     function(response) {
            //
            //         if (response.status === 200)
            //         {
            //             Rover.state.group.list = {length: 0};
            //             angular.forEach(response.data, function(group) {
            //                 Rover.state.group.list.length++;
            //                 Rover.state.group.list[group.id] = group;
            //             });
            //
            //             // Update selected group.
            //             if (response.data.length > 0) {
            //                 Rover.store.groupId = response.data[0].id;
            //             }
            //         }
            //
            //         Rover.doneBackgroundProcess();
            //         Rover.browseTo.path('/group/list');
            //     },
            //
            //     // On failure.
            //     function(response) {
            //         Utilities.debug('Could not delete group: ' + response.responseText);
            //         Rover.doneBackgroundProcess();
            //     }
            // );
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
