/**
 * @file    team.js
 * @brief   Team controller.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('TeamController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        $scope.params = $routeParams;

    }
]);
