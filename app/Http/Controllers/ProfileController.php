<?php
/**
 *
 */
namespace App\Http\Controllers;

use App\Models\Group;
use App\Http\Requests;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
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
        // TODO: filter profiles somehow.


        // Filter by group.
        $groupId = (int) $this->request->input('group');
        if ($groupId && $group = Group::find($groupId)) {
            return $group->profiles;
        }

        return Profile::all();
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
            'user_id',
            'first_name',
            'last_name',
            'age',
            'height',
            'weight',
            'dob',
            'gender',
            'phone',
            'email',
            'notes',
            'meta'
        ]);

        // Create new profile.
        $profile = Profile::create($data);

        // ...
        return $profile;
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
        //
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
     * Saves the avatar for a profile.
     *
     * @param int $id
     */
    public function updatePhoto($id)
    {
        // Make sure we have a valid profile.
        $profile = $this->getProfile($id);

        // Check image.
        if (!$originalPhoto = $this->request->file('photo')) {
            return ['error' => 'File not received.'];
        } elseif (!preg_match('#^(image/[a-z]+)$#', $originalPhoto->getMimeType())) {
            return ['error' => 'Invalid MIME type.'];
        }

        // Delete existing avatars.
        $name = 'profile_'. $profileId;
        foreach (glob(public_path() .'/demo/avatars/'. $name .'.*') as $existingPhoto) {
            unlink($existingPhoto);
        }

        // Upload new avatar.
        $filePath = public_path() .'/demo/avatars';
        $fileName = $name .'.'. $originalPhoto->getClientOriginalExtension();
        $movedPhoto = $originalPhoto->move($filePath, $fileName);

        // Save the source in the database record.
        $profile->photo_src = '/demo/avatars/'. $fileName;
        $profile->save();

        // Update the "updated_at" field.
        $profile->touch();

        return [
            'error' => null,
            'photo_src' => $profile->photo_src,
            'list' => $group->athletes
        ];
    }

    /**
     *
     */
    public function destroyPhoto($id)
    {

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
