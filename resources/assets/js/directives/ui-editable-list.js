/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   Angular directive for editable list tables. Includes action buttons.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @note    Use as:
 *              <div ui-editable-list-container data-heading="Some Heading">
 *                  <div ui-editable-list-item label="Some Label" value="data.some.value">
 *                  </div>
 *              </div>
 */
angular.module('app.directives')

.directive('uiEditableListContainer', function() {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            heading: '@',
            resource: '=model',
            saveResource: '=save',
            saveResourceCallback: '=saveCallback',
            deleteResource: '=delete'
        },
        controller: ['$scope', 'Rover', function($scope, Rover) {

            // Represents current state of directive.
            $scope.state = 'idle';

            // Stores some configuration values for this directive.
            $scope.config = $scope.config || {};

            // Stores list of items in this container.
            var items = $scope.items = {};
            this.addItem = function(item) {

                // Link item to controller.
                item.state = $scope.state;
                item.model = $scope.resource;
                item.config = $scope.config;
                items[item.key] = item;

                return true;
            };

            // Switch state to "editing".
            $scope.edit = function() {
                $scope.state = 'editing';
                angular.forEach(items, function(item) {
                    item.state = $scope.state;
                });
            };

            // Saves changes.
            $scope.save = function() {
                Rover.debug('Saving model...');

                // Switch state to "saving".
                $scope.state = 'saving';
                angular.forEach(items, function(item) {
                    item.state = $scope.state;
                });

                // Save resource.
                $scope.saveResource.call().then(
                    function(response) {
                        $scope.state = 'idle';
                        $scope.saveResourceCallback.call(response.data, true);

                        angular.forEach(items, function(item) {
                            item.state = $scope.state;
                        });
                    },
                    function(response) {
                        $scope.state = 'idle';
                        $scope.saveResourceCallback.call(response.data, false);

                        angular.forEach(items, function(item) {
                            item.state = $scope.state;
                        });
                    }
                );
            };

            // Deletes a model.
            $scope.delete = function() {
                $scope.deleteResource.apply();
            };

            // Watches for updates to model from outside the directive.
            $scope.$watch('resource', function(model) {
                $scope.state = 'idle';
                angular.forEach(items, function(item) {
                    item.state = $scope.state;
                    item.model = model;
                });
            });
        }],
        templateUrl: 'directive-partials/ui-editable-list-container.html'
    };
})

