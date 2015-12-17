/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for movement screenings.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('ScreeningController', ['$scope', '$routeParams', 'ScreeningService', 'Rover', 'Utilities',
    function($scope, $routeParams, ScreeningService, Rover, Utilities) {
        Utilities.debug('ScreeningController');

        // Initial setup.
        $scope.global.data.isFetchingScreeningData = true;
        $scope.global.state.screening = $scope.global.state.screening || {};
        $scope.global.state.screening.list = $scope.global.state.screening.list || {length: 0};
        $scope.global.state.screening.live = $scope.global.state.screening.live || {id: 0};

        /**
         * Retrieves screening data for the selected profile.
         */
        $scope.fetchScreeningData = function() {

        };

        // If a screening ID was provided, try to fetch its contents.
        if ($routeParams.screeningId)
        {

        }

        // Retrieve screenings.

    }
]);
