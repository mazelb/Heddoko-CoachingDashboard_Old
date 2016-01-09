/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for analysis.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    January 2016
 */
angular.module('app.controllers')

.controller('AnalysisController', ['$scope', 'Rover', 'Utilities',
    function($scope, Rover, Utilities) {
        Utilities.debug('AnalysisController');

        // Redirect to demo temporarily...
        Rover.browseTo.path('/movements/analyze/demo');
    }
]);
