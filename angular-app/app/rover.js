/**
 * @file    rover.js
 * @brief   The rover service is used throughout the app and should be made available to other
 *          modules and controllers through dependency injection.
 * @author  Francis Amankrah (frank@heddoko.com)
 */
// angular.module('app.controllers').factory('Rover', ['$sessionStorage', function($sessionStorage)
// {
//     // User-specific hash. Used for user specific data.
//     var hash = $('meta[name="user-hash"]').attr('content');
//
//     // User-namespaced session storage object.
//     $sessionStorage[hash] = $sessionStorage[hash] || {};
//
//     // Dev variable indicating if the app is currently in a local environment.
//
//     return {
//         version: "0.2.3",       // Used to version the assets.
//         timestamp: Date.now(),  // Used to version the assets in development.
//         userHash: hash,
//         sessionStorage: $sessionStorage[hash],
//         isLocal: (window.location.hostname == 'localhost' ||
//                     window.location.hostname.match(/.*\.local$/i)) ? true : false
//     };
// }]);
