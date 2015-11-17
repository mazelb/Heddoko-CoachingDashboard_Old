/**
 * @file    group.js
 * @brief   Controller for group pages.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('TestController', ['$scope', 'Rover', 'assetVersion', 'isLocalEnvironment',
    function($scope, Rover, assetVersion, isLocalEnvironment) {

        Rover.debug('TestController');


    }
]);
