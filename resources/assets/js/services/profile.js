/**
 * @file    profile.js
 * @brief   This service handles profile-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.services')

.factory('ProfileService', ['$http',
    function($http) {

        return {

            /**
             *
             */
            get: function(groupId) {

                // Add group ID to request parameters.
                var config = groupId ? {params: {group: groupId}} : {};

    			return $http.get('/api/profile', config);
    		},

            /**
             *
             */
            create: function(data, groupId) {

                // Add group ID to request parameters.
                var config = groupId ? {params: {group: groupId}} : {};

                return $http.post('/api/profile', data, config);
    		},

            /**
             *
             */
            update: function(id, data) {
                return $http.put('/api/profile/' + id, data);
    		},

            /**
             *
             */
            destroy: function(id) {
    			return $http.delete('/api/profile/' + id);
    		},

            /**
             * Updates the avatar.
             *
             * @param int id
             * @param object fileData
             * @return $http
             */
            setAvatar: function(id, fileData) {
                return $http.post('/api/profile/'+ id +'/photo', {image: fileData});
            }
        };
    }
]);
