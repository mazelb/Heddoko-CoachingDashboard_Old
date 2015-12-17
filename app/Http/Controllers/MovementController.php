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
        if ($this->request->has('profile_id'))
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
            return response('Profile Not Found ('. json_encode($profile) .').', 400);
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
        abort(501);
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
        abort(501);
    }
}
