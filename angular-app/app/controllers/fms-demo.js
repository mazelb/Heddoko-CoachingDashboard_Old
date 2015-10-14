/**
 * @file    fms.js
 * @brief   Controller for demo FMS tests. Kept separate so that the actual FMS tests can be
 *          developed independently.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('FMSDemoController', ['$scope', '$routeParams', 'FMSDemoFactory', 'Rover', 'assetVersion',
    function($scope, $routeParams, FMSDemoFactory, Rover, assetVersion) {

        Rover.debug('DemoFMSController');

        $scope.params = $routeParams;
        if (!$scope.params.step) {
            $scope.params.step = 'test';
        }

        $scope.assetVersion = assetVersion;

        $scope.fms = FMSDemoFactory.data;

        // Starts demo test.
        $scope.startTest = function()
        {
            FMSDemoFactory.data.current.isTestLive = true;

            $('.demo-test').each(function() {
                this.currentTime = 0;
                this.play();
            });
        };

        $scope.endTest = function()
        {
            FMSDemoFactory.data.current.isTestLive = false;

            $('.demo-test').each(function() {
                this.pause();
            });
        };

    }
]);
