<?php namespace App\Http\Controllers;

use Auth;
use Entrust;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Coach;
use App\Models\Sport;
use Illuminate\Http\Request;

class TeamController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
		if (Entrust::hasRole('coach'))
        {
			return Auth::user()->coach->teams;
		}
		else if (Entrust::hasRole('admin'))
        {
			return Teams::all();
		}
		else
        {
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

        // TODO: handle errors.
        return [
            'error' => null,
            'list' => Auth::user()->coach->teams
        ];
	}

    /**
     * Updates a database record.
     *
     * @param int $id   ID of group to be updated.
     * @return array
     */
    public function update(Request $request, $id)
    {
        $group = Team::findOrFail($id);

        $group->fill($request->only(['name', 'sport_id']));

        $group->save();

        // Return list of groups.
        // TODO: handle errors.
        return [
            'error' => null,
            'list' => Auth::user()->coach->teams
        ];
    }

    /**
     * Removes a record from the database.
     *
     * @param int $id   ID of group to remove.
     * @return mixed
     */
    public function destroy($id)
    {
        $group = Team::with('athletes')->findOrFail($id);

        // TODO: make whether profiles are deleted with groups or not configurable.
        if (count($group->athletes))
        {
            foreach ($group->athletes as $profile) {
                $profile->delete();
            }
        }

        // Delete group.
        $group->delete();

        // Return list of groups.
        // TODO: handle errors.
        return [
            'error' => null,
            'list' => Auth::user()->coach->teams
        ];
    }
}
