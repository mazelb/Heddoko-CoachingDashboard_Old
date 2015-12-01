/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   Controller for movement data import.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('ImportController', ['$scope', 'Upload', 'Rover', 'Utilities',
    function($scope, Upload, Rover, Utilities) {
        Rover.debug('ImportController');

        // Uploading movement flag.
        $scope.isUploading = false;

        /**
         * Uploads a movement file.
         *
         * @param object file
         */
        $scope.import = function(data) {

            // Performance check.
            Rover.debug(data);
            Rover.debug($scope.movementData);
            if (!data) {
                return;
            }

            // Upload data file.
            $scope.isUploading = true;
            Rover.debug('Uploading movement data...');

        };

        // Opens the thumbnail overlay.
        $scope.selectThumbnail = function() {
            Rover.openThumbnailSelector();
        };

        // Opens the movement editor overlay.
        $scope.editMovement = function() {
            Rover.openMovementEditor();
        };

        // Deletes a movement.
        $scope.deleteMovement = function(id) {
            Rover.debug('Deleting movement #' + id);

            // TODO

            Utilities.alert('In Development.');
        };

        // Sample uploads.
        $scope.uploadedMovements = [
            {
                id: 1,
                title: 'Trial 001',
                tags: [
                    {
                        id: 2411,
                        title: 'Inline Lunge'
                    },
                    {
                        id: 2421,
                        title: 'Left Side'
                    }
                ]
            },
            {
                id: 2,
                title: '',
                tags: []
            },
            {
                id: 3,
                title: '',
                tags: []
            },
        ];
    }
]);
