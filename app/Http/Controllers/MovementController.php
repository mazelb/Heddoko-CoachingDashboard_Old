<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Http\Controllers;

use DB;
use Auth;

use App\Http\Requests;
use App\Models\Profile;
use App\Models\Movement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MovementController extends Controller
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
        // Profile-based query builder.
        if ($this->request->has('profileId'))
        {
            $profileId = (int) $this->request->input('profileId');
            if (!$profile = Auth::user()->profiles()->find($profileId)) {
                return response('Profile Not Found.', 400);
            }

            $builder = $profile->movements();
        }

        // General query builder. We will limit the accessible scope to the profiles managed
        // by the authenticated user.
        else
        {
            $builder = Movement::whereIn('profile_id', Auth::user()->getProfileIDs());
        }

        // ...

        $offset = 0;
        $limit = 20;
        $orderBy = 'created_at';
        $orderDir = 'desc';

        $builder->orderBy($orderBy, $orderDir)->skip($offset)->take($limit);

        return [
            'total' => $builder->count(),
            'offset' => $offset,
            'limit' => $limit,
            'results' => $builder->get()
        ];
    }

    /**
     * Stores a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Retrieve profile this movement belongs to.
        if (!$profileId = (int) $this->request->input('profileId')) {
            return response('Invalid Profile ID.', 400);
        }

        if (!$profile = Auth::user()->profiles()->find($profileId)) {
            return response('Profile Not Found.', 400);
        }

        // Make sure we have a file to work with.
        if (!$original = $this->request->file('file')) {
            return response('No File Received.', 400);
        }

        // Quickly check the MIME type.
        elseif (!preg_match('#^text/(csv|plain)$#', $original->getMimeType())) {
            return response('Invalid MIME Type ('. $original->getMimeType() .').', 400);
        }

        // Extract raw data.
        $title = $original->getClientOriginalName();
        $data = file_get_contents($original->getRealPath());

        // Create the database record.
        $movement = $profile->movements()->create([
            'submitted_by' => Auth::id(),
            'title' => $title
        ]);

        // TODO: save raw data.

        // TODO: save frame data.

        return $movement;
    }

    /**
     * Displays the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Movement::$appendable
        );

        // Make sure we have a valid movement.
        $builder = Movement::whereIn('profile_id', Auth::user()->getProfileIDs());
        if (!$movement = $builder->with($embed['relations'])->find($id)) {
            return response('Movement Not Found.', 404);
        }

        // There are no movement attributes to append. Keep going...

        return $movement;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        abort(501);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        // Make sure that only movements accessible by the authenticated user can be deleted.
        $builder = Movement::whereIn('profile_id', Auth::user()->getProfileIDs());

        // Delete an array of movements.
        $deleted = false;
        if (strpos($id, ',') !== false)
        {
            $movements = $builder->whereIn('id', explode(',', $id))->lists('id');

            // TODO: find out why this doesn't work.
            if (count($movements)) {
                $deleted = Movement::destroy($movements);
            }
        }

        // Delete a single movement.
        elseif ($builder->exists($id))
        {
            $deleted = Movement::destroy($id);
        }

        return $deleted ? response('', 200) : response('', 500);
    }
}
