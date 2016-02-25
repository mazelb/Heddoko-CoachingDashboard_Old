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
     * @param int $profileId
     * @return Response
     */
    public function store($profileId)
    {
        // Performance check.
        if (!$profile = Auth::user()->profiles()->find($profileId)) {
            return response('Profile Not Found.', 400);
        }

        // Validate incoming data.
        $this->validate($this->request, [
            'name' => 'required|string|min:1|max:255',
            'folderId' => 'int|exists:folders,id',
        ]);

        // Create new folder.
        return $this->saveFolderData($profile, new Folder);
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

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Folder::$appendable
        );

        // Retrieve root folders and movements if no folder was specified.
        if ($folderId < 1)
        {
            $folder = [];

            if (in_array('parent', $embed['relations']))
            {
                $folder['parent'] = null;
            }

            if (in_array('children', $embed['relations']))
            {
                $folder['children'] = $profile->folders()->whereNull('parent_id')->get();
            }

            if (in_array('movements', $embed['relations']))
            {
                $folder['movements'] = $profile->movements()
                                        ->whereNull('folder_id')
                                        ->whereNull('screening_id')
                                        ->get();
            }
        }

        // Retrieve folders and movements within a given folder.
        else
        {
            if (!$folder = Folder::with($embed['relations'])->find($folderId)) {
                return response('Folder Not Found.', 400);
            }
        }

        // There are no folder attributes to append. Keep going...

        return $folder;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $profileId
     * @param int $folderId
     * @return Response
     */
    public function update($profileId, $folderId)
    {
        // Performance check.
        if (!$profile = Auth::user()->profiles()->find($profileId)) {
            return response('Profile Not Found.', 400);
        }
        elseif (!$folder = $profile->folders()->find($folderId)) {
            return response('Folder Not Found.', 400);
        }

        // Validate incoming data.
        $this->validate($this->request, [
            'name' => 'string|min:1|max:255',
            'folderId' => 'int|exists:folders,id',
        ]);

        // Save folder data.
        return $this->saveFolderData($profile, $folder);
    }

    /**
     * Saves a folder and its relations.
     *
     * @param \App\Models\Profile $profile
     * @param \App\Models\Folder $folder
     */
    private function saveFolderData(Profile $profile, Folder $folder)
    {
        // Update primary folder details.
        if ($this->request->has('name')) {
            $folder->name = $this->request->input('name');
        }

        // Set parent folder.
        if ($this->request->has('folderId'))
        {
            $folder->folderId = $this->request->input('folderId');
        }

        // Set profile.
        if (!$folder->profileId)
        {
            $folder->profileId = $profile->id;
        }

        // Set path.
        $folder->path = '/';
        if ($folder->parent) {
            $folder->path = $folder->parent->path == '/' ? '/' : $folder->parent->path .'/';
            $folder->path .= $folder->parent->name;
        }

        // Save folder.
        if (!$folder->save()) {
            return response('Could not save folder data.', 500);
        }

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            Folder::$appendable
        );

        // Return updated model.
        $updated = Folder::with($embed['relations'])->find($folder->id);

        return $updated;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $profileId
     * @param string|int $folderId
     * @return Response
     */
    public function destroy($profileId, $folderId)
    {
        // Make sure that only folders accessible by the authenticated user can be deleted.
        $builder = Folder::whereIn('profile_id', Auth::user()->getProfileIDs());

        // Delete an array of folders.
        $deleted = false;
        if (strpos($folderId, ',') !== false)
        {
            $folders = $builder->whereIn('id', explode(',', $folderId))->lists('id')->toArray();

            if (count($folders)) {
                $deleted = Folder::destroy($folders);
            }
        }

        // Delete a single folder.
        elseif ($builder->exists($folderId))
        {
            $deleted = Folder::destroy($folderId);
        }

        return $deleted ? response('', 200) : response('', 500);
    }
}
