/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for movement screenings.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('LiveScreeningController', ['$scope', 'ScreeningService', 'MovementService', 'Rover', 'Utilities',
    function($scope, ScreeningService, MovementService, Rover, Utilities) {
        Utilities.info('LiveScreeningController');

        // Setup controller.
        Utilities.data.isFetchingLiveScreening = true;

        /**
         * Retrieves screening data.
         */
        $scope.fetchScreening = function() {
            Utilities.time('Retrieving Live Screening Data');

            // Turn on "fetching live screening" flag.
            Utilities.data.isFetchingLiveScreening = true;

            ScreeningService.get(Utilities.store.liveScreeningId, 'movements').then(
                function(response) {
                    Utilities.timeEnd('Retrieving Live Screening Data');

                    // Store screening data.
                    $scope.screening = Utilities.data.liveScreening = response.data;

                    // Retrieve screening profile.
                    $scope.profile = Utilities.getData('profile', response.data.profileId);

                    // Turn off flag.
                    Utilities.data.isFetchingLiveScreening = false;
                },
                function(response) {
                    Utilities.timeEnd('Retrieving Live Screening Data');

                    // Reset screening data and turn off flag.
                    $scope.resetScreening();

                    // Alert user of error.
                    Utilities.alert('Could not retrieve screening. Please try again later.');
                }
            );
        };

        /**
         * Resets screening data.
         */
        $scope.resetScreening = function() {
            Utilities.store.liveScreeningId = 0;
            $scope.screening = Utilities.data.liveScreening = {id: 0};
            $scope.profile = null;
            Utilities.data.isFetchingLiveScreening = false;
        };

        /**
         * Creates a standard FMS.
         */
        $scope.createFunctionalMovementScreening = function() {
            Utilities.time('Creating Standard FMS');

            Utilities.data.isPreparingNewScreening = true;

            ScreeningService.create($scope.global.getSelectedProfile().id,
            {
                title: '',
                scoreMin: 0,
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
                        data: {
                            isClearanceTest: true
                        }
                    }},
                    {title: 'Impingment Test - Right', meta: {
                        data: {
                            isClearanceTest: true
                        }
                    }},
                    {title: 'Active Straight-Leg Raise - Left'},
                    {title: 'Active Straight-Leg Raise - Right'},
                    {title: 'Trunk Stability Push-Up'},
                    {title: 'Spinal Extension', meta: {
                        data: {
                            isClearanceTest: true
                        }
                    }},
                    {title: 'Rotary Stability - Left'},
                    {title: 'Rotary Stability - Right'},
                    {title: 'Posterior Rocking', meta: {
                        data: {
                            isClearanceTest: true
                        }
                    }},
                ]
            }, ['movements']).then(
                function(response) {
                    Utilities.timeEnd('Creating Standard FMS');

                    // Save screening data.
                    Utilities.store.liveScreeningId = response.data.id;
                    $scope.screening = Utilities.data.liveScreening = response.data;
                    $scope.profile = Utilities.getData('profile', response.data.profileId);

                    // Turn off flag.
                    Utilities.data.isPreparingNewScreening = false;
                },
                function(response) {
                    Utilities.timeEnd('Creating Standard FMS');
                    Utilities.data.isPreparingNewScreening = false;
                    Utilities.alert('Could not create screening. Please try again later.');
                }
            );
        };

        /**
         * Saves the details of the screening through the uiEditableStandaloneField directive.
         *
         * @return $http
         */
        $scope.saveScreening = function() {
            return ScreeningService.update(this.id, this, ['movements']);
        };

        /**
         * Callback uiEditableStandaloneField directive.
         *
         * @param bool screeningSaved
         */
        $scope.saveScreeningCallback = function(screeningSaved) {
            if (screeningSaved)
            {
                // Add profile data to screening.
                if (Utilities.hasData('profile', this.profileId))
                {
                    this.profile = {
                        firstName: Utilities.getData('profile', this.profileId).firstName || '',
                        lastName: Utilities.getData('profile', this.profileId).lastName || ''
                    };
                }

                // Update screening in storage.
                Utilities.setData('screening', this.id, this);
            }
        };

        /**
         * Saves the details of the screening movement through the
         * uiEditableStandaloneField directive.
         *
         * @return $http
         */
        $scope.saveScreeningMovement = function() {
            return MovementService.update(this.id, this);
        };

        /**
         * Callback uiEditableStandaloneField directive.
         *
         * @param bool screeningSaved
         */
        $scope.saveScreeningMovementCallback = function(movementSaved) {
            // ...
        };

        // Retrieve current screening.
        if (Utilities.store.liveScreeningId > 0)
        {
            // From the API, if it hasn't already been loaded.
            if (!Utilities.data.liveScreening) {
                Rover.waitForFlag('isFetchingProfiles', false, $scope, $scope.fetchScreening);
            }

            // Or from the ephemeral storage.
            else {
                $scope.screening = Utilities.data.liveScreening;
                $scope.profile = Utilities.data.liveScreening.id > 0 ?
                    Utilities.getData('profile', Utilities.data.liveScreening.profileId) : null;
            }
        }

        else {
            $scope.resetScreening();
        }
    }
]);
