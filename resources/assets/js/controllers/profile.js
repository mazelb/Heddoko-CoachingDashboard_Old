/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
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
        // $scope.sports = $scope.global.state.sport.list;

        // Submits the new profile form.
        $scope.submitProfileForm = function() {
            return $scope.profile.id > 0 ? $scope.updateProfile() : $scope.createProfile();
        };

        // Creates a new profile in the database.
        $scope.createProfile = function() {

            Rover.addBackgroundProcess();
            Rover.debug('Creating profile...');

            var profile = ProfileService.formatForStorage($scope.profile);

            // Add group info.
            // TODO: allow multiple groups.
            profile.groups = [$scope.global.state.group.selected.id];

            ProfileService.create(profile, $scope.group.id).then(

                // On success, update profile list and browse to newly created profile.
                function(response) {
                    $scope.global.state.profile.list = response.data.list;
                    Rover.browseTo.profile(response.data.profile);
                    Rover.doneBackgroundProcess();
                },

                // On failure.
                function(response) {
                    Rover.debug('Could not create profile: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Saves a profile through the uiEditableListContainer directive.
        $scope.saveProfileDetails = function() {

            profile = ProfileService.formatForStorage($scope.global.state.profile.selected);

            return ProfileService.update(profile.id, profile);
        };

        // Callback for uiEditableListContainer directive.
        $scope.saveProfileDetailsCallback = function(profileSaved) {

            // Update profile list.
            if (profileSaved) {
                $scope.global.state.profile.list = $scope.profiles = this.list;

                // Update the selected profile.
                angular.forEach(this.list, function(obj, i) {
                    if (obj.id === $scope.profile.id) {
                        $scope.global.state.profile.selected =  $scope.profile = obj;
                    }
                });

                // Navigate to profile page.
                Rover.browseTo.profile();
            }

            //
            else {
                Rover.alert('Could not save profile details. Please try again later.');
            }

            Rover.doneBackgroundProcess();
        };

        $scope.updateProfile = function() {

            Rover.addBackgroundProcess();
            Rover.debug('Updating profile...');

            var profile = ProfileService.formatForStorage($scope.profile);

            // Add group info.
            // TODO: allow multiple groups.
            profile.groups = [$scope.global.state.group.selected.id];

            // Update profile data.
            // Athletes.update(profile).then(
            ProfileService.update(profile.id, profile).then(

                // On success, update profile list and browse to selected profile.
                function(response) {
                    $scope.global.state.profile.list = response.data.list;

                    // Update the selected profile.
                    angular.forEach(response.data.list, function(obj, i) {
                        if (obj.id === profile.id) {
                            $scope.global.state.profile.selected = obj;
                        }
                    });

                    // Navigate to profile page.
                    Rover.browseTo.profile();
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
                    $scope.global.state.profile.list = response.data;

                    // Select another profile by default.
                    if (response.data.length > 0) {
                        $scope.global.state.profile.selected = response.data[0];
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
        $scope.uploadAvatarEndpoint = '/api/profile/'+ $scope.profile.id +'/avatar';

        // Callback for avatar uploads.
        $scope.uploadAvatarCallback = function() {

            // Update the avatar on the currently selected profile.
            $scope.global.state.profile.selected.avatar_src = $scope.profile.avatar_src = this.avatar_src;

            // Update the list of profiles.
            $scope.global.state.profile.list = this.list;
        };

        // FMS tests...
        // $scope.updateFMSForms = function() {
        //
        //     Rover.debug('Retrieving FMS forms...');
        //
        //     FMSForm.get($scope.profile.id).then(
        //
        //         function(response) {
        //             if (response.status === 200) {
        //                 Rover.debug('Received FMS forms.');
        //                 Rover.debug(response.data);
        //                 $scope.global.state.profile.selected.fms_forms = $scope.fmsForms = response.data;
        //             }
        //         },
        //
        //         function(response) {
        //             Rover.debug('Error retrieving FMS forms.');
        //             Rover.debug(response);
        //         }
        //     );
        // };
        // $scope.fmsForms = $scope.global.state.profile.selected.fms_forms;
        // if (!$scope.fmsForms && $scope.profile.id > 0) {
        //     $scope.updateFMSForms();
        // }

        $scope.$watch('global.state.profile.selected', function(newPro, oldPro)
        {
            // Performance check.
            if (newPro.id === oldPro.id) {
                return;
            }

            // Shortcut for the currently selected profile.
            $scope.profile = $scope.global.state.profile.selected;

            // Update FMS forms.
            // $scope.fmsForms = [];
            // $scope.updateFMSForms();

            // Format profile fields.
            $scope.profile = ProfileService.formatForDisplay($scope.profile);
        });

        if ($scope.profile.id > 0) {
            $scope.profile = ProfileService.formatForDisplay($scope.profile);
        }
    }
]);
