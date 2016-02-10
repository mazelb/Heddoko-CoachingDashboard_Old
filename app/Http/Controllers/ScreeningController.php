<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles screening-related http requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Http\Controllers;

use Auth;

use App\Http\Requests;
use App\Models\Folder;
use App\Models\Profile;
use App\Models\Movement;
use App\Models\MovementMeta;
use App\Models\Screening;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ScreeningController extends Controller
{
    CONST SEARCH_LIMIT = 20;

    /**
     *
     *
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
        // Profile-based query builder.
        if ($this->request->has('profileId'))
        {
            $profileId = (int) $this->request->input('profileId');

            if (!$profile = Auth::user()->profiles()->find($profileId)) {
                return response('Profile Not Found.', 400);
            }

            $builder = $profile->screenings();
        }

        // General query builder. We will limit the accessible scope to the profiles managed
        // by the authenticated user.
        else
        {
            $builder = Screening::whereIn('profile_id', Auth::user()->getProfileIDs());
        }

        // Retrieve other search parameters. We\ll also make sure we have positive values
        // for "limit" and "offset".
        $limit = max(0, min(50, $this->request->input('limit', static::SEARCH_LIMIT)));
        $offset = max(0, $this->request->input('offset', 0));
        $orderBy = snake_case($this->request->input('orderBy', 'createdAt'));
        $orderDir = $this->request->input('orderDir', 'desc');

        // Add search query.
        // TODO...

        $builder->orderBy($orderBy, $orderDir)->skip($offset)->take($limit);

        return [
            'total' => $builder->count(),
            'offset' => $offset,
            'limit' => $limit,
            'results' => $builder->get()
        ];
    }

    /**
     * Creates a new screening.
     *
     * @return Response
     */
    public function store()
    {
        // Performance check.
        if (!$profileId = (int) $this->request->input('profileId')) {
            return response('Invalid Profile ID.', 400);
        }

        if (!$profile = Auth::user()->profiles()->find($profileId)) {
            return response('Profile Not Found.', 400);
        }

        // Validate incoming data.
        $this->validate($this->request, [
            'title' => 'string|min:1|max:255',
            'score'  => 'int|between:-100,100',
            'scoreMin'  => 'int|between:-100,100',
            'scoreMax'  => 'int|between:-100,100',
            'notes'  => 'string',
            'meta'  => '',
        ]);

        // Retrieve screening details.
        $details = $this->request->only([
            'title',
            'score',
            'scoreMin',
            'scoreMax',
            'notes'
        ]);
        if (strlen(trim($details['title'])) < 1) {
            $details['title'] = 'Functional Movement Screening - '. date('M j, Y');
        }

        // Add some defaults.
        $details['meta'] = [
            'isComplete' => false
        ];

        // Create a record for the screening.
        if (!$screening = $profile->screenings()->create($details)) {
            return response('An Error Occurred.', 500);
        }

        // We'll also create a folder to organize the screening movements, if one doesn't already
        // exist.
        $screeningsFolder = Folder::where('profile_id', $profileId)
                                ->where('system_name', 'screenings')
                                ->first();
        if (!$screeningsFolder)
        {
            $screeningsFolder = $profile->folders()->create([
                'name' => 'Movement Tests',
                'system_name' => 'screenings',
                'path' => '/'
            ]);
        }

        $folder = $profile->folders()->create([
            'parent_id' => $screeningsFolder->id,
            'name' => $screening->title .' - '. date('M j, Y'),
            'system_name' => 'screenings.'. $screening->id,
            'path' => '/'. $screeningsFolder->name
        ]);

        // Add movement data, if any.
        if ($this->request->has('movements'))
        {
            $movements = (array) $this->request->input('movements');

            foreach ($movements as $data)
            {
                $movement = new Movement(array_only($data, ['title']));
                $movement->profileId = $screening->profileId;
                $movement->folderId = $folder->id;

                // Update metadata.
                $screening->movements()->save($movement);
                $meta = isset($data['meta']) ? (array) $data['meta'] : [];
                $meta['scoreMin'] = $screening->scoreMin;
                $meta['scoreMax'] = $screening->scoreMax;
                $movement->meta()->create($meta);
            }
        }

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Screening::$appendable
        );

        // Return updated model.
        $updated = Screening::with($embed['relations'])->find($screening->id);

        return $updated;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        // Performance check.
        $id = (int) $id;
        if ($id < 1) {
            return response('Invalid Screening ID.', 400);
        }

        // Retrieve screening.
        $builder = Screening::whereIn('profile_id', Auth::user()->getProfileIDs());

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Screening::$appendable
        );

        if (!$screening = $builder->with($embed['relations'])->find($id)) {
            return response('Screening Not Found.', 404);
        }

        return $screening;
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
        if (!$screening = Screening::whereIn('profile_id', Auth::user()->getProfileIDs())->find($id)) {
            return response('Screening Not Found.', 400);
        }

        // Validate incoming data.
        $this->validate($this->request, [
            'title' => 'string|min:1|max:255',
            'score'  => 'int|between:-100,100',
            'scoreMin'  => 'int|between:-100,100',
            'scoreMax'  => 'int|between:-100,100',
            'notes'  => 'string|max:65,535',
            'meta'  => 'json',
            'movement.title' => '',
        ]);

        // Update primary screening details.
        foreach (['title', 'score', 'scoreMin', 'scoreMax', 'notes'] as $attribute) {
            if ($this->request->has($attribute)) {
                $screening->$attribute = $this->request->input($attribute);
            }
        }

        // Save screening.
        if (!$screening->save()) {
            return response('Could not save screening data.', 500);
        }

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Screening::$appendable
        );

        // Return updated model.
        $updated = Screening::with($embed['relations'])->find($screening->id);

        return $updated;
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

        return response('Not Implemented.', 501);
    }
}
