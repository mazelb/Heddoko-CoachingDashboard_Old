/**
 * @brief   Controller for movement data import.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('ImportController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        $scope.params = $routeParams;

    }
]);
