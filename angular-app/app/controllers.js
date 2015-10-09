/**
 * @file controllers.js
 * @brief This file controls the calls to the back end and the navigation within the dashboard
 * @author Maxwell Mowbray (max@heddoko.com)
 * @date June 2015
 */
angular.module("app.controllers", [])

// StepController
.controller('StepController', ['$scope', 'Rover',
    function($scope, Rover) {

      /**
       * @brief This is the Step Controller which is only used on the 'dashboard' page to control the flow between the 4 embedded pages therein
       * @param $scope (current page step used by the view)
       * @return void
       */

      var dashboard_pages = {
        select_and_create_team: 0,
        view_team_members: 1,
        view_athlete_stats: 2
      };

      $scope.current_dashboard_page = dashboard_pages.select_and_create_team;

      $scope.backwardsStep = function() {
        if ($scope.current_dashboard_page > 0) {
          $scope.current_dashboard_page--;
        }
      };

      $scope.forwardsStep = function() {
        if ($scope.current_dashboard_page < 3) {
          $scope.current_dashboard_page++;
        }
      };
    }
])

// FMSFormController
.controller("FMSFormController", ["$scope", '$sessionStorage', 'FMSForm', "loggit", 'Rover',
    function($scope, $sessionStorage, FMSForm, loggit, Rover) {

    	/**
    	* @brief This is the FMS Form controller used on the FMS Form submission page and the previous FMS Form retrieval page
    	* It keeps an eye on the currently selected athlete and retrieves their forms when that variable changes
    	* Furthermore, it takes care of sending new FMS form data to the server
    	* @param $scope and FMSForm, the factory which allows for the sending and retrieving of FMS forms
    	* @return void
    	*/

    	Rover.state.show_fms_edit = false;
    	$scope.waiting_server_response = false;
    	Rover.state.selected_fms_form = null;

    $scope.$watch('data.member.selected', function(new_selected_athlete_value) {

      if (new_selected_athlete_value === null) {
        return;
      }

      FMSForm.get($scope.data.member.selected.id)
        .success(function(athletes_fms_forms_response) {
          $scope.data.member.selected.fms_forms = athletes_fms_forms_response;
        })
        .error(function(error_msg) {
          console.log('error retrieving forms from the database' + error_msg);
        });

    }, true);

    $scope.submitFMSForm = function() {

    		$scope.waiting_server_response = true;

    		console.debug(Rover.state.fms_form_data);

      FMSForm.create($scope.data.member.selected.id, $scope.data.fms_form_data, $scope.data.fms_form_movement_files)
        .success(function(updated_fms_form_data) {

    				console.log(updated_fms_form_data);



          Rover.state.fms_form_data = {}; //reset the form data upon successful FMS form submission
          $scope.data.member.selected.fms_forms = updated_fms_form_data; //store the updated FMS forms sent back by the server
    				$scope.waiting_server_response = false;
    				loggit.logSuccess("FMS Form successfully submitted");
        })
        .error(function(err) {
    		loggit.logError("There was an error submitting the FMS Form");
    		$scope.waiting_server_response = false;
        });
    };

    $scope.updateFMS = function() {

    		$scope.waiting_server_response = true;

      FMSForm.update($scope.data.member.selected.id, Rover.state.selected_fms_form)
        .success(function(updated_fms_form_data) {
          $scope.data.member.selected.fms_forms = updated_fms_form_data; //store the updated FMS forms sent back by the server
    				$scope.waiting_server_response = false;
    				Rover.state.show_fms_edit = false;
    				loggit.logSuccess("FMS Form successfully updated");
        })
        .error(function() {
    		loggit.logError("There was an error while attempting to update the FMS Form");
    		$scope.waiting_server_response = false;
        });
    };

    $scope.fmsdisplay = function(form) {
      $scope.data.selected_fms_form = form;
    };
    }
])

// MovementController.
.controller("MovementController", ["$scope", '$sessionStorage', 'Movements', "loggit", 'Rover',
  function($scope, $sessionStorage, Movements, loggit, Rover) {

	/**
	* @brief The movement controller takes care of uploading movement data (files) from the suit
	* @param $scope, Movements
	* @return void
	*/

	$scope.uploadMovements = function() {

		Movements.upload($scope.data.member.selected.id, Rover.state.selected_sport_movement.id, $scope.data.new_movement_submission_data)
		.error(function(err_msg) {
			loggit.logError('error uploading movements to server');
			console.log(err_msg);
		})
		.success(function(succ_msg) {
			Rover.state.selected_sport_movement = Rover.state.new_movement_submission_data = null;
			loggit.logSuccess('movements succesfully uploaded to server');
			console.log(succ_msg);
		});

    };

  }
])

