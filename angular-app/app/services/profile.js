/**
 * @file    profile.js
 * @brief   This service handles profile-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.services')

.factory('ProfileService', function($http) {

    return {

        /**
         *
         */
        get: function(groupId) {
			return $http.get('/api/profile', {params: {
                group: groupId
            }});
		},

        /**
         *
         */
        create: function(data) {
            return $http.post('/api/profile', data);
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
});
