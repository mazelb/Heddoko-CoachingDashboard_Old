/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   Controller for the main search input.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.controllers')

.controller('SearchController', ['$scope', 'Rover',
    function($scope, Rover) {

        Rover.debug('SearchController');

        // Available search filters.
        $scope.filters = [
            {
                name: 'profile',
                label: 'Find an athlete',
                placeholder: 'search for athletes...',
                icon: 'user'
            },
            {
                name: 'group',
                label: 'Find a team',
                placeholder: 'search for teams...',
                icon: 'users'
            },
            {
                name: 'movement',
                label: 'Find a movement',
                placeholder: 'search for movements...',
                icon: 'heartbeat'
            },
            {
                name: 'screening',
                label: 'Find a screening',
                placeholder: 'search for screenings...',
                icon: 'list-alt'
            },
        ];

        // Selects a search filter.
        $scope.filterBy = function(filter) {
            $scope.selectedFilter = Rover.store.searchFilter = filter;
        };

        $scope.filterBy(Rover.store.searchFilter || $scope.filters[0]);
    }
]);
