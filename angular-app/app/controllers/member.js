/**
 * @file    team.js
 * @brief   Team controller.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('MemberController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        // Update the selected team.

        $scope.params = $routeParams;

        // Watch the "memberId" parameter to updated the selected member.
        $scope.$watch('params.memberId', function(newId, oldId)
        {
            // Performance check.
            if (newId === 0 || newId === $scope.data.athlete.selected.id || $scope.data.athlete.list.length < 1) {
                return;
            }

            // Find the requested member.
            var current, selected;
            for (var i = 0; i < $scope.data.athlete.list.length; i++)
            {
                current = $scope.data.athlete.list[i];

                if (current.id == newId) {
                    selected = current;
                    break;
                }
            }

            if (selected) {
                Rover.log('Selecting member #' + newId + '...');
                $scope.data.athlete.selected = selected;
            }

            else {
                Rover.error('Member #' + newId + ' not found.');
            }
        }, true);

    }
]);
