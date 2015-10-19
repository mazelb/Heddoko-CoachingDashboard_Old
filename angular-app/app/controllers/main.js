/**
 * @brief This is the central controller which runs whenever the dashboard is loaded
 * It keeps an eye on local scope variables keeps them in sync with the local storage
 * It also fetches the teams list when the page is loaded, and loads a team's athletes when the selected team changes
 * @author Maxwell Mowbray (max@heddoko.com)
 * @param $scope and $sessionStorage (variables used by the view), Teams factory (for retrieving list of teams), TeamsAthletes factory (for retrieving athletes on a team)
 * @return void
 */
angular.module('app.controllers')

.controller('MainController',
    ["$scope", '$sessionStorage', 'Teams', 'Athletes', "loggit", 'Rover', 'assetVersion', 'isLocalEnvironment',
    function($scope, $sessionStorage, Teams, Athletes, loggit, Rover, assetVersion, isLocalEnvironment) {

        // Save an instance of the "rover" variable in the scope.
        Rover.debug('MainController');
        $scope.Rover = Rover;

        // Setup a "global" namespace to store variables that should be inherited
        // in child scopes.
        $scope.global =
        {
            'assetVersion': assetVersion,
            'isLocal': isLocalEnvironment,
            'state': Rover.state
        };

        // Tie the local scope to the user-namespaced sessionStorage.
        $scope.data = Rover.state;

        // Set up the group namespace.
        Rover.debug('Setting up group data...');
        $scope.data.group = $scope.data.group || {};
        $scope.data.group.list = $scope.data.group.list || [];
        $scope.data.group.selected = $scope.data.group.selected || {id: 0};
        $scope.data.group.new = {

        };

        // Set up the member namespace.
        Rover.debug('Setting up member data...');
        $scope.data.member = $scope.data.member || {};
        $scope.data.member.list = $scope.data.member.list || [];
        $scope.data.member.selected = $scope.data.member.selected || {id: 0};
        $scope.data.member.new = {
            first_name: "",
            last_name: "",
            height: "",
            feet: "",
            inches: "",
            weight_lbs: "",
            age: ""
        };

        // Submits the "new team" form.
        $scope.submitNewTeamForm = function() {

            Rover.debug('submitNewTeamForm');
            Rover.addBackgroundProcess();

            $scope.data.new_team_form_data.sport_id = $scope.data.selected_sport.id;

            Teams.create($scope.data.new_team_form_data).then(
                function(response) {

                    $scope.data.new_team_form_data = null;

                    if (response.status === 200) {
                        $scope.data.group.list = response.data;
                    }

                    loggit.logSuccess("New Team successfully created");

                    Rover.doneBackgroundProcess();
                },
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Submits the "new athlete" form.
        $scope.submitNewAthleteForm = function() {

            Rover.debug('submitNewAthleteForm');

            Rover.debug($scope.data.member.new);
            Rover.debug(Rover.state.member.new);
            var athlete = $scope.data.member.new;
            Rover.debug(athlete);

            // Format some variables.
            athlete.team_id = $scope.data.group.selected.id;
            athlete.height_cm = (athlete.feet * 12 + athlete.inches) * 2.54;
            athlete.weight_cm = athlete.weight_lbs / 2.20462;
            athlete.primary_sport = $scope.data.group.selected.sport_name;
            athlete.primary_position = "";
            athlete.hand_leg_dominance = "";
            athlete.previous_injuries = "";
            athlete.underlying_medical = "";
            athlete.notes = "";

            Rover.debug(athlete);

            // Show loading animation.
            Rover.addBackgroundProcess();

            Athletes.create(athlete.team_id, athlete).then(
                function(response) {

                    // Reset "new athlete" form.
                    $scope.data.member.new = {
                        first_name: "",
                        last_name: "",
                        height: "",
                        feet: "",
                        inches: "",
                        weight_lbs: "",
                        age: ""
                    };

                    if (response.status === 200) {
                        $scope.data.member.list = response.data;
                    }

                    loggit.logSuccess("New Athlete successfully created");

                    Rover.doneBackgroundProcess();
                },
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populates the team list.
        $scope.populateGroupList = function() {

            // Show loading animation.
            Rover.debug('Populating group list...');
            Rover.addBackgroundProcess();

    		Teams.get().then(
                function(response) {

        			if (response.status === 200) {
                        $scope.data.group.list = response.data;
                    }

                    // Select a default team.
                    if ($scope.data.group.selected.id < 1 && $scope.data.group.list.length > 0) {
                        $scope.data.group.selected = $scope.data.group.list[0];
                    }

                    Rover.doneBackgroundProcess();
        		},
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populates the athlete list.
        $scope.populateMemberList = function() {

            // Show loading animation.
            Rover.debug('Populating member list...');
            Rover.addBackgroundProcess();

    		Athletes.get($scope.data.group.selected.id).then(

                // On success.
                function(response) {

        			if (response.status === 200) {
                        $scope.data.member.list = response.data;
                    }

                    // Select a default athlete.
                    if ($scope.data.member.selected.id < 1 && $scope.data.member.list.length > 0) {
                        $scope.data.member.selected = $scope.data.member.list[0];
                    }

                    Rover.doneBackgroundProcess();
    		    },

                // On error.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        //
        // ...
        //

        // Populate group list.
        Rover.debug('Checking group list on first load...');
    	if ($scope.data.group.list.length === 0) {
    		$scope.populateGroupList();
    	}

        // Populate member list.
        Rover.debug('Checking member list on first load...');
    	if ($scope.data.member.list.length === 0) {
    		$scope.populateMemberList();
    	}

        // Update the athlete list as the selected team is modified.
        $scope.$watch('data.group.selected', function(newGroup, oldGroup)
        {
            // Performance check.
            if (newGroup === 0) {
                return;
            }

            // Make sure we have an object.
            if (typeof newGroup == 'number' || typeof newGroup == 'string')
            {
                var id = Number(newGroup);
                $.each($scope.data.group.list, function(group, team)
                {
                    if (group.id == id) {
                        newGroup = group;
                    }
                });

                $scope.data.group.selected = newGroup;
                return;
            }

            Rover.debug('Selected group: ' + newGroup.id);

            // Reset members list.
            $scope.data.member.list = [];
            $scope.data.member.selected = {id: 0};

            // Update members list.
    		$scope.populateMemberList();
        }, true);
    }
]);
