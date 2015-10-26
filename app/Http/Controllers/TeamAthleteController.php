<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Athlete;
use Illuminate\Http\Request;

use Entrust;

class TeamAthleteController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($teamid) {
		return Athlete::with('user')->where('team_id', $teamid)->get();
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
		$newAthleteData['age'] = $request->input('age');
		$newAthleteData['height_cm'] = $request->input('height_cm');
		$newAthleteData['weight_cm'] = $request->input('weight_cm');
		$newAthleteData['primary_sport'] = $request->input('primary_sport');
		$newAthleteData['primary_position'] = $request->input('primary_position');
		$newAthleteData['hand_leg_dominance'] = $request->input('hand_leg_dominance');
		$newAthleteData['previous_injuries'] = $request->input('previous_injuries');
		$newAthleteData['underlying_medical'] = $request->input('underlying_medical');
		$newAthleteData['notes'] = $request->input('notes');

		$profile = Athlete::create($newAthleteData);

		return [
            'list' => $active_team->athletes,
            'profile' => $profile
        ];
	}

    /**
     * Updates a database record.
     *
     * @param int $groupId
     * @param int $profileId
     * @return array
     */
    public function update(Request $request, $groupId, $profileId)
    {
        $group = Team::findOrFail($groupId);

        $profile = $group->athletes()->findOrFail($profileId);

        $profile->fill($request->only([
            'first_name',
            'last_name',
            'team_id',
            'age',
            'height_cm',
            'weight_cm',
            'primary_sport',
            'primary_position',
            'hand_leg_dominance',
            'previous_injuries',
            'underlying_medical',
            'notes'
        ]));

        $profile->save();

        // TODO: handle errors.
		return [
            'error' => null,
            'list' => $group->athletes
        ];
    }

    /**
     * Removes a record from the database.
     *
     * @param int $teamId
     * @param int $id
     * @return array
     */
    public function destroy($teamId, $id)
    {
        $team = Team::findOrFail($teamId);

        $profile = $team->athletes()->findOrFail($id);

        $profile->delete();

        // TODO: handle errors.
		return [
            'error' => null,
            'list' => $team->athletes
        ];
    }
}
