/**
 * @file    rover.js
 * @brief   The rover service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.rover', []).factory('Rover', function($sessionStorage, $routeProvider) {

    // User-specific hash. Used for user specific data.
    var hash = $('meta[name="user-hash"]').attr('content');

    // User-namespaced session storage object.
    $sessionStorage[hash] = $sessionStorage[hash] || {};

    // Dev variable indicating if the app is currently in a local environment.

    return {

        // Used to version the assets.
        version: "0.2.5",

        // Used to version the assets in local environment.
        timestamp: Date.now(),

        assetVersion: function() {
            return this.isLocal ? this.timestamp : this.version;
        },

        // Displays or hides the loading animation.
        showLoading: function() {
            $('.page-loading-overlay').removeClass("loaded");
            $('.load_circle_wrapper').removeClass("loaded");
        },
        hideLoading: function() {
            $('.page-loading-overlay').addClass("loaded");
            $('.load_circle_wrapper').addClass("loaded");
        },

        // Counts the # of requests being made, and displays the loading
        // icon accordingly.
        backgroundProcessCount: 0,
        addBackgroundProcess: function()
        {
            this.backgroundProcessCount++;
            this.log('Background processes: ' + this.backgroundProcessCount);

            // Show loading animation.
            if (this.backgroundProcessCount === 1) {
                this.showLoading();
            }
        },
        doneBackgroundProcess: function()
        {
            this.backgroundProcessCount--;
            this.log('Background processes: ' + this.backgroundProcessCount);

            // Remove loading animation.
            if (this.backgroundProcessCount < 1) {
                this.hideLoading();
            }
        },

        // ...
        browse:
        {
            team: function(team) {
                Rover.log('Browse to team page: ' + team.id);
            },

            member: function(member) {
                Rover.log('Browse to profile page: ' + member.id);
            }
        },

        // Logs a message to the console.
        log: function(msg) {
            if (this.isLocal && console) {
                console.log(msg);
            }
        },

        userHash: hash,
        sessionStorage: $sessionStorage[hash],

        //
        isLocal: (window.location.hostname == 'localhost' ||
                    window.location.hostname.match(/.*\.local$/i)) ? true : false
    };
});
