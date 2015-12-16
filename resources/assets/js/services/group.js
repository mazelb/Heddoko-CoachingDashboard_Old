/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   This service handles group-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.services')

.factory('GroupService', ['$http', 'apiEndpoint',
    function($http, apiEndpoint) {

        return {

            /**
             * Base endpoint.
             */
            endpoint: apiEndpoint + '/groups/',

            /**
             *
             */
            get: function() {
    			return $http.get(this.endpoint);
    		},

            /**
             *
             */
            create: function(data) {
                return $http.post(this.endpoint, data);
    		},

            /**
             *
             */
            update: function(id, data) {
                return $http.put(this.endpoint + id, data);
    		},

            /**
             *
             */
            destroy: function(id) {
    			return $http.delete(this.endpoint + id);
    		},

            /**
             * Updates the avatar.
             *
             * @param int id
             * @param object fileData
             * @return $http
             */
            setAvatar: function(id, fileData) {
                return $http.post(this.endpoint + id + '/avatar', {image: fileData});
            }
        };
    }
]);
