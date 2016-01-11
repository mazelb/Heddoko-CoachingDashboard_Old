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
        Utilities.debug('GroupController');

        // Currently displayed group.
        $scope.group = {id: 0};
        if ($routeParams.groupId > 0 && Rover.hasState('group', $routeParams.groupId))
        {
            Rover.store.groupId = $routeParams.groupId;
            $scope.group = Rover.getState('group', $routeParams.groupId);
        }

        // Model for new group details.
        $scope.newGroup = {
            id: 0,
            name: ''
        };

        // Computes the width of the avatar depending on the height of the details panel.
        $scope.calculateAvatarHeight = function() {
            return $('#groupDetails') ? $('#groupDetails').css('height') : 0;
        };

        // Creates a new group in the database.
        $scope.createGroup = function() {
            Utilities.debug("Creating group...");
            Rover.addBackgroundProcess();

            // var form = $scope.group;
            var form = $scope.newGroup;

            // Teams.create(form).then(
            GroupService.create(form).then(

                // On success.
                function(response) {
                    Rover.doneBackgroundProcess();

                    if (response.status === 200) {

                        // Update the group list
                        // Rover.state.group.list[response.data.id] = response.data;
                        Rover.setState('group', response.data.id, response.data);

                        // Navigate to newly created group.
                        Rover.browseTo.group(response.data);
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
                // $scope.global.state.group.list[this.id] = this;
                Rover.setState('group', this.id, this);

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

            Utilities.debug('TODO: update group list update on success...');

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
