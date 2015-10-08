/**
 * @file    group.js
 * @brief   Controller for the dashbord's group page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('DashboardGroupController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        $scope.params = $routeParams;

        // ...
        $scope.$watch('params.groupId', function(newId, oldId)
        {
            // Performance check.
            if (newId === 0 || newId === $scope.data.group.selected.id || $scope.data.group.list.length < 1) {
                return;
            }

            // Find the group to be updated.
            var current, selected;
            for (var i = 0; i < $scope.data.group.list.length; i++)
            {
                current = $scope.data.group.list[i];

                if (current.id == newId) {
                    selected = current;
                    break;
                }
            }

            if (selected) {
                Rover.log('Selecting group #' + newId + '...');
                $scope.data.group.selected = selected;
            }

            else {
                Rover.error('Group #' + newId + ' not found.');
            }
        }, true);
    }
]);
