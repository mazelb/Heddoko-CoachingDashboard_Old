<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Athlete;
use Illuminate\Http\Request;

use Entrust;

class TeamAthleteController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($teamid)
	{

		return Athlete::with('user')
									->where('team_id', $teamid)
									->get();

	/*$team = Team::find($teamid);
		return $team->athletes;*/

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store($team_id, Request $request)
	{
		if (!Entrust::hasRole('coach')) {
			return;
		}
		
		$active_team = Team::find($team_id);

		$newAthleteData = [];
		$newAthleteData['team_id'] = $active_team->id;
		$newAthleteData['first_name'] = $request->input('first_name');
		$newAthleteData['last_name'] = $request->input('last_name');
		$newAthleteData['height_cm'] = $request->input('height_cm');
		$newAthleteData['weight_kg'] = $request->input('weight_kg');
		$newAthleteData['primary_sport'] = $request->input('primary_sport');
		$newAthleteData['hand_leg_dominance'] = $request->input('hand_leg_dominance');
		
		Athlete::create($newAthleteData);	
		
		return $active_team->athletes;
		
	}

}
