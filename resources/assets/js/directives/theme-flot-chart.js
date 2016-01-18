/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   Transfered and adapted from Admin Box Theme by Joao Garin
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    January 2016
 */
angular.module('app.directives')

.directive('themeFlotChart', ['Utilities',
    function(Utilities) {
        return {
            restrict: 'AE',
            scope: {
                data: '=',
                options: '=',
                plotClick: '=?',
                plotHover: '=?',
                threshold: '=?',
                thresholdLabel: '=?'
            },
            link: function(scope, element) {

                // Add hook for creating threshold label.
                if (scope.thresholdLabel)
                {
                    /**
                     * Adds a label to the threshold line.
                     *
                     * @param plot
                     * @param canvascontext
                     */
                    var writeThresholdLabel = function(plot, canvascontext) {

                        // Label colour and position.
                        var color = '#ddd',
                            top = 0,
                            left = plot.getPlotOffset().left,
                            plotData = plot.getData();

                        // Find threshold series.
                        angular.forEach(plot.getData(), function(series) {
                            if (series.isThresholdSeries)
                            {
                                // Check that threshold value is valid.
                                if (series.data[0][1] < plotData[0].yaxis.min || series.data[0][1] > plotData[0].yaxis.max) {
                                    top = 0;
                                    return;
                                }

                                // Set text colour for label.
                                color = series.color;

                                // Calculate pixels from top for where label should appear.
                                top = (1 -
                                        (series.data[0][1] - plotData[0].yaxis.min) /
                                        (plotData[0].yaxis.max - plotData[0].yaxis.min)
                                    ) * (
                                        plot.getPlaceholder().height() -
                                        plot.getPlotOffset().top -
                                        plot.getPlotOffset().bottom
                                    ) - 20;
                            }
                        });

                        // Create label
                        if (!scope.thresholdLabelElement)
                        {
                            scope.thresholdLabelElement =
                            $('<div id="theme-flot-chart-threshold-label"></div>')
                                .html(scope.thresholdLabel)
                                .css({
                                    position: 'absolute',
                                    display: 'inline-block',
                                    padding: '5px 10px',
                                    color: color,
                                    'background-color': 'transparent',
                                    opacity: 0.9
                                })
                                .appendTo(plot.getPlaceholder());
                        }

                        // Set position.
                        scope.thresholdLabelElement.css({
                            top: top,
                            left: left
                        });

                        if (top === 0) {
                            scope.thresholdLabelElement.fadeOut(200);
                        } else {
                            scope.thresholdLabelElement.fadeIn(200);
                        }
                    };

                    // Add hook.
                    scope.options.hooks = scope.options.hooks || {};
                    scope.options.hooks.draw = scope.options.hooks.draw || [];
                    scope.options.hooks.draw.push(writeThresholdLabel);
                }

                // Draw plot.
                var plot = $.plot(element[0], scope.data, scope.options);

                // Bind plot hover function.
                if (scope.plotHover) {
                    $(element[0]).bind('plothover', scope.plotHover);
                }

                // Bind plot click function.
                if (scope.plotClick) {
                    $(element[0]).bind('plotclick', scope.plotClick);
                }

                // If plot has a moveable threshold, redraw on update.
                if (scope.threshold)
                {
                    scope.$watch('threshold', function(newThreshold) {

                        // Update plot.
                        angular.forEach(scope.data, function(series) {

                            // Performance check.
                            if (series.isThresholdSeries)
                            {
                                series.data[0] = [0, newThreshold];
                                series.data[1] = [series.data[1][0], newThreshold];
                            }
                        });

                        // Redraw plot.
                        plot.setData(scope.data, scope.options);
                        // plot.setupGrid();
                        plot.draw();
                    });
                }
            }
        };
    }
]);
