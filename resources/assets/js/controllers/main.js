/**
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
    'Rover', 'appVersion', 'assetVersion', 'isLocalEnvironment',
    function(
        $scope, $sessionStorage, $localStorage,
        ProfileService, GroupService, OnboardingService,
        Teams, Athletes, Sports, loggit,
        Rover, appVersion, assetVersion, isLocalEnvironment) {

        Rover.debug('MainController');

        // This makes the rover accessible to some views.
        $scope.Rover = Rover;

        // Setup a "global" namespace to store variables that should be inherited in child scopes.
        $scope.global =
        {
            // Information about the application.
            appVersion: appVersion,
            assetVersion: assetVersion,
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
        $scope.global.state.group.list = $scope.global.state.group.list || [];
        $scope.global.state.group.selected = $scope.global.state.group.selected || {id: 0};
        $scope.global.store.groupId = $scope.global.store.groupId || 0;

        // Setup profile data.
        Rover.debug('Setting up profile data...');
        $scope.global.state.profile = $scope.global.state.profile || {};
        $scope.global.state.profile.list = $scope.global.state.profile.list || [];
        $scope.global.state.profile.selected = $scope.global.state.selected || {id: 0};
        $scope.global.store.profileId = $scope.global.store.profileId || 0;

        // Fetches all groups available to currently authenticated user.
        $scope.fetchGroups = function() {

            // Show loading animation.
            Rover.debug('Fetching groups...');
            $scope.global.data.isFetchingGroups = true;

    		GroupService.get().then(

                // On success.
                function(response) {

        			if (response.status === 200) {
                        $scope.global.state.group.list = response.data;
                    }

                    // Select a default group.
                    if ($scope.global.state.group.selected.id === 0 &&
                        $scope.global.state.group.list.length > 0)
                    {
                        // If a group was previously selected, find that selected group.
                        if ($scope.global.store.groupId > 0)
                        {
                            angular.forEach($scope.global.state.group.list, function(group) {
                                if (group.id === $scope.global.store.groupId) {
                                    $scope.global.state.group.selected = group;
                                }
                            });
                        }

                        // Else, choose the first available group.
                        if ($scope.global.state.group.selected.id === 0)
                        {
                            $scope.global.store.groupId = $scope.global.state.group.list[0].id;
                            $scope.global.state.group.selected = $scope.global.state.group.list[0];
                        }
                    }

                    $scope.global.data.isFetchingGroups = false;
        		},

                // On error.
                function(response) {
                    $scope.global.data.isFetchingGroups = false;
                }
            );
        };

        // Fetches profiles available to authenticated user, filtered by the selected group.
        $scope.fetchProfiles = function() {

            // Show loading animation.
            Rover.debug('Fetching profiles...');
            $scope.global.data.isFetchingProfiles = true;

    		ProfileService.get($scope.global.state.group.selected.id).then(

                // On success.
                function(response) {

        			if (response.status === 200) {
                        $scope.global.state.profile.list = response.data;
                    }

                    // Select a default profile.
                    if ($scope.global.state.profile.selected.id === 0 &&
                        $scope.global.state.profile.list.length > 0 &&
                        $scope.global.state.group.selected.id > 0)
                    {
                        // If a profile was previously selected, find that selected profile.
                        if ($scope.global.store.profileId > 0)
                        {
                            Rover.debug('Looking for profile #' + $scope.global.store.profileId);

                            angular.forEach($scope.global.state.profile.list, function(profile) {
                                if (profile.id === $scope.global.store.profileId) {
                                    $scope.global.state.profile.selected = profile;
                                }
                            });
                        }

                        // Else, choose the first available profile.
                        if ($scope.global.state.profile.selected.id === 0)
                        {
                            Rover.debug('Defaulting to profile #' + $scope.global.state.profile.list[0].id);

                            $scope.global.store.profileId = $scope.global.state.profile.list[0].id;
                            $scope.global.state.profile.selected = $scope.global.state.profile.list[0];
                        }
                    }

                    // If no profile exists, make sure we're not on the "/profile/view" page.
                    // else if ($scope.currentPath == '/profile/view') {
                    //     Rover.browseTo.group();
                    // }

                    $scope.global.data.isFetchingProfiles = false;
    		    },

                // On error.
                function(response) {
                    $scope.global.data.isFetchingProfiles = false;
                }
            );
        };

        // Populate group list.
    	if ($scope.global.state.group.list.length === 0) {
    		$scope.fetchGroups();
    	}

        // Select a default profile.
        if ($scope.global.state.profile.selected.id === 0 &&
            $scope.global.store.profileId > 0 &&
            $scope.global.state.profile.list.length > 0) {

            angular.forEach($scope.global.state.profile.list, function(profile) {
                if (profile.id === $scope.global.store.profileId) {
                    $scope.global.state.profile.selected = profile;
                }
            });
        }

        // Watches the selected group.
        $scope.$watch('global.state.group.selected', function(newGroup, oldGroup) {

            // Performance check.
            if (newGroup === 0) {
                return;
            }

            // Make sure we have an object.
            if (typeof newGroup == 'number' || typeof newGroup == 'string')
            {
                var id = Number(newGroup);
                angular.forEach($scope.global.state.group.list, function(group) {
                    if (group.id == id) {
                        newGroup = group;
                    }
                });

                $scope.global.state.group.selected = newGroup;
                return;
            }

            Rover.debug('Selected group: ' + newGroup.id);

            // Performance check, in case only a property of the group was changed.
            if (newGroup.id === oldGroup.id) {
                return;
            }

            // Save selection.
            Rover.store.groupId = newGroup.id;

            // Reset profile data.
            $scope.global.state.profile.list = [];
            $scope.global.state.profile.selected = {id: 0};

            // Update profiles list.
    		$scope.fetchProfiles();
        }, true);

        // Watches the selected profile.
        $scope.$watch('global.state.profile.selected', function(newProfile, oldProfile) {

            // Performance check.
            if (newProfile === 0) {
                $scope.global.store.profileId = 0;
                return;
            }

            // Make sure we have an object.
            if (typeof newProfile == 'number' || typeof newProfile == 'string') {
                newProfile = {
                    id: Number(newProfile)
                };
            }

            Rover.debug('Selected profile: ' + newProfile.id);

            // Performance check, in case only a property of the group was changed.
            if (newProfile.id === oldProfile.id) {
                return;
            }

            // Save selection.
            $scope.global.store.profileId = newProfile.id;
        });
    }
]);
