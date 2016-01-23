/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Controller for trends demo
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    January 2016
 */
angular.module('app.controllers')

.controller('DemoTrainingSessionController', ['$scope', '$timeout', '$filter', 'DemoTrendsService', 'Rover', 'Utilities',
    function($scope, $timeout, $filter, DemoTrendsService, Rover, Utilities) {
        Utilities.debug('DemoTrainingSessionController');

        $scope.metric = null;
        $scope.session = null;
        $scope.isFetchingSessionData = false;
        $scope.isFetchingSelectedMetricData = false;
        $scope.isSessionDataLoaded = false;
        $scope.colours = [Utilities.colour.heddokoGreen, '#79d9d8', '#6eb4d2'];
        $scope.fakeData = {};


        ///
        /// General options for flot charts
        ///
        /////////////////////////////////////////////////////////////////


        var flotOptions =
        {
            grid:
            {
                backgroundColor: 'rgba(44, 58, 70, 1)',
                borderWidth: 1,
                borderColor: '#888',
                clickable: false,
                hoverable: true
            },
            legend: {show: false},
            series: {hoverable: true},
            xaxis: {
                color: '#888',
                tickColor: '#888'
            },
            yaxis: {
                color: '#888',
                tickColor: '#888',
                position: 'left'
            },
            tooltip: true,
            tooltipOpts: {
                defaultTheme: true
            }
        };

        var flotTooltipStyles = {
            position: 'absolute',
            display: 'none',
            padding: '5px 10px',
            color: Utilities.color.textColor,
            border: '1px solid ' + Utilities.color.textColorBlue,
            'background-color': Utilities.color.darkBlue,
            'text-align': 'center',
            opacity: 0.9
        };


        ///
        /// Demo: Peak Elbow Angular Velocity
        ///
        /////////////////////////////////////////////////////////////////


        $scope.flotTicksX = [
            // [0, '0'],
            [1, '10'],
            [2, '20'],
            [3, '30'],
            [4, '40'],
            [5, '50'],
            [6, '60'],
            [7, '70'],
            [8, '80'],
            [9, '90'],
            [10, '100'],
            [11, '110'],
            [12, '120'],
            [13, '130'],
            [14, '140'],
            [15, '150'],
            [16, 'Throws']
        ];

        // Markings.
        $scope.flotElbowVelocityLabels = [
            {
                color: Utilities.colour.orange,
                point: {x: 10, y: 2900},
                lineWidth: 3,
                // styles: {
                //     padding: '5px 10px',
                //     color: Utilities.color.silver,
                //     'border-left': '4px solid #fff',
                //     'background': 'linear-gradient(to right, '+ Utilities.color.textColorBlue +' 0%, transparent 30%)'
                // },
                text: 'Throw degradation<br>around <b>97<sup style="">th</sup></b> throw'
            }
        ];


        $scope.flotElbowVelocityOptions = $.extend(true, {}, flotOptions, {
            grid: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                markings: [
                    {
                        color: Utilities.color.orange,
                        lineWidth: 2,
                        xaxis: {from: 10, to: 10}
                    }
                ]
            },
            xaxis: {
                tickColor: 'rgba(91, 112, 125, 0.4)',
                ticks: $scope.flotTicksX
            },
            yaxis: {
                tickColor: 'rgba(0, 0, 0, 0)',
                min: 1000,
                max: 3000
            },
            colors: [
                '#4dc5de',
                '#4dc5de',
                '#fff'
            ]
        });

        $scope.flotElbowVelocityDataPoints = [
            [0, 2550],
            [1, 2540],
            [2, 2578],
            [3, 2660],
            [4, 2750],
            [5, 2790],
            [6, 2810],
            [7, 2792],
            [8, 2740],
            [9, 2657],
            [10, 2530],
            [11, 2275],
            [12, 2100],
            [13, 2003],
            [14, 1961],
            [15, 1899],
            [16, 1879]
        ];

        $scope.flotElbowVelocityData = [

            // Threshold
            {
                bars: {show: false},
                lines: {
                    fill: true,
                    fillColor: {colors: ['rgba(77, 197, 222, 0)', 'rgba(77, 197, 222, 0.3)']},
                    lineWidth: 2,
                    show: true
                },
                data: [
                    [0, 2100],
                    [16, 2100]
                ],
                isThresholdSeries: true
            },

            // Data line.
            {
                bars: {show: false},
                lines: {
                    color: '#ddd',
                    fill: false,
                    lineWidth: 4,
                    show: true
                },
                data: $scope.flotElbowVelocityDataPoints
            },

            // Data Points.
            {
                bars: {show: false},
                points: {
                    color: '#ddd',
                    lineWidth: 4,
                    show: true
                },
                data: $scope.flotElbowVelocityDataPoints
            }
        ];

        $scope.flotElbowVelocityHover = function (event, pos, item) {

            // Display tooltip for data point.
			if (item)
            {
				$('#flot-elbow-velocity-tooltip')
                    .html(
                        '<b>' + $filter('number')(item.datapoint[1], 0) + ' &deg;/s</b>'
                    )
					.css({
                        top: item.pageY - $('#flot-elbow-velocity-tooltip').height() - 45,
                        left: item.pageX - 40,
                        // 'background-color': item.series.color
                        'background-color': Utilities.color.darkBlue
                    })
					.fadeIn(200);
			}

            // Hide tooltip if no element is selected.
            else {
				$('#flot-elbow-velocity-tooltip').hide();
			}
		};

        // Create tooltip template element.
        $('<div id="flot-elbow-velocity-tooltip"></div>').css(flotTooltipStyles).appendTo('body');

        // Gauge charts.

        $scope.elbowVelocityMinGauge =
        {
            data: {
                maxValue: 1000,
                animationSpeed: 20,
                val: 630
            },
            options: {
                lines: 12,
                angle: 0,
                lineWidth: 0.3,
                pointer: {
                    length: 0,
                    strokeWidth: 0
                },
                limitMax: 'false',
                strokeColor: Utilities.colour.blue,
                generateGradient: false,
                percentColors: [
                    [0, $scope.colours[2]],
                    [0.5, $scope.colours[2]],
                    [1, $scope.colours[2]]
                ]
            }
        };

        $scope.elbowVelocityAvgGauge =
        {
            data: {
                maxValue: 1000,
                animationSpeed: 20,
                val: 834
            },
            options: {
                lines: 12,
                angle: 0,
                lineWidth: 0.3,
                pointer: {
                    length: 0,
                    strokeWidth: 0
                },
                limitMax: 'false',
                strokeColor: Utilities.colour.blue,
                generateGradient: false,
                percentColors: [
                    [0, $scope.colours[1]],
                    [0.5, $scope.colours[1]],
                    [1, $scope.colours[1]]
                ]
            }
        };

        $scope.elbowVelocityMaxGauge =
        {
            data: {
                maxValue: 1000,
                animationSpeed: 20,
                val: 940
            },
            options: {
                lines: 20,
                angle: 0,
                lineWidth: 0.3,
                pointer: {
                    length: 0,
                    strokeWidth: 0
                },
                limitMax: 'false',
                strokeColor: Utilities.colour.blue,
                generateGradient: false,
                percentColors: [
                    [0, Utilities.color.heddokoGreen],
                    [0.5, Utilities.color.heddokoGreen],
                    [1, Utilities.color.heddokoGreen]
                ]
            }
        };


        ///
        /// Demo: Shoulder External Rotation
        ///
        /////////////////////////////////////////////////////////////////


        $scope.flotShoulderRotOptions = $.extend(true, {}, flotOptions, {
            grid: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                color: 'rgba(91, 112, 125, 1)',
                markings: [
                    // {
                    //     color: 'rgba(219, 80, 49, 0.15)',
                    //     color: Utilities.color.darkBlue,
                    //     yaxis: {from: 100}
                    // },
                    {
                        color: 'rgba(77, 197, 222, 0.3)',
                        yaxis: {from: 60, to: 100}
                    },
                    // {
                    //     color: Utilities.color.darkBlue,
                    //     yaxis: {from: 0, to: 60}
                    // },
                ]
            },
            xaxis: {
                color: 'rgba(91, 112, 125, 0.4)',
                tickColor: 'rgba(91, 112, 125, 0.4)',
                ticks: $scope.flotTicksX
            },
            yaxis: {
                color: 'rgba(0, 0, 0, 0)',
                tickColor: 'rgba(0, 0, 0, 0)',
                ticks: [
                    [0, '0'],
                    [20, '20'],
                    [40, '40'],
                    [60, '60'],
                    [80, '80'],
                    [100, '100'],
                    [120, '%'],
                ]
            },
            colors: [
                '#4dc5de',
                '#fff',
            ]
        });

        $scope.flotShoulderRotDataPoints = [
            [0, 82],
            [1, 89],
            [2, 91],
            [3, 90],
            [4, 88],
            [5, 91],
            [6, 94],
            [7, 91],
            [8, 85],
            [9, 67],
            [10, 63],
            [11, 61],
            [12, 64],
            [13, 62],
            [14, 58],
            [15, 53],
            [16, 60]
        ];

        $scope.flotShoulderRotData = [

            // Data line.
            {
                bars: {show: false},
                lines: {
                    color: '#4dc5de',
                    fill: false,
                    lineWidth: 4,
                    show: true
                },
                data: $scope.flotShoulderRotDataPoints
            },

            // Data points.
            {
                bars: {show: false},
                points: {
                    color: '#fff',
                    lineWidth: 4,
                    show: true
                },
                data: $scope.flotShoulderRotDataPoints
            }
        ];

        // Chart tooltips
        $scope.flotShoulderRotHover = function (event, pos, item) {

            // Display tooltip for data point.
			if (item)
            {
				$("#flot-shoulder-rot-tooltip")
                    .html(
                        '<b>' + $filter('number')(item.datapoint[1], 0) + ' %</b>'
                    )
					.css({
                        top: item.pageY - $('#flot-shoulder-rot-tooltip').height() - 45,
                        left: item.pageX - 40,
                        // 'background-color': item.series.color
                        'background-color': Utilities.color.darkBlue
                    })
					.fadeIn(200);

                $timeout(function() {
                    $scope.demoGaugeOneValue = (item.datapoint[1]) * 1000 / 100;
                    $scope.demoGaugeOneValuePercent = $filter('number')(item.datapoint[1], 0) + ' %';
                });
			}

            // Hide tooltip if no element is selected.
            else {
				$('#flot-shoulder-rot-tooltip').hide();

                $timeout(function() {
                    $scope.demoGaugeOneValue = 500;
                    $scope.demoGaugeOneValuePercent = '';
                });
			}
		};
        $('<div id="flot-shoulder-rot-tooltip"></div>').css(flotTooltipStyles).appendTo('body');


        ///
        /// Demo: Stride Length
        ///
        /////////////////////////////////////////////////////////////////


        $scope.flotStrideOptions = $.extend(true, {}, flotOptions, {
            grid: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                markings: [
                    // {
                    //     color: Utilities.color.textColorBlue,
                    //     yaxis: {from: 30}
                    // },
                    {
                        color: 'rgba(63, 213, 174, 0.3)',
                        yaxis: {from: 26, to: 30}
                    },
                    // {
                    //     color: Utilities.color.textColorBlue,
                    //     yaxis: {from: 15, to: 26}
                    // },
                ]
            },
            xaxis: {
                color: 'rgba(91, 112, 125, 0.4)',
                tickColor: 'rgba(91, 112, 125, 0.4)',
                ticks: $scope.flotTicksX
            },
            yaxis: {
                color: 'rgba(0, 0, 0, 0)',
                tickColor: 'rgba(0, 0, 0, 0)',
                ticks: [
                    [20, '20'],
                    [22, '22'],
                    [24, '24'],
                    [26, '26'],
                    [28, '28'],
                    [30, '30'],
                    [32, '32'],
                    [34, '34'],
                    [36, 'in.'],
                ]
            },
            colors: [
                'rgba(63, 213, 174, 1)',
                '#fff',
            ]
        });

        $scope.flowStrideDataPoints = [
            [0, 27.4],
            [1, 28],
            [2, 26.5],
            [3, 25.9],
            [4, 26.9],
            [5, 27.9],
            [6, 28.1],
            [7, 28.7],
            [8, 28.3],
            [9, 27.9],
            [10, 27.4],
            [11, 26.1],
            [12, 25.3],
            [13, 25],
            [14, 24.6],
            [15, 23.1],
            [16, 22.9]
        ];

        $scope.flotStrideData = [

            // Data line.
            {
                bars: {show: false},
                lines: {
                    fill: false,
                    lineWidth: 4,
                    show: true
                },
                data: $scope.flowStrideDataPoints
            },

            // Data scatter.
            {
                bars: {show: false},
                points: {
                    fill: true,
                    lineWidth: 4,
                    show: true
                },
                data: $scope.flowStrideDataPoints
            }
        ];

        // Chart tooltips
        $scope.flotStrideHover = function (event, pos, item) {

            // Display tooltip for data point.
			if (item)
            {
				$("#flot-stride-tooltip")
                    .html(
                        '<b>' + $filter('number')(item.datapoint[1], 1) + '"</b>'
                    )
					.css({
                        top: item.pageY - $('#flot-stride-tooltip').height() - 45,
                        left: item.pageX - 40,
                        // 'background-color': item.series.color
                        'background-color': Utilities.color.darkBlue
                    })
					.fadeIn(200);

                $timeout(function() {
                    $scope.demoGaugeTwoValue = (item.datapoint[1]) * 1000 / 30;
                    $scope.demoGaugeTwoValuePercent = $filter('number')(item.datapoint[1], 0) + '"';
                });
			}

            // Hide tooltip if no element is selected.
            else {
				$('#flot-stride-tooltip').hide();

                $timeout(function() {
                    $scope.demoGaugeTwoValue = 500;
                    $scope.demoGaugeTwoValuePercent = '';
                });
			}
		};
        $('<div id="flot-stride-tooltip"></div>').css(flotTooltipStyles).appendTo('body');


        ///
        /// Demo: Gauge
        ///
        /////////////////////////////////////////////////////////////////


        $scope.demoGaugeOneValue = 500;
        $scope.demoGaugeOne =
        {
            data: {
                maxValue: 1000,
                animationSpeed: 4,
                val: $scope.demoGaugeOneValue
            },
            options: {
                lines: 12,
                angle: 0,
                lineWidth: 0.3,
                pointer: {
                    length: 0,
                    strokeWidth: 0
                },
                limitMax: 'false',
                strokeColor: Utilities.colour.blue,
                generateGradient: false,
                percentColors: [
                    [0, '#4dc5de'],
                    [0.5, '#4dc5de'],
                    [1, '#4dc5de']
                ]
            }
        };

        $scope.demoGaugeTwoValue = 500;
        $scope.demoGaugeTwo =
        {
            data: {
                maxValue: 1000,
                animationSpeed: 4,
                val: $scope.demoGaugeTwoValue
            },
            options: {
                lines: 12,
                angle: 0,
                lineWidth: 0.3,
                pointer: {
                    length: 0,
                    strokeWidth: 0
                },
                limitMax: 'false',
                strokeColor: Utilities.colour.blue,
                generateGradient: false,
                percentColors: [
                    [0, '#3FD5AE'],
                    [0.5, '#3FD5AE'],
                    [1, '#3FD5AE']
                ]
            }
        };


        ///
        /// Demo: Selectize
        ///
        /////////////////////////////////////////////////////////////////


        $scope.selectizeSessionModel = 0;
        $scope.selectizeMetricModel = 0;

        $scope.selectizeSessionConfig = {
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
                angular.forEach($scope.selectizeSessionOptions, function(option) {

                    if (option.id == id) {
                        $timeout(function() {
                            $scope.session = option;
                        });
                    }
                });
            }
        };

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

        $scope.selectizeSessionOptions = [
            {id: 5, type: 'session', title: 'February 3, 2016'},
            {id: 4, type: 'session', title: 'February 2, 2016'},
            {id: 3, type: 'session', title: 'February 1, 2016'},
            {id: 2, type: 'session', title: 'January 29, 2016'},
            {id: 1, type: 'session', title: 'January 28, 2016'}
        ];

        // Metrics
        $scope.selectizeMetricOptions = [
            // {id: 1, type: 'metric', title: 'Kinematic Sequence'},
            {id: 2, type: 'metric', title: 'Peak Elbow Angular Velocity'},
            // {id: 3, type: 'metric', title: 'Peak Forearm Snap Velocity'},
            {id: 4, type: 'metric', title: 'Shoulder External Rotation'},
            {id: 5, type: 'metric', title: 'Stride Length'},
            // {id: 6, type: 'metric', title: 'Stride Timing'},
            // {id: 7, type: 'metric', title: 'Torso Rotation'}
        ];


        ///
        /// Demo: Simulate data fetching.
        ///
        /////////////////////////////////////////////////////////////////


        $scope.fetchDataDemo = function(newData, oldData) {

            // Wait for both the session and metric to be selected.
            if (!$scope.session || !$scope.metric || $scope.isFetchingSessionData || !newData) {
                return;
            }

            // Update metric plots.
            if (newData.type == 'metric' && $scope.isSessionDataLoaded)
            {
                $scope.isFetchingSelectedMetricData = true;

                $timeout(function() {
                    $scope.isFetchingSelectedMetricData = false;
                }, 800);
            }

            // Update session data.
            else
            {
                $scope.isFetchingSessionData = true;

                $timeout(function() {
                    $scope.isSessionDataLoaded = true;
                    $scope.isFetchingSessionData = false;
                }, 800);
            }
        };

        $scope.$watch('session', $scope.fetchDataDemo);
        $scope.$watch('metric', $scope.fetchDataDemo);
    }
]);
