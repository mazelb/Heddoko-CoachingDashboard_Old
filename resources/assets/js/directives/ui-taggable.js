/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Angular directive for tags.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.directives')

/**
 * General taggable inputs.
 */
.directive('uiTaggableInput', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'directive-partials/ui-taggable-input.html',
        scope: {
            model: '=',
            key: '@',
            maxTags: '@'
        },
        controller: ['$scope', '$http', 'Rover',
            function($scope, $http, Rover) {

                // Default scope variables.
                $scope.data = [];
                $scope.options = [];
                $scope.maxTags = $scope.maxTags || 10;

                // Updates the model whenever necessary.
                $scope.updateData = function() {

                    // Array of tags.
                    if (angular.isArray($scope.model[$scope.key]))
                    {
                        // Setup data model, available options and displayed value.
                        angular.forEach($scope.model[$scope.key], function(tag) {

                            // Push ID to data model.
                            $scope.data.push(tag.id);

                            // Add tag to options list.
                            $scope.options.push({
                                id: tag.id,
                                title: tag.title
                            });
                        });
                    }

                    // Single tag
                    else if (angular.isObject($scope.model[$scope.key]))
                    {
                        Rover.debug('Inspecting tag object...');

                        if ($scope.model[$scope.key].id)
                        {
                            $scope.data = $scope.model[scope.key].id;
                            $scope.options = [{
                                id: $scope.model[$scope.key].id,
                                title: $scope.model[$scope.key].title
                            }];
                        }
                    }

                    // Default value.
                    else {
                        $scope.model[$scope.key] = $scope.maxTags > 1 ? [] : {};
                    }
                };
                $scope.updateData();

                // Selectize configuration.
                $scope.config = {
                    create: true,
                    valueField: 'id',
                    labelField: 'title',
                    searchField: ['title'],
                    maxOptions: 15,
                    maxItems: $scope.maxTags || 1,

                    /**
                     * Called anytime the user types into the input box.
                     *
                     * @param string query
                     * @param function callback
                     */
                    load: function(query, callback) {

                        // Performance check.
                        Rover.debug('Fetching tags...');
                        Rover.debug(query);
                        if (!query || !query.length) {
                            return callback();
                        }

                        // Queries the API for tags.
                        $http.get('/api/tag', {
                            params: {
                                query: query,
                                limit: 50
                            }
                        }).then(
                            function(response) {
                                callback(response.data);
                            },
                            function(response) {
                                callback();
                            }
                        );
                    },

                    /**
                     * Called anytime the user creates a new tag.
                     *
                     * @param string value
                     * @param object data
                     */
                    onOptionAdd: function(value, data) {

                        // Performance check.
                        if (value.trim().length < 1 || data.id) {
                            return;
                        }

                        // Create the new tag.
                        Rover.debug('Creating tag: ' + value);
                        $http.post('/api/tag', {
                            title: value.trim()
                        });
                    },

                    /**
                     * Called anytime the value of the input changes.
                     *
                     * @param array data
                     */
                    onChange: function(data) {
                        Rover.debug('updating data');
                        Rover.debug(data);
                        $scope.model[$scope.key] = data;
                    }
                };

                // Updates the view whenever the model changes.
                $scope.$watch('model', function(model) {
                    $scope.updateData();
                });
            }
        ]
    };
})

/**
 * Custom taggable inputs.
 */
.directive('uiAdvancedTaggableInput', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'directive-partials/ui-taggable-input.html',
        scope: {
            model: '=',
            options: '=?',
            key: '@',
            maxTags: '@'
        },
        controller: ['$scope', '$http', 'Rover',
            function($scope, $http, Rover) {

                // Default scope variables.
                $scope.data = [];
                $scope.options = $scope.options || [];
                $scope.maxTags = $scope.maxTags || 10;

                // Updates the model whenever necessary.
                $scope.updateData = function() {

                    // Array of tags.
                    if (angular.isArray($scope.model[$scope.key]))
                    {
                        // Setup data model, available options and displayed value.
                        angular.forEach($scope.model[$scope.key], function(tag) {

                            // Push ID to data model.
                            $scope.data.push(tag.id);

                            // Add tag to options list.
                            $scope.options.push({
                                id: tag.id,
                                title: tag.title
                            });
                        });
                    }

                    // Single tag
                    else if (angular.isObject($scope.model[$scope.key]))
                    {
                        Rover.debug('Inspecting tag object...');

                        if ($scope.model[$scope.key].id)
                        {
                            $scope.data = $scope.model[scope.key].id;
                            $scope.options = [{
                                id: $scope.model[$scope.key].id,
                                title: $scope.model[$scope.key].title
                            }];
                        }
                    }

                    // Default value.
                    else {
                        $scope.model[$scope.key] = $scope.maxTags > 1 ? [] : {};
                    }
                };
                $scope.updateData();

                // Selectize configuration.
                $scope.config = {
                    create: true,
                    valueField: 'id',
                    labelField: 'title',
                    searchField: ['title'],
                    maxOptions: 15,
                    maxItems: $scope.maxTags || 1,

                    /**
                     * Called anytime the user types into the input box.
                     *
                     * @param string query
                     * @param function callback
                     */
                    load: function(query, callback) {

                        // Performance check.
                        Rover.debug('Fetching tags...');
                        Rover.debug(query);
                        if (!query || !query.length) {
                            return callback();
                        }

                        // Queries the API for tags.
                        $http.get('/api/tag', {
                            params: {
                                query: query,
                                limit: 50
                            }
                        }).then(
                            function(response) {
                                callback(response.data);
                            },
                            function(response) {
                                callback();
                            }
                        );
                    },

                    /**
                     * Called anytime the user creates a new tag.
                     *
                     * @param string value
                     * @param object data
                     */
                    onOptionAdd: function(value, data) {

                        // Performance check.
                        if (value.trim().length < 1 || data.id) {
                            return;
                        }

                        // Create the new tag.
                        Rover.debug('Creating tag: ' + value);
                        $http.post('/api/tag', {
                            title: value.trim()
                        });
                    },

                    /**
                     * Called anytime the value of the input changes.
                     *
                     * @param array data
                     */
                    onChange: function(data) {
                        Rover.debug('updating data');
                        Rover.debug(data);
                        $scope.model[$scope.key] = data;
                    }
                };

                // Updates the view whenever the model changes.
                $scope.$watch('model', function(model) {
                    $scope.updateData();
                });
            }
        ]
    };
});
