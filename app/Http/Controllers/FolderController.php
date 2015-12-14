<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for movement folders.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Http\Controllers;

use DB;
use Auth;

use App\Http\Requests;
use App\Models\Profile;
use App\Models\Movement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FolderController extends Controller
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
     * @param int $profildId
     * @param int $folderId
     * @return Response
     */
    public function index($profileId, $folderId = null)
    {
        // Performance check.
        if (!$profile = Profile::find($profileId)) {
            return response('Profile Not Found.', 400);
        }

        // Build search query.
        $builder = $profile->folders();

        abort(501);
    }

    /**
     * Stores a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        abort(501);
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