// MovementScreenController
.controller("MovementScreenController", ["$scope", '$sessionStorage', "loggit", 'MovementStore', '$document', 'Rover',
    function($scope, $sessionStorage, loggit, MovementStore, $document, Rover) {

    $scope.select_movement = function(movement) {
    	MovementStore.current_movement_page = movement;
    };

    // Save an instance of the "rover" variable in the scope.
    //$scope.rover = rover;

    $scope.data = MovementStore; //store the movement_pages and current_movement_page in this store
    							//so it can be shared by the nav bar and the movement pages

    // Bind all test video playback rates to the speed selection menu.
    // console.log('testing angular.element');
    // angular.element('.test-video');
    // $scope.data.playbackRate = 1.0;

    $scope.SelectTrial = function(new_current_trial){
    	MovementStore.current_movement_page.active_trial = new_current_trial;
    };

    $scope.StartTest = function(){
    	MovementStore.current_movement_page.active_side.active_trial.status = 'recording';

    	document.getElementById("FrontVideoPlayer").currentTime = 0;
    	document.getElementById("FrontVideoPlayer").play();

    	document.getElementById("TopVideoPlayer").currentTime = 0;
    	document.getElementById("TopVideoPlayer").play();

    	document.getElementById("SideVideoPlayer").currentTime = 0;
    	document.getElementById("SideVideoPlayer").play();
    };

    $scope.EndTest = function()
    {
    	document.getElementById("FrontVideoPlayer").pause();
    	document.getElementById("TopVideoPlayer").pause();
    	document.getElementById("SideVideoPlayer").pause();

    	if(MovementStore.current_movement_page.active_side.active_trial.status != 'recording')
    	{
    		return;
    	}
    	MovementStore.current_movement_page.active_side.active_trial.status = 'stopped';
    };

    $scope.IndicateTestPain = function(){
    	MovementStore.current_movement_page.active_side.active_trial.status = 'pain';

    	document.getElementById("FrontVideoPlayer").pause();
    	document.getElementById("TopVideoPlayer").pause();
    	document.getElementById("SideVideoPlayer").pause();
    };

    $scope.CancelCurrentTrial = function(){

    	document.getElementById("FrontVideoPlayer").currentTime = 0;
    	document.getElementById("TopVideoPlayer").currentTime = 0;
    	document.getElementById("SideVideoPlayer").currentTime = 0;

    	MovementStore.current_movement_page.active_side.active_trial.status = 'idle';
    };

    $scope.SaveCurrentTrial = function(){
    	//perform some action to actually save the current trial data

    	//update the status
    	MovementStore.current_movement_page.active_side.active_trial.status = 'saved';

    	//if there is another trial available to complete
    	var index = MovementStore.current_movement_page.active_side.trials.indexOf(MovementStore.current_movement_page.active_side.active_trial);

    	if(index < MovementStore.current_movement_page.active_side.trials.length)
    	{
    		MovementStore.current_movement_page.active_side.active_trial = MovementStore.current_movement_page.active_side.trials[index + 1];

    		document.getElementById("FrontVideoPlayer").currentTime = 0;
    		document.getElementById("TopVideoPlayer").currentTime = 0;
    		document.getElementById("SideVideoPlayer").currentTime = 0;
    	}
    };

    $scope.SaveCurrentTrialPain = function(){

    	MovementStore.current_movement_page.active_side.active_trial.status = 'saved_pain';

    	//if there is another trial available to complete
    	var index = MovementStore.current_movement_page.active_side.trials.indexOf(MovementStore.current_movement_page.active_side.active_trial);

    	if(index < MovementStore.current_movement_page.active_side.trials.length)
    	{
    		MovementStore.current_movement_page.active_side.active_trial = MovementStore.current_movement_page.active_side.trials[index + 1];

    		document.getElementById("FrontVideoPlayer").currentTime = 0;
    		document.getElementById("TopVideoPlayer").currentTime = 0;
    		document.getElementById("SideVideoPlayer").currentTime = 0;
    	}
    };

    $scope.SubmitTest = function() {
    	document.getElementById("FrontVideoPlayer").currentTime = 0;
    	MovementStore.current_movement_page.submitted = true;

    	if (MovementStore.current_movement_page.active_side == MovementStore.current_movement_page.sides[0])
    	{
    		MovementStore.current_movement_page.active_side.test_page_data.other_side_warning = true;
    	}
    };

    $scope.PlayAnalysisVideo = function()
    {
        var playbackRate = MovementStore.current_movement_page.analysis_page_data.playback_rate || 1.0;
        console.log('Playback rate: ' + playbackRate);

    	document.getElementById("AnalysisSideVideoPlayer").playbackRate =
            document.getElementById("AnalysisFrontVideoPlayer").playbackRate =
            document.getElementById("AnalysisHorizontalVideoPlayer").playbackRate = playbackRate;

    	document.getElementById("AnalysisSideVideoPlayer").play();
    	document.getElementById("AnalysisFrontVideoPlayer").play();
    	document.getElementById("AnalysisHorizontalVideoPlayer").play();
    };

    $scope.ForwardAnalysisVideo = function()
    {
    	//needs to be implemented
    };

    $scope.PauseAnalysisVideo = function()
    {
    	document.getElementById("AnalysisSideVideoPlayer").pause();
    	document.getElementById("AnalysisFrontVideoPlayer").pause();
    	document.getElementById("AnalysisHorizontalVideoPlayer").pause();
    };

    $scope.ResetAnalysisVideo = function()
    {
    	document.getElementById("AnalysisSideVideoPlayer").pause();
    	document.getElementById("AnalysisSideVideoPlayer").currentTime = 0;
    	document.getElementById("AnalysisFrontVideoPlayer").pause();
    	document.getElementById("AnalysisFrontVideoPlayer").currentTime = 0;
    	document.getElementById("AnalysisHorizontalVideoPlayer").pause();
    	document.getElementById("AnalysisHorizontalVideoPlayer").currentTime = 0;
    };

    $scope.tbl_data =[];

    for (var i = 0; i < 5; i++)
    {
    	$scope.tbl_data.push({});
    }

    $scope.DataTableToggleMovSel = function(newly_toggled_movement){

    	newly_toggled_movement.data_tbl_selected = !newly_toggled_movement.data_tbl_selected;

    	var tbl_data = [];
    	var movement_row = [];

    	for (i = 0; i < MovementStore.current_movement_page.active_side.active_trial.joints.length; i++)
    	{
    		for (var j = 0; j < MovementStore.current_movement_page.active_side.active_trial.joints[i].movements.length; j++)
    		{
    			if(MovementStore.current_movement_page.active_side.active_trial.joints[i].movements[j].data_tbl_selected)
    			{
    				movement_row.push({val:MovementStore.current_movement_page.active_side.active_trial.joints[i].movements[j].name});
    			}
    			else
    			{
    				movement_row.push({});
    			}

    		}
    	}

    	tbl_data.push(movement_row);

    	for (i = 0; i < 4; i++)
    	{
    		var new_row = [];

    		for (var k = 0; k < MovementStore.current_movement_page.active_side.active_trial.joints.length; k++)
    		{
    			for (var m = 0; m < MovementStore.current_movement_page.active_side.active_trial.joints[k].movements.length; m++)
    			{
    				if(MovementStore.current_movement_page.active_side.active_trial.joints[k].movements[m].data_tbl_selected)
    				{
    					new_row.push({ val: '0.1' + i});
    				}
    				else
    				{
    					new_row.push({});
    				}
    			}
    		}

    		tbl_data.push(new_row);
    	}

    	$scope.tbl_data = tbl_data;

    };

    $scope.UpdateDataGraphSeries = function(){

    	$scope.lineData.series = [];

    	for (var i = 0; i < MovementStore.current_movement_page.active_side.active_trial.joints.length; i++)
    	{
    		for (var j = 0; j < MovementStore.current_movement_page.active_side.active_trial.joints[i].movements.length; j++)
    		{
    			if ($scope.data.current_movement_page.data_page_data.see_all ||MovementStore.current_movement_page.active_side.active_trial.joints[i].movements[j].data_graph_selected)
    			{
    				$scope.lineData.series.push(MovementStore.current_movement_page.active_side.active_trial.joints[i].movements[j].series_data);
    			}
    		}
    	}
    };

    $scope.ToggleSelectMovement = function(element, array)
    {

    	if (element.selected)
    	{
    		element.selected = false;
    		var index = array.indexOf(element);
    		if (index > -1)
    		{
    			array.splice(index, 1);
    		}
    	}
    	else
    	{
    		element.selected = true;
    		array.push(element);
    	}

    };

    $scope.InitializeGraph = function(){

    	$scope.lineData = {
    		labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    		series: []
    	};

    	$scope.lineOptions = {

    		axisY:{
    			referenceValue: 100,
    			type : Chartist.FixedScaleAxis,
    			ticks: [25, 50, 75, 100]
    		},
    		axisX:{
    			showGrid: false,
    			labelInterpolationFnc: function(value) {
    				return value + '%';
    			}
    		},
    		showPoint: false

    	};

    	var $chart = $( ".movement_data_chart" );

    	var $toolTip = $chart
    	  .append('<div class="chartist-tooltip"></div>')
    	  .find('.chartist-tooltip')
    	  .hide();

    	$chart.on('mouseenter', '.ct-line', function() {
    	  var $line = $(this),
    		seriesName = $line.parent().attr('ct:series-name');
    		$toolTip.html(seriesName).show();
    	});

    	$chart.on('mouseleave', '.ct-line', function() {
    	  $toolTip.hide();
    	});

    	$chart.on('mousemove', function(event) {
    	  $toolTip.css({
    		left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
    		top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40,
    		background : '#F4C63D'
    	  });
    	});

    };

    }
]);

