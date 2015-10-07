/**
 * @file    team.js
 * @brief   Team controller.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('GroupController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        $scope.params = $routeParams;

        // ...
        $scope.$watch('params.groupId', function(newId, oldId)
        {
            // Performance check.
            if (newId === 0 || newId === $scope.data.team.selected.id || $scope.data.team.list.length < 1) {
                return;
            }

            // Find the group to be updated.
            var current, selected;
            for (var i = 0; i < $scope.data.team.list.length; i++)
            {
                current = $scope.data.team.list[i];

                if (current.id == newId) {
                    selected = current;
                    break;
                }
            }

            if (selected) {
                Rover.log('Selecting group #' + newId + '...');
                $scope.data.team.selected = selected;
            }

            else {
                Rover.error('Group #' + newId + ' not found.');
            }
        }, true);
    }
]);
