/**
 * @file    rover.js
 * @brief   The rover service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.rover', [])

.service('Rover', ['$window', '$sessionStorage', '$route', '$location', '$log', '$timeout',
    function($window, $sessionStorage, $route, $location, $log, $timeout) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal =
            (window.location.hostname == 'localhost' ||
                window.location.hostname.match(/.*\.local$/i) ||
                window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;

        // User-specific hash. Used for user-specific data.
        this.userHash = $('meta[name="user-hash"]').attr('content');

        // User-namespaced session storage object. This can be bound to the $scope variable
        // through each controller.
        $sessionStorage[this.userHash] = $sessionStorage[this.userHash] || {};
        this.state = $sessionStorage[this.userHash];

        // Configuration object.
        this.state.config = this.state.config || {};

        // Counts the # of requests being made, and displays the loading icon accordingly.
        // We start the counter at 1 and decrement it once the application is running.
        // TODO: show a visual representation of the backgroundProcessCount variable.
        this.backgroundProcessCount = 1;
        this.addBackgroundProcess = function() {

            this.backgroundProcessCount++;
            this.debug('Background processes: ' + this.backgroundProcessCount);

            // Show loading animation.
            if (this.backgroundProcessCount === 1) {
                this.showLoading();
            }
        }.bind(this);
        this.doneBackgroundProcess = function() {

            this.backgroundProcessCount--;
            this.debug('Background processes: ' + this.backgroundProcessCount);

            // Remove loading animation. We delay this by half a second to let the app's
            // bindings to update
            if (this.backgroundProcessCount < 1)
            {
                $timeout(function() {
                    this.hideLoading();
                }.bind(this), 500);
            }
        }.bind(this);

        // Shortcut to browse through app.
        this.browseTo = {

            // Configuration page.
            config: function() {

                this.debug('Browsing to configuration page.');
                $location.path('/config');

            }.bind(this),

            // Dashboard index page.
            dashboard: function() {

                this.debug('Browsing to dashboard index page.');
                $location.path('/dashboard');

            }.bind(this),

            // Group listing page.
            groups: function() {

                this.debug('Browsing to group listings page.');
                $location.path('/group/list');

            }.bind(this),

            // Group page.
            group: function(group) {

                // Navigate to the selected group.
                if (group === undefined) {
                    group = this.state.group.selected;
                }

                // Or to a specified group.
                else {
                    this.state.group.selected = group;
                }

                this.debug('Browsing to group #' + group.id);
                $location.path('/profile/list');

            }.bind(this),

            // Profile page.
            profile: function(profile) {

                // Navigate to the selected profile.
                if (!profile) {
                    profile = this.state.profile.selected;
                }

                // Or to a specified profile.
                else {
                    this.state.profile.selected = profile;
                }

                this.debug('Browsing to profile #' + profile.id);
                $location.path('/profile/view');

            }.bind(this),
            member: function(profile) {

                this.debug('Rover.browseTo.member is deprecated...');
                this.profile(profile);
            },

            // General page.
            path: function(path) {

                this.debug('Browsing to path: ' + path);
                $location.path(path);

            }.bind(this)
        };
        this.browse = this.browseTo;

        //
        // Events.
        //

        // Stores all event callbacks.
        this._events = {
            onEndSession: []
        };

        // Performs final tasks before logging out.
        this.onEndSession = function()
        {

        };
        // TODO: implement a hooks system, where each controller can add their methods.
        this.endSession = function()
        {
            // Clear the sessionStorage.
            $sessionStorage[this.userHash] = {};

            this.debug('Ending session...');

            window.location.assign('/auth/logout');

        }.bind(this);

        //
        // General helper methods.
        //

        // Logs a message to the console.
        this.debug = function(msg) {

            // For now, we will always log debug messages.
            if (this.isLocal || true) {
                $log.debug(msg);
            }
        };
        this.error = function(msg) {
            $log.error(msg);
        };
        this.alert = function(msg) {
            $window.alert(msg);
        };

        // Displays or hides the loading animation.
        this.showLoading = function() {
            $('.page-loading-overlay').removeClass("loaded");
            $('.load_circle_wrapper').removeClass("loaded");
        };
        this.hideLoading = function() {
            $('.page-loading-overlay').addClass("loaded");
            $('.load_circle_wrapper').addClass("loaded");
        };

        // TODO: create settings object in "this.state".
        // TODO: if value doesn't exist, set it to defaultValue.
        this.getConfig = function(key, defaultValue)
        {
            return defaultValue;
        };
        this.setConfig = function(key, value)
        {
            return value;
        };

        // Retrieves the ID of an object.
        this.getId = function(obj) {
            return ['string', 'numder'].indexOf(typeof obj) > 0 ? Number(obj) : Number(obj.id);
        };
    }
]);
