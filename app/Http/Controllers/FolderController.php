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
use App\Models\Folder;
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
     * Retrieves the root folders and movements for the profile.
     *
     * @param int $profildId
     * @return Response
     */
    public function index($profileId)
    {
        return $this->show($profileId, 0);
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
     * Retrieves the movements and sub-folders for a specified folder.
     *
     * @param int $profileId
     * @param int $folderId
     * @return Response
     */
    public function show($profileId, $folderId = 0)
    {
        // Performance check.
        if (!$profile = Auth::user()->profiles()->find($profileId)) {
            return response('Profile Not Found.', 400);
        }

        // Retrieve root folders and movements if not folder was specified.
        if ($folderId < 1)
        {
            $folder = [
                'parent' => null,
                'children' => $profile->folders()->whereNull('folder_id')->get(),
                'movements' => $profile->movements()
                                ->whereNull('folder_id')
                                ->whereNull('screening_id')
                                ->get()
            ];
        }

        // Retrieve folders and movements within a given folder.
        else
        {
            if (!$folder = Folder::with('parent', 'children', 'movements')->find($folderId)) {
                return response('Folder Not Found.', 400);
            }
        }

        return $folder;
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
