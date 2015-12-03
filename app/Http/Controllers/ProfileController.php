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
        // Retrieve a query builder.
        $groupId = (int) $this->request->input('group');
        if ($groupId && $group = Group::find($groupId)) {
            $builder = $group->profiles();
        } else {
            $builder = Profile::query();
        }

        // Determine which relations to embed with the profile list.
        if ($this->request->has('embed')) {
            $embed = explode(',', $this->request->input('embed'));
        } else {
            $embed = ['profile_meta', 'groups', 'primaryTag', 'secondaryTags', 'avatar'];
        }

        // Retrieve profiles.
        $profiles = $builder->with($embed)->get();

        if (count($profiles))
        {
            foreach ($profiles as $profile)
            {
                // Resize avatar.
                $profile->resizeAvatar(400);

                // Append meta data.
                if (in_array('profile_meta', $embed)) {
                    $profile->appendMeta();
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
        // TODO: validate incoming data.
        // ... Maybe do this in model, through 'create' and 'saving' events?

        $data = $this->request->only(['first_name', 'last_name']);

        // Create new profile.
        try {
            $profile = Profile::create($data);
        }
        catch (\Exception $error) {
            return response($error->getMessage(), 500);
        }

        // Add meta data.
        $profile->meta()->create($this->request->only([
            'height',
            'mass',
            'dob',
            'gender',
            'phone',
            'email',
            'medical_history',
            'injuries',
            'notes',
            'meta'
        ]));

        // Assign current user as a manager.
        $profile->managers()->attach(Auth::id());

        // Attach associated group.
        if ($this->request->has('groups'))
        {
            $profile->groups()->sync((array) $this->request->input('groups'));
        }

        // Embed extra data.
        $profile->appendMeta();
        $groups = $profile->groups;

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
        // Make sure we have a valid profile.
        if (!$profile = Profile::find($id)) {
            return response('Profile Not Found.', 404);
        }

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
            'medical_history',
            'injuries',
            'notes',
            'meta'
        ]));

        // Update primary tag.
        if ($this->request->has('tag_id'))
        {
            $tagId = (int) $this->request->input('tag_id');
            $profile->tag_id = $tagId ?: null;
        }

        // Save profile.
        $profile->save();

        // Create new tag for this profile.
        if ($this->request->has('primary_tag_title'))
        {
            $tag = Tag::firstOrCreate(['title' => $this->request->input('primary_tag_title')]);
            $profile->primaryTag()->associate($tag);
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

        // Attach secondary tags.
        if ($this->request->has('secondary_tags'))
        {
            $profile->secondaryTags()->sync((array) $this->request->input('secondary_tags'));
        }

        // Create new secondary tags.
        if ($this->request->has('secondary_tag_titles'))
        {
            $secondaryTags = [];
            $titles = (array) $this->request->input('secondary_tag_titles');
            foreach ($titles as $title)
            {
                $tag = Tag::firstOrCreate(['title' => $title]);
                $secondaryTags[] = $tag->id;
            }

            $profile->secondaryTags()->attach($secondaryTags);
        }

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
            'avatar' => $avatar,
            'avatar_src' => $avatar->src
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
