<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for movement data.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Http\Controllers;

use Auth;

use App\Http\Requests;
use App\Models\Movement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MovementDataController extends Controller
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
        abort(501);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param int $profileId
     * @return Response
     */
    public function store($profileId)
    {
        // Retrieve profile this movement belongs to.
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
     * Display the specified resource.
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
