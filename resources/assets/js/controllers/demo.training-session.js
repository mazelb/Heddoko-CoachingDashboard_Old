/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for trends demo
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    January 2016
 */
angular.module('app.controllers')

.controller('DemoTrainingSessionController', ['$scope', '$timeout', 'DemoTrendsService', 'Rover', 'Utilities',
    function($scope, $timeout, DemoTrendsService, Rover, Utilities) {
        Utilities.debug('DemoTrainingSessionController');

        $scope.currentSession = 0;
        $scope.currentSessionTitle = '';
        $scope.isFetchingSessionData = false;
        $scope.colours = [Utilities.colour.heddokoGreen, '#79d9d8', '#6eb4d2'];
        $scope.fakeData = {};

        //
        // Demo data (chartJs).
        //

        $scope.chartjsCustomTooltip = function(tooltip) {

            // tooltip will be false if tooltip is not visible or should be hidden
            if (!tooltip) {
                return;
            }

            Utilities.debug(tooltip);

            // Otherwise, tooltip will be an object with all tooltip properties like:

            // tooltip.caretHeight
            // tooltip.caretPadding
            // tooltip.chart
            // tooltip.cornerRadius
            // tooltip.fillColor
            // tooltip.font...
            // tooltip.text
            // tooltip.x
            // tooltip.y
            // etc...

            return tooltip.title;

        };

        $scope.chartjsOptions = {
            animation: true,
            datasetFill: false,
            pointDot: false,
            scaleBeginAtZero: false,
            scaleFontColor: '#888',
            scaleFontFamily: '"Proxima Nova", sans-serif',
            scaleGridLineColor: Utilities.colour.blue,
            scaleLabel: "<%=value%> °/s",
            scaleLineColor: Utilities.colour.blue,
            showTooltips: true,
            tooltipFillColor: $scope.colours[1],
            tooltipFontColor: Utilities.colour.blue,
            tooltipFontFamily: '"Proxima Nova", sans-serif',
            tooltipTitleFontFamily: '"Proxima Nova", sans-serif',
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            customTooltips: $scope.chartjsCustomTooltip,
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

        $scope.chartjsData = {
            labels: ['0', '20 Throws', '40 Throws', '60 Throws', '80 Throws', '100 Throws', '120 Throws', '140 Throws', '160 Throws'],
            datasets: [
                {
                    datasetFill: true,
                    fillColor: 'rgba(187, 187, 187, 0.1)',
                    label: 'Threshold',
                    strokeColor: 'rgba(187, 187, 187, 0.1)',
                    data: [2100, 2100, 2100, 2100, 2100, 2100, 2100, 2100, 2100]
                },
                {
                    label: 'Angular Velocity',
                    strokeColor: $scope.colours[2],
                    strokeFillColor: $scope.colours[2],
                    data: [2550, 2600, 2750, 2810, 2740, 2530, 2100, 1988, 1902]
                }
            ]
        };

        $scope.chartjsWidth = function() {
            return $('#chartRow').width() - 30;
        };

        //
        // Selectize input.
        //

        $scope.selectizeConfig = {
            create: false,
            valueField: 'id',
            labelField: 'title',
            searchField: ['title'],
            maxOptions: 15,
            maxItems: 1,

            /**
             * Called anytime the value of the input changes.
             *
             * @param array data
             */
            onChange: function(id) {
                angular.forEach($scope.selectizeOptions, function(option) {
                    if (option.id === id) {
                        $scope.currentSessionTitle = option.title;
                    }
                });
            }
        };

        $scope.selectizeOptions = [
            {id: 5, title: 'February 3, 2016'},
            {id: 4, title: 'February 2, 2016'},
            {id: 3, title: 'February 1, 2016'},
            {id: 2, title: 'January 29, 2016'},
            {id: 1, title: 'January 28, 2016'}
        ];

        //
        // Gauge chart.
        //

        $scope.fakeData.gauge =
        {
            data: {
                maxValue: 1000,
                animationSpeed: 20,
                val: 820
            },
            options: {
                lines: 12,
                angle: 0,
                lineWidth: 0.3,
                pointer: {
                    length: 0.6,
                    strokeWidth: 0.03,
                    color: Utilities.colour.silver
                },
                limitMax: "false",
                colorStart: Utilities.colour.blue,
                colorStop: Utilities.colour.blue,
                strokeColor: Utilities.colour.heddokoGreen,
                generateGradient: !0,
                percentColors: [
                    [0, Utilities.colour.heddokoGreen],
                    [1, "#c1bfc0"]
                ]
            }
        };

        //
        // Fake: Morris Charts.
        //

        $scope.fakeData.morris = [
            {
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
            }
        ];

        $scope.fakeData.morrisColours = '["'+ $scope.colours[0] +'","'+ $scope.colours[1] +'","'+
            $scope.colours[2] +'"]';
    }
]);
