/**
 * @file    movement-data-demo.js
 * @brief   Controller for movement-data-demo page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('SubmitMovementDemoController', ['$scope', 'Sports', 'SportMovements', 'Rover', 'assetVersion',
    function($scope, Sports, SportMovements, Rover, assetVersion) {

        Rover.debug('SubmitMovementDemoController');

        $scope.assetVersion = assetVersion;

        // Tie the local scope to the user-namespaced sessionStorage.
        $scope.sports = Rover.state.movement_demo;

        // Setup demo data.
        Rover.debug('Setting up movement data...');
        $scope.sports = $scope.sports || {};
        $scope.sports.default = {name: 'None selected'};
        $scope.sports.selected = $scope.sports.selected || $scope.sports.default;
        $scope.movements = $scope.movements || {};
        $scope.movements.default = {name: 'None selected'};
        $scope.movements.selected = $scope.movements.selected || $scope.movements.default;

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
                        $scope.sports.list = response.data;
                    }

                    // Select a default sport.
            		if ($scope.sports.list.length > 0) {
            			$scope.sports.selected = $scope.sports.list[0];
            		} else {
                        $scope.sports.selected = $scope.sports.default;
                    }

                    Rover.doneBackgroundProcess();
            	},

                // On error.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Populate sports list.
        Rover.debug('Checking sports list on first load...');
    	if (!$scope.sports.list) {
    		$scope.populateSportsList();
    	}

        $scope.$watch('sports.selected', function()
        {
            // Show loading animation.
            Rover.debug('Updating movements list...');
            Rover.addBackgroundProcess();

            // Reset sports movements.
            $scope.movements.list = $scope.movements.selected = null;

        	SportMovements.get($scope.sports.selected.id).then(

                // On success.
                function(response)
                {
                    if (response.status === 200) {
                        $scope.movements.list = response.data;
                    }

                    // Select a default movement.
            		if ($scope.movements.list.length > 0) {
            			$scope.movements.selected = $scope.movements.list[0];
            		} else {
                        $scope.movements.selected = $scope.movements.default;
                    }

                    Rover.doneBackgroundProcess();
                },

                // On failure.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        }, true);
    }
]);
