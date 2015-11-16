/**
 * @file    groups.js
 * @brief   Controller for the dashboard's groups page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('DashboardGroupsController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        $scope.params = $routeParams;

    }
]);
