/**
 * @file    group.js
 * @brief   Controller for group pages.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
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
                name: "",
                sport_id: $scope.global.state.sport.selected.id
            };
        }

        // Shortcut for the currently selected group.
        else {
            $scope.group = $scope.global.state.group.selected;
        }

        // Shortcut to the list of groups.
        $scope.groups = $scope.global.state.group.list;

        // Shortcut to the list of sports.
        $scope.sports = $scope.global.state.sport.list;

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

        // Uploads an avatar for the group.
        $scope.uploadPhoto = function(fileData) {

            // Performance check.
            if (!fileData) {
                return;
            }

            Rover.debug('Uploading group avatar...');
            Rover.debug(fileData);
            Rover.addBackgroundProcess();

            Upload.upload({
            //    url: '/api/teams/'+ $scope.group.id +'/photo',
               url: '/api/group/'+ $scope.group.id +'/photo',
               data: {photo: fileData}
           }).then(

                // On success.
                function(response) {
                    Rover.doneBackgroundProcess();

                    if (response.status === 200) {

                        // Update the avatar on the currently selected group.
                        $scope.global.state.group.selected.photo_src = response.data.photo_src;
                        $scope.group.photo_src = response.data.photo_src;

                        // Update the list of groups.
                        $scope.global.state.group.list = response.data.list;

                        Rover.debug(response.data);
                    }
                },

                // On failure.
                function(response) {
                    $scope.avatar = null;
                    Rover.doneBackgroundProcess();
                    Rover.debug('Could not upload avatar: ' + response.responseText);
                }
            );
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