.directive('uiEditableListItem', ['$filter', '$timeout', 'Rover',
    function($filter, $timeout, Rover) {
        return {
            require: '^uiEditableListContainer',
            restrict: 'AE',
            scope: {
                label: '@',
                display: '@',
                key: '@',
                inputType: '@type',
                isRequired: '=required',
                isDisabled: '=disabled'
            },
            link: function(scope, element, attrs, controller) {

                // Link item to controller.
                if (!controller.addItem(scope)) {
                    return;
                }

                // Data object.
                scope.data = {};

                // Initialize fields.
                switch (attrs.type)
                {
                    // Date, Datetime
                    case 'date':
                    case 'datetime':

                        // Format display label.
                        var angularFormat = 'MMMM d, yyyy', momentFormat = 'MMMM D, YYYY';
                        if (attrs.type == 'datetime') {
                            momentFormat += ' (h:mm a)';
                            angularFormat += ' (h:mm a)';
                        }

                        scope.format = angularFormat;
                        if (scope.model[scope.key].length)
                        {
                            scope.timestamp = scope.model[scope.key].replace(' ', 'T') + '-05:00';
                            scope.timestamp = $filter('date')(scope.timestamp, angularFormat);
                        }
                        else
                        {
                            scope.timestamp = '';
                        }

                        // Create a datetime picker.
                        if (!attrs.disabled) {
                            $timeout(function() {

                                // Create date picker.
                                $(element).find('input[type="datetime"]').datetimepicker({
                                    format: momentFormat
                                })

                                // Attach "onChange" event.
                                .on('dp.change', function(e) {
                                    scope.model[scope.key] = e.date.format('YYYY-MM-DD HH:mm:ss');
                                })

                                // Set date.
                                .data('DateTimePicker').date(scope.timestamp);
                            });
                        }
                        break;

                    // Height, Length
                    case 'length':

                        // Supported length units.
                        scope.config.unitForLength = scope.config.unitForLength || 'm';
                        scope.units = ['mm', 'cm', 'm', 'in', 'ft/in'];

                        // Default length value.
                        scope.model[scope.key] = scope.model[scope.key] || 0.0;

                        // Formats length according to selected unit.
                        scope.updateUnit = function(unit) {
                            switch (unit) {
                                case 'mm':
                                    scope.config.unitForLength = unit;
                                    scope.data.lengthVal = scope.model[scope.key] * 1000;
                                    scope.data.lengthStr = $filter('number')(scope.data.lengthVal) + ' mm';
                                    break;

                                case 'cm':
                                    scope.config.unitForLength = unit;
                                    scope.data.lengthVal = scope.model[scope.key] * 100;
                                    scope.data.lengthStr = $filter('number')(scope.data.lengthVal) + ' cm';
                                    break;

                                case 'in':
                                    scope.config.unitForLength = unit;
                                    scope.data.lengthVal = scope.model[scope.key] * 39.3701;
                                    scope.data.lengthStr = $filter('number')(scope.data.lengthVal) + '"';
                                    break;

                                case 'ft/in':
                                    scope.config.unitForLength = unit;
                                    scope.data.lengthFeet = Math.floor(scope.model[scope.key] * 3.28084);
                                    scope.data.lengthInches = Math.floor(scope.model[scope.key] * 39.3701 - 12 * scope.data.lengthFeet);
                                    scope.data.lengthStr = scope.data.lengthFeet + '\' '+ scope.data.lengthInches +'"';
                                    break;

                                default:
                                    scope.config.unitForLength = 'm';
                                    scope.data.lengthVal = scope.model[scope.key];
                                    scope.data.lengthStr = $filter('number')(scope.data.lengthVal) + ' m';
                                    break;
                            }
                        };

                        // Updates length value on model.
                        scope.updateModel = function() {
                            Rover.debug('Updating length value for "' + scope.key + '" ...');

                            switch (scope.config.unitForLength)
                            {
                                case 'mm':
                                    scope.model[scope.key] = scope.data.lengthVal / 1000;
                                    break;

                                case 'cm':
                                    scope.model[scope.key] = scope.data.lengthVal / 100;
                                    break;

                                case 'in':
                                    scope.model[scope.key] = scope.data.lengthVal / 39.3701;
                                    break;

                                case 'ft/in':
                                    scope.model[scope.key] =
                                        scope.data.lengthFeet / 3.28084 + scope.data.lengthInches / 39.3701;
                                    break;

                                default:
                                    scope.model[scope.key] = scope.data.lengthVal;
                            }

                            Rover.debug('From ' + scope.data.lengthStr + ' to ' + scope.model[scope.key] + ' m');
                        };

                        // Calculate length in desired units on first load.
                        scope.updateUnit(scope.config.unitForLength);

                        // Watches the model for any changes and updates the length string accordingly.
                        scope.$watch('model', function(model) {
                            scope.updateUnit(scope.config.unitForLength);
                        });
                        break;

                    // Weight, mass
                    case 'mass':

                        // Supported mass units.
                        scope.config.unitForMass = scope.config.unitForMass || 'kg';
                        scope.units = ['g', 'kg', 'lbs', 'stone'];

                        // Default mass value.
                        scope.model[scope.key] = scope.model[scope.key] || 0.0;

                        // Formats length according to selected unit.
                        scope.updateUnit = function(unit) {
                            switch (unit) {
                                case 'g':
                                    scope.config.unitForMass = unit;
                                    scope.data.massVal = scope.model[scope.key] * 1000;
                                    scope.data.massStr = $filter('number')(scope.data.massVal) + ' g';
                                    break;

                                case 'lbs':
                                    scope.config.unitForMass = unit;
                                    scope.data.massVal = scope.model[scope.key] * 2.20462;
                                    scope.data.massStr = $filter('number')(scope.data.massVal) + ' lbs';
                                    break;

                                case 'stone':
                                    scope.config.unitForMass = unit;
                                    scope.data.massVal = scope.model[scope.key] * 0.157473;
                                    scope.data.massStr = $filter('number')(scope.data.massVal) + ' stone';
                                    break;

                                default:
                                    scope.config.unitForMass = 'kg';
                                    scope.data.massVal = scope.model[scope.key];
                                    scope.data.massStr = $filter('number')(scope.data.massVal) + ' kg';
                                    break;
                            }
                        };

                        // Updates mass value on model.
                        scope.updateModel = function() {
                            Rover.debug('Updating mass value for "' + scope.key + '" ...');

                            switch (scope.config.unitForMass)
                            {
                                case 'g':
                                    scope.model[scope.key] = scope.data.massVal / 1000;
                                    break;

                                case 'lbs':
                                    scope.model[scope.key] = scope.data.massVal / 2.20462;
                                    break;

                                case 'stone':
                                    scope.model[scope.key] = scope.data.massVal / 0.157473;
                                    break;

                                default:
                                    scope.model[scope.key] = scope.data.massVal;
                            }

                            Rover.debug('From ' + scope.data.massStr + ' to ' + scope.model[scope.key] + ' kg');
                        };

                        // Calculate mass in desired units on first load.
                        scope.updateUnit(scope.config.unitForMass);

                        // Watches the model for any changes and updates the mass string accordingly.
                        scope.$watch('model', function(model) {
                            scope.updateUnit(scope.config.unitForMass);
                        });
                        break;
                }
            },
            templateUrl: 'directive-partials/ui-editable-list-item.html'
        };
    }
]);
