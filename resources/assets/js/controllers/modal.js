/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for overlayed screens.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('ModalController', ['$scope', 'Rover', 'Utilities',
    function($scope, Rover, Utilities) {
        Utilities.debug('ModalController');

        // Retrieve template data from the rover.
        $scope.$watch('Rover.overlayData', function(data, oldData) {

            // Performance check.
            if (!data) {
                return;
            }
            
            $scope.title = data.title;
            $scope.bodyTemplate = data.bodyTemplate;
            $scope.footerTemplate = data.footerTemplate;
        });
    }
]);