/**
* @brief the following code was written by a third party, it provides controllers for the graph JS plugins
*/

angular.module("app.chart.ctrls", []).controller("chartingCtrl", ["$scope",
  function($scope) {
    return $scope.easypie1 = {
      percent: 25,
      options: {
        animate: {
          duration: 1e2,
          enabled: !0
        },
        barColor: "#c1bfc0",
        lineCap: "round",
        size: 130,
        lineWidth: 8
      },
      name: "Bounce rate"
    }, $scope.easypie2 = {
      percent: 35,
      options: {
        animate: {
          duration: 1e2,
          enabled: !0
        },
        barColor: "#383d43",
        lineCap: "round",
        size: 130,
        lineWidth: 8
      },
      name: "Daily active user activation"
    }, $scope.easypie3 = {
      percent: 87,
      options: {
        animate: {
          duration: 1e2,
          enabled: !0
        },
        barColor: "#db5031",
        lineCap: "round",
        size: 130,
        lineWidth: 8
      },
      name: "registration / unique visit"
    }, $scope.easypiesmall1 = {
      percent: 25,
      options: {
        animate: {
          duration: 1e2,
          enabled: !0
        },
        barColor: "#c1bfc0",
        lineCap: "round",
        size: 67,
        lineWidth: 5
      },
      name: "Bounce rate"
    }, $scope.easypiesmall2 = {
      percent: 35,
      options: {
        animate: {
          duration: 1e2,
          enabled: !0
        },
        barColor: "#383d43",
        lineCap: "round",
        size: 67,
        lineWidth: 5
      },
      name: "Daily active user activation"
    }, $scope.easypiesmall3 = {
      percent: 87,
      options: {
        animate: {
          duration: 1e2,
          enabled: !0
        },
        barColor: "#db5031",
        lineCap: "round",
        size: 67,
        lineWidth: 5
      },
      name: "registration / unique visit"
    };
  }
]).controller("gaugeCtrl", ["$scope",
  function($scope) {
    return $scope.gauge1 = {
      gaugeData: {
        maxValue: 3e3,
        animationSpeed: 100,
        val: 1075
      },
      gaugeOptions: {
        lines: 12,
        angle: 0,
        lineWidth: 0.47,
        pointer: {
          length: 0.6,
          strokeWidth: 0.03,
          color: "#555555"
        },
        limitMax: "false",
        colorStart: "#c1bfc0",
        colorStop: "#c1bfc0",
        strokeColor: "#F5F5F5",
        generateGradient: !0,
        percentColors: [
          [0, "#c1bfc0"],
          [1, "#c1bfc0"]
        ]
      }
    }, $scope.gauge2 = {
      gaugeData: {
        maxValue: 3e3,
        animationSpeed: 100,
        val: 1300
      },
      gaugeOptions: {
        lines: 12,
        angle: 0,
        lineWidth: 0.47,
        pointer: {
          length: 0.6,
          strokeWidth: 0.03,
          color: "#555555"
        },
        limitMax: "false",
        colorStart: "#383d43",
        colorStop: "#383d43",
        strokeColor: "#F5F5F5",
        generateGradient: !0,
        percentColors: [
          [0, "#383d43"],
          [1, "#383d43"]
        ]
      }
    }, $scope.gauge3 = {
      gaugeData: {
        maxValue: 3e3,
        animationSpeed: 100,
        val: 1500
      },
      gaugeOptions: {
        lines: 12,
        angle: 0,
        lineWidth: 0.47,
        pointer: {
          length: 0.6,
          strokeWidth: 0.03,
          color: "#555555"
        },
        limitMax: "false",
        colorStart: "#db5031",
        colorStop: "#db5031",
        strokeColor: "#F5F5F5",
        generateGradient: !0,
        percentColors: [
          [0, "#db5031"],
          [1, "#db5031"]
        ]
      }
    };
  }
]).controller("morrisChartCtrl", ["$scope",
  function($scope) {
    return $scope.mainData = [{
      month: "2013-01",
      xbox: 294e3,
      will: 136e3,
      playstation: 244e3
    }, {
      month: "2013-02",
      xbox: 228e3,
      will: 335e3,
      playstation: 127e3
    }, {
      month: "2013-03",
      xbox: 199e3,
      will: 159e3,
      playstation: 13e4
    }, {
      month: "2013-04",
      xbox: 174e3,
      will: 16e4,
      playstation: 82e3
    }, {
      month: "2013-05",
      xbox: 255e3,
      will: 318e3,
      playstation: 82e3
    }, {
      month: "2013-06",
      xbox: 298400,
      will: 401800,
      playstation: 98600
    }, {
      month: "2013-07",
      xbox: 37e4,
      will: 225e3,
      playstation: 159e3
    }, {
      month: "2013-08",
      xbox: 376700,
      will: 303600,
      playstation: 13e4
    }, {
      month: "2013-09",
      xbox: 527800,
      will: 301e3,
      playstation: 119400
    }], $scope.simpleData = [{
      year: "2008",
      value: 22
    }, {
      year: "2009",
      value: 10
    }, {
      year: "2010",
      value: 5
    }, {
      year: "2011",
      value: 5
    }, {
      year: "2012",
      value: 20
    }, {
      year: "2013",
      value: 19
    }], $scope.comboData = [{
      year: "2008",
      a: 20,
      b: 16,
      c: 12
    }, {
      year: "2009",
      a: 10,
      b: 22,
      c: 30
    }, {
      year: "2010",
      a: 5,
      b: 14,
      c: 20
    }, {
      year: "2011",
      a: 5,
      b: 12,
      c: 19
    }, {
      year: "2012",
      a: 20,
      b: 19,
      c: 13
    }, {
      year: "2013",
      a: 28,
      b: 22,
      c: 20
    }], $scope.donutData = [{
      label: "Download Sales",
      value: 12
    }, {
      label: "In-Store Sales",
      value: 30
    }, {
      label: "Mail-Order Sales",
      value: 20
    }, {
      label: "Online Sales",
      value: 19
    }];
  }
]).controller("chartjsCtrl", ["$scope",
  function($scope) {
    return $scope.chartjsLine = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(56, 61, 67, 0.5)",
        strokeColor: "rgba(56, 61, 67, 0.5)",
        pointColor: "#fff",
        pointStrokeColor: "#fff",
        pointHighlightFill: "rgba(56, 61, 67, 0.5)",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        label: "My Second dataset",
        fillColor: "rgba(219, 80, 49, 0.8)",
        strokeColor: "rgba(219, 80, 49, 0.8)",
        pointColor: "#fff",
        pointStrokeColor: "#fff",
        pointHighlightFill: "rgba(219, 80, 49, 0.8)",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }]
    }, $scope.chartjsBar = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(56, 61, 67, 0.5)",
        strokeColor: "rgba(56, 61, 67, 0.5)",
        highlightFill: "rgba(56, 61, 67, 0.8)",
        highlightStroke: "rgba(56, 61, 67, 0.8)",
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        label: "My Second dataset",
        fillColor: "rgba(219, 80, 49, 0.8)",
        strokeColor: "rgba(219, 80, 49, 0.8)",
        highlightFill: "rgba(219, 80, 49, 0.9)",
        highlightStroke: "rgba(219, 80, 49, 0.9)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }]
    }, $scope.chartjsRadar = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(56, 61, 67, 0.8)",
        strokeColor: "rgba(56, 61, 67, 1)",
        pointColor: "rgba(56, 61, 67, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(56, 61, 67, 1)",
        data: [65, 59, 90, 81, 56, 55, 40]
      }, {
        label: "My Second dataset",
        fillColor: "rgba(219, 80, 49, 0.8)",
        strokeColor: "rgba(219, 80, 49, 1)",
        pointColor: "rgba(219, 80, 49, 0.8)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(219, 80, 49, 0.8)",
        data: [28, 48, 40, 19, 96, 27, 100]
      }]
    }, $scope.chartjsPolarArea = [{
      value: 300,
      color: "#383d43",
      highlight: "#383d43",
      label: "Blue"
    }, {
      value: 50,
      color: "#db5031",
      highlight: "#db5031",
      label: "Orange"
    }, {
      value: 100,
      color: "#fef9d9",
      highlight: "#fef9d9",
      label: "Yellow"
    }, {
      value: 40,
      color: "#c1bfc0",
      highlight: "#c1bfc0",
      label: "Grey"
    }, {
      value: 120,
      color: "#503f3c",
      highlight: "#503f3c",
      label: "Dark Brown"
    }], $scope.chartjsPie = [{
      value: 300,
      color: "#383d43",
      highlight: "#383d43",
      label: "Blue"
    }, {
      value: 50,
      color: "#db5031",
      highlight: "#db5031",
      label: "Orange"
    }, {
      value: 100,
      color: "#c1bfc0",
      highlight: "#c1bfc0",
      label: "Gray"
    }], $scope.chartjsDoughnut = [{
      value: 300,
      color: "#383d43",
      highlight: "#383d43",
      label: "Blue"
    }, {
      value: 50,
      color: "#db5031",
      highlight: "#db5031",
      label: "Orange"
    }, {
      value: 100,
      color: "#c1bfc0",
      highlight: "#c1bfc0",
      label: "Gray"
    }];
  }
]).controller("flotChartCtrl", ["$scope",
  function($scope) {
    var areaChart, barChart, lineChart1;

    return lineChart1 = {}, lineChart1.data1 = [
      [1, 15],
      [2, 20],
      [3, 14],
      [4, 10],
      [5, 10],
      [6, 20],
      [7, 28],
      [8, 26],
      [9, 22],
      [10, 23],
      [11, 24]
    ], lineChart1.data2 = [
      [1, 9],
      [2, 15],
      [3, 17],
      [4, 21],
      [5, 16],
      [6, 15],
      [7, 13],
      [8, 15],
      [9, 29],
      [10, 21],
      [11, 29]
    ], $scope.line1 = {}, $scope.line1.data = [{
      data: lineChart1.data1,
      label: "New visitors",
      lines: {
        fill: !0
      }
    }, {
      data: lineChart1.data2,
      label: "Returning visitors",
      lines: {
        fill: !1
      }
    }], $scope.line1.options = {
      series: {
        lines: {
          show: !0,
          fill: !1,
          lineWidth: 3,
          fillColor: {
            colors: [{
              opacity: 0.3
            }, {
              opacity: 0.3
            }]
          }
        },
        points: {
          show: !0,
          lineWidth: 3,
          fill: !0,
          fillColor: "#ffffff",
          symbol: "circle",
          radius: 5
        },
        shadowSize: 0

      },
      colors: ["#c1bfc0", "#db5031"],
      tooltip: !0,
      tooltipOpts: {
        defaultTheme: !1
      },
      grid: {
        hoverable: !0,
        clickable: !0,
        tickColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#eeeeee"
      },
      xaxis: {
        ticks: [
          [1, "Jan."],
          [2, "Feb."],
          [3, "Mar."],
          [4, "Apr."],
          [5, "May"],
          [6, "June"],
          [7, "July"],
          [8, "Aug."],
          [9, "Sept."],
          [10, "Oct."],
          [11, "Nov."],
          [12, "Dec."]
        ]
      }
    }, areaChart = {}, areaChart.data1 = [
      [2007, 15],
      [2008, 20],
      [2009, 10],
      [2010, 5],
      [2011, 5],
      [2012, 20],
      [2013, 28]
    ], areaChart.data2 = [
      [2007, 15],
      [2008, 16],
      [2009, 22],
      [2010, 14],
      [2011, 12],
      [2012, 19],
      [2013, 22]
    ], $scope.area = {}, $scope.area.data = [{
      data: areaChart.data1,
      label: "Value A",
      lines: {
        fill: !0
      }
    }, {
      data: areaChart.data2,
      label: "Value B",
      points: {
        show: !0
      },
      yaxis: 2
    }], $scope.area.options = {
      series: {
        lines: {
          lineWidth: 3,
          show: !0,
          fill: !1
        },
        points: {
          show: !0,
          lineWidth: 3,
          fill: !0,
          fillColor: "#ffffff",
          symbol: "circle",
          radius: 5
        },
        shadowSize: 0
      },
      grid: {
        hoverable: !0,
        clickable: !0,
        tickColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#eeeeee"
      },
      colors: ["#c1bfc0", "#db5031"],
      tooltip: !0,
      tooltipOpts: {
        defaultTheme: !1
      },
      xaxis: {
        mode: "time"
      },
      yaxes: [{}, {
        position: "right"
      }]
    }, barChart = {}, barChart.data1 = [
      [2008, 20],
      [2009, 10],
      [2010, 5],
      [2011, 5],
      [2012, 20],
      [2013, 28]
    ], barChart.data2 = [
      [2008, 16],
      [2009, 22],
      [2010, 14],
      [2011, 12],
      [2012, 19],
      [2013, 22]
    ], barChart.data3 = [
      [2008, 12],
      [2009, 30],
      [2010, 20],
      [2011, 19],
      [2012, 13],
      [2013, 20]
    ], $scope.barChart = {}, $scope.barChart.data = [{
      label: "Value A",
      data: barChart.data1
    }, {
      label: "Value B",
      data: barChart.data2
    }, {
      label: "Value C",
      data: barChart.data3
    }], $scope.barChart.options = {
      series: {
        stack: !0,
        bars: {
          show: !0,
          fill: 1,
          barWidth: 0.3,
          align: "center",
          horizontal: !1,
          order: 1
        }
      },
      grid: {
        hoverable: !0,
        borderWidth: 1,
        borderColor: "#eeeeee"
      },
      tooltip: !0,
      tooltipOpts: {
        defaultTheme: !1
      },
      colors: ["#383d43", "#db5031", "#fef9d9"]
    }, $scope.pieChart = {}, $scope.pieChart.data = [{
      label: "Download Sales",
      data: 12
    }, {
      label: "In-Store Sales",
      data: 30
    }, {
      label: "Mail-Order Sales",
      data: 20
    }, {
      label: "Online Sales",
      data: 19
    }], $scope.pieChart.options = {
      series: {
        pie: {
          show: !0
        }
      },
      legend: {
        show: !0
      },
      grid: {
        hoverable: !0,
        clickable: !0
      },
      colors: ["#383d43", "#db5031", "#fef9d9", "#503f3c"],
      tooltip: !0,
      tooltipOpts: {
        content: "%p.0%, %s",
        defaultTheme: !1
      }
    }, $scope.donutChart = {}, $scope.donutChart.data = [{
      label: "Download Sales",
      data: 12
    }, {
      label: "In-Store Sales",
      data: 30
    }, {
      label: "Mail-Order Sales",
      data: 20
    }, {
      label: "Online Sales",
      data: 19
    }], $scope.donutChart.options = {
      series: {
        pie: {
          show: !0,
          innerRadius: 0.5
        }
      },
      legend: {
        show: !0
      },
      grid: {
        hoverable: !0,
        clickable: !0
      },
      colors: ["#383d43", "#db5031", "#c1bfc0", "#503f3c"],
      tooltip: !0,
      tooltipOpts: {
        content: "%p.0%, %s",
        defaultTheme: !1
      }
    }, $scope.donutChart2 = {}, $scope.donutChart2.data = [{
      label: "Download Sales",
      data: 12
    }, {
      label: "In-Store Sales",
      data: 30
    }, {
      label: "Mail-Order Sales",
      data: 20
    }, {
      label: "Online Sales",
      data: 19
    }, {
      label: "Direct Sales",
      data: 15
    }], $scope.donutChart2.options = {
      series: {
        pie: {
          show: !0,
          innerRadius: 0.5
        }
      },
      legend: {
        show: !1
      },
      grid: {
        hoverable: !0,
        clickable: !0
      },
      colors: ["#2693E9", "#F5862C", "#43B040", "#619CC4", "#6D90C5"],
      tooltip: !0,
      tooltipOpts: {
        content: "%p.0%, %s",
        defaultTheme: !1
      }
    };
  }
]).controller("flotChartCtrl.realtime", ["$scope",
  function() {}
]).controller("sparklineCtrl", ["$scope",
  function($scope) {
    return $scope.demoData1 = {
      sparkData: [3, 1, 2, 2, 4, 6, 4, 5, 2, 4, 5, 3, 4, 6, 4, 7],
      sparkOptions: {
        type: "line",
        lineColor: "#fff",
        highlightLineColor: "#fff",
        fillColor: "#383d43",
        spotColor: !1,
        minSpotColor: !1,
        maxSpotColor: !1,
        width: "100%",
        height: "150px"
      }
    }, $scope.simpleChart1 = {
      sparkData: [3, 1, 2, 3, 5, 3, 4, 2],
      sparkOptions: {
        type: "line",
        lineColor: "#db5031",
        fillColor: "#c1bfc0",
        spotColor: !1,
        minSpotColor: !1,
        maxSpotColor: !1,
        width: "100px",
        height: "50px"
      }
    }, $scope.simpleChart2 = {
      sparkData: [3, 1, 2, 3, 5, 3, 4, 2],
      sparkOptions: {
        type: "bar",
        barColor: "#db5031",
        width: "100px",
        height: "50px"
      }
    }, $scope.simpleChartlong = {
      sparkData: [1, 3, 2, 5, 4, 2, 1, 7, 1, 8, 4, 3, 5, 2, 4, 5, 1, 7, 1, 8],
      sparkOptions: {
        type: "bar",
        barColor: "#c1bfc0",
        width: "250px",
        height: "30px"
      }
    }, $scope.simpleChart2long = {
      sparkData: [3, 1, 2, 3, 5, 3, 4, 2, 5, 4, 2, 6, 2, 4, 3, 1],
      sparkOptions: {
        type: "bar",
        barColor: "#383d43",
        width: "200px",
        height: "30px"
      }
    }, $scope.simpleChart2info = {
      sparkData: [3, 1, 2, 3, 5, 3, 4, 2],
      sparkOptions: {
        type: "bar",
        barColor: "#FFFFFF",
        width: "100px",
        height: "30px"
      }
    }, $scope.simpleChart3 = {
      sparkData: [3, 1, 2, 3, 5, 3, 4, 2],
      sparkOptions: {
        type: "pie",
        sliceColors: ["#383d43", "#db5031", "#c1bfc0", "#fef9d9", "#503f3c", "#365340"],
        width: "50px",
        height: "50px"
      }
    }, $scope.tristateChart1 = {
      sparkData: [1, 2, -3, -5, 3, 1, -4, 2],
      sparkOptions: {
        type: "tristate",
        posBarColor: "#383d43",
        negBarColor: "#c1bfc0",
        width: "100%",
        height: "50px"
      }
    }, $scope.largeChart1 = {
      sparkData: [3, 1, 2, 3, 5, 3, 4, 2],
      sparkOptions: {
        type: "line",
        lineColor: "#db5031",
        highlightLineColor: "#7ACBEE",
        fillColor: "#c1bfc0",
        spotColor: !1,
        minSpotColor: !1,
        maxSpotColor: !1,
        width: "100%",
        height: "150px"
      }
    }, $scope.largeChart2 = {
      sparkData: [3, 1, 2, 3, 5, 3, 4, 2],
      sparkOptions: {
        type: "bar",
        barColor: "#383d43",
        barWidth: 10,
        width: "100%",
        height: "150px"
      }
    }, $scope.largeChart3 = {
      sparkData: [3, 1, 2, 3, 5],
      sparkOptions: {
        type: "pie",
        sliceColors: ["#383d43", "#db5031", "#c1bfc0", "#fef9d9", "#503f3c", "#365340"],
        width: "150px",
        height: "150px"
      }
    };
  }
]);



