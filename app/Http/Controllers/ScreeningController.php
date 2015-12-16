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
use App\Models\Profile;
use App\Models\Movement;
use App\Models\Screening;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ScreeningController extends Controller
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
            $profileId = (int) $this->request->input('profile_id');
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
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Retrieve profile this screening belongs to.
        if (!$profileId = (int) $this->request->input('profile_id')) {
            return response('Invalid Profile ID.', 400);
        }

        if (!$profile = Auth::user()->profiles()->find($profileId)) {
            return response('Profile Not Found.', 400);
        }

        // Create a record for the screening.
        $screening = $profile->screenings()->create($this->request->only([
            'score',
            'score_max',
            'notes'
        ]));

        // Add movements to the screening.
        if ($this->request->has('movements'))
        {
            $movements = [];
            $movementData = (array) $this->request->input('movements');

            foreach ($movementData as $data) {
                $movements[] = new Movement($data);
            }

            $screening->movements()->saveMany($movements);
        }

        return $screening;
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

        return $this->send(501, 'Not Implemented');
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

        return $this->send(501, 'Not Implemented');
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

        return $this->send(501, 'Not Implemented');
    }
}
