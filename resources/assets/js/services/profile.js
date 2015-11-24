/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   This service handles profile-related HTTP requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.services')

.factory('ProfileService', ['$http', '$filter',
    function($http, $filter) {

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

                // Add group ID to request parameters.
                var config = (data.groups && data.groups.length) ? {params: {group: data.groups[0]}} : {};

                return $http.put('/api/profile/' + id, data, config);
    		},

            /**
             *
             */
            destroy: function(id) {
    			return $http.delete('/api/profile/' + id);
    		},

            /**
             * Removes a profile avatar.
             *
             * @param int id
             * @return ...
             */
            destroyAvatar: function(id) {
    			return $http.delete('/api/profile/' + id + '/avatar');
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
            },

            /**
             * Formats profile details to be displayed in the UI.
             *
             * @param object profile
             * @return object
             */
            formatForDisplay: function(profile) {

                // Format "created_at" date.
                profile.created_at = profile.created_at || '';
                profile.created_at_formatted = profile.created_at.length > 0 ?
                    $filter('date')(profile.created_at.substr(0, 10), 'MMM d, yyyy') : '';

                // // Calculate the amount of feet in the total height.
                // profile.feet = profile.height > 0 ?
                //     Math.floor(profile.height / 0.3048) : '';
                //
                // // Calculate the amount of inches in the remaining height.
                // profile.inches = profile.height > 0 ?
                //     Math.round((profile.height / 0.3048 - profile.feet) * 12) : '';
                //
                // // Calculate the weight in pounds.
                // profile.weight_lbs = profile.mass > 0 ? Math.round(profile.mass / 0.453592) : '';

                return profile;
            },

            /**
             * Formats profile data before saving to database.
             *
             * @param object profile
             * @return object
             */
            formatForStorage: function(profile) {

                // Only copy relevant details.
                var formatted =
                {
                    id: profile.id,
                    first_name: profile.first_name || '',
                    last_name: profile.last_name || '',
                    height: profile.height || 0.0,
                    mass: profile.mass || 0.0,
                    dob: profile.dob || '',
                    gender: profile.gender || '',
                    phone: profile.phone || '',
                    email: profile.email || '',
                    medical_history: profile.medical_history || '',
                    injuries: profile.injuries || '',
                    notes: profile.notes || '',
                    meta: profile.meta || ''
                };

                // Format height into meters.
                if (profile.feet > 0 && profile.inches) {
                    formatted.height = (profile.feet + profile.inches / 12) * 0.3048;
                }

                // Format mass in kg.
                if (profile.weight_lbs > 0) {
                    formatted.mass = profile.weight_lbs * 0.453592;
                }

                // Format groups into an array of IDs.
                if (profile.groups && profile.groups.length > 0 && profile.groups[0].id)
                {
                    formatted.groups = [];
                    angular.forEach(profile.groups, function(group) {
                        formatted.groups.push(group.id);
                    });
                }

                return formatted;
            }
        };
    }
]);
