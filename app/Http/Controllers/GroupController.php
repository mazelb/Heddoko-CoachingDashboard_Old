<?php
/**
 *
 */
namespace App\Http\Controllers;

use Auth;

use Illuminate\Http\Request;

use App\Models\Group;
use App\Http\Requests;
use App\Models\Profile;
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
        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Group::$appendable
        );

        // Retrieve groups.
        $groups = Auth::user()->groups()->with($embed['relations'])->get();

        if (count($groups))
        {
            $resizeAvatar = (bool) array_search('avatarSrc', $embed['attributes']);

            foreach ($groups as $group)
            {
                // Resize avatar.
                if ($resizeAvatar) {
                    $group->resizeAvatar(400);
                }

                // Append extra attributes.
                if (count($embed['attributes']))
                {
                    foreach ($embed['attributes'] as $accessor)
                    {
                        $group->setAttribute($accessor, $group->$accessor);
                    }
                }
            }
        }

        return $groups;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Validate incoming data.
        $this->validate($this->request, [
            'name' => 'required|string|min:1|max:255',
        ]);

        // Create new group.
        return $this->saveGroupData(new Group);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Profile::$appendable
        );

        // Make sure we have a valid group.
        if (!$group = Auth::user()->groups()->with($embed['relations'])->find($id)) {
            return response('Group Not Found.', 404);
        }

        // TODO: attach attributes...

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
        // Performance check.
        if (!$group = Auth::user()->groups()->find($id)) {
            return response('Group Not Found.', 400);
        }

        // Validate incoming data.
        $this->validate($this->request, [
            'name' => 'string|min:1|max:255',  // Not required when updating.
        ]);

        // Save group.
        return $this->saveGroupData($group);
    }

    /**
     * Saves group relations.
     *
     * @param \App\Models\Group $group
     */
    private function saveGroupData(Group $group)
    {
        // Update primary group details.
        foreach (['name', 'mainTagId', 'meta'] as $attribute) {
            if ($this->request->has($attribute)) {
                $group->$attribute = $this->request->input($attribute);
            }
        }

        // Save group.
        if (!$group->save()) {
            return response('Could not save group data.', 500);
        }

        // Attach or create tags.
        if ($this->request->has('tags') || $this->request->has('tagIds'))
        {
            $group->saveTags(
                $this->request->input('tags', []),
                $this->request->input('tagIds', [])
            );
        }

        // Attach profiles.
        if ($this->request->has('profiles'))
        {
            $group->profiles()->sync((array) $this->request->input('profiles'));
        }

        // Attach managers.
        if ($this->request->has('managers'))
        {
            $group->managers()->sync((array) $this->request->input('managers'));
        }

        // Assign current user as a manager.
        elseif (count($group->managers) === 0)
        {
            $group->managers()->attach(Auth::id());
        }

        // Return updated model.
        return Group::find($group->id);
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
