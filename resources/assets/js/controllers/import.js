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

        // Setup import data.
        $scope.global.data.isImporting = $scope.global.data.isImporting || false;
        $scope.global.data.import = $scope.global.data.import || {};
        $scope.global.data.import.progress = $scope.global.data.import.progress || 0;
        $scope.global.data.import.imported = $scope.global.data.import.imported || [];
        $scope.global.data.import.queue = $scope.global.data.import.queue || [];
        $scope.global.data.import.queueTotal = $scope.global.data.import.queueTotal || 0;
        $scope.global.data.import.status = $scope.global.data.import.status || '';

        /**
         * Launches the "import chain" to import several movement files. We avoid using
         * HTML5-specific methods for backwards compatibility (e.g. IE8, IE9).
         *
         * @param array files
         */
        $scope.startImport = function(files) {

            // Performance check.
            if (!files) {
                return;
            }

            // Turn on "uploading" flag.
            $scope.global.data.isImporting = true;
            $scope.global.data.import.queue = files;
            Utilities.debug('Uploading ' + files.length + ' movement files...');

            // Start uploading files.
            $scope.global.data.import.queueTotal = files.length;
            $scope.global.data.import.progress = 0;
            $scope.chainImport();
        };

        /**
         * Uploads data files to the server.
         */
        $scope.chainImport = function() {

            // Performance check.
            if ($scope.global.data.import.queue.length < 1) {
                $scope.global.data.isImporting = false;
                return Utilities.debug('Uploading done.');
            }

            // Retrieve file to be uploaded.
            var file = $scope.global.data.import.queue[0];
            Utilities.debug('Uploading "' + file.name + '"...');
            $scope.global.data.import.status = 'Importing "' + file.name + '"...';

            Upload.upload({
                url: '/api/v1/movements',
                data: {
                    file: file,
                    profileId: $scope.global.getSelectedProfile().id
                }
            }).then(
                function (response) {

                    // Add the new movement to the top of the list.
                    $scope.global.data.import.imported.unshift(response.data);

                    // Update the import progress and continue uploading.
                    $scope.global.data.import.queue.splice(0, 1);
                    $scope.global.data.import.progress =
                        Math.round(
                            ($scope.global.data.import.queueTotal -
                                $scope.global.data.import.queue.length) * 100 /
                                $scope.global.data.import.queueTotal);
                    $scope.chainImport();
                },
                function (response) {
                    Utilities.debug(response.status + ': ' + response.data);
                    Utilities.alert('Could not import "' + file.name + '". Please try again later.');

                    // Update import progress.
                    $scope.global.data.import.queue.splice(0, 1);
                    $scope.global.data.import.progress =
                        Math.round(
                            ($scope.global.data.import.queueTotal -
                                $scope.global.data.import.queue.length) * 100 /
                                $scope.global.data.import.queueTotal);

                    // Continue with the import process.
                    $scope.chainImport();
                },
                function (event) {

                    // We use "event" to try and make the import progress more accurate.
                    $scope.global.data.import.progress =
                        Math.round(
                            ($scope.global.data.import.queueTotal -
                                $scope.global.data.import.queue.length +
                                Math.min(1, event.loaded / event.total)) * 100 /
                                $scope.global.data.import.queueTotal);
                }
            );
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
