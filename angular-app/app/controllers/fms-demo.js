/**
 * @file    fms.js
 * @brief   Controller for demo FMS tests. Kept separate so that the actual FMS tests can be
 *          developed independently.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
angular.module('app.controllers')

.controller('FMSDemoController', ['$scope', '$routeParams', 'FMSDemoFactory', 'Rover', 'assetVersion',
    function($scope, $routeParams, FMSDemoFactory, Rover, assetVersion) {

        // Dev.
        Rover.debug('DemoFMSController');
        $scope.isDemo = true;
        $scope.assetVersion = assetVersion;

        // Scope parameters.
        $scope.params = $routeParams;
        if (!$scope.params.step) {
            $scope.params.step = 'test';
        }

        // Other scope variables.
        $scope.isTestLive = false;
        $scope.fms = FMSDemoFactory.data;

        // Test-related methods.
        $scope.run =
        {
            name: null,

            // Records a test run.
            start: function()
            {
                if (!this.name) {
                    this.prepare();
                }

                this.setStatus('live');
                $scope.isTestLive = true;

                // Play demo videos...
                $('.demo-test').each(function() {
                    this.currentTime = 0;
                    this.play();
                });
            },

            // Stops a test run.
            end: function()
            {
                this.setStatus('saved');
                $scope.isTestLive = false;

                // Stop demo videos...
                $('.demo-test').each(function() {
                    this.pause();
                });

                this.moveToNextTrial();
            },

            pain: function()
            {
                this.setStatus('pain');
                $scope.isTestLive = false;

                // Stop demo videos...
                $('.demo-test').each(function() {
                    this.pause();
                });

                this.moveToNextTrial();
            },

            fault: function()
            {
                this.setStatus('pending');
                $scope.isTestLive = false;
                FMSDemoFactory.data.runs[this.name].numFaults++;

                // Stop demo videos...
                $('.demo-test').each(function() {
                    this.pause();
                    this.currentTime = 0;
                });
            },

            // ...
            moveToNextTrial: function(iteration, skipOtherIterations)
            {
                // Loop through trials in current or specified iteration.
                var i, trial, name;
                for (i = 0; i < FMSDemoFactory.data.current.trials.length; i++)
                {
                    // Check if trial has already been run.
                    trial = FMSDemoFactory.data.current.trials[i];
                    name = this.getName(trial, iteration);
                    if (!FMSDemoFactory.data.runs[name] || FMSDemoFactory.data.runs[name] == 'pending')
                    {
                        // Automatically setup next trial.
                        FMSDemoFactory.data.current.trial = trial;
                        FMSDemoFactory.data.current.iteration = iteration || FMSDemoFactory.data.current.iteration;
                        this.prepare();

                        // Reset demo videos...
                        $('.demo-test').each(function() {
                            this.currentTime = 0;
                        });

                        Rover.debug('Automatic next trial: ' + name);
                        return true;
                    }
                }

                // If all trials have been run, loop through iterations in this test.
                if (!skipOtherIterations && FMSDemoFactory.data.current.iterations.length > 1)
                {
                    for (i = 0; i < FMSDemoFactory.data.current.iterations.length; i++)
                    {
                        if (this.moveToNextTrial(FMSDemoFactory.data.current.iterations[i], true)) {
                            return true;
                        }
                    }
                }
            },

            submit: function()
            {
                FMSDemoFactory.data.current.isTestSubmitted = true;

                $('.demo-test').each(function() {
                    this.currentTime = 0;
                });
            },

            // ...
            prepare: function()
            {
                // First, make sure we have selected an interation and trial.
                if (!FMSDemoFactory.data.current.iteration || FMSDemoFactory.data.current.iteration.length < 1) {
                    FMSDemoFactory.data.current.iteration = 'main';
                }
                if (!FMSDemoFactory.data.current.trial) {
                    FMSDemoFactory.data.current.trial = FMSDemoFactory.data.current.trials[0];
                }

                // Next, we generate a unique key for this test run.
                var key = this.getName();
                Rover.debug('Preparing test run: ' + key);

                // Finally, we create an object to store the test results.
                this.name = key;
                FMSDemoFactory.data.runs[key] = $.extend(true, {}, FMSDemoFactory.runDataTemplate, {});
            },

            getName: function(trial, iteration, test)
            {
                // Retrieve default objects.
                trial = trial || FMSDemoFactory.data.current.trial || FMSDemoFactory.data.current.trials[0];
                iteration = iteration || FMSDemoFactory.data.current.iteration || 'main';
                test = test || FMSDemoFactory.data.current;

                // Name format: "{fms_id}.{iteration}.{trial}"
                return test.id + '.' + iteration + '.' + trial.name;
            },

            setStatus: function(status)
            {
                if (!this.name) {
                    this.prepare();
                }

                FMSDemoFactory.data.runs[this.name].status = status;
            },

            getStatus: function(trial)
            {
                // Get the status of a specific trial.
                if (trial)
                {
                    var key = this.getName(trial);

                    return FMSDemoFactory.data.runs[key] ? FMSDemoFactory.data.runs[key].status : null;
                }

                // Or the current trial.
                if (!this.name) {
                    this.prepare();
                }

                return FMSDemoFactory.data.runs[this.name].status;
            }
        };

        // Analysis-related variables.
        $scope.analysis =
        {
            trialPane: false,
            planePane: false,
            playbackRatePane: false,
            playbackRate: 1,

            play: function()
            {
                // Play demo videos...
                $('.demo-analysis').each(function() {
                    this.currentTime = 0;
                    this.play();
                });
            },

            setPlaybackRate: function(rate)
            {
                this.playbackRate = rate;
                
                // Update playback rate on demo videos...
                $('.demo-analysis').each(function() {
                    this.playbackRate = rate;
                });
            },

            pause: function()
            {
                // Pause demo videos...
                $('.demo-analysis').each(function() {
                    this.pause();
                });
            },

            reset: function()
            {
                // Reset demo videos...
                $('.demo-analysis').each(function() {
                    this.pause();
                    this.currentTime = 0;
                });
            }
        };

        // Select a default trial.
        if (!FMSDemoFactory.data.current.trial) {
            FMSDemoFactory.data.current.trial = FMSDemoFactory.data.current.trials[0];
        }
    }
]);
