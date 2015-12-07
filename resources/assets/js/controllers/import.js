/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for movement data import.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('ImportController', ['$scope', '$timeout', 'Upload', 'Rover', 'Utilities',
    function($scope, $timeout, Upload, Rover, Utilities) {
        Utilities.debug('ImportController');

        // Uploading movement flag.
        $scope.isUploading = false;

        // Uploaded movement data.
        $scope.uploadedMovements = [];

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
            Utilities.debug('Uploading movement data...');

            // Upload data files one by one. This ensures compatibility with IE8/9
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: '/api/profile/' + $scope.global.getSelectedProfile().id +'/movement',
                    data: {file: file}
                }).then(
                    function (response) {

                        // On success, add the new movement to the top of the list.
                        $scope.uploadedMovements.unshift(response.data);
                        $scope.isUploading = false;
                    },
                    function (response) {
                        $scope.isUploading = false;
                        Utilities.alert('Could not import movement data. Please try again later.');
                        Utilities.debug(response.status + ': ' + response.data);
                    },
                    function (event) {
                        file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
                        Utilities.debug('Progress for "' + file.name +'": ' + file.progress + '%');
                    }
                );
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
