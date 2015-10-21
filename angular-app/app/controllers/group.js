/**
 * @file    group.js
 * @brief   Controller for group pages.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('GroupController',
    ['$scope', '$location', "Teams", 'Rover', 'assetVersion', 'isLocalEnvironment',
    function($scope, $location, Teams, Rover, assetVersion, isLocalEnvironment) {

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
                sportId: ""
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

        // Submits the "new team" form.
        $scope.createGroup = function() {

            Rover.debug("Creating group...");
            Rover.addBackgroundProcess();

            $scope.global.state.new_team_form_data.sport_id = $scope.global.state.selected_sport.id;

            Teams.create($scope.global.state.new_team_form_data).then(
                function(response) {

                    $scope.global.state.new_team_form_data = null;

                    if (response.status === 200) {
                        $scope.global.state.group.list = response.data;
                    }

                    loggit.logSuccess("New Team successfully created");

                    Rover.doneBackgroundProcess();
                },
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

    }
]);
