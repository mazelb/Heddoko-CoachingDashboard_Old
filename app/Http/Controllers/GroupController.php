<?php
/**
 *
 */
namespace App\Http\Controllers;

use Auth;

use App\Models\Group;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GroupController extends Controller
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // TODO


        return Auth::user()->groups;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Retrieve group data.
        $data = $this->request->only([
            'name'
        ]);

        // Create new group.
        $group = Group::create($data);

        // Assign current user as a manager.
        $group->managers()->attach(Auth::id());

        // Attach associated profiles.
        if ($this->request->has('profiles'))
        {
            $profile->profiles()->sync((array) $this->request->input('profiles'));
        }

        // ...
        return [
            'list' => $this->index(),
            'group' => $group
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $group = $this->getGroup($id);

        // Update group details.
        $group->fill($this->request->only([
            'name'
        ]));

        // Save group details.
        $group->save();

        // Attach associated profiles.
        if ($this->request->has('profiles'))
        {
            $group->profiles()->sync((array) $this->request->input('profiles'));
        }

        // ...
        return [
            'list' => $this->index(),
            'group' => $group
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     *
     */
    public function updatePhoto($id)
    {

    }

    /**
     *
     */
    public function destroyPhoto($id)
    {

    }

    /**
     * Shortcut to retrieve a group and make sure it exists.
     *
     * @param int $id
     * @return \App\Models\Group|null
     */
    protected function getGroup($id)
    {
        // TODO: check if group exists. If it doesn't, send a useful error message.

        return Group::findOrFail($id);
    }
}
