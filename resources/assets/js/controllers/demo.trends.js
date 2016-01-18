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

        $scope.profile = $scope.global.getSelectedProfile();

        $scope.thresholdValue = 2800;
        $scope.thresholdIncrement = 20;

        /**
         * Increases "return to play" threshold.
         */
        $scope.increaseThreshold = function() {
            $scope.thresholdValue =
                $scope.thresholdValue >= ($scope.flotOptions.yaxes[0].max - $scope.thresholdIncrement) ?
                    $scope.flotOptions.yaxes[0].max :
                    $scope.thresholdValue + $scope.thresholdIncrement;
        };

        /**
         * Decreases "return to play" threshold.
         */
        $scope.decreaseThreshold = function() {
            $scope.thresholdValue =
                $scope.thresholdValue <= ($scope.flotOptions.yaxes[0].min + $scope.thresholdIncrement) ?
                    $scope.flotOptions.yaxes[0].min :
                    $scope.thresholdValue - $scope.thresholdIncrement;
        };

        //
        // Easypie data.
        //
        $scope.easypie = {
            percent: Math.round($scope.thresholdValue * 100 / 3000),
            options: {
                animate: {
                    duration: 1e2,
                    enabled: !0
                },
                barColor: function(percent) {
                    if (percent < 80) {
                        return '#db5031';
                    } else if (percent < 85) {
                        return '#fabd39';
                    } else if (percent < 90) {
                        return '#6eb4d2';
                    } else if (percent < 95) {
                        return '#79d9d8';
                    }

                    return '#3bd6b2';
                },
                lineCap: 'round',
                lineWidth: 4,
                scaleColor: false,
                size: 130,
                trackColor: false
            }
        };

        // Threshold watcher.
        $scope.$watch('thresholdValue', function(newThreshold, oldThreshold) {

            // Performance check.
            if (newThreshold == oldThreshold) {
                return;
            }

            // Update easypie chart.
            $scope.easypie.percent = Math.min(100, Math.round(2750 * 100 / $scope.thresholdValue));
        });

        //
        // Flot chart options.
        //

        $scope.flotOptions = {
            grid: {
                clickable: true,
                hoverable: true,
                borderWidth: 1,
                borderColor: Utilities.colour.blue
            },
            legend: {
                show: false
            },
            series: {
                bars: {
                    barWidth: 0.5,
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
                    min: 500,
                    max: 3500,
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
            colors: [
                '#fff', '#fff', '#fff', '#fff', '#fff', // % marks
                Utilities.colour.heddokoGreen,  // Week 1
                '#79d9d8',                      // Week 2
                '#6eb4d2',                      // Week 3
                Utilities.colour.heddokoGreen,  // Week 4
                '#79d9d8',                      // Week 5
                '#6eb4d2',                      // Week 6
                Utilities.colour.heddokoGreen,  // Week 7
                '#fff',                         // Median line
                Utilities.colour.heddokoGreen,  // Return to play
            ]
        };

        //
        // Flot chart setup.
        //

        $scope.flotData = [

            // 100% mark
            {
                bars: {show: false},
                data: [],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            // 80% mark
            {
                bars: {show: false},
                data: [],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            // 60% mark
            {
                bars: {show: false},
                data: [],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            // 40% mark
            {
                bars: {show: false},
                data: [],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            // 20% mark
            {
                bars: {show: false},
                data: [],
                lines: {
                    fill: true,
                    fillColor: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 0,
                    show: true
                },
                yaxis: 1
            },

            {data: [], highlightColor: '#fff', yaxis: 1},   // Week 1
            {data: [], highlightColor: '#fff', yaxis: 1},   // Week 2
            {data: [], highlightColor: '#fff', yaxis: 1},   // Week 3
            {data: [], highlightColor: '#fff', yaxis: 1},   // Week 4
            {data: [], highlightColor: '#fff', yaxis: 1},   // Week 5
            {data: [], highlightColor: '#fff', yaxis: 1},   // Week 6
            {data: [], highlightColor: '#fff', yaxis: 1},   // Week 7

            // Median line.
            {
                bars: {show: false},
                data: [],
                lines: {
                    color: '#fff',
                    fill: false,
                    lineWidth: 2,
                    show: true
                },
                points: {
                    fill: true,
                    fillColor: '#fff',
                    radius: 5,
                    show: true
                },
                yaxis: 1
            },

            // Return to play.
            {
                bars: {show: false},
                clickable: true,
                data: [],
                label: 'Return to play',
                lines: {
                    fill: false,
                    lineWidth: 2,
                    show: true
                },
                isThresholdSeries: true,
                yaxis: 1
            }
        ];

        //
        // Flot chart data generation.
        //

        $scope.dataMax = 2800;
        $scope.dataPointsInitialDensity = 5;
        $scope.dataMedians = [1250, 1320, 1400, 1590, 1960, 2240, 2750];

        // Indicates index of first dataset in $scope.flotData
        $scope.flotDataStartIndex = 5;

        /**
         * Generates a random data point, within the specified range.
         *
         * @param int min
         * @param int max
         * @return int
         */
        $scope.randomDataPoint = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        //
        var i, j, density, midPoint, label, min, max, x = 0, y;
        for (i = 0; i < $scope.dataMedians.length; i++)
        {
            x++;

            // Set density and midpoint for given week.
            density = $scope.dataPointsInitialDensity + Math.floor(Math.pow((i * $scope.dataPointsInitialDensity), 1.1));
            midPoint = Math.floor(density/2) + x;

            Utilities.debug('Week: ' + (i + 1));
            Utilities.debug('Density: ' + density);
            Utilities.debug('Midpoint: ' + midPoint);

            // Add ticks on x-axis.
            label = i > 1 ? 'Week ' + (i + 1) : (i + 1);
            $scope.flotOptions.xaxis.ticks.push([midPoint, label]);

            // Generate ideal return-to-play line.
            $scope.flotData[$scope.flotDataStartIndex + $scope.dataMedians.length].data.push([
                midPoint,
                $scope.dataMedians[i]
            ]);

            // Add data points.
            for (j = 0; j < density; j++)
            {
                // Data point offset on x-axis.
                // x = 1 + i + j + $scope.dataPointsPerWeek * i;

                // Data point value.
                min = $scope.dataMedians[i] - 100 + j * 2;
                max = $scope.dataMedians[i] + 20 + j * 2;
                y = $scope.randomDataPoint(min, max);

                //
                $scope.flotData[$scope.flotDataStartIndex + i].data.push([x++, y]);
            }
        }

        //
        // Flot chart setup finalization.
        //

        $scope.dataLastPoint = x;

        // 100% line.
        $scope.flotData[0].data.push([0, 3000]);
        $scope.flotData[0].data.push([$scope.dataLastPoint, 3000]);

        // 80% line.
        $scope.flotData[1].data.push([0, 2400]);
        $scope.flotData[1].data.push([$scope.dataLastPoint, 2400]);

        // 60% line.
        $scope.flotData[2].data.push([0, 1800]);
        $scope.flotData[2].data.push([$scope.dataLastPoint, 1800]);

        // 40% line.
        $scope.flotData[3].data.push([0, 1200]);
        $scope.flotData[3].data.push([$scope.dataLastPoint, 1200]);

        // 20% line.
        $scope.flotData[4].data.push([0, 600]);
        $scope.flotData[4].data.push([$scope.dataLastPoint, 600]);

        // Return to play line.
        $scope.flotData[$scope.flotData.length - 1].data.push([0, 2800]);
        $scope.flotData[$scope.flotData.length - 1].data.push([$scope.dataLastPoint, 2800]);
    }
]);
