/**
 * @file    profile.js
 * @brief   Controller for profile views.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('ProfileController', ['$scope', '$location', 'Athletes', 'Rover',
    function($scope, $location, Athletes, Rover) {

        Rover.debug('ProfileController');

        // Current URL path.
        $scope.currentPath = $location.path();

        // Alias for the list of groups.
        $scope.groups = $scope.global.state.group.list;

        // Alias for the selected group.
        $scope.group = $scope.global.state.group.selected;

        // Alias for the list of profiles.
        $scope.profiles = $scope.global.state.profile.list;

        // Alias for the selected profile.
        $scope.profile = $scope.global.state.profile.selected;

        // Alias for the list of sports.
        $scope.sports = $scope.global.state.sport.list;

        // Alias to selected profile OR empty profile object.
        $scope.profile = $scope.global.state.profile.selected.id > 0 ?
            $scope.global.state.profile.selected : {};

        // Extra profile fields.
        $scope.profile.feet = '';       // TODO: calculate feet
        $scope.profile.inches = '';     // TODO: calculate inches
        $scope.profile.weight_lbs = $scope.profile.weight_cm;   // NOTE: temporary fix, until we update the database table.
        $scope.profile.group_id = $scope.profile.team_id || $scope.global.state.group.selected.id;
        $scope.profile.primary_sport = '';

        // Submits the new profile form.
        $scope.createProfile = function() {
            
            Rover.debug('Creating profile...');

            var form = $scope.profile;

            //
            var profile = {
                first_name: form.first_name,
                last_name: form.last_name,
                age: form.age,
                team_id: form.group_id,
                primary_sport: form.primary_sport,
                primary_position: '',
                hand_leg_dominance: '',
                previous_injuries: '',
                underlying_medical: '',
                notes: ''
            };

            // Format height into cm.
            profile.height_cm = Math.round((form.feet + form.inches / 12) * 30.48);

            // Format weight in kg.
            profile.weight_cm = Math.round(form.weight_lbs * 0.453592);

            // Show loading animation.
            Rover.addBackgroundProcess();

            Athletes.create(profile.team_id, profile).then(

                // On success.
                function(response) {

                    // Reset form.
                    $scope.profile = {};

                    if (response.status === 200) {
                        $scope.global.state.profile.list = response.data.list;
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
        $scope.deleteProfile = function() {

            Rover.debug('Deleting profile...');

            // Show loading animation.
            Rover.addBackgroundProcess();

            Athletes.destroy($scope.profile.group_id, $scope.profile).then(

                // On success.
                function(response) {

                    // Reset form.
                    $scope.profile = {};

                    // If profile was deleted, update the local list of profiles.
                    if (response.status === 200) {
                        $scope.global.state.profile.list = response.data;
                    }

                    // Send user to selected group's page.
                    Rover.browseTo.group();

                    Rover.doneBackgroundProcess();
                },

                // On failure.
                function(response) {

                    Rover.debug('Could not delete profile: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };
    }
]);
