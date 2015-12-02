/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   This is the central controller which runs whenever the dashboard is loaded. It keeps an
 *          eye on local scope variables keeps them in sync with the local storage. It also fetches
 *          the group list when the page is loaded, and loads a group's profiles when the selected
 *          group changes.
 * @author  Maxwell Mowbray (max@heddoko.com); Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.controllers')

.controller('MainController',
    ['$scope', '$sessionStorage', '$localStorage',
    'ProfileService', 'GroupService', 'OnboardingService',
    "Teams", "Athletes", "Sports", "loggit",
    'Rover', 'appVersion', 'isLocalEnvironment',
    function(
        $scope, $sessionStorage, $localStorage,
        ProfileService, GroupService, OnboardingService,
        Teams, Athletes, Sports, loggit,
        Rover, appVersion, isLocalEnvironment) {
        Rover.debug('MainController');

        // This makes the rover accessible to some views.
        $scope.Rover = Rover;

        // Setup a "global" namespace to store variables that should be inherited in child scopes.
        $scope.global =
        {
            // Information about the application.
            appVersion: appVersion,
            isLocal: isLocalEnvironment,

            // The localStorage persists across user sessions.
            store: Rover.store,

            // The sessionStorage persists throughout a single user session.
            state: Rover.state,

            // The data object is ephemeral, and will reset at the end of the user session.
            data: {},

            // Helper methods.
            endSession: Rover.endSession,
            browseTo: Rover.browseTo,

            // Onboarding messages.
            onboarding:
            {
                general: OnboardingService.general
            }
        };

        // Setup group data.
        Rover.debug('Setting up group data...');
        $scope.global.state.group = $scope.global.state.group || {};
        $scope.global.state.group.list = $scope.global.state.group.list || {length: 0};
        $scope.global.store.groupId = $scope.global.store.groupId || 0;
        $scope.global.getSelectedGroup = function() {
            return $scope.global.store.groupId > 0 ?
                $scope.global.state.group.list[$scope.global.store.groupId] : {id: 0};
        };

        // Setup profile data.
        Rover.debug('Setting up profile data...');
        $scope.global.state.profile = $scope.global.state.profile || {};
        $scope.global.state.profile.list = $scope.global.state.profile.list || {length: 0};
        $scope.global.state.profile.filtered = $scope.global.state.profile.filtered || [];
        $scope.global.store.profileId = $scope.global.store.profileId || 0;
        $scope.global.getSelectedProfile = function() {
            return $scope.global.store.profileId > 0 ?
                $scope.global.state.profile.list[$scope.global.store.profileId] : {id: 0};
        };

        // Fetches all groups available to currently authenticated user.
        $scope.fetchGroups = function() {

            // Show loading animation.
            Rover.debug('Fetching groups...');
            $scope.global.data.isFetchingGroups = true;

            // Retrieve available groups.
    		GroupService.get().then(
                function(response) {

                    // Reset group list.
                    $scope.global.state.group.list = {length: 0};
                    angular.forEach(response.data, function(group) {

                        // Add group to list.
                        $scope.global.state.group.list.length++;
                        $scope.global.state.group.list[group.id] = group;
                    });

                    // Select a default group.
                    if ($scope.global.store.groupId === 0 && response.data.length > 0) {
                        $scope.global.store.groupId = response.data[0].id;
                    }

                    $scope.global.data.isFetchingGroups = false;
        		},
                function(response) {
                    Rover.debug('Could not retrieve group list: ' + response.statusText);
                    $scope.global.data.isFetchingGroups = false;
                }
            );
        };

        // Fetches profiles available to authenticated user.
        $scope.fetchProfiles = function() {

            // Show loading animation.
            Rover.debug('Fetching profiles...');
            $scope.global.data.isFetchingProfiles = true;

            // Retrieve profiles.
    		ProfileService.get().then(
                function(response) {

                    // Reset profile list.
                    $scope.global.state.profile.list = {lenth: 0};
                    angular.forEach(response.data, function(profile) {

                        // Add profile to list.
                        $scope.global.state.profile.list.length++;
                        $scope.global.state.profile.list[profile.id] = profile;
                    });

                    // Select a default profile.
                    if ($scope.global.store.profileId === 0 && response.data.length > 0) {
                        $scope.global.store.profileId = response.data[0].id;
                    }

                    $scope.global.data.isFetchingProfiles = false;
    		    },
                function(response) {
                    Rover.debug('Could not retrieve profile list: ' + response.statusText);
                    $scope.global.data.isFetchingProfiles = false;
                }
            );
        };

        // Populate group list.
    	if ($scope.global.state.group.list.length === 0) {
    		$scope.fetchGroups();
    	}

        // Populate profile list.
    	if ($scope.global.state.profile.list.length === 0) {
    		$scope.fetchProfiles();
    	}

        // Select a default profile.
        // if ($scope.global.state.profile.selected.id === 0 &&
        //     $scope.global.store.profileId > 0 &&
        //     $scope.global.state.profile.list.length > 0) {
        //
        //     angular.forEach($scope.global.state.profile.list, function(profile) {
        //         if (profile.id === $scope.global.store.profileId) {
        //             $scope.global.state.profile.selected = profile;
        //         }
        //     });
        // }

        // Watches the selected group.
        $scope.$watch('global.store.groupId', function(newGroup, oldGroup) {
            Rover.debug('Selected group: ' + newGroup);

            // Update the filtered profile list.
            var isCurrentProfileIncluded = false;
            $scope.global.state.profile.filtered = [];
            angular.forEach($scope.global.state.profile.list, function(profile) {

                // If no group was selected, include all profiles.
                if (newGroup < 1)
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
                    if (profile.groups && profile.groups.length)
                    {
                        angular.forEach(profile.groups, function(group) {
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
        });
        // $scope.$watch('global.state.group.selected', function(newGroup, oldGroup) {
        //
        //     // Performance check.
        //     if (newGroup === 0) {
        //         return;
        //     }
        //
        //     // Make sure we have an object.
        //     if (typeof newGroup == 'number' || typeof newGroup == 'string')
        //     {
        //         var id = Number(newGroup);
        //         angular.forEach($scope.global.state.group.list, function(group) {
        //             if (group.id == id) {
        //                 newGroup = group;
        //             }
        //         });
        //
        //         $scope.global.state.group.selected = newGroup;
        //         return;
        //     }
        //
        //     Rover.debug('Selected group: ' + newGroup.id);
        //
        //     // Performance check, in case only a property of the group was changed.
        //     if (newGroup.id === oldGroup.id) {
        //         return;
        //     }
        //
        //     // Save selection.
        //     Rover.store.groupId = newGroup.id;
        //
        //     // Reset profile data.
        //     $scope.global.state.profile.list = [];
        //     $scope.global.state.profile.selected = {id: 0};
        //
        //     // Update profiles list.
    	// 	$scope.fetchProfiles();
        // }, true);

        // Watches the selected profile.
        $scope.$watch('global.store.profileId', function(id, oldId) {
            Rover.debug('Selected profile: ' + id);

            // Performance check.
            if (id === 0) {
                return;
            }

            // Update the selected group.
            var profile = $scope.global.state.profile.list[id];
            if (profile && profile.groups && profile.groups.length &&
                profile.groups[0].id != $scope.global.store.groupId) {

                $scope.global.store.groupId = profile.groups[0].id;
            }
        });
        // $scope.$watch('global.state.profile.selected', function(newProfile, oldProfile) {
        //
        //     // Performance check.
        //     if (newProfile === 0) {
        //         $scope.global.store.profileId = 0;
        //         return;
        //     }
        //
        //     // Make sure we have an object.
        //     if (typeof newProfile == 'number' || typeof newProfile == 'string') {
        //         newProfile = {
        //             id: Number(newProfile)
        //         };
        //     }
        //
        //     Rover.debug('Selected profile: ' + newProfile.id);
        //
        //     // Performance check, in case only a property of the group was changed.
        //     if (newProfile.id === oldProfile.id) {
        //         return;
        //     }
        //
        //     // Save selection.
        //     $scope.global.store.profileId = newProfile.id;
        // });
    }
]);
