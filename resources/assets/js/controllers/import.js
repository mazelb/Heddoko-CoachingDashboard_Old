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
        $scope.isImporting = false;

        // Uploaded movement data.
        $scope.global.data.importedMovements = $scope.global.data.importedMovements || [];

        /**
         * Imports movement data.
         *
         * @param array files
         */
        $scope.import = function(files) {

            // Performance check.
            if (!files) {
                return;
            }

            // Turn on "uploading" flag.
            $scope.isImporting = true;
            $scope.pendingMovements = files;
            Utilities.debug('Uploading movement data...');

            // Upload data files one by one. This ensures compatibility with IE8/9
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: '/api/v1/movements',
                    data: {
                        file: file,
                        profile_id: $scope.global.getSelectedProfile().id
                    }
                }).then(
                    function (response) {

                        // On success, add the new movement to the top of the list.
                        $scope.global.data.importedMovements.unshift(response.data);
                        $scope.isImporting = false;
                    },
                    function (response) {
                        $scope.isImporting = false;
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
