/**
 * @file    rover.js
 * @brief   The rover service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.rover', []).service('Rover', function($sessionStorage, $route, $location) {

    // Used to version the assets.
    this.version = '0.2.6';

    // Dev variables.
    this.timestamp = Date.now();
    this.isLocal = (window.location.hostname == 'localhost' ||
                window.location.hostname.match(/.*\.local$/i)) ? true : false;

    // User-specific hash. Used for user-specific data.
    this.userHash = $('meta[name="user-hash"]').attr('content');

    // Counts the # of requests being made, and displays the loading icon accordingly.
    this.backgroundProcessCount = 0;
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

        // Remove loading animation.
        if (this.backgroundProcessCount < 1) {
            this.hideLoading();
        }
    }.bind(this);

    // ...
    this.browse = {

        group: function(group) {
            this.debug('Browsing to group #' + group.id);
            $location.path('/dashboard/'+ group.id);
        }.bind(this),

        member: function(member) {
            this.debug('Browsing to member #' + member.id);
            $location.path('/dashboard/'+ $route.current.params.groupId +'/'+ member.id);
        }.bind(this)
    };

    // Logs a message to the console.
    this.log = function(msg) {
        if (this.isLocal && console) {
            console.log('Rover.log is deprecated...');
            console.log(msg);
        }
    };
    this.debug = function(msg) {
        if (this.isLocal && console) {
            console.log(msg);
        }
    };
    this.error = function(msg) {
        if (console) {
            console.log(msg);
        }
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

    // User-namespaced session storage object.
    $sessionStorage[this.userHash] = $sessionStorage[this.userHash] || {};
    this.sessionStorage = $sessionStorage[this.userHash];

    // TODO: refactor.
    this.assetVersion = function() {
        return this.isLocal ? this.timestamp : this.version;
    }.bind(this);

    // Dev variable indicating if the app is currently in a local environment.

    // return {
    //
    //     // Used to version the assets.
    //     version: "0.2.5",
    //
    //     // Used to version the assets in local environment.
    //     timestamp: Date.now(),
    //
    //     assetVersion: function() {
    //         return this.isLocal ? this.timestamp : this.version;
    //     },
    //
    //     // Displays or hides the loading animation.
    //     showLoading: function() {
    //         $('.page-loading-overlay').removeClass("loaded");
    //         $('.load_circle_wrapper').removeClass("loaded");
    //     },
    //     hideLoading: function() {
    //         $('.page-loading-overlay').addClass("loaded");
    //         $('.load_circle_wrapper').addClass("loaded");
    //     },
    //
    //     // Counts the # of requests being made, and displays the loading
    //     // icon accordingly.
    //     backgroundProcessCount: 0,
    //     addBackgroundProcess: function()
    //     {
    //         this.backgroundProcessCount++;
    //         this.log('Background processes: ' + this.backgroundProcessCount);
    //
    //         // Show loading animation.
    //         if (this.backgroundProcessCount === 1) {
    //             this.showLoading();
    //         }
    //     },
    //     doneBackgroundProcess: function()
    //     {
    //         this.backgroundProcessCount--;
    //         this.log('Background processes: ' + this.backgroundProcessCount);
    //
    //         // Remove loading animation.
    //         if (this.backgroundProcessCount < 1) {
    //             this.hideLoading();
    //         }
    //     },
    //
    //     // ...
    //     browse:
    //     {
    //         team: function(team) {
    //             Rover.log('Browse to team page: ' + team.id);
    //         },
    //
    //         member: function(member) {
    //             Rover.log('Browse to profile page: ' + member.id);
    //         }
    //     },
    //
    //     // Logs a message to the console.
    //     log: function(msg) {
    //         if (this.isLocal && console) {
    //             console.log(msg);
    //         }
    //     },
    //
    //     userHash: hash,
    //     sessionStorage: $sessionStorage[hash],
    //
    //     //
    //     isLocal: (window.location.hostname == 'localhost' ||
    //                 window.location.hostname.match(/.*\.local$/i)) ? true : false
    // };
});
