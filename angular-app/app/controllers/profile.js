/**
 * @file    profile.js
 * @brief   Controller for profile view.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('ProfileController', ['$scope', '$location', 'Athletes', 'Rover',
    function($scope, $location, Athletes, Rover) {

        Rover.debug('ProfileController');

        // Current URL path.
        $scope.currentPath = $location.path();

        // Shortcut to the list of groups.
        $scope.groups = $scope.global.state.group.list;

        // Shortcut to the list of profiles.
        $scope.profiles = $scope.global.state.profile.list;

        // Shortcut to the list of sports.
        $scope.sports = $scope.global.state.sport.list;

        // New profile details.
        $scope.profile =
        {
            firstName: "",
            lastName: "",
            feet: "",
            inches: "",
            weightInPounds: "",
            age: "",
            groupId: $scope.data.group.selected.id,
            sportName: ""
        };

        // Submits the new profile form.
        $scope.createProfile = function()
        {
            Rover.debug('Creating profile...');

            var form = $scope.profile;

            //
            var profile =
            {
                first_name: form.firstName,
                last_name: form.lastName,
                age: form.age,
                team_id: form.groupId,
                primary_sport: form.sportName,
                primary_position: "",
                hand_leg_dominance: "",
                previous_injuries: "",
                underlying_medical: "",
                notes: ""
            };

            // Format height into cm.
            profile.height_cm = Math.round((form.feet + form.inches / 12) * 30.48);

            // Format weight in kg.
            profile.weight_cm = Math.round(form.weightInPounds * 0.453592);

            // Show loading animation.
            Rover.addBackgroundProcess();

            Athletes.create(profile.team_id, profile).then(

                // On success.
                function(response) {

                    // Reset form.
                    $scope.profile = {};

                    if (response.status === 200) {
                        $scope.data.profile.list = response.data.list;
                    }

                    Rover.doneBackgroundProcess();

                    Rover.browseTo.profile(response.data.profile);
                },

                // On failure.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Deletes a profile
        $scope.deleteProfile = function()
        {
            Rover.debug('Deleting profile...');
        };

    }
]);
