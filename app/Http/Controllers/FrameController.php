<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for movement frames.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class FrameController extends Controller
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
     * @param int $movementId
     * @return \Illuminate\Http\Response
     */
    public function index($movementId)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param int $movementId
     * @return \Illuminate\Http\Response
     */
    public function create($movementId)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param int $movementId
     * @return \Illuminate\Http\Response
     */
    public function store($movementId)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $movementId
     * @param int $frameId
     * @return \Illuminate\Http\Response
     */
    public function show($movementId, $frameId)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $movementId
     * @param int $frameId
     * @return \Illuminate\Http\Response
     */
    public function edit($movementId, $frameId)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $movementId
     * @param int $frameId
     * @return \Illuminate\Http\Response
     */
    public function update($movementId, $frameId)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $movementId
     * @param int $frameId
     * @return \Illuminate\Http\Response
     */
    public function destroy($movementId, $frameId)
    {
        //
    }
}
