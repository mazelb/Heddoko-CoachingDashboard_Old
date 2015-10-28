/**
 * @file    profile.js
 * @brief   Controller for profile views.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('ProfileController', ['$scope', '$location', '$filter', 'Upload', 'Teams', 'Athletes', 'FMSForm', 'Rover',
    function($scope, $location, $filter, Upload, Teams, Athletes, FMSForm, Rover) {

        Rover.debug('ProfileController');

        // Current URL path.
        $scope.currentPath = $location.path();
        $scope.isProfilePage = true;

        // Empty profile object for "new profile" form.
        if ($scope.currentPath == '/profile/create')
        {
            // Select the group's sport as a default.
            var defaultSport = $scope.global.state.sport.selected.name;
            angular.forEach($scope.global.state.sport.list, function(sport, i) {
                if (sport.id === $scope.global.state.group.selected.sport_id) {
                    defaultSport = sport.name;
                }
            });

            $scope.profile =
            {
                id: 0,
                primary_sport: defaultSport,
                notes: '',
                previous_injuries: '',
                underlying_medical: '',
                primary_position: '',
                sex: '',    // TODO: update field name when database is updated.
                team_id: $scope.global.state.group.selected.id  // TODO: update field name when database is updated.
            };
        }

        // Shortcut for the currently selected profile.
        else {
            $scope.profile = $scope.global.state.profile.selected;
        }

        // Alias for the list of groups.
        $scope.groups = $scope.global.state.group.list;

        // Alias for the selected group.
        $scope.group = $scope.global.state.group.selected;

        // Alias for the list of profiles.
        $scope.profiles = $scope.global.state.profile.list;

        // Alias for the list of sports.
        $scope.sports = $scope.global.state.sport.list;

        // FMS tests...
        $scope.fmsForms = $scope.global.state.profile.selected.fms_forms;
        if (!$scope.fmsForms && $scope.profile.id > 0) {
            $scope.updateFMSForms();
        }

        $scope.updateFMSForms = function() {

            Rover.debug('Retrieving FMS forms...');

            FMSForm.get($scope.profile.id).then(

                function(response) {
                    if (response.status === 200) {
                        Rover.debug('Received FMS forms.');
                        Rover.debug(response.data);
                        $scope.global.state.profile.selected.fms_forms = $scope.fmsForms = response.data;
                    }
                },

                function(response) {
                    Rover.debug('Error retrieving FMS forms.');
                    Rover.debug(response);
                }
            );
        };

        // Deletes a group and its profiles.
        $scope.deleteGroup = function() {

            Rover.debug('Deleting group...');

            // Show loading animation.
            Rover.addBackgroundProcess();

            Teams.destroy($scope.global.state.group.selected.id).then(

                // On success.
                function(response) {

                    if (response.status === 200)
                    {
                        // Update group list.
                        $scope.global.state.group.list = response.data.list;

                        // Update selected group.
                        if (response.data.list.length > 0) {
                            $scope.global.state.group.selected = response.data.list[0];
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

        // Formats certain profile fields.
        $scope.formatProfile = function() {

            // Format created_at date.
            $scope.profile.created_at_formatted =
                $filter('date')($scope.profile.created_at.substr(0, 10), 'MMM d, yyyy');

            // Calculate the amount of feet in the total height.
            $scope.profile.feet = $scope.profile.height_cm > 0 ?
                Math.floor($scope.profile.height_cm / 30.48) : '';

            // Calculate the amount of inches in the remaining height.
            $scope.profile.inches = $scope.profile.height_cm > 0 ?
                Math.round(($scope.profile.height_cm % 30.48) / 2.54) : '';

            // Calculate the weight in pounds.
            Rover.debug('Original weight in kg: ' + $scope.profile.weight_cm);
            Rover.debug('Converted weight in lbs: ' + Math.round($scope.profile.weight_cm / 0.453592));
            $scope.profile.weight_lbs = $scope.profile.weight_cm > 0 ?
                Math.round($scope.profile.weight_cm / 0.453592) : '';

            // TODO: rename these fields in the database.
            $scope.profile.group_id = $scope.profile.team_id || $scope.global.state.group.selected.id;
        };

        // Submits the new profile form.
        $scope.submitProfileForm = function() {
            return $scope.profile.id > 0 ? $scope.updateProfile() : $scope.createProfile();
        };

        // Creates a new profile in the database.
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
                primary_position: form.primary_position,
                hand_leg_dominance: '',
                previous_injuries: form.previous_injuries,
                underlying_medical: form.underlying_medical,
                notes: form.notes
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

                    if (response.status === 200) {
                        $scope.global.state.profile.list = response.data.list;
                    }

                    Rover.doneBackgroundProcess();

                    Rover.browseTo.profile(response.data.profile);
                },

                // On failure.
                function(response) {
                    Rover.debug('Could not create profile: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        $scope.updateProfile = function() {

            Rover.debug('Updating profile...');
            Rover.addBackgroundProcess();

            var form = $scope.profile;

            //
            var profile = {
                id: $scope.global.state.profile.selected.id,
                first_name: form.first_name,
                last_name: form.last_name,
                age: form.age,
                team_id: form.group_id, // TODO: update this once database is updated.
                group_id: form.group_id,
                primary_sport: form.primary_sport,
                primary_position: form.primary_position,
                hand_leg_dominance: '',
                previous_injuries: form.previous_injuries,
                underlying_medical: form.underlying_medical,
                notes: form.notes
            };

            // Format height into cm.
            profile.height_cm = Math.round((form.feet + form.inches / 12) * 30.48);

            // Format weight in kg.
            profile.weight_cm = Math.round(form.weight_lbs * 0.453592);

            // Update profile data.
            Athletes.update(profile).then(

                // On success.
                function(response) {

                    if (response.status === 200)
                    {
                        // Update the list of profiles.
                        $scope.global.state.profile.list = response.data.list;

                        // Update the selected profile.
                        angular.forEach(response.data.list, function(obj, i) {
                            if (obj.id === profile.id) {
                                $scope.global.state.profile.selected = obj;
                            }
                        });

                        // Navigate to profile page.
                        Rover.browseTo.profile();
                    }

                    Rover.doneBackgroundProcess();
                },

                // On failure.
                function(response) {

                    Rover.debug('Could not update profile: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Deletes a profile
        $scope.deleteProfile = function() {

            // Show loading animation.
            Rover.debug('Deleting profile...');
            Rover.addBackgroundProcess();

            Athletes.destroy($scope.profile.group_id, $scope.profile.id).then(

                // On success.
                function(response) {

                    // If profile was deleted, update the local list of profiles.
                    if (response.status === 200)
                    {
                        // Update the list of profiles.
                        $scope.global.state.profile.list = response.data.list;

                        // Select another profile by default.
                        if (response.data.list.length > 0) {
                            $scope.global.state.profile.selected = response.data.list[0];
                        }
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

        // Uploads a profile avatar.
        $scope.uploadPhoto = function(fileData) {

            // Performance check.
            if (!fileData) {
                return;
            }

            Rover.debug('Uploading profile avatar...');
            Rover.debug(fileData);
            Rover.addBackgroundProcess();

            Upload.upload({
               url: '/api/teams/'+ $scope.group.id +'/athletes/'+ $scope.profile.id +'/photo',
               data: {photo: fileData}
           }).then(

                // On success.
                function(response) {

                    Rover.doneBackgroundProcess();

                    if (response.status === 200)
                    {
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

        $scope.$watch('global.state.profile.selected', function(newPro, oldPro)
        {
            // Performance check.
            if (newPro.id === oldPro.id) {
                return;
            }

            // Shortcut for the currently selected profile.
            $scope.profile = $scope.global.state.profile.selected;

            // Update FMS forms.
            $scope.fmsForms = [];
            $scope.updateFMSForms();

            // Format profile fields.
            $scope.formatProfile();
        });

        if ($scope.profile.id > 0) {
            $scope.formatProfile();
        }
    }
]);
