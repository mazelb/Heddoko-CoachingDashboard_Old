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
        // Make sure we have a valid group.
        if (!$group = Auth::user()->groups()->find($id)) {
            return response('Group Not Found.', 404);
        }

        return $group;
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
        // Make sure we have a valid group.
        if (!$group = Group::with('avatar')->find($id)) {
            return response('Group Not Found.', 404);
        }

        // Delete group avatar.
        if ($group->avatar) {
            $group->avatar->delete();
        }

        // Delete group and associated profiles.
        $group->delete();

        // Return remaining groups.
        return $this->index();
    }

    /**
     * Saves the avatar for a group.
     *
     * @param int $id
     */
    public function saveAvatar($id)
    {
        // Make sure we have a valid group.
        if (!$group = Group::find($id)) {
            return response('Group Not Found.', 404);
        }

        // Check image.
        if (!$original = $this->request->file('image')) {
            return response('No File Received.', 400);
        } elseif (!preg_match('#^(image/[a-z]+)$#', $original->getMimeType())) {
            return response('Invalid MIME type.', 400);
        }

        // Delete previous avatar.
        if ($group->avatar) {
            $group->avatar->delete();
        }

        // Save avatar data.
        $avatar = $group->avatar()->create([
            'data_uri' => base64_encode(file_get_contents($original->getRealPath())),
            'mime_type' => $original->getMimeType()
        ]);

        return [
            'avatarSrc' => $avatar->src
        ];
    }

    /**
     *
     */
    public function destroyAvatar($id)
    {
        // Make sure we have a valid profile.
        if (!$group = Group::find($id)) {
            return response('Group Not Found.', 404);
        }

        // Delete avatar.
        $group->avatar()->delete();

        return [
            'list' => $this->index()
        ];
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
