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

.service('Utilities', ['$window', '$localStorage', '$sessionStorage', '$route', '$location', '$log', '$timeout', 'isLocalEnvironment',
    function($window, $localStorage, $sessionStorage, $route, $location, $log, $timeout, isLocalEnvironment) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal = isLocalEnvironment;

        // User-specific hash. Used for user-specific data.
        this.userHash = $('meta[name="user-hash"]').attr('content');

        // User-namespaced storage.
        $localStorage[this.userHash] = $localStorage[this.userHash] || {};
        $sessionStorage[this.userHash] = $sessionStorage[this.userHash] || {};
        this.store = $localStorage[this.userHash];
        this.state = $sessionStorage[this.userHash];

        // Ephemeral storage.
        this.temp = {};

        // Configuration object.
        this.store.config = this.store.config || {};

        // Colours.
        this.color =
        {
            blue: '#2c3a46',
            blueDark: '#1c242c',
            darkBlue: '#1c242c',
            danger: '#db5031',
            heddokoGreen: '#3bd6b2',
            info: '#8170ca',
            orange: '#fabd39',
            silver: '#cbd4e3',
            textColor: '#ddd',
            textColour: '#ddd',
            textColorBlue: '#5b707d',
            textColourBlue: '#5b707d',
            warning: '#eec95a'
        };
        this.colour = this.color;

        /**
         * Retrieves a configuration value.
         *
         * @param string key
         * @param mixed defaultValue
         * @return mixed
         */
        this.getConfig = function(key, defaultValue) {
            return this.store.config[key] ? this.store.config[key] : defaultValue;
        }.bind(this);

        /**
         * Sets a configuration value.
         *
         * @param string key
         * @param mixed value
         * @return mixed
         */
        this.setConfig = function(key, value) {
            this.store.config[key] = value;
            return value;
        }.bind(this);

        /**
         * Checks whether a state variable is defined.
         *
         * @param string namespace
         * @param string id
         * @return bool
         */
        this.hasState = function(namespace, id) {
            return (this.state[namespace] && this.state[namespace].list['_' + id]) ? true : false;
        };

        /**
         * Retrieves a state variable.
         *
         * @param string namespace
         * @param string id
         * @param mixed def
         * @return bool
         */
        this.getState = function(namespace, id, def) {
            return this.hasState(namespace, id) ? this.state[namespace].list['_' + id] : def;
        };

        /**
         * Sets a state variable.
         *
         * @param string namespace
         * @param string id
         * @param mixed value
         */
        this.setState = function(namespace, id, value) {

            // Setup namespace.
            if (!this.state[namespace]) {
                this.state[namespace] = {
                    list: {
                        length: 0
                    }
                };
            }

            // Update namespace counter.
            if (!this.hasState(namespace, id)) {
                this.state[namespace].list.length++;
            }

            // Add an underscore to the state key, so that we may store objects by ID
            // without any problems.
            this.state[namespace].list['_' + id] = value;
        };

        /**
         * Checks whether a namespace is configured in the ephemeral storage.
         *
         * @param string namespace
         * @return bool
         */
        this.hasNamespace = function(namespace) {
            return (this.temp[namespace] && this.temp[namespace].list);
        };

        /**
         * Checks the length of a list in the specified namespace.
         *
         * @param string namespace
         * @return int
         */
        this.getNamespaceLength = function(namespace) {
            return this.hasNamespace(namespace) ? this.temp[namespace].list.length : 0;
        }.bind(this);

        /**
         * Checks whether an ephemeral variable is defined within a namespace.
         *
         * @param string namespace
         * @param string id
         * @return bool
         */
        this.hasVar = function(namespace, id) {
            return (this.temp[namespace] && this.temp[namespace].list['_' + id]) ? true : false;
        };

        /**
         * Retrieves an ephemeral variable from the specified namespace.
         *
         * @param string namespace
         * @param string id
         * @param mixed def
         * @return bool
         */
        this.getVar = function(namespace, id, def) {
            return this.hasVar(namespace, id) ? this.temp[namespace].list['_' + id] : def;
        };

        /**
         * Retrieves all ephemeral variables within the specified namespace.
         *
         * @param string namespace
         * @param mixed def
         * @return mixed
         */
        this.listVars = function(namespace, def) {
            return this.hasNamespace(namespace) ? this.temp[namespace].list : def;
        };

        /**
         * Sets an ephemeral variable in the specified namespace.
         *
         * @param string namespace
         * @param string id
         * @param mixed value
         */
        this.setVar = function(namespace, id, value) {

            // Setup namespace.
            if (!this.temp[namespace]) {
                this.resetVarNamespace(namespace);
            }

            // Update namespace counter.
            if (!this.hasVar(namespace, id)) {
                this.temp[namespace].list.length++;
            }

            // We add an underscore to the key so that we may store objects by ID without any problems.
            this.temp[namespace].list['_' + id] = value;
        };

        /**
         * Resets an ephemeral namespace.
         *
         * @param string namespace
         */
        this.resetVarNamespace = function(namespace) {
            this.temp[namespace] = {
                list: {
                    length: 0
                }
            };

            return namespace;
        };

        /**
         * Formats an embed parameter for an API query.
         *
         * @param array|string embed
         * @return string
         */
        this.getEmbedParameter = function(embed) {

            // Concatenate arrays into a string.
            if (angular.isArray(embed)) {
                return embed.join(',');
            }

            // If embed is a string, assume it's already properly formatted.
            if (angular.isString(embed)) {
                return embed;
            }

            return '';
        };

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
