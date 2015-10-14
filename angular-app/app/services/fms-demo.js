/**
 * @file    demo.js
 * @brief   The DemoService is a temporary factory used for the demo live FMS screens.
 * @author  Francis Amankrah (frank@heddoko.com)
 */
angular.module('app.services').service('FMSDemoFactory', function(Rover) {

    // Setups up the FMS data.
    Rover.state.fms_demo = Rover.state.fms_demo || {};
    this.data = Rover.state.fms_demo;

    //
    var dataTemplate = {
        isTestLive: false,
        iterations: []
    };

    // List of demo FMS tests.
    this.data.list = [

        // Active Straight-Leg Raise
        $.extend(true, {}, dataTemplate, {
            id: 'aslr',
            name: 'Active Straight-Leg Raise',
            iterations: ['left', 'right']
        })
    ];

    // Default demo: ASLR.
    this.data.current = this.data.list[0];

    // Default screen selection.
    this.data.views = ['sagittal', 'coronal', 'transverse'];
});
