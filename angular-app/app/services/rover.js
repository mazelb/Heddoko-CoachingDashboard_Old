/**
 * @file    rover.js
 * @brief   The rover service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.rover', []).service('Rover', function($sessionStorage, $route, $location) {

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

    // Shortcut to browse through app.
    this.browseTo = {

        // Dashboard index page.
        dashboard: function() {
            this.debug('Browsing to group dashboard index page.');
            $location.path('/dashboard');
        }.bind(this),

        // Group list page.
        groups: function() {
            this.debug('Browsing to group dashboard groups.');
            $location.path('/dashboard/list');
        }.bind(this),

        // Group page.
        group: function(group) {

            var id = this.getId(group);
            this.debug('Browsing to group #' + id);
            $location.path('/dashboard/'+ id);

        }.bind(this),

        // Member profile page.
        member: function(member) {

            var id = this.getId(member);
            this.debug('Browsing to member #' + id);
            $location.path('/dashboard/'+ this.state.group.selected.id +'/'+ id);

        }.bind(this)
    };
    this.browse = this.browseTo;

    //
    // Shortcuts to update the application state.
    //

    // Updates the selected group.
    this.updateGroup = function(group) {
        this.state.group.selected = group;
    }.bind(this);

    // Updates the selected member.
    this.updateMember = function(member) {
        this.state.member.selected = member;
    }.bind(this);

    //
    // General helper methods.
    //

    // Logs a message to the console.
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

    // Retrieves the ID of an object.
    this.getId: function(obj) {
        return ['string', 'numder'].indexOf(typeof obj) > 0 ? Number(obj) : Number(obj.id);
    };

    // User-namespaced session storage object.
    $sessionStorage[this.userHash] = $sessionStorage[this.userHash] || {};
    this.sessionStorage = $sessionStorage[this.userHash];
    this.state = $sessionStorage[this.userHash];
});
