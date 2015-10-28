/**
 * @brief This is the FMS Form controller used on the FMS Form submission page and the previous FMS Form retrieval page
 * It keeps an eye on the currently selected athlete and retrieves their forms when that variable changes
 * Furthermore, it takes care of sending new FMS form data to the server
 * @author Maxwell Mowbray (max@heddoko.com)
 * @param $scope and FMSForm, the factory which allows for the sending and retrieving of FMS forms
 * @return void
 */
angular.module('app.controllers')

// FMSFormController
.controller("FMSFormController", ["$scope", '$sessionStorage', 'FMSForm', "loggit", 'Rover', 'assetVersion',
    function($scope, $sessionStorage, FMSForm, loggit, Rover, assetVersion) {

    	$scope.data.show_fms_edit = false;
    	$scope.waiting_server_response = false;
    	$scope.data.selected_fms_form = null;

        // Demo data.
        $scope.files = {};
        // $scope.files.ds = {name: ''};

        $scope.$watch('global.state.profile.selected', function(new_selected_athlete_value) {

          if (new_selected_athlete_value === null) {
            return;
          }

          FMSForm.get($scope.global.state.profile.selected.id)
            .success(function(athletes_fms_forms_response) {
              $scope.global.state.profile.selected.fms_forms = athletes_fms_forms_response;
            })
            .error(function(error_msg) {
              console.log('error retrieving forms from the database' + error_msg);
            });

        }, true);

        $scope.submitFMSForm = function() {

    		$scope.waiting_server_response = true;

            $scope.data.fms_form_data.totalscore = 19;

            Rover.debug('Submitting FMS form data...');
    		Rover.debug($scope.data.fms_form_data);

            FMSForm.create(
                $scope.global.state.profile.selected.id,
                $scope.data.fms_form_data,
                $scope.data.fms_form_movement_files
            ).then(
                function(response) {

                    Rover.debug('Success.');
                	Rover.debug(response.data);

                    $scope.data.fms_form_data = {}; //reset the form data upon successful FMS form submission
                    $scope.global.state.profile.selected.fms_forms = response.data; //store the updated FMS forms sent back by the server
        			$scope.waiting_server_response = false;
        			loggit.logSuccess("FMS Form successfully submitted");
                },
                function(response) {
                	loggit.logError("There was an error submitting the FMS Form");
                	$scope.waiting_server_response = false;
                    Rover.debug(response);
                }
            );
        };

        $scope.updateFMS = function() {

        	$scope.waiting_server_response = true;

            FMSForm.update($scope.global.state.profile.selected.id, $scope.data.selected_fms_form)
            .success(function(updated_fms_form_data) {
                $scope.global.state.profile.selected.fms_forms = updated_fms_form_data; //store the updated FMS forms sent back by the server
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

            form.deepsquatcomments = form.deepsquatcomments || '';
            form.hurdlecomments = form.hurdlecomments || '';
            form.lungecomments = form.lungecomments || '';
            form.shouldercomments = form.shouldercomments || '';
            form.impingementcomments = form.impingementcomments || '';
            form.activecomments = form.activecomments || '';
            form.trunkcomments = form.trunkcomments || '';
            form.presscomments = form.presscomments || '';
            form.rotarycomments = form.rotarycomments || '';
            form.posteriorcomments = form.posteriorcomments || '';
            $scope.data.selected_fms_form = form;
        };
    }
]);
