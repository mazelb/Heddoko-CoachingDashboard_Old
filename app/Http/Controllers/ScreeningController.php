<?php
/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   Handles screening-related http requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Http\Controllers;

use App\Models\Screening;
use App\Http\Requests;
use App\Models\ScreeningTest;
use App\Models\Profile;
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
        // Find related profile.
        $profile = Profile::find($this->request->input('profile_id'));

        return $profile ? $profile->screenings : [];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Make sure we have an associated profile.
        if (!$profile = Profile::find($this->request->input('profile_id'))) {
            return $this->error(400, 'Invalid profile ID.');
        }

        // Create an FMS record.
        $fms = $profile->screenings()->create($this->request->only(['score', 'notes']));

        // Add FMS tests.
        $rawTestEntries = $this->request->input('tests', null);
        if (is_array($rawTestEntries) && count($rawTestEntries))
        {
            $fmsTestEntries = [];

            foreach ($rawTestEntries as $test) {
                $fmsTestEntries[] = new FMSTest($test);
            }

            $fms->tests()->saveMany($fmsTestEntries);
        }

        // Return all FMS records related to this profile.
        return [
            'list' => $profile->screenings,
            'fms' => $fms
        ];
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
