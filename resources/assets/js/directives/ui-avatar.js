/**
 * @file    ui-avatar.js
 * @brief   Angular directive for editable avatars.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 * @note    Use as:
 *              <div ui-editable-list-container>
 *                  <div ui-editable-list-item label="Some Label" value="data.some.value">
 *                  </div>
 *              </div>
 */
angular.module('app.directives')

.directive('uiAvatar', ['assetVersion',
    function(assetVersion) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/directive-partials/ui-avatar.html?' + assetVersion,
            scope: {
                avatarSrc: '=src',
                uploadEndpoint: '='
            },
            controller: ['$scope', 'Upload', 'Rover', function($scope, Upload, Rover) {

                // Uploading flag.
                $scope.isUploading = false;

                // Uploads a photo.
                $scope.upload = function(image) {

                    // Performance check.
                    if (!image) {
                        return;
                    }

                    // Upload image.
                    $scope.isUploading = true;
                    Rover.debug('Uploading avatar...');
                    Upload.upload({
                        url: $scope.uploadEndpoint,
                        data: {'image': image}
                    }).then(

                        // Update image on success.
                        function(response) {

                            $scope.avatarSrc =
                                'data:' + response.data.avatar.mime_type +
                                ';base64,' + response.data.avatar.data_uri;
                            $scope.isUploading = false;
                        },

                        // Notify user on failure.
                        function(response) {

                            Rover.alert('Could not upload avatar. Please try again later.');
                            $scope.isUploading = false;
                        }
                    );
                };
            }]
        };
    }
]);
