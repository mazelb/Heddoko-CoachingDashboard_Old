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

.controller('ImportController', ['$scope', '$timeout', 'Upload', 'Rover', 'Utilities',
    function($scope, $timeout, Upload, Rover, Utilities) {
        Rover.debug('ImportController');

        // Uploading movement flag.
        $scope.isUploading = false;

        // Uploaded movement data.
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

        // Movement upload endpoint.
        $scope.uploadEndpoint = '/api/profile/' + $scope.global.getSelectedProfile().id +'/movement';

        /**
         * Uploads movement data.
         *
         * @param array files
         */
        $scope.import = function(files) {

            // Performance check.
            if (!files) {
                return;
            }

            // Turn on "uploading" flag.
            $scope.isUploading = true;
            $scope.pendingMovements = files;
            Rover.debug('Uploading movement data...');
            Rover.debug(files);

            // Upload data files one by one.
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: $scope.uploadEndpoint,
                    data: {file: file}
                }).then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });

                    $scope.isUploading = false;
                },
                function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;

                    $scope.isUploading = false;
                },
                function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                                             evt.loaded / evt.total));
                    Rover.debug(file.name +': ' + file.progress);
                });
            });
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
    }
]);