/*
 App tasks controllers
 Main task controllers (includes saving tasks into sessionStorage)
 */

angular.module("app.task", []).factory("taskStorage", function() {

  /**************************
   Saves and loads tasks from the sessionStorage
   **************************/

  var DEMO_TASKS, STORAGE_ID;
  return STORAGE_ID = "tasks",
    DEMO_TASKS = '[ ' +
    '{"title": "Call customer X", "completed": true}, ' +
    '{"title": "Review marketing system", "completed": true}, ' +
    '{"title": "Do the twist!", "completed": false}, ' +
    '{"title": "Watch over the mars scheme", "completed": false}, ' +
    '{"title": "Complete proposal for spaceship", "completed": false}, ' +
    '{"title": "Do inventory of everything", "completed": false} ]', {
      get: function() {
        return JSON.parse(sessionStorage.getItem(STORAGE_ID) || DEMO_TASKS);
      },
      put: function(tasks) {
        return sessionStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
      }
    };
}).controller("taskCtrl", ["$scope", "taskStorage", "filterFilter", "$rootScope", "loggit",
  function($scope, taskStorage, filterFilter, $rootScope, loggit) {
    var tasks;
    return tasks = $scope.tasks = taskStorage.get(),
      $scope.newTask = "",
      $scope.countTasksLeft = filterFilter(tasks, {
        completed: !1
      }).length, $scope.editedTask = null, $scope.statusFilter = {
        completed: !1
      }, $scope.filter = function(filterType) {
        switch (filterType) {
          case "all":
            $scope.statusFilter = "";
            break;
          case "active":
            $scope.statusFilter = {
              completed: !1
            };
            break;
          case "completed":
            $scope.statusFilter = {
              completed: !0
            };
            break;
        }
      }, $scope.add = function() {
        var newTask;
        return newTask = $scope.newTask.trim(), 0 !== newTask.length ? (tasks.push({
          title: newTask,
          completed: !1
        }), loggit.logSuccess('New task added : "' + newTask + '"'), taskStorage.put(tasks), $scope.newTask = "", $scope.countTasksLeft++) : void 0;
      }, $scope.edit = function(task) {
        $scope.editedTask = task;
      }, $scope.doneEditing = function(task) {
        return $scope.editedTask = null, task.title = task.title.trim(), task.title ? loggit.log("Task was updated") : $scope.remove(task), taskStorage.put(tasks);
      }, $scope.remove = function(task) {
        var index;
        return $scope.countTasksLeft -= task.completed ? 0 : 1, index = $scope.tasks.indexOf(task), $scope.tasks.splice(index, 1), taskStorage.put(tasks), loggit.logError("Task was removed");
      }, $scope.completed = function(task) {
        return $scope.countTasksLeft += task.completed ? -1 : 1, taskStorage.put(tasks), task.completed ? $scope.countTasksLeft > 0 ? loggit.log(1 === $scope.countTasksLeft ? "Only " + $scope.countTasksLeft + " task left" : "Well done! Only " + $scope.countTasksLeft + " tasks left") : loggit.logSuccess("Yay!! All tasks are done :)") : void 0;
      }, $scope.clearCompleted = function() {
        return $scope.tasks = tasks = tasks.filter(function(val) {
          return !val.completed;
        }), taskStorage.put(tasks);
      }, $scope.markAll = function(completed) {
        return tasks.forEach(function(task) {
          task.completed = completed;
        }), $scope.countTasksLeft = completed ? 0 : tasks.length, taskStorage.put(tasks), completed ? loggit.logSuccess("Yay!! All tasks are done :)") : void 0;
      }, $scope.$watch("countTasksLeft == 0", function(val) {
        $scope.allChecked = val;
      }), $scope.$watch("countTasksLeft", function(newVal) {
        $rootScope.$broadcast("taskRemaining:changed", newVal);
      });
  }
]);



