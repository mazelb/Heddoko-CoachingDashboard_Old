/**
 * @file    fms.js
 * @brief   Controller for general functional movement screening.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('FMSController', ['$scope', '$routeParams', 'Rover', 'assetVersion',
    function($scope, $routeParams, Rover, assetVersion) {

        Rover.debug('FMSController');

        $scope.params = $routeParams;

        $scope.assetVersion = assetVersion;
    }
]);
