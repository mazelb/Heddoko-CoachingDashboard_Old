/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   The rover service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 *
 *  TODO: Move helper methods to Utilities service (e.g. getState, etc.)
 *  TODO: Keep only UI-changing methods (e.g. openOverlay, etc.)
 */
angular.module('app.rover', [])

.service('Rover', ['$window', '$localStorage', '$sessionStorage', '$route', '$location', '$anchorScroll', '$log', '$timeout', 'Utilities',
    function($window, $localStorage, $sessionStorage, $route, $location, $anchorScroll, $log, $timeout, Utilities) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal =
            (window.location.hostname == 'localhost' ||
                window.location.hostname.match(/.*\.local$/i) ||
                window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;

        // User-specific hash. Used for user-specific data.
        // @deprecated
        this.userHash = Utilities.userHash;

        // User-namespaced storage.
        // @deprecated
        this.store = Utilities.store;
        this.state = Utilities.state;

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

            // Dashboard index page.
            dashboard: function() {
                $location.path('/dashboard');

            }.bind(this),

            // Group listing page.
            groups: function() {
                $location.path('/group');

            }.bind(this),

            // Group page.
            group: function(group) {

                // Update the selected group.
                if (group !== undefined) {
                    this.store.groupId = Utilities.getId(group);
                }

                Utilities.debug('Browsing to group #' + this.store.groupId);
                $location.path('/group/' + this.store.groupId);

            }.bind(this),

            // Profile page.
            profile: function(profile) {

                // Update the selected profile.
                if (profile !== undefined) {
                    this.store.profileId = Utilities.getId(profile);
                    profile = this.store.profileId > 0 ?
                        this.state.profile.list[this.store.profileId] : null;
                }

                // If the profile somehow belongs to a different group, reload the profile
                // list and related data before browsing to the profile page.
                if (profile && profile.groups && profile.groups.length &&
                    profile.groups[0].id != this.store.groupId) {

                    this.store.groupId = profile.groups[0].id;
                }

                Utilities.debug('Browsing to profile #' + this.store.profileId);
                $location.path('/profile/view');

            }.bind(this),

            // General page.
            path: function(path) {

                Utilities.debug('Browsing to path: ' + path);
                $location.path(path);

            }.bind(this),

            hash: function(hash) {

                // Update location hash.
                if ($location.hash() !== hash) {
                    $location.hash(hash);
                }

                // Or scroll to current hash.
                else {
                    $anchorScroll();
                }
            }
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

            $window.location.href = '/logout';

        }.bind(this);

        /**
         * @deprecated
         */
        this.hasState = function(namespace, id) {
            Utilities.debug('Rover.hasState is deprecated...');

            return namespace == 'profile' ?
                    Utilities.hasVar(namespace, id) :
                    Utilities.hasState(namespace, id);
        };
        this.getState = function(namespace, id, def) {
            Utilities.debug('Rover.getState is deprecated...');

            return namespace == 'profile' ?
                    Utilities.getVar(namespace, id, def) :
                    Utilities.getState(namespace, id, def);
        };
        this.setState = function(namespace, id, value) {
            Utilities.debug('Rover.setState is deprecated...');

            return namespace == 'profile' ?
                    Utilities.setVar(namespace, id, value) :
                    Utilities.setState(namespace, id, value);
        };
        this.debug = function(msg) {
            Utilities.debug('Rover.debug is deprecated...');
            Utilities.debug(msg);
        };
        this.error = function(msg) {
            Utilities.debug('Rover.error is deprecated...');
            Utilities.error(msg);
        };
        this.alert = function(msg) {
            Utilities.debug('Rover.alert is deprecated...');
            Utilities.alert(msg);
        };
        this.getConfig = function(key, defaultValue) {
            Utilities.debug('Rover.getConfig is deprecated...');
            return Utilities.getConfig(key, defaultValue);
        };
        this.setConfig = function(key, value) {
            Utilities.debug('Rover.setConfig is deprecated...');
            return Utilities.setConfig(key, value);
        };
        this.getId = function(obj) {
            Utilities.debug('Rover.getId is deprecated...');
            return Utilities.getId(obj);
        };
    }
]);