/*
 App Form validations
 Validator functions for form elements (signIn,signUp and custom forms)
 */

angular.module("app.form.validation", []).controller("wizardFormCtrl", ["$scope",
  function($scope) {
    return $scope.wizard = {
      firstName: "some name",
      lastName: "",
      email: "",
      password: "",
      age: "",
      address: ""
    }, $scope.isValidateStep1 = function() {
      return void 0;
    }, $scope.finishedWizard = function() {
      return void 0;
    };
  }
]).controller("formConstraintsCtrl", ["$scope",
  function($scope) {
    var original;
    return $scope.form = {
      required: "",
      minlength: "",
      maxlength: "",
      length_rage: "",
      type_something: "",
      confirm_type: "",
      foo: "",
      email: "",
      url: "",
      num: "",
      minVal: "",
      maxVal: "",
      valRange: "",
      pattern: ""
    }, original = angular.copy($scope.form), $scope.revert = function() {
      return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
    }, $scope.canRevert = function() {
      return !angular.equals($scope.form, original) || !$scope.form_constraints.$pristine;
    }, $scope.canSubmit = function() {
      return $scope.form_constraints.$valid && !angular.equals($scope.form, original);
    };
  }
]).controller("signinCtrl", ["$scope",
  function($scope) {
    var original;
    return $scope.user = {
      email: "",
      password: ""
    }, $scope.showInfoOnSubmit = !1, original = angular.copy($scope.user), $scope.revert = function() {
      return $scope.user = angular.copy(original), $scope.form_signin.$setPristine();
    }, $scope.canRevert = function() {
      return !angular.equals($scope.user, original) || !$scope.form_signin.$pristine;
    }, $scope.canSubmit = function() {
      return $scope.form_signin.$valid && !angular.equals($scope.user, original);
    }, $scope.submitForm = function() {
      return $scope.showInfoOnSubmit = !0, $scope.revert();
    };
  }
]).controller("signupCtrl", ["$scope",
  function($scope) {
    var original;
    return $scope.user = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: ""
    }, $scope.showInfoOnSubmit = !1, original = angular.copy($scope.user), $scope.revert = function() {
      return $scope.user = angular.copy(original), $scope.form_signup.$setPristine(), $scope.form_signup.confirmPassword.$setPristine();
    }, $scope.canRevert = function() {
      return !angular.equals($scope.user, original) || !$scope.form_signup.$pristine;
    }, $scope.canSubmit = function() {
      return $scope.form_signup.$valid && !angular.equals($scope.user, original);
    }, $scope.submitForm = function() {
      return $scope.showInfoOnSubmit = !0, $scope.revert();
    };
  }
]).directive("validateEquals", [
  function() {
    return {
      require: "ngModel",
      link: function(scope, ele, attrs, ngModelCtrl) {
        var validateEqual;
        return validateEqual = function(value) {
          var valid;
          return valid = value === scope.$eval(attrs.validateEquals), ngModelCtrl.$setValidity("equal", valid), "function" == typeof valid ? valid({
            value: void 0
          }) : void 0;
        }, ngModelCtrl.$parsers.push(validateEqual), ngModelCtrl.$formatters.push(validateEqual), scope.$watch(attrs.validateEquals, function(newValue, oldValue) {
          return newValue !== oldValue ? ngModelCtrl.$setViewValue(ngModelCtrl.$ViewValue) : void 0;
        });
      }
    };
  }
]);



