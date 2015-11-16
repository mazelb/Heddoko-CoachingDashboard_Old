/**
 * @brief   The sports controller takes care of retrieving sports and movement types from the back-end
 * @author  Maxwell Mowbray (max@heddoko.com), Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.controllers')

.controller("SportsController", ["$scope", '$sessionStorage', 'Sports', 'SportMovements', 'Rover',
    function($scope, $sessionStorage, Sports, SportMovements, Rover) {

        

        // Populate sports list.
        Rover.debug('Checking sports list on first load...');
    	if (!Rover.state.sports || Rover.state.sports.length === 0) {
    		$scope.populateSportsList();
    	}

        $scope.$watch('data.selected_sport', function() {
        	Rover.state.selected_sport_movement = Rover.state.sport_movements = null;
        	SportMovements.get(Rover.state.selected_sport.id)
        		.success(function(sports_movements_response) {
        			Rover.state.sport_movements = sports_movements_response;
        		});

        }, true);
    }
]);
