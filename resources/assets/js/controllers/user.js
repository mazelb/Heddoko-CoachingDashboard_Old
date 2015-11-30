/**
 * @file    user.js
 * @brief   Controller for user page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('UserController', ['$scope', 'UserService', 'Rover', 'Utilities',
    function($scope, UserService, Rover, Utilities) {
        Utilities.debug('UserController');

        // POST endpoint for avatar uploads.
        $scope.uploadAvatarEndpoint = '/api/user/'+ Rover.userHash +'/avatar';

        // Callback for avatar uploads.
        $scope.uploadAvatarCallback = function(data) {

            // Update user data.
            $scope.user = Rover.state.userData = data;
        };

        // Retrieve user data.
        $scope.user = Rover.state.userData || {id: 0};
        if ($scope.user.id === 0)
        {
            Utilities.debug('Retrieving user details');

            UserService.get(Rover.userHash).then(

                // Update user data.
                function(response) {
                    $scope.user = Rover.state.userData = response.data;
                },

                function(response) {
                    Utilities.alert('Could not retrieve user details. Please try again later.');
                    $scope.user = Rover.state.userData = {id: 0};
                }
            );
        }
    }
]);
