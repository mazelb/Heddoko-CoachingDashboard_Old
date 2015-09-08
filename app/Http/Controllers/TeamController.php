<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Coach;
use App\Models\Sport;
use Illuminate\Http\Request;
use Auth;
use Entrust;

class TeamController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
		if (Entrust::hasRole('coach')){
			return Auth::user()->coach->teams;
		}
		else if (Entrust::hasRole('admin')){
			return Teams::all();
		}
		else{
			return;
		}
	}

	/**
	 * Store a newly created team in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if (!Entrust::hasRole('coach')) {
			return;
		}	
		
		$newTeamData = [];
		$newTeamData['coach_id'] = Auth::user()->coach->id;
		$newTeamData['sport_id'] = $request->input('sport_id');
		$newTeamData['name'] = $request->input('name');

		$newTeam = Team::create($newTeamData);	
		
		return Auth::user()->coach->teams;
	}

}
