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

        // Chart options.
        $scope.chartjsOptions = {
            animation: false,
            datasetFill: false,
            pointDot: false,
            scaleBeginAtZero: false,
            scaleFontColor: '#383d43',
            scaleFontFamily: '"Proxima Nova", sans-serif',
            scaleGridLineColor: '#383d43',
            scaleLineColor: '#383d43',
            showTooltips: false,
            legendTemplate: '<ul class="<%= name.toLowerCase() %>-legend">' +
                                '<% for (var i = 0; i < datasets.length; i++){%>' +
                                    '<li>' +
                                        '<span style="background-color:<%= datasets[i].strokeColor %>">' +
                                        '</span>' +

                                        '<% if (datasets[i].label) { %>' +
                                            '<%= datasets[i].label %>' +
                                        '<% } %>' +
                                    '</li>' +
                                '<% } %>' +
                            '</ul>'
        };

        // Chart data.
        $scope.chartjsData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Zero Position',
                    strokeColor: '#bbb',
                    data: [0, 0, 0, 0, 0, 0, 0]
                },
                {
                    label: 'Vertical Abduction',
                    strokeColor: '#3bd6b2',
                    strokeFillColor: '#3bd6b2',
                    data: [5, 7, -12, -34, -3, 2, 4]
                },
                {
                    label: 'Horizontal Abduction',
                    strokeColor: '#fabd39',
                    strokeFillColor: '#fabd39',
                    data: [2, -0.5, 14, 29, 9, 0, 2]
                }
            ]
        };

        /**
         *
         */
        $scope.chartjsWidth = function() {
            return $('#chartRow').width() - 30;
        };

        /**
         *
         */
        $scope.step = function() {

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
