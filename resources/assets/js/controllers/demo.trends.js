/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for trends demo
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    January 2016
 */
angular.module('app.controllers')

.controller('DemoTrendsController', ['$scope', '$timeout', '$filter', 'DemoTrendsService', 'Rover', 'Utilities',
    function($scope, $timeout, $filter, DemoTrendsService, Rover, Utilities) {
        Utilities.debug('DemoTrendsController');

        $scope.profile = $scope.global.getSelectedProfile();

        $scope.thresholdValue = 2800;
        $scope.thresholdIncrement = 20;
        $scope.isFetchingData = false;
        $scope.metric = null;

        /**
         * Increases "return to play" threshold.
         */
        $scope.increaseThreshold = function() {
            $scope.thresholdValue =
                $scope.thresholdValue >= ($scope.flotOptions.yaxes[0].max - $scope.thresholdIncrement) ?
                    parseInt($scope.flotOptions.yaxes[0].max) :
                    parseInt($scope.thresholdValue) + $scope.thresholdIncrement;
        };

        /**
         * Decreases "return to play" threshold.
         */
        $scope.decreaseThreshold = function() {
            $scope.thresholdValue =
                $scope.thresholdValue <= ($scope.flotOptions.yaxes[0].min + $scope.thresholdIncrement) ?
                    parseInt($scope.flotOptions.yaxes[0].min) :
                    parseInt($scope.thresholdValue) - $scope.thresholdIncrement;
        };


        ///
        /// Demo: Selectize
        ///
        /////////////////////////////////////////////////////////////////


        $scope.selectizeMetricModel = 0;

        $scope.selectizeMetricConfig = {
            create: false,
            valueField: 'id',
            labelField: 'title',
            searchField: ['title'],
            maxItems: 1,

            /**
             * Called anytime the value of the input changes.
             *
             * @param array data
             */
            onChange: function(id) {
                angular.forEach($scope.selectizeMetricOptions, function(option) {
                    if (option.id == id) {
                        $timeout(function() {
                            $scope.metric = option;
                        });
                    }
                });
            }
        };

        // Metrics
        $scope.selectizeMetricOptions = [
            {id: 1, type: 'metric', title: 'Hawkins Impingement Test Results'},
            {id: 2, type: 'metric', title: 'Neer Impingement Test Results'},
            {id: 3, type: 'metric', title: 'Peak Elbow Angular Velocity'},
            {id: 4, type: 'metric', title: 'Peak Shoulder Internal Rotation Velocity'},
            {id: 5, type: 'metric', title: 'Range of Motion'},
            {id: 6, type: 'metric', title: 'Shoulder Strength'},
        ];



        ///
        /// Demo: Percent recovery (easypie)
        ///
        /////////////////////////////////////////////////////////////////


        /**
         * Returns a colour depending on the percent recovery.
         *
         * @param int percent   A number between 0 and 100.
         */
        $scope.easypiePercentColor = function(percent) {
            if (percent < 85) {
                return '#db5031';
            } else if (percent < 95) {
                return '#fabd39';
            }

            return '#3bd6b2';
        };

        $scope.easypie = {
            percent: Math.min(100, Math.round(2750 * 100 / $scope.thresholdValue)),
            options: {
                animate: {
                    duration: 1e2,
                    enabled: !0
                },
                barColor: $scope.easypiePercentColor,
                lineCap: 'round',
                lineWidth: 8,
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


        ///
        /// Demo: Peak Elbow Angular Velocity
        ///
        /////////////////////////////////////////////////////////////////


        $scope.flotOptions = {
            grid: {
                borderWidth: 1,
                borderColor: '#888',
                clickable: false,
                hoverable: true,
                thresholdZones: {
                    min: 500,
                    max: 3500,
                    total: 5
                }
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
                    min: 500,
                    max: 3500,
                    position: 'left'
                }, {
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
                // '#fff', '#fff', '#fff', '#fff', '#fff', // % marks
                Utilities.colour.heddokoGreen,  // Week 1
                '#79d9d8',                      // Week 2
                '#6eb4d2',                      // Week 3
                Utilities.colour.heddokoGreen,  // Week 4
                '#79d9d8',                      // Week 5
                '#6eb4d2',                      // Week 6
                Utilities.colour.heddokoGreen,  // Week 7
                '#fff',                         // Median line
                Utilities.colour.orange,        // Return to play
            ]
        };

        $scope.flotData = [

            // // 100% mark
            // {
            //     bars: {show: false},
            //     data: [],
            //     lines: {
            //         fill: false,
            //         fillColor: 'rgba(255, 255, 255, 0.1)',
            //         lineWidth: 0,
            //         show: true
            //     },
            //     yaxis: 1
            // },
            //
            // // 80% mark
            // {
            //     bars: {show: false},
            //     data: [],
            //     lines: {
            //         fill: false,
            //         fillColor: 'rgba(255, 255, 255, 0.1)',
            //         lineWidth: 0,
            //         show: true
            //     },
            //     yaxis: 1
            // },
            //
            // // 60% mark
            // {
            //     bars: {show: false},
            //     data: [],
            //     lines: {
            //         fill: false,
            //         fillColor: 'rgba(255, 255, 255, 0.1)',
            //         lineWidth: 0,
            //         show: true
            //     },
            //     yaxis: 1
            // },
            //
            // // 40% mark
            // {
            //     bars: {show: false},
            //     data: [],
            //     lines: {
            //         fill: false,
            //         fillColor: 'rgba(255, 255, 255, 0.1)',
            //         lineWidth: 0,
            //         show: true
            //     },
            //     yaxis: 1
            // },
            //
            // // 20% mark
            // {
            //     bars: {show: false},
            //     data: [],
            //     lines: {
            //         fill: false,
            //         fillColor: 'rgba(255, 255, 255, 0.1)',
            //         lineWidth: 0,
            //         show: true
            //     },
            //     yaxis: 1
            // },

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
                updateColor: function(val) {

                    // Return a colour depending on the current value of the threshold.
                    return $scope.easypiePercentColor(Math.min(100, Math.round(2750 * 100 / val)));
                },
                yaxis: 1
            }
        ];

        $scope.flotPlotHover = function (event, pos, item) {

            // Display tooltip for data point.
			if (item)
            {
				$("#demo-flot-tooltip")
                    .html(
                        '<b>' + $filter('number')(item.datapoint[1], 0) + ' &deg;/s</b>' +
                        '<br>' +
                        '<span style="text-transform: uppercase;">' +
                            Math.min(100, Math.round(item.datapoint[1] * 100 / $scope.thresholdValue)) +
                            '% of baseline' +
                        '</span>'
                    )
					.css({
                        top: item.pageY - $('#demo-flot-tooltip').height() - 35,
                        left: item.pageX - 85
                        // 'background-color': item.series.color
                        // 'background': 'linear-gradient(to right, rgba(91, 112, 125, 0.8) 0%, transparent 60%)'
                    })
					.fadeIn(200);
			}

            // Hide tooltip if no element is selected.
            else {
				$('#demo-flot-tooltip').hide();
			}
		};

        // Create tooltip template element.
        $('<div id="demo-flot-tooltip"></div>').css({
            position: 'absolute',
            display: 'none',
            padding: '5px 10px',
            color: '#fff',
            'border': '1px solid ' + Utilities.color.textColorBlue,
            'background-color': Utilities.color.darkBlue,
            'text-align': 'center',
            opacity: 1
        }).appendTo('body');

        //
        // Flot chart data generation.
        //

        $scope.dataMax = 2800;
        $scope.dataPointsInitialDensity = 5;
        $scope.dataMedians = [1250, 1320, 1400, 1590, 1960, 2240, 2750];

        // Indicates index of first dataset in $scope.flotData
        $scope.flotDataStartIndex = 0;

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

        // // 100% line.
        // $scope.flotData[0].data.push([0, 3000]);
        // $scope.flotData[0].data.push([$scope.dataLastPoint, 3000]);
        //
        // // 80% line.
        // $scope.flotData[1].data.push([0, 2400]);
        // $scope.flotData[1].data.push([$scope.dataLastPoint, 2400]);
        //
        // // 60% line.
        // $scope.flotData[2].data.push([0, 1800]);
        // $scope.flotData[2].data.push([$scope.dataLastPoint, 1800]);
        //
        // // 40% line.
        // $scope.flotData[3].data.push([0, 1200]);
        // $scope.flotData[3].data.push([$scope.dataLastPoint, 1200]);
        //
        // // 20% line.
        // $scope.flotData[4].data.push([0, 600]);
        // $scope.flotData[4].data.push([$scope.dataLastPoint, 600]);

        // Return to play line.
        $scope.flotData[$scope.flotData.length - 1].data.push([0, 2800]);
        $scope.flotData[$scope.flotData.length - 1].data.push([$scope.dataLastPoint, 2800]);


        ///
        /// Demo: Simulate data fetching.
        ///
        /////////////////////////////////////////////////////////////////


        $scope.fetchDataDemo = function(newData, oldData) {

            // Performance check.
            if ($scope.isFetchingData || !newData) {
                return;
            }

            $scope.isFetchingData = true;

            $timeout(function() {
                $scope.isFetchingData = false;
            }, 800);
        };

        $scope.$watch('metric', $scope.fetchDataDemo);
    }
]);
