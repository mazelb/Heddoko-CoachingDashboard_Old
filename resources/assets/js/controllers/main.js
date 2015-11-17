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

        // Save an instance of the "rover" variable in the scope.
        $scope.Rover = Rover;

        // Setup a "global" namespace to store variables that should be inherited in child scopes.
        $scope.global =
        {
            'appVersion': appVersion,
            'assetVersion': assetVersion,
            'isLocal': isLocalEnvironment,

            // We use the localStorage and sessionStorage to persist data.
            'localStorage': $localStorage[Rover.userHash],
            'sessionStorage': $sessionStorage[Rover.userHash],

            // By tying the local scope to the sessionStorage, we can persist data until the user
            // logs out.
            'state': Rover.state,

            // Onboarding messages.
            onboarding:
            {
                general: OnboardingService.general
            }
        };

        // Tie the local scope to the user-namespaced sessionStorage.
        $scope.data = Rover.state;

        // Setup group data.
        Rover.debug("Setting up group data...");
        $scope.global.state.group = $scope.global.state.group || {};
        $scope.global.state.group.list = $scope.global.state.group.list || [];
        $scope.global.state.group.selected = $scope.global.state.group.selected || {id: 0};

        // Setup profile data.
        Rover.debug('Setting up profile data...');
        $scope.global.state.profile = $scope.global.state.profile || {};
        $scope.global.state.profile.list = $scope.global.state.profile.list || [];
        $scope.global.state.profile.selected = $scope.global.state.selected || {id: 0};
        $scope.data.member = $scope.global.state.profile;

        // Setup sports data.
        Rover.debug('Setting up sports data...');
        $scope.global.state.sport = $scope.global.state.sport || {};
        $scope.global.state.sport.list = $scope.global.state.sport.list || [];
        $scope.global.state.sport.selected = $scope.global.state.sport.selected || {id: 0};

        // Populates the team list.
        $scope.populateGroupList = function() {

            // Show loading animation.
            Rover.debug('Populating group list...');
            Rover.addBackgroundProcess();

    		// Teams.get().then(
    		GroupService.get().then(

                // On success.
                function(response) {

        			if (response.status === 200) {
                        $scope.global.state.group.list = response.data;
                    }

                    // Select a default group.
                    if ($scope.global.state.group.selected.id < 1 && $scope.global.state.group.list.length > 0) {
                        $scope.global.state.group.selected = $scope.global.state.group.list[0];
                    }

                    Rover.doneBackgroundProcess();
        		},

                // On error.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populates the profile list.
        $scope.populateProfileList = function() {

            // Show loading animation.
            Rover.debug('Populating profile list...');
            Rover.addBackgroundProcess();

    		// Athletes.get($scope.global.state.group.selected.id).then(
    		ProfileService.get($scope.global.state.group.selected.id).then(

                // On success.
                function(response) {

        			if (response.status === 200) {
                        $scope.global.state.profile.list = response.data;
                    }

                    // Select a default profile.
                    if ($scope.global.state.profile.selected.id < 1 && $scope.global.state.profile.list.length > 0) {
                        $scope.global.state.profile.selected = $scope.global.state.profile.list[0];
                    }

                    // If no profile exists, make sure we're not on the "/profile/view" page.
                    else if ($scope.currentPath == '/profile/view') {
                        Rover.browseTo.group();
                    }

                    Rover.doneBackgroundProcess();
    		    },

                // On error.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populates the sports list.
        $scope.populateSportsList = function() {

            // Show loading animation.
            Rover.debug('Populating sports list...');
            Rover.addBackgroundProcess();

            // Retrieve the list of all sports from the back-end
            Sports.get().then(

                // On success.
                function(response) {

        			if (response.status === 200) {
                        $scope.global.state.sport.list = response.data;
                    }

                    // Select a default sport.
            		if ($scope.global.state.sport.selected.id < 1 && $scope.global.state.sport.list.length > 0) {
            			$scope.global.state.sport.selected = Rover.state.sport.list[0];
            		}

                    Rover.doneBackgroundProcess();
            	},

                // On error.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populate group list.
        Rover.debug("Checking group list on first load...");
    	if ($scope.global.state.group.list.length === 0) {
    		$scope.populateGroupList();
    	}

        // Populate profile list.
        // Rover.debug("Checking profile list on first load...");
    	// if ($scope.global.state.profile.list.length === 0) {
    	// 	$scope.populateProfileList();
    	// }

        // Select a default profile.
        if ($scope.global.state.profile.list.length > 0 && $scope.global.state.profile.selected.id < 1) {
            $scope.global.state.profile.selected = $scope.global.state.profile.list[0];
        }

        // Populate sports list.
        Rover.debug("Checking sports list on first load...");
    	if ($scope.global.state.sport.list.length === 0) {
    		$scope.populateSportsList();
    	}

        // Update the profile list as the selected group is updated.
        $scope.$watch('global.state.group.selected', function(newGroup, oldGroup)
        {
            // Performance check.
            if (newGroup === 0) {
                return;
            }

            // Make sure we have an object.
            if (typeof newGroup == 'number' || typeof newGroup == 'string')
            {
                var id = Number(newGroup);
                $.each($scope.global.state.group.list, function(index, group)
                {
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

            // TODO: load profiles that aren't associated with any group, or decide
            // this should be handled.
            if (newGroup.id < 1) {
                return;
            }

            // Reset members list.
            $scope.global.state.profile.list = [];
            $scope.global.state.profile.selected = {id: 0};

            // Update profiles list.
    		$scope.populateProfileList();
        }, true);
    }
]);
