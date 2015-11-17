<?php
/**
 * @brief   Handles profile actions.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Http\Controllers;

use Auth;
use Image;

use App\Models\Group;
use App\Http\Requests;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     */
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
        // TODO: filter profiles somehow.


        // Retrieve query builder.
        $groupId = (int) $this->request->input('group');
        if ($groupId && $group = Group::find($groupId)) {
            $builder = $group->profiles();
        } else {
            $builder = Profile::query();
        }

        // Retrieve profiles.
        $profiles = $builder->with('avatar')->get();

        // Resize avatars.
        if (count($profiles)) {
            foreach ($profiles as $profile) {
                $profile->resizeAvatar(200);
            }
        }

        return $profiles;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // TODO: who is authorized to create profiles?


        // Retrieve profile data.
        $data = $this->request->only([
            'first_name',
            'last_name',
            'height',
            'mass',
            'dob',
            'gender',
            'phone',
            'email',
            'notes',
            'meta'
        ]);

        // Create new profile.
        $profile = Profile::create($data);

        // Assign current user as a manager.
        $profile->managers()->attach(Auth::id());

        // Attach associated group.
        if ($this->request->has('groups'))
        {
            $profile->groups()->sync((array) $this->request->input('groups'));
        }

        // ...
        return [
            'list' => $this->index(),
            'profile' => $profile
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
        $profile = $this->getProfile($id);

        // Update profile details.
        $profile->fill($this->request->only([
            'first_name',
            'last_name',
            'height',
            'mass',
            'dob',
            'gender',
            'phone',
            'email',
            'notes',
            'meta'
        ]));

        // Save profile.
        $profile->save();

        // Attach associated group.
        if ($this->request->has('groups'))
        {
            $profile->groups()->sync((array) $this->request->input('groups'));
        }

        // ...
        return [
            'list' => $this->index(),
            'profile' => $profile
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
        // Make sure we have a valid profile.
        if (!$profile = Profile::with('avatar')->find($id)) {
            return response('Profile Not Found.', 404);
        }

        // Delete avatar.
        if ($profile->avatar) {
            $profile->avatar->delete();
        }

        // Delete profile and associated groups/movements/screenings/tags.
        $profile->delete();

        // Return remaining groups.
        return $this->index();
    }

    /**
     * Saves the avatar for a profile.
     *
     * @param int $id
     */
    public function saveAvatar($id)
    {
        // Make sure we have a valid profile.
        if (!$profile = Profile::find($id)) {
            return response('Profile Not Found.', 404);
        }

        // Check image.
        if (!$original = $this->request->file('image')) {
            return response('No File Received.', 400);
        } elseif (!preg_match('#^(image/[a-z]+)$#', $original->getMimeType())) {
            return response('Invalid MIME type.', 400);
        }

        // Delete previous avatar.
        if ($profile->avatar) {
            $profile->avatar->delete();
        }

        // Save avatar data.
        $avatar = $profile->avatar()->create([
            'data_uri' => base64_encode(file_get_contents($original->getRealPath())),
            'mime_type' => $original->getMimeType()
        ]);

        return [
            'list' => $this->index(),
            'avatar' => $avatar
        ];
    }

    /**
     *
     */
    public function destroyAvatar($id)
    {
        // Make sure we have a valid profile.
        if (!$profile = Profile::find($id)) {
            return response('Profile Not Found.', 404);
        }

        // Delete avatar.
        $profile->avatar()->delete();

        return [
            'list' => $this->index()
        ];
    }

    /**
     * Shortcut to retrieve a profile and make sure it exists.
     *
     * @param int $id
     * @return \App\Models\Profile|null
     */
    protected function getProfile($id)
    {
        // TODO: check if profile exists. If it doesn't, send a useful error message.

        return Profile::findOrFail($id);
    }
}
