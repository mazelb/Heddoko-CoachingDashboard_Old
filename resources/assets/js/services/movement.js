/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   This service handles movement-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.services')

.factory('MovementService', ['$http',
    function($http) {

        return {

            /**
             * Base endpoint.
             */
            endpoint: '/api/movement/',

            /**
             * Retrieves the specified resource from the API.
             *
             * @param int id
             * @return object $http
             */
            get: function(id) {
    			return $http.get(this.endpoint + id);
    		},

            /**
             * Queries the API for the search term.
             *
             * @param object options
             * @return object $http
             */
            search: function(options) {
    			return $http.get(this.endpoint, {
                    params: {}
                });
    		},

            /**
             * Creates a new resource on the API.
             *
             * @param int profileId
             * @param object data
             * @return object $http
             */
            create: function(profileId, data) {
                return $http.post(this.endpoint, data, {params: {profileId: profileId}});
    		},

            /**
             * Updates an API resource.
             *
             * @param int id
             * @param object data
             * @return object $http
             */
            update: function(id, data) {
                return $http.put(this.endpoint + id, data);
    		},

            /**
             * Deletes an API resource.
             *
             * @param int id
             * @return object $http
             */
            destroy: function(id) {
    			return $http.delete(this.endpoint + id);
    		}
        };
    }
]);
