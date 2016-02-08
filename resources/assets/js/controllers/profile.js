/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for profile views.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('ProfileController',
    ['$scope', '$routeParams', '$filter', 'Rover', 'ProfileService', 'GroupService',
    'Utilities', '$http',
    function($scope, $routeParams, $filter, Rover, ProfileService, GroupService, Utilities, $http) {
        Utilities.info('ProfileController');

        // Data for profile list.
        $scope.profileList = [];

        // Parameters for profile list.
        $scope.profileListParams = {
            firstName: 'First Name',
            lastName: 'Last Name',
            group: 'Team',
            createdAt: 'Date'
        };

        // Currently displayed profile.
        $scope.profile = {id: 0};
        if ($routeParams.profileId > 0)
        {
            if (Utilities.hasData('profile', $routeParams.profileId))
            {
                $scope.global.selectProfile($routeParams.profileId);
                $scope.profile = Utilities.getData('profile', $routeParams.profileId);
            }

            // If we're still loading profiles, wait for those results.
            else if (Utilities.data.isFetchingProfiles)
            {
                var stopWatchingProfiles = $scope.$watch('global.data.isFetchingProfiles', function(status) {

                    if (status === true) {
                        return;
                    }

                    // Update profile.
                    if (Utilities.hasData('profile', $routeParams.profileId))
                    {
                        $scope.global.selectProfile($routeParams.profileId);
                        $scope.profile = Utilities.getData('profile', $routeParams.profileId);
                    }

                    // Remove $watch binding.
                    stopWatchingProfiles();
                });
            }
        }

        // Model for new profile details.
        $scope.newProfile =
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

        // Alias for the list of groups.
        // $scope.groups = $scope.global.state.group.list;
        $scope.groups = Utilities.getDataList('group');

        // Alias for the selected group.
        $scope.group = $scope.global.getSelectedGroup();

        /**
         * Updates the profile list.
         */
        $scope.updateProfileList = function() {
            var list = Utilities.getDataArray('profile'), i;

            $scope.profileList = [];
            for (i = 0; i < list.length; i++)
            {
                $scope.profileList.push({
                    title: list[i].firstName + ' ' + list[i].lastName,
                    image: list[i].avatarSrc,
                    href: '#/profiles/' + list[i].id,
                    firstName: list[i].firstName,
                    lastName: list[i].lastName,
                    group: list[i].groups[0].name || '',
                    createdAt: $filter('mysqlDate')(list[i].createdAt)
                });
            }
        };

        // Creates a new profile in the database.
        $scope.createProfile = function() {
            Utilities.time('Creating Profile');

            Rover.addBackgroundProcess();

            var profile = ProfileService.formatForStorage($scope.newProfile);

            // Add group info.
            // TODO: allow multiple groups.
            profile.groups = [$scope.global.getSelectedGroup().id];

            ProfileService.create(profile, ['avatarSrc', 'groups', 'meta']).then(
                function(response) {
                    Utilities.timeEnd('Creating Profile');

                    // Update profile list and browse to newly created profile.
                    // Rover.setState('profile', response.data.id, response.data);
                    Utilities.setData('profile', response.data.id, response.data);
                    $scope.global.updateFilteredProfiles();
                    Rover.browseTo.path('/profiles/' + response.data.id);
                    Rover.doneBackgroundProcess();
                },
                function(response) {
                    Utilities.timeEnd('Creating Profile');
                    Utilities.error('Could not create profile: ' + response.statusText);
                    Utilities.alert('Could not create profile. Please try again later.');
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Saves a profile through the uiEditableListContainer directive.
        $scope.saveProfileDetails = function() {

            var profile = ProfileService.formatForStorage($scope.profile);

            return ProfileService.update(profile.id, profile, ['avatarSrc', 'groups', 'meta']);
        };

        // Callback for uiEditableListContainer directive.
        $scope.saveProfileDetailsCallback = function(profileSaved) {

            // Update profile list.
            if (profileSaved) {

                // Update profile data.
                // Rover.setState('profile', this.id, ProfileService.format(this));
                Utilities.setData('profile', this.id, ProfileService.format(this));
                $scope.global.updateFilteredProfiles();

                // Update the selected profile.
                // Rover.store.profileId = this.id;

                // Navigate to profile page.
                // Rover.browseTo.path('/profiles/' + this.id);
            }

            //
            else {
                Utilities.alert('Could not save profile details. Please try again later.');
            }
        };

        // Deletes a profile
        $scope.deleteProfile = function() {
            Utilities.time('Deleting Profile');

            // Show loading animation.
            Rover.addBackgroundProcess();

            ProfileService.destroy($scope.profile.id).then(

                // On success, update profile list and browse to selected group.
                function(response) {
                    Utilities.timeEnd('Deleting Profile');

                    // Update profile list.
                    // Rover.setState('profile', $scope.profile.id, null);
                    Utilities.setData('profile', $scope.profile.id, null);
                    $scope.global.updateFilteredProfiles();

                    // Unselect profile by default.
                    Utilities.store.profileId = 0;

                    Rover.browseTo.group();
                    Rover.doneBackgroundProcess();
                },

                // On failure.
                function(response) {
                    Utilities.timeEnd('Deleting Profile');
                    Utilities.error('Could not delete profile: ' + response.responseText);
                    Utilities.alert('Could not delete profile. Please try again later.');
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // POST endpoint for avatar uploads.
        $scope.uploadAvatarEndpoint = '/api/v1/profiles/'+ $scope.profile.id +'/avatar';

        // Callback for avatar uploads.
        $scope.uploadAvatarCallback = function() {

            // Update the avatar on the currently selected profile.
            // Rover.getState('profile', $scope.profile.id).avatarSrc = this.avatarSrc;
            Utilities.getData('profile', $scope.profile.id).avatarSrc = this.avatarSrc;

            // Update the filtered list.
            // angular.forEach($scope.global.state.profile.filtered, function(profile) {
            angular.forEach(Utilities.data.filteredProfiles, function(profile) {
                if (profile.id === $scope.profile.id) {
                    profile.avatarSrc = this.avatarSrc;
                }
            }.bind(this));
        };

        /**
         * Creates a new screening.
         *
         * @param int|object profile
         */
        $scope.startNewScreening = function(profile) {

            // Update active profile.
            if (profile) {
                Utilities.store.profileId = Utilities.getId(profile);
            }

            Utilities.store.liveScreeningId = 0;
            Rover.browseTo.path('/screenings/live');
        };

        // Loads the list of profiles.
        if (Utilities.data.isFetchingProfiles)
        {
            var stopWatching = $scope.$watch('global.data.isFetchingProfiles', function(status) {
                if (status === false) {
                    stopWatching();
                    $scope.updateProfileList();
                }
            });
        }

        else {
            $scope.updateProfileList();
        }

        // $scope.$watch('global.store.profileId', function(id, oldId)
        // {
        //     // Performance check.
        //     if (id === oldId) {
        //         return;
        //     }
        //
        //     // Shortcut for the currently selected profile.
        //     $scope.profile = $scope.global.getSelectedProfile();
        //
        //     // Format profile fields.
        //     $scope.profile = ProfileService.format($scope.profile);
        // });

        if ($scope.profile.id > 0) {
            $scope.profile = ProfileService.format($scope.profile);
        }
    }
]);