/*
 App Form Ui Controls
 Controllers for form Ui components
 */

angular.module("app.ui.form.ctrls", []).controller("TagsDemoCtrl", ["$scope",
  function($scope) {
    $scope.tags = ["foo", "bar"];
  }
]).controller("DatepickerDemoCtrl", ["$scope",
  function($scope) {
    return $scope.today = function() {
      $scope.dt = new Date();
    }, $scope.today(), $scope.showWeeks = !0, $scope.toggleWeeks = function() {
      $scope.showWeeks = !$scope.showWeeks;
    }, $scope.clear = function() {
      $scope.dt = null;
    }, $scope.disabled = function(date, mode) {
      return "day" === mode && (0 === date.getDay() || 6 === date.getDay());
    }, $scope.toggleMin = function() {
      var _ref;
      $scope.minDate = null !== (_ref = $scope.minDate) ? _ref : {
        "null": new Date()
      };
    }, $scope.toggleMin(), $scope.open = function($event) {
      return $event.preventDefault(), $event.stopPropagation(), $scope.opened = !0;
    }, $scope.dateOptions = {
      "year-format": "'yy'",
      "starting-day": 1
    }, $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "shortDate"], $scope.format = $scope.formats[0];
  }
]).controller("TimepickerDemoCtrl", ["$scope",
  function($scope) {
    return $scope.mytime = new Date(), $scope.hstep = 1, $scope.mstep = 15, $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    }, $scope.ismeridian = !0, $scope.toggleMode = function() {
      $scope.ismeridian = !$scope.ismeridian;
    }, $scope.update = function() {
      var d;
      return d = new Date(), d.setHours(14), d.setMinutes(0), $scope.mytime = d;
    }, $scope.changed = function() {
      return void 0;
    }, $scope.clear = function() {
      $scope.mytime = null;
    };
  }
]).controller("TypeaheadCtrl", ["$scope",
  function($scope) {
    return $scope.selected = void 0, $scope.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  }
]).controller("RatingDemoCtrl", ["$scope",
  function($scope) {
    return $scope.rate = 7, $scope.max = 10, $scope.isReadonly = !1, $scope.hoveringOver = function(value) {
      return $scope.overStar = value, $scope.percent = 100 * (value / $scope.max);
    }, $scope.ratingStates = [{
      stateOn: "glyphicon-ok-sign",
      stateOff: "glyphicon-ok-circle"
    }, {
      stateOn: "glyphicon-star",
      stateOff: "glyphicon-star-empty"
    }, {
      stateOn: "glyphicon-heart",
      stateOff: "glyphicon-ban-circle"
    }, {
      stateOn: "glyphicon-heart"
    }, {
      stateOff: "glyphicon-off"
    }];
  }
]);



