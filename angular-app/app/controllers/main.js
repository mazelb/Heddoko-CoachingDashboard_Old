/**
 * @brief This is the central controller which runs whenever the dashboard is loaded
 * It keeps an eye on local scope variables keeps them in sync with the local storage
 * It also fetches the teams list when the page is loaded, and loads a team's athletes when the selected team changes
 * @param $scope and $sessionStorage (variables used by the view), Teams factory (for retrieving list of teams), TeamsAthletes factory (for retrieving athletes on a team)
 * @return void
 */
angular.module('app.controllers')

.controller('MainController', ["$scope", '$sessionStorage', 'Teams', 'Athletes', "loggit", 'Rover',
    function($scope, $sessionStorage, Teams, Athletes, loggit, Rover) {

        // Save an instance of the "rover" variable in the scope.
        $scope.Rover = Rover;

        // Tie the local scope to the user-namespaced sessionStorage.
        $scope.data = Rover.sessionStorage;

        // ...
        $scope.data.team = $scope.data.team || {};
        $scope.data.team.list = $scope.data.team.list || [];
        $scope.data.team.selected = $scope.data.team.selected || {id: 0};
        $scope.data.team.new = {

        };

        // ...
        $scope.data.athlete = $scope.data.athlete || {};
        $scope.data.athlete.list = $scope.data.athlete.list || [];
        $scope.data.athlete.selected = $scope.data.athlete.selected || {id: 0};
        $scope.data.athlete.new = {
            first_name: "",
            last_name: "",
            height: "",
            feet: "",
            inches: "",
            weight_lbs: "",
            age: ""
        };

        // Notifies user that app is working in the background.
        $scope.showLoading = function() {
            $('.page-loading-overlay').removeClass("loaded");
            $('.load_circle_wrapper').removeClass("loaded");
        };
        $scope.hideLoading = function() {
            $('.page-loading-overlay').addClass("loaded");
            $('.load_circle_wrapper').addClass("loaded");
        };

        // Submits the "new team" form.
        $scope.submitNewTeamForm = function() {

            Rover.log('submitNewTeamForm');

            Rover.addBackgroundProcess();

            $scope.data.new_team_form_data.sport_id = $scope.data.selected_sport.id;

            Teams.create($scope.data.new_team_form_data).then(
                function(response) {

                    $scope.data.new_team_form_data = null;

                    if (response.status === 200) {
                        $scope.data.team.list = response.data;
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

            Rover.log('submitNewAthleteForm');

            var athlete = $scope.data.athlete.new;

            // Format some variables.
            athlete.team_id = $scope.data.team.selected.id;
            athlete.height_cm = (athlete.feet * 12 + athlete.inches) * 2.54;
            athlete.weight_cm = athlete.weight_lbs / 2.20462;
            athlete.primary_sport = $scope.data.team.selected.sport_name;
            athlete.primary_position = "";
            athlete.hand_leg_dominance = "";
            athlete.previous_injuries = "";
            athlete.underlying_medical = "";
            athlete.notes = "";

            // Show loading animation.
            Rover.addBackgroundProcess();

            Athletes.create(athlete.team_id, athlete).then(
                function(response) {

                    // Reset "new athlete" form.
                    $scope.data.athlete.new = {
                        first_name: "",
                        last_name: "",
                        height: "",
                        feet: "",
                        inches: "",
                        weight_lbs: "",
                        age: ""
                    };

                    if (response.status === 200) {
                        $scope.data.athlete.list = response.data;
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
        $scope.populateTeamList = function() {

            Rover.addBackgroundProcess();

    		Teams.get().then(
                function(response) {

        			if (response.status === 200) {
                        $scope.data.team.list = response.data;
                    }

                    // Select a default team.
                    if ($scope.data.team.selected.id < 1 && $scope.data.team.list.length > 0) {
                        $scope.data.team.selected = $scope.data.team.list[0];
                    }

                    Rover.doneBackgroundProcess();
        		},
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populates the athlete list.
        $scope.populateAthleteList = function() {

            // Show loading.
            Rover.addBackgroundProcess();

    		Athletes.get($scope.data.team.selected.id).then(
                function(response) {

        			if (response.status === 200) {
                        $scope.data.athlete.list = response.data;
                    }

                    // Select a default athlete.
                    if ($scope.data.athlete.selected.id < 1 && $scope.data.athlete.list.length > 0) {
                        $scope.data.athlete.selected = $scope.data.athlete.list[0];
                    }

                    Rover.doneBackgroundProcess();
    		    },
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populate team list.
    	if ($scope.data.team.list.length === 0) {
    		$scope.populateTeamList();
    	}

        // Populate athlete list.
    	if ($scope.data.athlete.list.length === 0) {
    		$scope.populateAthleteList();
    	}

        // Update the athlete list as the selected team is modified.
        $scope.$watch('data.team.selected', function(newSelectedTeam, oldSelectedTeam)
        {
            // Performance check.
            if (newSelectedTeam === 0) {
                return;
            }

            // Make sure we have an object.
            if (typeof newSelectedTeam == 'number' || typeof newSelectedTeam == 'string')
            {
                var teamId = Number(newSelectedTeam);
                $.each($scope.data.team.list, function(index, team)
                {
                    if (team.id == teamId) {
                        newSelectedTeam = team;
                    }
                });

                $scope.data.team.selected = newSelectedTeam;
                return;
            }

            Rover.log('Selected team: ' + newSelectedTeam.id);

            // Reset the athletes list.
            $scope.data.athlete.list = [];
            $scope.data.athlete.selected = {id: 0};

            // Update the athletes list.
    		$scope.populateAthleteList();
        }, true);
    }
]);
