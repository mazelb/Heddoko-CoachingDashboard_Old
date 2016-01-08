<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles profile-related http requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Http\Controllers;

use Auth;
use Image;

use App\Models\Tag;
use App\Models\Group;
use App\Models\Profile;
use App\Models\ProfileMeta;
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
     * Displays a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // Constrain results to a specific group.
        if ($this->request->has('groupId'))
        {
            $groupId = (int) $this->request->input('groupId');

            if ($groupId && $group = Auth::user()->groups()->find($groupId)) {
                $builder = $group->profiles();
            }

            // If group wasn't found, return "400 Bad Request" response.
            else {
                return response('Group not found.', 400);
            }
        }

        // If no group was specified, lookup all profiles accessible to authenticated user.
         else {
            $builder = Auth::user()->profiles();
        }

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Profile::$appendable
        );

        // Retrieve profiles.
        $profiles = $builder->with($embed['relations'])->get();

        if (count($profiles))
        {
            $resizeAvatar = (bool) array_search('avatarSrc', $embed['attributes']);

            foreach ($profiles as $profile)
            {
                // Resize avatar.
                if ($resizeAvatar) {
                    $profile->resizeAvatar(400);
                }

                // Append extra attributes.
                if (count($embed['attributes']))
                {
                    foreach ($embed['attributes'] as $accessor)
                    {
                        $profile->setAttribute($accessor, $profile->$accessor);
                    }
                }
            }
        }

        return $profiles;
    }

    /**
     * Stores a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Validate incoming data.
        $this->validate($this->request, [
            'firstName' => 'required|string|min:1|max:255',
            'lastName'  => 'string|max:255',
            'tagId'     => 'int|exists:tags,id',
            'meta.height' => '',
            'meta.mass' => '',
            'meta.dob' => 'date_format:Y-m-d H:i:s',
            'meta.gender' => 'string|in:female,male,',
            'meta.phone' => 'string',
            'meta.email' => 'string',
            'meta.medicalHistory' => 'string|max:65,535',
            'meta.injuries' => 'string|max:65,535',
            'meta.notes' => 'string|max:65,535',
            'meta.params' => 'json',
        ]);

        // Create new profile.
        return $this->saveProfileData(new Profile);
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

        // Make sure we have a valid profile.
        $embed = ['groups', 'managers', 'screenings', 'primaryTag', 'secondaryTags'];
        if (!$profile = Profile::with($embed)->find($id)) {
            return response('Profile Not Found.', 404);
        }

        // TODO: who is authorized to access profiles?

        return $profile;
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
        if (!$profile = Auth::user()->profiles()->find($id)) {
            return response('Profile Not Found.', 400);
        }

        // Validate incoming data.
        $this->validate($this->request, [
            'firstName' => 'string|min:1|max:255',  // Not required when updating.
            'lastName'  => 'string|max:255',
            'tagId'     => 'int|exists:tags,id',
            'meta.height' => '',
            'meta.mass' => '',
            'meta.dob' => 'date_format:Y-m-d H:i:s',
            'meta.gender' => 'string|in:female,male,',
            'meta.phone' => 'string',
            'meta.email' => 'string',
            'meta.medicalHistory' => 'string|max:65,535',
            'meta.injuries' => 'string|max:65,535',
            'meta.notes' => 'string|max:65,535',
            'meta.params' => 'json',
        ]);

        // Save profile.
        return $this->saveProfileData($profile);
    }

    /**
     * Saves profile relations.
     *
     * @param \App\Models\Profile $profile
     */
    private function saveProfileData(Profile $profile)
    {
        // Update primary profile details.
        foreach (['firstName', 'lastName', 'tagId'] as $attribute) {
            if ($this->request->has($attribute)) {
                $profile->$attribute = $this->request->input($attribute);
            }
        }

        // If a primary tag title was requested, create it.
        if ($this->request->has('primaryTagTitle'))
        {
            $tag = Tag::firstOrCreate(['title' => $this->request->input('primaryTagTitle')]);
            $profile->tagId = $tag->id;
        }

        // Save profile.
        if (!$profile->save()) {
            return response('Could not save profile data.', 500);
        }

        // Save secondary profile details (meta data).
        if ($this->request->has('meta'))
        {
            // Retrieve meta object.
            $newMetaData = (array) $this->request->input('meta');
            $metaAttributes = [
                'height',
                'mass',
                'dob',
                'gender',
                'phone',
                'email',
                'medicalHistory',
                'injuries',
                'notes',
                'meta'
            ];

            // Create meta data.
            if (!$profile->meta)
            {
                $profile->meta()->create(array_only($newMetaData, $metaAttributes));
            }

            // Update meta data.
            else
            {
                $metaData = ProfileMeta::find($profile->meta->id);

                foreach ($metaAttributes as $attribute) {
                    if (array_has($newMetaData, $attribute)) {
                        $metaData->$attribute = $newMetaData[$attribute];
                    }
                }

                $metaData->save();
            }
        }

        // Attach groups.
        if ($this->request->has('groups'))
        {
            $profile->groups()->sync((array) $this->request->input('groups'));
        }

        // Attach managers.
        if ($this->request->has('managers'))
        {
            $profile->managers()->sync((array) $this->request->input('managers'));
        }

        // Assign current user as a manager.
        elseif (!$profile->id)
        {
            $profile->managers()->attach(Auth::id());
        }

        // Attach secondary tags.
        if ($this->request->has('secondaryTags'))
        {
            $profile->secondaryTags()->sync((array) $this->request->input('secondaryTags'));
        }

        // Create new secondary tags.
        if ($this->request->has('secondaryTagTitles'))
        {
            $secondaryTags = [];
            $titles = (array) $this->request->input('secondaryTagTitles');
            foreach ($titles as $title)
            {
                $tag = Tag::firstOrCreate(['title' => $title]);
                $secondaryTags[] = $tag->id;
            }

            $profile->secondaryTags()->attach($secondaryTags);
        }

        // Return updated model.
        return Profile::with('meta')->find($profile->id);
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
        }
        elseif (!preg_match('#^(image/[a-z]+)$#', $original->getMimeType())) {
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
            'avatarSrc' => $avatar->src
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
}
