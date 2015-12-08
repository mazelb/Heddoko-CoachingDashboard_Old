/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for main landing page.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.controllers')

.controller('DashboardController', ['$scope', 'Rover', 'Utilities',
    function($scope, Rover, Utilities) {
        Utilities.debug('DashboardController');

        // Greeting.
        var hour = new Date().getHours();
        $scope.greeting = 'Good Morning';
        if (hour > 11 && hour < 17) {
            $scope.greeting = 'Good Afternoon';
        } else if (hour >= 17) {
            $scope.greeting = 'Good Evening';
        }

        // Bookmarks.
        // TODO: dynamically load bookmarks.
        $scope.bookmarks = [
            {
                title: 'Upload a Movement',
                icon: 'cloud-upload'
            },
            {
                title: 'Record a Movement',
                icon: 'camera'
            },
            {
                title: 'Do a Movement Screening',
                icon: 'list-alt'
            },
            {
                title: 'Analyze a Movement',
                icon: 'line-chart'
            }
        ];
    }
]);