/*
 App Tables
 Controller for dynamic and other tables
 */

angular.module("app.tables", []).controller("tableCtrl", ["$scope", "$filter",
  function($scope, $filter) {
    var init;
    return $scope.stores = [{
      name: "Nijiya Market",
      price: "$$",
      sales: 292,
      rating: 4
    }, {
      name: "Eat On Monday Truck",
      price: "$",
      sales: 119,
      rating: 4.3
    }, {
      name: "Tea Era",
      price: "$",
      sales: 874,
      rating: 4
    }, {
      name: "Rogers Deli",
      price: "$",
      sales: 347,
      rating: 4.2
    }, {
      name: "MoBowl",
      price: "$$$",
      sales: 24,
      rating: 4.6
    }, {
      name: "The Milk Pail Market",
      price: "$",
      sales: 543,
      rating: 4.5
    }, {
      name: "Nob Hill Foods",
      price: "$$",
      sales: 874,
      rating: 4
    }, {
      name: "Scratch",
      price: "$$$",
      sales: 643,
      rating: 3.6
    }, {
      name: "Gochi Japanese Fusion Tapas",
      price: "$$$",
      sales: 56,
      rating: 4.1
    }, {
      name: "Cost Plus World Market",
      price: "$$",
      sales: 79,
      rating: 4
    }, {
      name: "Bumble Bee Health Foods",
      price: "$$",
      sales: 43,
      rating: 4.3
    }, {
      name: "Costco",
      price: "$$",
      sales: 219,
      rating: 3.6
    }, {
      name: "Red Rock Coffee Co",
      price: "$",
      sales: 765,
      rating: 4.1
    }, {
      name: "99 Ranch Market",
      price: "$",
      sales: 181,
      rating: 3.4
    }, {
      name: "Mi Pueblo Food Center",
      price: "$",
      sales: 78,
      rating: 4
    }, {
      name: "Cucina Venti",
      price: "$$",
      sales: 163,
      rating: 3.3
    }, {
      name: "Sufi Coffee Shop",
      price: "$",
      sales: 113,
      rating: 3.3
    }, {
      name: "Dana Street Roasting",
      price: "$",
      sales: 316,
      rating: 4.1
    }, {
      name: "Pearl Cafe",
      price: "$",
      sales: 173,
      rating: 3.4
    }, {
      name: "Posh Bagel",
      price: "$",
      sales: 140,
      rating: 4
    }, {
      name: "Artisan Wine Depot",
      price: "$$",
      sales: 26,
      rating: 4.1
    }, {
      name: "Hong Kong Chinese Bakery",
      price: "$",
      sales: 182,
      rating: 3.4
    }, {
      name: "Starbucks",
      price: "$$",
      sales: 97,
      rating: 3.7
    }, {
      name: "Tapioca Express",
      price: "$",
      sales: 301,
      rating: 3
    }, {
      name: "House of Bagels",
      price: "$",
      sales: 82,
      rating: 4.4
    }], $scope.searchKeywords = "", $scope.filteredStores = [], $scope.row = "", $scope.select = function(page) {
      var end, start;
      return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.currentPageStores = $scope.filteredStores.slice(start, end);
    }, $scope.onFilterChange = function() {
      return $scope.select(1), $scope.currentPage = 1, $scope.row = "";
    }, $scope.onNumPerPageChange = function() {
      return $scope.select(1), $scope.currentPage = 1;
    }, $scope.onOrderChange = function() {
      return $scope.select(1), $scope.currentPage = 1;
    }, $scope.search = function() {
      return $scope.filteredStores = $filter("filter")($scope.stores, $scope.searchKeywords), $scope.onFilterChange();
    }, $scope.order = function(rowName) {
      return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.stores, rowName), $scope.onOrderChange()) : void 0;
    }, $scope.numPerPageOpt = [3, 5, 10, 20], $scope.numPerPage = $scope.numPerPageOpt[2], $scope.currentPage = 1, $scope.currentPageStores = [], (init = function() {
      return $scope.search(), $scope.select($scope.currentPage);
    }), $scope.search();
  }
]);

