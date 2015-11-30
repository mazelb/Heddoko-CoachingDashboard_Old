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

.factory('ProfileService', ['$http', '$filter', 'Utilities', 'Rover',
    function($http, $filter, Utilities, Rover) {

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
                    tag_id: Utilities.getId(profile.tag_id) || '',
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
                if (profile.groups && profile.groups.length > 0) {
                    formatted.groups = profile.groups.map(Utilities.getId);
                }

                // Make sure primary tag is an ID. If we have a newly created tag without an ID,
                // we'll let the API know we want to create a new tag in the process.
                if (profile.primary_tag && profile.primary_tag.length)
                {
                    if (Utilities.getId(profile.primary_tag) > 0) {
                        formatted.tag_id = Utilities.getId(profile.primary_tag);
                    }

                    else {
                        formatted.primary_tag_title = profile.primary_tag;
                    }
                }

                // Format secondary tags into an array of IDs.
                if (profile.secondary_tags && profile.secondary_tags.length > 0)
                {
                    formatted.secondary_tags = [];
                    formatted.secondary_tag_titles = [];
                    angular.forEach(profile.secondary_tags, function(tag) {

                        // If tag exists, retrieve its ID.
                        if (Utilities.getId(tag) > 0) {
                            formatted.secondary_tags.push(Utilities.getId(tag));
                        }

                        // Else, let API know we want to create new tags.
                        else {
                            formatted.secondary_tag_titles.push(tag);
                        }
                    });
                    formatted.secondary_tags = profile.secondary_tags.map(Utilities.getId);
                }

                Rover.debug('Formatted profile details:');
                Rover.debug(formatted);

                return formatted;
            }
        };
    }
]);
