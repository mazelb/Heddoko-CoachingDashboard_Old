/**
 * @file    dashboard.js
 * @brief   Controller for the dashboard's main page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('DashboardController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        $scope.params = $routeParams;

    }
]);
