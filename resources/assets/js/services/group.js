/**
 * @file    group.js
 * @brief   This service handles group-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.services')

.factory('GroupService', function($http) {

    return {

        /**
         *
         */
        get: function() {
			return $http.get('/api/group');
		},

        /**
         *
         */
        create: function(data) {
            return $http.post('/api/group', data);
		},

        /**
         *
         */
        update: function(id, data) {
            return $http.put('/api/group/' + id, data);
		},

        /**
         *
         */
        destroy: function(id) {
			return $http.delete('/api/group/' + id);
		},

        /**
         * Updates the avatar.
         *
         * @param int id
         * @param object fileData
         * @return $http
         */
        setAvatar: function(id, fileData) {
            return $http.post('/api/group/'+ id +'/photo', {image: fileData});
        }
    };
});
