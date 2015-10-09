/**
 * @file    member.js
 * @brief   Controller for the dashboard's member page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('DashboardMemberController', ['$scope', '$routeParams', 'Rover',
    function($scope, $routeParams, Rover) {

        // Update the selected team.

        $scope.params = $routeParams;

        // Watch the "memberId" parameter to updated the selected member.
        $scope.$watch('params.memberId', function(newId, oldId)
        {
            // Performance check.
            if (newId === 0 || newId === $scope.data.member.selected.id || $scope.data.member.list.length < 1) {
                return;
            }

            // Find the requested member.
            var current, selected;
            for (var i = 0; i < $scope.data.member.list.length; i++)
            {
                current = $scope.data.member.list[i];

                if (current.id == newId) {
                    selected = current;
                    break;
                }
            }

            if (selected) {
                Rover.debug('Selecting member #' + newId + '...');
                $scope.data.member.selected = selected;
            }

            else {
                Rover.error('Member #' + newId + ' not found.');
            }
        }, true);

    }
]);
