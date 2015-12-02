/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   The rover service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
angular.module('app.rover', [])

.service('Rover', ['$window', '$localStorage', '$sessionStorage', '$route', '$location', '$log', '$timeout', 'Utilities',
    function($window, $localStorage, $sessionStorage, $route, $location, $log, $timeout, Utilities) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal =
            (window.location.hostname == 'localhost' ||
                window.location.hostname.match(/.*\.local$/i) ||
                window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;

        // User-specific hash. Used for user-specific data.
        // @deprecated
        this.userHash = $('meta[name="user-hash"]').attr('content');

        // User-namespaced storage.
        // @deprecated
        $localStorage[this.userHash] = $localStorage[this.userHash] || {};
        $sessionStorage[this.userHash] = $sessionStorage[this.userHash] || {};
        this.store = $localStorage[this.userHash];
        this.state = $sessionStorage[this.userHash];

        // Configuration object.
        this.store.config = this.store.config || {};

        // Counts the # of requests being made, and displays the loading icon accordingly.
        // We start the counter at 1 and decrement it once the application is running.
        // TODO: show a visual representation of the backgroundProcessCount variable.
        this.backgroundProcessCount = 1;
        this.addBackgroundProcess = function() {

            this.backgroundProcessCount++;
            Utilities.debug('Background processes: ' + this.backgroundProcessCount);

            // Show loading animation.
            if (this.backgroundProcessCount === 1) {
                Utilities.showLoading();
            }
        }.bind(this);
        this.doneBackgroundProcess = function() {

            if (this.backgroundProcessCount > 0) {
                this.backgroundProcessCount--;
            }

            Utilities.debug('Background processes: ' + this.backgroundProcessCount);

            // Remove loading animation. We delay this by half a second to let the app's
            // bindings to update
            if (this.backgroundProcessCount < 1)
            {
                $timeout(function() {
                    Utilities.hideLoading();
                }, 500);

                return;
            }
        }.bind(this);

        // Shortcut to browse through app.
        this.browseTo = {

            // Configuration page.
            config: function() {

                Utilities.debug('Browsing to configuration page.');
                $location.path('/settings');

            }.bind(this),

            // Dashboard index page.
            dashboard: function() {

                Utilities.debug('Browsing to dashboard index page.');
                $location.path('/dashboard');

            }.bind(this),

            // Group listing page.
            groups: function() {

                Utilities.debug('Browsing to group listings page.');
                $location.path('/group/list');

            }.bind(this),

            // Group page.
            group: function(group) {

                // Update the selected group.
                if (group !== undefined) {
                    this.store.groupId = Utilities.getId(group);
                }

                Utilities.debug('Browsing to group #' + this.store.groupId);
                $location.path('/group/view');

            }.bind(this),

            // Profile page.
            profile: function(profile) {

                // Update the selected profile.
                if (profile !== undefined) {
                    this.store.profileId = Utilities.getId(profile);
                }

                // If the profile somehow belongs to a different group, reload the profile
                // list and related data before browsing to the profile page.
                if (profile.groups && profile.groups.length && profile.groups[0].id != this.store.groupId) {
                    this.store.groupId = profile.groups[0].id;
                }

                Utilities.debug('Browsing to profile #' + this.store.profileId);
                $location.path('/profile/view');

            }.bind(this),

            // General page.
            path: function(path) {

                Utilities.debug('Browsing to path: ' + path);
                $location.path(path);

            }.bind(this)
        };
        this.browse = this.browseTo;

        //
        // Overlays.
        //

        // Overlay data.
        this.overlayData = {
            title: '',
            bodyTemplate: '',
            footerTemplate: ''
        };

        /**
         * Opens the movement thumbnail overlay.
         */
        this.openThumbnailSelector = function() {
            this.openOverlay(
                'Choose Thumbnail Cover',
                'thumbnail-selector/index.html',
                'thumbnail-selector/footer.html'
            );
        };

        /**
         * Opens the movement editor overlay.
         */
        this.openMovementEditor = function() {
            this.openOverlay(
                'Movement Editor',
                'movement-editor/index.html',
                'movement-editor/footer.html'
            );
        };

        /**
         * Opens the overlay screen.
         */
        this.openOverlay = function(title, bodyTemplate, footerTemplate) {
            this.debug('Opening overlay "' + title + '"');

            // Update overlay data.
            this.overlayData = {
                title: title,
                bodyTemplate: bodyTemplate,
                footerTemplate: footerTemplate
            };

            // Open overlay.
            $('#overlay-screen').modal();
        };

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

            Utilities.debug('Ending session...');

            $window.location.href = '/auth/logout';

        }.bind(this);

        //
        // General helper methods.
        //

        // Logs a message to the console.
        // @deprecated
        this.debug = function(msg) {
            Utilities.debug(msg);
        };
        this.error = function(msg) {
            Utilities.error(msg);
        };
        this.alert = function(msg) {
            Utilities.alert(msg);
        };

        // Handles retrieving/storing configuration data.
        this.getConfig = function(key, defaultValue) {
            return this.config[key] ? this.config[key] : defaultValue;
        }.bind(this);
        this.setConfig = function(key, value) {
            var oldValue = this.config[key];
            this.config[key] = value;
            return oldValue;
        }.bind(this);

        // Retrieves the ID of an object.
        // @deprecated
        this.getId = function(obj) {
            return Utilities.getId(obj);
        };
    }
]);
