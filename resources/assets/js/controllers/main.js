/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   This is the central controller which runs whenever the dashboard is loaded. It keeps an
 *          eye on local scope variables keeps them in sync with the local storage. It also fetches
 *          the group list when the page is loaded, and loads a group's profiles when the selected
 *          group changes.
 * @author  Maxwell Mowbray (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.controllers')

.controller('MainController',
    ['$scope', '$timeout', 'ProfileService', 'GroupService', 'UserService', 'OnboardingService',
    'Rover', 'Utilities', 'isLocalEnvironment',
    function(
        $scope, $timeout, ProfileService, GroupService, UserService, OnboardingService,
        Rover, Utilities, isLocalEnvironment) {
        Utilities.debug('MainController');

        // Setup a "global" namespace to store variables that should be inherited in child scopes.
        $scope.global =
        {
            // Information about the application.
            appVersion: $('meta[name="version"]').attr('content'),
            isLocal: isLocalEnvironment,

            // The localStorage persists across browser sessions.
            store: Rover.store,

            // The sessionStorage persists throughout a single browser session.
            state: Rover.state,

            // The data object is ephemeral, and will reset at the end of the user session.
            data: {},

            // Helper methods.
            endSession: Rover.endSession,
            browseTo: Rover.browseTo,
            alert: Utilities.alert,

            // Onboarding messages.
            onboarding:
            {
                general: OnboardingService.general
            }
        };

        // Setup user data
        $scope.global.state.user = $scope.global.state.user || {id: 0};

        // Setup group data.
        $scope.global.state.group = $scope.global.state.group || {};
        $scope.global.state.group.list = $scope.global.state.group.list || {length: 0};
        $scope.global.store.groupId = $scope.global.store.groupId || 0;

        // Setup profile data.
        $scope.global.state.profile = $scope.global.state.profile || {};
        $scope.global.state.profile.list = $scope.global.state.profile.list || {length: 0};
        $scope.global.state.profile.filtered = $scope.global.state.profile.filtered || [];
        $scope.global.store.profileId = $scope.global.store.profileId || 0;

        // Setup screening data.
        $scope.global.state.screening = $scope.global.state.screening || {};
        $scope.global.state.screening.list = $scope.global.state.screening.list || {length: 0};
        $scope.global.state.screening.current = $scope.global.state.screening.current || {id: 0};
        $scope.global.data.isFetchingScreeningData = false;
        $scope.global.data.isFetchingScreeningList = false;
        $scope.global.data.isPreparingNewScreening = false;

        /**
         * Retrieves a group by ID.
         *
         * @param int
         * @return object|null
         */
        $scope.global.getGroup = function(id) {
            return Rover.getState('group', id, null);
        };

        /**
         * Retrieves the currently selected group.
         *
         * @return object
         */
        $scope.global.getSelectedGroup = function() {
            return Rover.getState('group', Rover.store.groupId, {id: 0});
        };

        /**
         * Retrieves selected profile.
         *
         * @return object
         */
        $scope.global.getSelectedProfile = function() {
            return Rover.getState('profile', Rover.store.profileId, {id: 0});
        };

        /**
         * Updates the selected profile.
         *
         * @param mixed
         */
        $scope.global.selectProfile = function(profile) {
            $timeout(function() {
                $scope.global.store.profileId = Utilities.getId(profile);
            });
        };

        /**
         * Fetches all groups available to currently authenticated user.
         */
        $scope.fetchGroups = function() {
            Utilities.debug('Fetching groups...');

            // Show loading animation.
            $scope.global.data.isFetchingGroups = true;

            // Retrieve available groups.
    		GroupService.list(['avatarSrc']).then(
                function(response) {

                    // Reset group list.
                    Rover.state.group.list = {length: 0};
                    angular.forEach(response.data, function(group) {

                        // Add group to list.
                        Rover.setState('group', group.id, group);
                        // $scope.global.state.group.list.length++;
                        // $scope.global.state.group.list["_" + group.id] = group;
                    });

                    if (!$scope.global.data.isFetchingProfiles && response.data.length > 0)
                    {
                        // Select a default group.
                        if ($scope.global.store.groupId === 0) {
                            $scope.global.store.groupId = response.data[0].id;
                        }

                        else {
                            $scope.global.updateFilteredProfiles();
                        }
                    }


                    $scope.global.data.isFetchingGroups = false;
        		},
                function(response) {
                    Utilities.debug('Could not retrieve group list: ' + response.statusText);
                    $scope.global.data.isFetchingGroups = false;
                }
            );
        };

        /**
         * Updates the filtered profile list.
         *
         * @param int newGroup
         * @param int oldGroup
         */
        $scope.global.updateFilteredProfiles = function(newGroup, oldGroup) {

            var isCurrentProfileIncluded = false;
            $scope.global.state.profile.filtered = [];

            angular.forEach($scope.global.state.profile.list, function(profile) {

                // Make sure we have a profile object.
                if (!profile || !profile.id) {
                    return;
                }

                // If no group was selected, include all profiles.
                if (newGroup === 0)
                {
                    $scope.global.state.profile.filtered.push(profile);

                    // Check if selected profile is part of newly filtered list.
                    if (profile.id == $scope.global.store.profileId) {
                        isCurrentProfileIncluded = true;
                    }
                }

                // Loop through profile groups and check if any of them correspond to the selected group.
                else
                {
                    newGroup = newGroup || $scope.global.store.groupId;

                    if (profile.groups && profile.groups.length)
                    {
                        angular.forEach(profile.groups, function(group) {

                            // ...
                            if (group.id == newGroup) {
                                $scope.global.state.profile.filtered.push(profile);

                                // Check if selected profile is part of newly filtered list.
                                if (profile.id == $scope.global.store.profileId) {
                                    isCurrentProfileIncluded = true;
                                }
                            }
                        });
                    }
                }
            });

            // If the selected profile is not part of the filtered list, select a new one.
            if (!isCurrentProfileIncluded)
            {
                $scope.global.store.profileId = $scope.global.state.profile.filtered.length ?
                    $scope.global.state.profile.filtered[0].id : 0;
            }
        };

        /**
         * Fetches profiles available to authenticated user.
         */
        $scope.fetchProfiles = function() {

            // Show loading animation.
            Utilities.debug('Fetching profiles...');
            $scope.global.data.isFetchingProfiles = true;

            // Retrieve profiles.
    		ProfileService.list(null, ['avatarSrc', 'groups', 'meta']).then(
                function(response) {

                    // Reset profile list.
                    $scope.global.state.profile.list = {length: 0};
                    angular.forEach(response.data, function(profile) {

                        // Add profile to list.
                        Rover.setState('profile', profile.id, profile);
                    });

                    // Select a default profile.
                    if ($scope.global.store.profileId === 0 && response.data.length > 0) {
                        $scope.global.store.profileId = response.data[0].id;
                    }

                    // Update filtered profiles list.
                    $scope.global.updateFilteredProfiles();

                    $scope.global.data.isFetchingProfiles = false;
    		    },
                function(response) {
                    Utilities.debug('Could not retrieve profile list: ' + response.statusText);
                    $scope.global.data.isFetchingProfiles = false;
                }
            );
        };

        // Fetch user details.
        if ($scope.global.state.user.id === 0)
        {
            Utilities.debug('Retrieving user details');
            $scope.global.data.isFetchingUser = true;

            UserService.get(Rover.userHash).then(

                // Update user data.
                function(response) {
                    $scope.global.state.user = response.data;
                    $scope.global.data.isFetchingUser = false;
                },
                function(response) {
                    Utilities.debug('Could not retrieve user details: ' + response.statusText);
                    // Utilities.alert('Could not retrieve user details. Please try again later.');
                    Rover.state.user = {id: 0};
                    $scope.global.data.isFetchingUser = false;
                }
            );
        }

        // Fetch groups and profiles. We'll set a timeout for these requests, so that we don't
        // exceed the maximum # simultaneous requests on the server.
    	if ($scope.global.state.profile.list.length === 0) {
    		$timeout($scope.fetchProfiles, 1000);
    	}

    	if ($scope.global.state.group.list.length === 0) {
    		$timeout($scope.fetchGroups, 2000);
    	}

        // Watches the selected group.
        $scope.$watch('global.store.groupId', $scope.global.updateFilteredProfiles);

        // Watches the selected profile.
        $scope.$watch('global.store.profileId', function(id, oldId) {
            Utilities.debug('Selected profile: ' + id);

            // Performance check.
            if (id === 0) {
                return;
            }

            // Update the selected group.
            // var profile = $scope.global.state.profile.list[id];
            var profile = Rover.getState('profile', id);
            if (profile && profile.groups && profile.groups.length &&
                profile.groups[0].id != $scope.global.store.groupId) {

                $scope.global.store.groupId = profile.groups[0].id;
            }
        });
    }
]);
