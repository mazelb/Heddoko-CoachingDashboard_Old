/**
 * @file    ui-editable-list.js
 * @brief   Angular directive for editable list tables. Includes action buttons.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @note    Use as:
 *              <div ui-editable-list-container>
 *                  <div ui-editable-list-item label="Some Label" value="data.some.value">
 *                  </div>
 *              </div>
 */
angular.module('app.directives')

.directive('uiEditableListContainer', ['assetVersion', function(assetVersion) {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            deleteResource: '=delete'
        },
        controller: ['$scope', 'Rover', function($scope, Rover) {

            // Editing flag.
            $scope.isEditing = false;

            // Stores list of items in this container.
            var items = $scope.items = [];
            this.addItem = function(item) {
                item.isEditing = false;
                items.push(item);
            };

            // Edit actions.
            $scope.edit = function()
            {
                // Turn on editing flag.
                $scope.isEditing = true;
                angular.forEach(items, function(item) {
                    item.isEditing = true;
                });
            };

            $scope.save = function()
            {
                // Turn off editing flag.
                $scope.isEditing = false;
                angular.forEach(items, function(item) {
                    item.isEditing = false;
                });
            };

            $scope.delete = function()
            {
                $scope.deleteResource.apply();
            };
        }],
        templateUrl: 'directive-partials/ui-editable-list-container.html'
    };
}])

.directive('uiEditableListItem', [
    function() {
        return {
            require: '^uiEditableListContainer',
            restrict: 'AE',
            scope: {
                label: '@label',
                display: '@display',
                value: '=value',
                type: '@type'
            },
            link: function(scope, element, attrs, controller) {
                controller.addItem(scope);
            },
            templateUrl: 'directive-partials/ui-editable-list-item.html'
        };
    }
]);
