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

            // Stores list of items in this container.
            var items = $scope.items = [];
            this.addItem = function(item) {
                item.state = $scope.state;
                item.model = $scope.resource;
                items.push(item);
            };

            // Edit actions.
            $scope.edit = function()
            {
                // Switch state to "editing".
                $scope.state = 'editing';
                angular.forEach(items, function(item) {
                    item.state = $scope.state;
                });
            };

            $scope.save = function()
            {
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

            $scope.delete = function()
            {
                $scope.deleteResource.apply();
            };
        }],
        templateUrl: 'directive-partials/ui-editable-list-container.html'
    };
})

.directive('uiEditableListItem', ['$filter', '$timeout', function($filter, $timeout) {
    return {
        require: '^uiEditableListContainer',
        restrict: 'AE',
        scope: {
            // model: '=',
            label: '@',
            display: '@',
            key: '@',
            inputType: '@type',
            isRequired: '=required',
            isDisabled: '=disabled'
        },
        link: function(scope, element, attrs, controller) {

            // Link item to controller.
            controller.addItem(scope);

            // Initialize fields.
            switch (attrs.type)
            {
                case 'datetime':
                    // Format display label.
                    scope.timestamp = scope.model[scope.key].replace(' ', 'T') + '-05:00';
                    scope.timestamp = $filter('date')(scope.timestamp, 'MMMM d, yyyy (h:mm a)');

                    // Create a datetime picker.
                    if (!attrs.disabled) {
                        $timeout(function() {

                            // Create date picker.
                            $(element).find('input[type="datetime"]').datetimepicker({
                                format: 'MMMM D, YYYY (h:mm a)'
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
            }
        },
        templateUrl: 'directive-partials/ui-editable-list-item.html'
    };
}]);
