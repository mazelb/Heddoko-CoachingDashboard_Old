/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for trends demo
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    January 2016
 */
angular.module('app.controllers')

.controller('DemoTrendsController', ['$scope', '$timeout', 'DemoTrendsService', 'Rover', 'Utilities',
    function($scope, $timeout, DemoTrendsService, Rover, Utilities) {
        Utilities.debug('DemoTrendsController');

        //
        $scope.flotData = [{
            data: [
                [2008, 20],
                [2009, 10],
                [2010, 5],
                [2011, 5],
                [2012, 20],
                [2013, 28]
            ]
        }, {
            data: [
                [2008, 16],
                [2009, 22],
                [2010, 14],
                [2011, 12],
                [2012, 19],
                [2013, 22]
            ]
        }, {
            data: [
                [2008, 12],
                [2009, 30],
                [2010, 20],
                [2011, 19],
                [2012, 13],
                [2013, 20]
            ]
        }];

        $scope.flotOptions = {
            grid: {
                hoverable: false,
                borderWidth: 1,
                borderColor: "#eeeeee"
            },
            legend: {
                show: false
            },
            series: {
                bars: {
                    show: true
                }
            },
            xaxis: {

            },
            yaxes: [
                {

                }, {
                    position: 'right',
                    min: 20
                }
            ],
            tooltip: !0,
            tooltipOpts: {
                defaultTheme: !1
            },
            colors: ["#383d43", "#db5031", "#fef9d9"]
        };
    }
]);
