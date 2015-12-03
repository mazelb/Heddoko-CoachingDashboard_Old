/**
 * @file    movement-data-demo.js
 * @brief   Controller for movement-data-demo page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('SubmitMovementDemoController', ['$scope', 'Rover', 'assetVersion',
    function($scope, Rover, assetVersion) {

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

    }
]);
