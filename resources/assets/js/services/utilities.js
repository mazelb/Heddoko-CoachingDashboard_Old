/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   The Utilities service contains general helper methods to be used throughout the app.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.utilities', [])

.service('Utilities', ['$window', '$localStorage', '$sessionStorage', '$route', '$location', '$log', '$timeout',
    function($window, $localStorage, $sessionStorage, $route, $location, $log, $timeout) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal =
            ($window.location.hostname == 'localhost' ||
                $window.location.hostname.match(/.*\.local$/i) ||
                $window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;

        /**
         * Calculates the length of an associative array.
         *
         * @param object obj
         * @return int
         */
        this.getObjectLength = function(obj) {

            // Performance check.
            if (obj === null || obj === undefined || !obj.hasOwnProperty) {
                return 0;
            }

            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key) && key != 'length' && key[0] != '_') {
                    size++;
                }
            }

            return size;
        };

        /**
         * Retrieves the ID from an object.
         *
         * @param mixed obj
         * @return int
         */
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
            if (['string', 'number'].indexOf(typeof obj) !== -1) {
                return Number(obj);
            }

            // In any other case, assume the arguments are invalid.
            return 0;
        };

        /**
         * Logs a message to the console.
         *
         * @param string msg
         */
        this.debug = function(msg) {
            if (this.isLocal) {
                $log.debug(msg);
            }
        };
        this.error = function(msg) {
            $log.error(msg);
        };
        this.alert = function(msg) {
            $window.alert(msg);
        };

        /**
         * Displays the loading animation.
         */
        this.showLoading = function() {
            $('.page-loading-overlay').removeClass('loaded');
            $('.load_circle_wrapper').removeClass('loaded');
        };

        /**
         * Hides the loading animation.
         */
        this.hideLoading = function() {
            $('.page-loading-overlay').addClass('loaded');
            $('.load_circle_wrapper').addClass('loaded');
        };
    }
]);
