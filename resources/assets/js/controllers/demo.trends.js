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
                                {opacity: 0},
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
                    labelBoxBorderColor: 'transparent',
                    labelFormatter: function(label, series) {
                        return '<span style="color: #fff">' + label + '</span>';
                    }
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

        $scope.chartjsLine = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: 'Zero Position',
                    fillColor: "rgba(56, 61, 67, 0.5)",
                    strokeColor: "rgba(56, 61, 67, 0.5)",
                    pointColor: "#fff",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgba(56, 61, 67, 0.5)",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [50, 50, 50, 50, 50, 50]
                },
                {
                    label: 'Vertical Abduction',
                    fillColor: "rgba(56, 61, 67, 0.5)",
                    strokeColor: '#3bd6b2',
                    pointColor: "#fff",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgba(56, 61, 67, 0.5)",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Forward Abduction',
                    fillColor: "rgba(219, 80, 49, 0.8)",
                    strokeColor: '#fabd39',
                    pointColor: "#fff",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgba(219, 80, 49, 0.8)",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        $scope.chartjsOptions = {
            animation: false,
            datasetFill: false,
            pointDot: false,
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

        $scope.comboData = [{
            year: "2008",
            a: 20,
            b: 16,
            c: 12
        }, {
            year: "2009",
            a: 10,
            b: 22,
            c: 30
        }, {
            year: "2010",
            a: 5,
            b: 14,
            c: 20
        }, {
            year: "2011",
            a: 5,
            b: 12,
            c: 19
        }, {
            year: "2012",
            a: 20,
            b: 19,
            c: 13
        }, {
            year: "2013",
            a: 28,
            b: 22,
            c: 20
        }];
    }
]);
