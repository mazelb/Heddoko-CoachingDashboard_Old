/**
 * @file    member.js
 * @brief   Controller for the dashboard's member page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('DashboardMemberController', ['$scope', '$routeParams', 'Athletes', 'FMSForm', 'Rover',
    function($scope, $routeParams, Athletes, FMSForm, Rover) {

        $scope.params = $routeParams;

        $scope.deleteProfile = function()
        {
            // Show loading animation.
            Rover.debug('Deleting profile...');
            Rover.addBackgroundProcess();

            Athletes.destroy($scope.data.group.selected.id, $scope.data.profile.selected.id).then(

                // On success.
                function(response) {

                    if (response.status === 200) {
                        Rover.browseTo.group(Rover.state.group.selected);
                    }

                    Rover.doneBackgroundProcess();
                },

                // On error.
                function(response) {
                    Rover.doneBackgroundProcess();
                }
            );
        };

        // Port of old code.
        $scope.fmsForms = {};

        $scope.loadFMSForms = function()
        {
            FMSForm.get(Rover.state.member.selected.id).then(

                // On success.
                function(response) {

                    if (response.status === 200) {
                        $scope.fmsForms = response.data;
                    }

                    else {
                        $scope.fmsForms = {};
                    }

                },

                // On failure.
                function(response) {

                }
            );
        };

        $scope.$watch('data.member.selected', function(oldMember, newMember)
        {


            // Load the FMS forms.
            Rover.debug('Loading FMS forms...');
            $scope.loadFMSForms();
        });

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
