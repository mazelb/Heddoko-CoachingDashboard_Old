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
        // Flot chart setup.
        //

        $scope.dataMax = 2800;
        $scope.dataPointsPerWeek = 80;
        $scope.dataMedian = [1400, 1680, 1960, 2240, 2600];
        $scope.dataLastPoint = $scope.dataPointsPerWeek * $scope.dataMedian.length +
            $scope.dataMedian.length;

        $scope.flotData = [

            // 100% shadow
            {
                bars: {show: false},
                data: [[0, 3000], [$scope.dataLastPoint, 3000]],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            // 80% shadow
            {
                bars: {show: false},
                data: [[0, 2500], [$scope.dataLastPoint, 2500]],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            // 60% shadow
            {
                bars: {show: false},
                data: [[0, 2000], [$scope.dataLastPoint, 2000]],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            // 40% shadow
            {
                bars: {show: false},
                data: [[0, 1500], [$scope.dataLastPoint, 1500]],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            {data: [], yaxis: 1},   // Week 3
            {data: [], yaxis: 1},   // Week 4
            {data: [], yaxis: 1},   // Week 5
            {data: [], yaxis: 1},   // Week 6
            {data: [], yaxis: 1},   // Week 7

            // Ideal return to play line
            {
                bars: {show: false},
                data: [],
                lines: {
                    color: Utilities.colour.silver,
                    colors: [Utilities.colour.silver],
                    fill: false,
                    lineWidth: 2,
                    show: true
                },
                points: {
                    fill: true,
                    fillColor: Utilities.colour.silver,
                    radius: 5,
                    show: true
                },
                yaxis: 1
            }
        ];

        // Indicates index of first dataset in $scope.flotData
        $scope.flotDataStartIndex = 4;

        $scope.flotOptions = {
            grid: {
                hoverable: true,
                borderWidth: 1,
                borderColor: Utilities.colour.blue
            },
            legend: {
                show: false
            },
            series: {
                bars: {
                    barWidth: 0.1,
                    fill: 1,
                    show: true
                },
                hoverable: true
            },
            xaxis: {
                ticks: []
            },
            yaxes: [
                {
                    color: Utilities.colour.blue,
                    min: 1000,
                    max: 3000,
                    position: 'left'
                }, {
                    color: Utilities.colour.blue,
                    position: 'right',
                    min: 20,
                    max: 100
                }
            ],
            tooltip: !0,
            tooltipOpts: {
                defaultTheme: !1
            },
            colors: [Utilities.colour.heddokoGreen, '#79d9d8', '#6eb4d2']
        };

        //
        // Flot chart data.
        //

        /**
         * Generates a random data point, within the specified range.
         *
         * @param int min
         * @param int max
         * @return int
         */
        $scope.generateDataPoint = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        var i, j, midPoint, min, max, x, y;
        for (i = 0; i < $scope.dataMedian.length; i++)
        {
            midPoint = $scope.dataPointsPerWeek/2 + $scope.dataPointsPerWeek * i + i;

            // Add ticks on x-axis.
            $scope.flotOptions.xaxis.ticks.push([midPoint, 'Week ' + (i + 3)]);

            // Generate ideal return-to-play line.
            $scope.flotData[$scope.flotDataStartIndex + $scope.dataMedian.length].data.push([
                midPoint,
                $scope.dataMedian[i] + 80 + 40 * i
            ]);

            // Add data points.
            for (j = 0; j < $scope.dataPointsPerWeek; j++)
            {
                // Data point offset on x-axis.
                x = i + j + $scope.dataPointsPerWeek * i;

                // Data point value.
                min = $scope.dataMedian[i] - 100 + j * 1.5;
                max = $scope.dataMedian[i] + 60 + j * 1.5;
                y = $scope.generateDataPoint(min, max);

                //
                $scope.flotData[$scope.flotDataStartIndex + i].data.push([x, y]);
            }
        }
    }
]);
