/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for trends demo
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    January 2016
 */
angular.module('app.controllers')

.controller('DemoTrendsController', ['$scope', 'DemoTrendsService', 'Rover', 'Utilities',
    function($scope, DemoTrendsService, Rover, Utilities) {
        Utilities.debug('DemoTrendsController');

        $scope.data = {
            gauge: []
        };

        /**
         *
         */
        $scope.step = function() {

        };

        //
        // Trendline.
        //
        $scope.trend =
        {
            data: DemoTrendsService.trend.dummyData,
            options: {
                series: {
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 2,
                        fillColor: {
                            colors: [
                                {opacity: 0.1},
                                {opacity: 0}
                            ]
                        }
                    },
                    points: {
                        show: false
                    },
                    shadowSize: 5
                },
                colors: ["#3bd6b2", "#db5031"],
                tooltip: !0,
                tooltipOpts: {
                    defaultTheme: !1
                },
                grid: {
                    hoverable: true,
                    clickable: false,
                    margin: 5,
                    tickColor: "#383d43",
                    borderWidth: 1,
                    borderColor: "#383d43"
                },
                legend: {
                    show: true,
                    backgroundColor: '#ddd',
                    backgroundOpacity: 0.3,
                    labelBoxBorderColor: 'transparent'
                }
            }
        };

        //
        // Gauge.
        //
        $scope.gauge =
        {
            // data: DemoTrendsService.gauge.dummyData,
            data: {
                maxValue: 1000,
                animationSpeed: 20,
                val: 400
            },
            options: {
                lines: 12,
                angle: 0,
                lineWidth: 0.3,
                pointer: {
                    length: 0.6,
                    strokeWidth: 0.03,
                    color: "#555555"
                },
                limitMax: "false",
                colorStart: "#3bd6b2",
                colorStop: "#3bd6b2",
                strokeColor: "#383d43",
                generateGradient: true,
                percentColors: [
                    [0, "#3bd6b2"],
                    [1, "#383d43"]
                ]
            }
        };
    }
]);
