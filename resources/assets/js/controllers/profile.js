/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for profile views.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('ProfileController',
    ['$scope', '$location', '$filter', 'Rover', 'ProfileService', 'GroupService',
    'Utilities', '$http',
    function($scope, $location, $filter, Rover, ProfileService, GroupService, Utilities, $http) {
        Utilities.debug('ProfileController');

        // Current URL path.
        $scope.currentPath = $location.path();
        $scope.isProfilePage = true;

        // Empty profile object for "new profile" form.
        if ($scope.currentPath == '/profile/create')
        {
            $scope.profile =
            {
                id: 0,
                feet: 0,
                inches: 0,
                weightInPounds: 0,
                notes: '',
                gender: '',
                primaryTag: {},
                secondaryTags: []
            };
        }

        // Shortcut for the currently selected profile.
        else {
            $scope.profile = $scope.global.getSelectedProfile();
        }

        // Alias for the list of groups.
        $scope.groups = $scope.global.state.group.list;

        // Alias for the selected group.
        $scope.group = $scope.global.getSelectedGroup();

        // Alias for the list of profiles.
        $scope.profiles = $scope.global.state.profile.list;

        // Computes the width of the avatar depending on the height of the details panel.
        $scope.calculateAvatarHeight = function() {
            return $('#profileDetails') ? $('#profileDetails').css('height') : 0;
        };

        // Creates a new profile in the database.
        $scope.createProfile = function() {

            Rover.addBackgroundProcess();
            Utilities.debug('Creating profile...');

            var profile = ProfileService.formatForStorage($scope.profile);

            // Add group info.
            // TODO: allow multiple groups.
            profile.groups = [$scope.global.getSelectedGroup().id];

            ProfileService.create(profile).then(
                function(response) {

                    // Update profile list and browse to newly created profile.
                    // Rover.browseTo.path('/profile/view/' + response.data.id);
                    Rover.state.profile.list[response.data.id] = response.data;
                    Rover.browseTo.profile(response.data);
                    Rover.doneBackgroundProcess();
                },
                function(response) {
                    Utilities.debug('Could not create profile: ' + response.statusText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Saves a profile through the uiEditableListContainer directive.
        $scope.saveProfileDetails = function() {

            profile = ProfileService.formatForStorage($scope.global.getSelectedProfile());

            return ProfileService.update(profile.id, profile);
        };

        // Callback for uiEditableListContainer directive.
        $scope.saveProfileDetailsCallback = function(profileSaved) {

            // Update profile list.
            if (profileSaved) {
                $scope.global.state.profile.list[this.profile.id] =
                    $scope.profiles[this.profile.id] =
                    this.profile;

                // Update the selected profile.
                $scope.global.store.profileId = this.profile.id;

                // Navigate to profile page.
                Rover.browseTo.profile();
            }

            //
            else {
                Utilities.alert('Could not save profile details. Please try again later.');
            }
        };

        // Deletes a profile
        $scope.deleteProfile = function() {

            // Show loading animation.
            Utilities.debug('Deleting profile...');
            Rover.addBackgroundProcess();

            ProfileService.destroy($scope.profile.id).then(

                // On success, update profile list and browse to selected group.
                function(response) {

                    // Reset profile list.
                    $scope.global.state.profile.list = {length: 0};
                    angular.forEach(response.data, function(profile) {

                        // Add profile to list.
                        $scope.global.state.profile.list.length++;
                        $scope.global.state.profile.list[profile.id] = profile;
                    });

                    // Unselect profile by default.
                    $scope.global.store.profileId = 0;

                    Rover.browseTo.group();
                    Rover.doneBackgroundProcess();
                },

                // On failure.
                function(response) {
                    Utilities.debug('Could not delete profile: ' + response.responseText);
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // POST endpoint for avatar uploads.
        $scope.uploadAvatarEndpoint = '/api/v1/profiles/'+ $scope.profile.id +'/avatar';

        // Callback for avatar uploads.
        $scope.uploadAvatarCallback = function() {

            // Update the avatar on the currently selected profile.
            $scope.global.getSelectedProfile().avatarSrc = this.avatarSrc;

            // Update the list of profiles.
            $scope.global.state.profile.list[$scope.profile.id].avatarSrc = this.avatarSrc;

            // Update the filtered list.
            angular.forEach($scope.global.state.profile.filtered, function(profile) {
                if (profile.id === $scope.profile.id) {
                    profile.avatarSrc = this.avatarSrc;
                }
            }.bind(this));
        };

        $scope.$watch('global.store.profileId', function(id, oldId)
        {
            // Performance check.
            if (id === oldId) {
                return;
            }

            // Shortcut for the currently selected profile.
            $scope.profile = $scope.global.getSelectedProfile();

            // Format profile fields.
            $scope.profile = ProfileService.formatForDisplay($scope.profile);
        });

        if ($scope.profile.id > 0) {
            $scope.profile = ProfileService.formatForDisplay($scope.profile);
        }
    }
]);
