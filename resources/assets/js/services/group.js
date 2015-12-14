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
             *
             */
            get: function() {
    			return $http.get(apiEndpoint + '/group');
    		},

            /**
             *
             */
            create: function(data) {
                return $http.post(apiEndpoint + '/group', data);
    		},

            /**
             *
             */
            update: function(id, data) {
                return $http.put(apiEndpoint + '/group/' + id, data);
    		},

            /**
             *
             */
            destroy: function(id) {
    			return $http.delete(apiEndpoint + '/group/' + id);
    		},

            /**
             * Updates the avatar.
             *
             * @param int id
             * @param object fileData
             * @return $http
             */
            setAvatar: function(id, fileData) {
                return $http.post(apiEndpoint + '/group/'+ id +'/photo', {image: fileData});
            }
        };
    }
]);
