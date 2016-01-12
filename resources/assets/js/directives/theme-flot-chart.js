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

.directive('themeFlotChart', [
    function() {
        return {
            restrict: "A",
            scope: {
                data: "=",
                options: "="
            },
            link: function(scope, ele) {
                var data, options, plot;

                // hard-code color indices to prevent them from shifting as
                // countries are turned on/off

                var datasets;

                datasets = scope.data;

                var i = 0;
                $.each(datasets, function(key, val) {
                    val.color = i;
                    ++i;
                });

                // insert checkboxes

                if($(ele[0]).parent().find(".choices").length > 0){

                    // insert checkboxes
                    var choiceContainer = $(ele[0]).parent().find(".choices");

                    choiceContainer.html("");

                    $.each(datasets, function(key, val) {

                        choiceContainer.append("<br/><div class='choice-item'><label for='id" + key + "' class='ui-checkbox'>" +
                        "<input name='" + key +
                        "' type='checkbox' id='id" + key + "' checked='checked' value='option1'>" +
                        "<span>" + val.label + "</span>" +
                        "</label></div>");

                    });

                    var plotAccordingToChoices = function() {

                        var data_to_push = [];

                        choiceContainer.find("input:checked").each(function () {
                            var key = $(this).attr("name");
                            if (key && datasets[key]) {
                                data_to_push.push(datasets[key]);
                            }
                        });

                        if (data_to_push.length > 0) {
                            $.plot(ele[0], data_to_push, scope.options);
                        }
                    };

                    choiceContainer.find("input").click(plotAccordingToChoices);
                }

                //plotAccordingToChoices();

                return data = scope.data, options = scope.options, plot = $.plot(ele[0], data, options);
            }
        };
    }
]);
