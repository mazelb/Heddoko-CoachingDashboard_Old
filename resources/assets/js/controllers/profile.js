/**
 * @brief   Controller for profile views.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('ProfileController',
    ['$scope', '$location', '$filter', 'Teams', 'Athletes', 'FMSForm', 'Rover', 'ProfileService', 'GroupService',
    function($scope, $location, $filter, Teams, Athletes, FMSForm, Rover, ProfileService, GroupService) {

        Rover.debug('ProfileController');

        // Current URL path.
        $scope.currentPath = $location.path();
        $scope.isProfilePage = true;

        // Empty profile object for "new profile" form.
        if ($scope.currentPath == '/profile/create')
        {
            $scope.profile =
            {
                id: 0,
                notes: '',
                gender: ''
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

        // Formats certain profile fields.
        $scope.formatProfile = function() {

            // Format created_at date.
            $scope.profile.created_at = $scope.profile.created_at || '';
            $scope.profile.created_at_formatted = $scope.profile.created_at.length > 0 ?
                $filter('date')($scope.profile.created_at.substr(0, 10), 'MMM d, yyyy') : '';

            // Calculate the amount of feet in the total height.
            $scope.profile.feet = $scope.profile.height > 0 ?
                Math.floor($scope.profile.height / 0.3048) : '';
            Rover.debug($scope.profile.feet + 'ft in ' + $scope.profile.height + 'm');

            // Calculate the amount of inches in the remaining height.
            $scope.profile.inches = $scope.profile.height > 0 ?
                Math.round((($scope.profile.height - $scope.profile.feet * 0.3048) / 0.3048) * 12) : '';
            Rover.debug($scope.profile.inches + 'in remaining');

            // Calculate the weight in pounds.
            $scope.profile.weight_lbs = $scope.profile.mass > 0 ?
                Math.round($scope.profile.mass / 0.453592) : '';

            // Build avatar SRC from data uri and mime type.
            $scope.profile.avatar_src = $scope.profile.avatar ?
                'data:'+ $scope.profile.avatar.mime_type +';base64,'+ $scope.profile.avatar.data_uri : '';
        };

        // Submits the new profile form.
        $scope.submitProfileForm = function() {
            return $scope.profile.id > 0 ? $scope.updateProfile() : $scope.createProfile();
        };

        // Creates a new profile in the database.
        $scope.createProfile = function() {

            Rover.debug('Creating profile...');

            var profile = $scope.profile;

            // Format height into meters.
            profile.height = (profile.feet + profile.inches / 12) * 0.3048;
            Rover.debug('Height: ' + profile.feet + '" ' + profile.inches + '\'');
            Rover.debug('Height (converted): ' + profile.height);

            // Format mass in kg.
            profile.mass = profile.weight_lbs * 0.453592;
            Rover.debug('Weight: ' + profile.weight_lbs);
            Rover.debug('Mass: ' + profile.mass);

            // Add group info.
            // TODO: allow multiple groups.
            profile.groups = [$scope.global.state.group.selected.id];

            // Show loading animation.
            Rover.addBackgroundProcess();

            ProfileService.create(profile, $scope.group.id).then(

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

            var profile = $scope.profile;

            // Format height into meters.
            profile.height = (profile.feet + profile.inches / 12) * 0.3048;
            Rover.debug('Height: ' + profile.feet + '" ' + profile.inches + '\'');
            Rover.debug('Height (converted): ' + profile.height);

            // Format mass in kg.
            profile.mass = profile.weight_lbs * 0.453592;
            Rover.debug('Weight: ' + profile.weight_lbs);
            Rover.debug('Mass: ' + profile.mass);

            // Add group info.
            // TODO: allow multiple groups.
            profile.groups = [$scope.global.state.group.selected.id];

            // Show loading animation.
            Rover.addBackgroundProcess();

            // Update profile data.
            // Athletes.update(profile).then(
            ProfileService.update(profile.id, profile).then(

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

            ProfileService.destroy($scope.profile.id).then(

                // On success, update profile list and browse to selected group.
                function(response) {

                    // If profile was deleted, update the local list of profiles.
                    if (response.status === 200)
                    {
                        $scope.global.state.profile.list = response.data;

                        // Select another profile by default.
                        if (response.data.length > 0) {
                            $scope.global.state.profile.selected = response.data[0];
                        }
                    }

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

        // POST endpoint for avatar uploads.
        $scope.uploadImageEndpoint = '/api/profile/'+ $scope.profile.id +'/avatar';

        // FMS tests...
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
        $scope.fmsForms = $scope.global.state.profile.selected.fms_forms;
        if (!$scope.fmsForms && $scope.profile.id > 0) {
            $scope.updateFMSForms();
        }

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
