/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   The Utilities service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.services')

.service('Utilities', ['$window', '$localStorage', '$sessionStorage', '$route', '$location', '$log', '$timeout',
    function($window, $localStorage, $sessionStorage, $route, $location, $log, $timeout) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal =
            (window.location.hostname == 'localhost' ||
                window.location.hostname.match(/.*\.local$/i) ||
                window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;

        // Retrieves the ID from an object.
        this.getId = function(obj) {

            // Performance check.
            if (!obj) {
                return 0;
            }

            // If we have an object, return the ID property.
            if (typeof obj == 'object') {
                return Number(obj.id);
            }

            // If we have a string or number, assume its an ID.
            if (['string', 'numder'].indexOf(typeof obj) !== -1) {
                return Number(obj);
            }

            // In any other case, assume the arguments are invalid.
            return 0;
        };
    }
]);
