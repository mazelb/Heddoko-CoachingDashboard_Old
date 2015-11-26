/**
 * @brief   Controller for the main search input.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('SearchController', ['$scope', 'Rover', 'assetVersion', 'isLocalEnvironment',
    function($scope, Rover, assetVersion, isLocalEnvironment) {

        Rover.debug('SearchController');

        // Available search filters.
        $scope.filters = [
            {
                name: 'none',
                label: 'No filter',
                icon: 'search'
            },
            {
                name: 'profile',
                label: 'Filter by athlete',
                icon: 'user'
            },
            {
                name: 'group',
                label: 'Filter by team',
                icon: 'users'
            }
        ];

        // Selects a search filter.
        // TODO: decide if this should be stored in $localStorage, and if it should be
        // available more globally.
        $scope.filterBy = function(filter) {
            $scope.selectedFilter = filter;
        };

        $scope.filterBy($scope.filters[0]);
    }
]);
