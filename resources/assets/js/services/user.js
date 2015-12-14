/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   This service handles user-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.services')

.factory('UserService', ['$http', 'apiEndpoint',
    function($http, apiEndpoint) {

        return {

            /**
             *
             */
            get: function(id) {
    			return $http.get(apiEndpoint + '/user/' + id);
    		},

            /**
             *
             */
            create: function(data) {
                return $http.post(apiEndpoint + '/user', data);
    		},

            /**
             *
             */
            update: function(id, data) {
                return $http.put(apiEndpoint + '/user/' + id, data);
    		},

            /**
             *
             */
            destroy: function(id) {
    			return $http.delete(apiEndpoint + '/user/' + id);
    		},

            /**
             * Updates the avatar.
             *
             * @param int id
             * @param object fileData
             * @return $http
             */
            setAvatar: function(id, fileData) {
                return $http.post(apiEndpoint + '/user/'+ id +'/photo', {image: fileData});
            }
        };
    }
]);