/*
 App Ui Controllers
 Provides general controllers for the app
 */

angular.module("app.ui.ctrls", []).controller("NotifyCtrl", ["$scope", "loggit",
  function($scope, loggit) {
    $scope.notify = function(type) {
      switch (type) {
        case "info":
          return loggit.log("Hello! This is an alert of the info importance level.");
        case "success":
          return loggit.logSuccess("Great! You did something successfully.");
        case "warning":
          return loggit.logWarning("Warning! Something that happened that is not critical but important.");
        case "error":
          return loggit.logError("Error! Something went terribly wrong and needs your attention.");
      }
    };
  }
]).controller("AlertDemoCtrl", ["$scope",
  function($scope) {
    $scope.alerts = [{
      type: "success",
      msg: "Great! You did something successfully."
    }, {
      type: "info",
      msg: "Hello! This is an alert of the info importance level."
    }, {
      type: "warning",
      msg: "Warning! Something that happened that is not critical but important."
    }, {
      type: "danger",
      msg: "Error! Something went terribly wrong and needs your attention."
    }];

    $scope.addAlert = function() {
      $scope.alerts.push({
        msg: 'Another alert!'
      });
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }
]).controller("ProgressDemoCtrl", ["$scope",
  function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
        var index = Math.floor((Math.random() * 4));
        $scope.stacked.push({
          value: Math.floor((Math.random() * 30) + 1),
          type: types[index]
        });
      }
    };
    $scope.randomStacked();
  }
]).controller("AccordionDemoCtrl", ["$scope",
  function($scope) {
    return $scope.oneAtATime = !0, $scope.groups = [{
      title: "First Group Header",
      content: "First Group Body"
    }, {
      title: "Second Group Header",
      content: "Second Group Body"
    }, {
      title: "Third Group Header",
      content: "Third Group Body"
    }], $scope.items = ["Item 1", "Item 2", "Item 3"], $scope.status = {
      isFirstOpen: !0,
      isFirstOpen1: !0,
      isFirstOpen2: !0,
      isFirstOpen3: !0,
      isFirstOpen4: !0,
      isFirstOpen5: !0,
      isFirstOpen6: !0
    }, $scope.addItem = function() {
      var newItemNo;
      newItemNo = $scope.items.length + 1;
      $scope.items.push("Item " + newItemNo);
    };
  }
]).controller("CollapseDemoCtrl", ["$scope",
  function($scope) {
    $scope.isCollapsed = !1;
  }
]).controller("ModalDemoCtrl", ["$scope", "$modal", "$log",
  function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function(size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
]).controller("ModalInstanceCtrl", ["$scope", "$modalInstance", "items",
  function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function() {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller("PaginationDemoCtrl", ["$scope",
  function($scope) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }
]).controller("MapDemoCtrl", ["$scope", "$http", "$interval",
  function($scope, $http, $interval) {
    var i, markers;
    for (markers = [], i = 0; 8 > i;) {
      markers[i] = new google.maps.Marker({
        title: "Marker: " + i
      });
      i++;
    }
    $scope.GenerateMapMarkers = function() {
      var d, lat, lng, loc, numMarkers;
      for (d = new Date(), $scope.date = d.toLocaleString(), numMarkers = Math.floor(4 * Math.random()) + 4, i = 0; numMarkers > i;) {
        lat = 38.73 + Math.random() / 100;
        lng = -9.14 + Math.random() / 100;
        loc = new google.maps.LatLng(lat, lng);
        markers[i].setPosition(loc);
        markers[i].setMap($scope.map);
        i++;
      }
    };
    $interval($scope.GenerateMapMarkers, 2e3);
  }
]).controller("TreeDemoCtrl", ["$scope",
  function($scope) {
    // Parameters

    $scope.list = [{
      "id": 1,
      "title": "1. dragon-breath",
      "items": []
    }, {
      "id": 2,
      "title": "2. moiré-vision",
      "items": [{
        "id": 21,
        "title": "2.1. tofu-animation",
        "items": [{
          "id": 211,
          "title": "2.1.1. spooky-giraffe",
          "items": []
        }, {
          "id": 212,
          "title": "2.1.2. bubble-burst",
          "items": []
        }]
      }, {
        "id": 22,
        "title": "2.2. barehand-atomsplitting",
        "items": []
      }]
    }, {
      "id": 3,
      "title": "3. unicorn-zapper",
      "items": []
    }, {
      "id": 4,
      "title": "4. romantic-transclusion",
      "items": []
    }];

    $scope.callbacks = {};

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.items.push({
        id: nodeData.id * 10 + nodeData.items.length,
        title: nodeData.title + '.' + (nodeData.items.length + 1),
        items: []
      });
    };
  }
]);
