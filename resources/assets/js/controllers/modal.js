/**
 * @file    modal.js
 * @brief   Controller for overlayed screens.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('ModalController', ['$scope', 'Rover',
    function($scope, Rover) {
        Rover.debug('ModalController');

        // Retrieve template data from the rover.
        $scope.$watch('Rover.overlayData', function(data, oldData) {
            $scope.title = data.title;
            $scope.bodyTemplate = data.bodyTemplate;
            $scope.footerTemplate = data.footerTemplate;
        });
    }
]);
