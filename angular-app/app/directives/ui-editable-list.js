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

.directive('uiEditableListContainer', function() {
    return {
        restrict: 'AE',
        transclude: true,
        controller: ['$scope', 'Rover', function($scope, Rover) {

            // Editing flag.
            $scope.isEditing = false;

            // Stores list of items in this container.
            $scope.items = [];
            $scope.addItem = function(item) {
                $scope.items.push(item);
            };

            // Edit actions.
            $scope.edit = function()
            {
                // Turn on editing flag.
                $scope.isEditing = true;
                for (var item in $scope.items) {
                    item.isEditing = true;
                }
            };

            $scope.save = function()
            {
                // Turn off editing flag.
                $scope.isEditing = false;
                for (var item in $scope.items) {
                    item.isEditing = false;
                }
            };

            $scope.delete = function()
            {
                Rover.alert('Demo');
            };
        }],
        templateUrl: 'views/partials/ui-editable-list-container.html'
    };
})

.directive('uiEditableListItem', ['Rover', function(Rover) {
    return {
        require: '^uiEditableListContainer',
        restrict: 'AE',
        scope: {
            label: '@label',
            value: '=value'
        },
        link: function(scope, element, attrs, controller) {
            controller.addItem(scope);
        },
        templateUrl: 'views/partials/ui-editable-list-item.html'
    };
}]);
