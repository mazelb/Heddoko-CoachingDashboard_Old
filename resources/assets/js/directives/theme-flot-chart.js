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
                threshold: '=?',
                options: '='
            },
            link: function(scope, element) {

                // Draw plot.
                var plot = $.plot(element[0], scope.data, scope.options);

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
