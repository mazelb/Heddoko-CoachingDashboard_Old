<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Athlete;
use App\Models\FMSForm;
use App\Models\FMSFormSubmission;
use App\Models\Movement;
use App\Models\MovementRawEntry;
use Request;
use Auth;
use Input;
use Entrust;

class AthleteFMSFormController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($athleteid)
	{
		$athletesFMSFormSubmissions = FMSFormSubmission::where('athlete_id', $athleteid)->get();
		$fmsforms = array();
		
		foreach($athletesFMSFormSubmissions as $formsub){
			array_push($fmsforms, FMSForm::find($formsub->fmsform_id));
		}
		
		return $fmsforms;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store($athleteid, Request $request)
	{
		if (!Entrust::hasRole('coach')) {
			return 'you are not authorized to access this resource';
		}
	
		//read in all of the uploaded movement files and store in an array
	
		$uploaded_movements = array();
		
		if (Input::hasFile('deepsquat_movement_file')) { $uploaded_movements['deepsquat'] = Input::file('deepsquat_movement_file'); }
		if (Input::hasFile('Lhurdle_movement_file')) { $uploaded_movements['Lhurdle'] = Input::file('Lhurdle_movement_file'); }
		if (Input::hasFile('Rhurdle_movement_file')) { $uploaded_movements['Rhurdle'] = Input::file('Rhurdle_movement_file'); }
		if (Input::hasFile('Llunge_movement_file')) { $uploaded_movements['Llunge'] = Input::file('Llunge_movement_file'); }
		if (Input::hasFile('Rlunge_movement_file')) { $uploaded_movements['Rlunge'] = Input::file('Rlunge_movement_file'); }
		if (Input::hasFile('Lshoulder_movement_file')) { $uploaded_movements['Lshoulder'] = Input::file('Lshoulder_movement_file'); }
		if (Input::hasFile('Rshoulder_movement_file')) { $uploaded_movements['Rshoulder'] = Input::file('Rshoulder_movement_file'); }
		if (Input::hasFile('Limpingement_movement_file')) { $uploaded_movements['Limpingement'] = Input::file('Limpingement_movement_file'); }
		if (Input::hasFile('Rimpingement_movement_file')) { $uploaded_movements['Rimpingement'] = Input::file('Rimpingement_movement_file'); }
		if (Input::hasFile('Lactive_movement_file')) { $uploaded_movements['Lactive'] = Input::file('Lactive_movement_file'); }
		if (Input::hasFile('Ractive_movement_file')) { $uploaded_movements['Ractive'] = Input::file('Ractive_movement_file'); }
		if (Input::hasFile('trunk_movement_file')) { $uploaded_movements['trunk'] = Input::file('trunk_movement_file'); }
		if (Input::hasFile('press_movement_file')) { $uploaded_movements['press'] = Input::file('press_movement_file'); }
		if (Input::hasFile('Lrotary_movement_file')) { $uploaded_movements['Lrotary'] = Input::file('Lrotary_movement_file'); }
		if (Input::hasFile('Rrotary_movement_file')) { $uploaded_movements['Rrotary'] = Input::file('Rrotary_movement_file'); }
		if (Input::hasFile('posterior_movement_file')) { $uploaded_movements['posterior'] = Input::file('posterior_movement_file'); }

		//create the fms form entry
	
		$newForm = FMSForm::create(Input::all());
		$newForm->save();		
		
		$newFMSSubmission = FMSFormSubmission::create(['coach_id' => Auth::user()->coach->id,
																									'athlete_id' => $athleteid,
																									'fmsform_id' => $newForm->id,
																									'comment' => Request::input('comment')]);
		$newFMSSubmission->save();
		
		foreach($uploaded_movements as $movement_name => $movement_file){
		
			$new_movement_data = [];
			
			$new_movement_data['sportmovement_id'] = null;
			$new_movement_data['movementsub_id'] = null;
			$new_movement_data['fmsformsub_id'] = $newFMSSubmission->id;
			$new_movement_data['name'] = 'FMS Movement ' . $movement_name;
			
			$new_movement = Movement::create($new_movement_data); //create and save the Model to the database

			//copy the incoming movement file to local storage
		
			$destinationPath = storage_path('uploads');			
			$filename = 'fms_movement_'. $movement_name . '_form_id_' . $newForm->id . '.txt';

			$movement_file->move($destinationPath, $filename);
			
			$new_movement_raw_entry = MovementRawEntry::create(['movement_id' => $new_movement->id,
																'filename' => $filename]);;
			$new_movement_raw_entry->save();

		}
		
		$athletesFMSFormSubmissions = FMSFormSubmission::where('athlete_id', $athleteid)->get();
		$fmsforms = array();
		
		foreach($athletesFMSFormSubmissions as $formsub){
			array_push($fmsforms, FMSForm::find($formsub->fmsform_id));
		}
		
		return $fmsforms;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($athlete_id, $fmsformid)
	{
		$input = Request::all();
		
		$FMS_form_to_be_updated = FMSForm::findOrFail($fmsformid);
		
		$FMSFormFields = array(
			'deepsquat', 
			'deepsquatcomments', 
			'Lhurdle', 
			'Rhurdle', 
			'hurdlecomments', 
			'Llunge',
			'Rlunge',
			'lungecomments',
			'Lshoulder',
			'Rshoulder',
			'shouldercomments',
			'Limpingement',
			'Rimpingement',
			'impingementcomments',
			'Lactive',
			'Ractive',
			'activecomments',
			'trunk', 
			'trunkcomments',
			'press',
			'presscomments',
			'Lrotary',
			'Rrotary',
			'rotarycomments',
			'posterior',
			'posteriorcomments');

		foreach ($FMSFormFields as $field) {
			$FMS_form_to_be_updated->$field = Request::get($field);
		}

		$FMS_form_to_be_updated->save();

		return Athlete::find($athlete_id)->fmsforms;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($athlete_id, $fms_form_id)
	{
		$FMSFormInQuestion = FMSForm::find($fms_form_id);
		$FMSFormInQuestion->delete();
		
		$athletesFMSFormSubmissions = FMSFormSubmission::where('athlete_id', $athlete_id)->get();
		$fmsforms = array();
		
		foreach($athletesFMSFormSubmissions as $formsub){
			array_push($fmsforms, FMSForm::find($formsub->fmsform_id));
		}
		
		return $fmsforms;
	}

}
