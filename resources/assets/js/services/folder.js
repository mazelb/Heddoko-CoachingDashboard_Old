/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   This service handles folder-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
angular.module('app.services')

.factory('FolderService', ['$http', 'apiEndpoint',
    function($http, apiEndpoint) {

        return {

            /**
             * Retrieves the folders and movements for a given folder.
             *
             * @param int profileId
             * @param int folderId
             * @return object $http
             */
            get: function(profileId, folderId) {
    			return $http.get(apiEndpoint + '/profile/' + profileId + '/folder/' + folderId);
    		},

            /**
             * Creates a new folder.
             *
             * @param int profileId
             * @param object data
             * @return object $http
             */
            create: function(profileId, data) {
                return $http.post(apiEndpoint + '/profile/' + profileId + '/folder', data);
    		},

            /**
             * Updates a folder.
             *
             * @param int profileId
             * @param int folderId
             * @param object data
             * @return object $http
             */
            update: function(profileId, folderId, data) {
                return $http.put(apiEndpoint + '/profile/' + profileId + '/folder/' + folderId, data);
    		},

            /**
             * Deletes a folder.
             *
             * @param int profileId
             * @param int folderId
             * @return object $http
             */
            destroy: function(profileId, folderId) {
    			return $http.delete(apiEndpoint + '/profile/' + profileId + '/folder/' + folderId);
    		}
        };
    }
]);
