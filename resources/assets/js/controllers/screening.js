/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for movement screenings.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('ScreeningController', ['$scope', '$routeParams', 'ScreeningService', 'Rover', 'Utilities',
    function($scope, $routeParams, ScreeningService, Rover, Utilities) {
        Utilities.debug('ScreeningController');

        // Initial setup.
        $scope.global.state.screening = $scope.global.state.screening || {};
        $scope.global.state.screening.list = $scope.global.state.screening.list || {length: 0};
        $scope.global.state.screening.current = $scope.global.state.screening.current || {id: 0};
        $scope.global.data.isFetchingScreeningData = false;
        $scope.global.data.isPreparingNewScreening = false;

        // Shortcut to global objects.
        $scope.screening = $scope.global.state.screening.current;
        if ($scope.screening.id > 0 && $scope.screening.profileId) {
            $scope.screeningProfile =
                $scope.global.state.profile.list[$scope.screening.profileId] || {id: 0};
        } else {
            $scope.screeningProfile = {id: 0};
        }

        /**
         * Shortcut to create a standard FMS.
         */
        $scope.createFunctionalMovementScreening = function() {
            Utilities.debug('Creating standard FMS...');

            $scope.global.data.isPreparingNewScreening = true;

            ScreeningService.create($scope.global.getSelectedProfile().id,
            {
                title: 'Functional Movement Screening',
                scoreMax: 3,
                movements: [
                    {title: 'Deep Squat'},
                    {title: 'Hurdle Step - Left'},
                    {title: 'Hurdle Step - Right'},
                    {title: 'Inline Lunge - Left'},
                    {title: 'Inline Lunge - Right'},
                    {title: 'Shoulder Mobility - Left'},
                    {title: 'Shoulder Mobility - Right'},
                    {title: 'Impingment Test - Left', meta: {
                        params: {
                            isClearanceTest: true
                        }
                    }},
                    {title: 'Impingment Test - Right', meta: {
                        params: {
                            isClearanceTest: true
                        }
                    }},
                    {title: 'Active Straight-Leg Raise - Left'},
                    {title: 'Active Straight-Leg Raise - Right'},
                    {title: 'Trunk Stability Push-Up'},
                    {title: 'Spinal Extension', meta: {
                        params: {
                            isClearanceTest: true
                        }
                    }},
                    {title: 'Rotary Stability - Left'},
                    {title: 'Rotary Stability - Right'},
                    {title: 'Posterior Rocking', meta: {
                        params: {
                            isClearanceTest: true
                        }
                    }},
                ]
            }).then(
                function(response) {
                    Utilities.debug('Screening created.');

                    // Save screening data.
                    $scope.global.state.screening.current = response.data;
                    $scope.global.data.isPreparingNewScreening = false;
                },
                function(response) {
                    $scope.global.data.isPreparingNewScreening = false;
                    Utilities.alert('Could not create screening. Please try again later.');
                }
            );
        };

        /**
         * Retrieves screening data for the selected profile.
         */
        $scope.fetchScreeningData = function() {
            Utilities.debug('Retrieving screening data...');

            $scope.global.data.isFetchingScreeningData = true;

            ScreeningService.search({
                query: '',
                profileId: null,
                offset: 0,
                limit: 20,
                orderBy: 'createdAt',
                orderDir: 'desc'
            }).then(
                function(response) {
                    Utilities.debug('Received ' + response.data.results.length + ' results.');

                    // Save movement data.
                    $scope.global.state.screening.list = response.data.results;

                    $scope.global.data.isFetchingScreeningData = false;
                },
                function(response) {
                    Utilities.debug('Could not retrieve screening data. Please try again later.');
                    $scope.global.data.isFetchingScreeningData = false;
                }
            );
        };

        // If a screening ID was provided, try to fetch its contents.
        if ($routeParams.screeningId)
        {

        }

        // Retrieve recent screenings.
        if ($scope.global.state.screening.list.length === 0) {
            $scope.fetchScreeningData();
        }

        // Watch current screening object.
        $scope.$watch('global.state.screening.current', function(newScreening) {

            // Update current screening.
            $scope.screening = newScreening.id > 0 ? newScreening : {id: 0};

            // Update screening profile.
            if (newScreening.id > 0 && newScreening.profileId) {
                $scope.screeningProfile =
                    $scope.global.state.profile.list[newScreening.profileId] || {id: 0};
            }
        });
    }
]);
