<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for movement frames.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Http\Controllers;

use Auth;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Movement;
use App\Models\MovementFrame;
use App\Http\Controllers\Controller;

class MovementFrameController extends Controller
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
        // Performance check.
        if (!$movement = $this->getMovement($movementId)) {
            return response('Movement Not Found.', 404);
        }

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            MovementFrame::$appendable
        );

        // Build query.
        $builder = $movement->frames()->with($embed['relations']);

        // Query offset.
        $offset = 0;
        if ($this->request->has('offset')) {
            $offset = (int) $this->request->input('offset');
            $builder->skip($offset);
        }

        // Query limit.
        $limit = null;
        if ($this->request->has('limit')) {
            $limit = (int) $this->request->input('limit');
            $builder->take($limit);
        }

        // Order direction.
        $orderDir = $this->request->input('orderDir', 'asc');
        $orderDir = in_array($orderDir, ['asc', 'desc']) ? $orderDir : 'asc';
        $builder->orderBy('timestamp', $orderDir);

        return [
            'total' => $builder->count(),
            'offset' => $offset,
            'limit' => $limit,
            'frames' => $builder->get()
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param int $movementId
     * @return \Illuminate\Http\Response
     */
    public function store($movementId)
    {
        // Performance check.
        if (!$movement = $this->getMovement($movementId)) {
            return response('Movement Not Found.', 404);
        }

        // TODO
        return response('In Development.', 501);
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
        // Performance check.
        if (!$movement = $this->getMovement($movementId)) {
            return response('Movement Not Found.', 404);
        }

        // Retrieve list of relations and attributes to append to results.
        $embed = $this->getEmbedArrays(
            $this->request->get('embed'),
            MovementFrame::$appendable
        );

        // Retrieve movement frame.
        if (!$frame = $movement->with($embed['relations'])->find($frameId)) {
            return response('Frame Not Found.', 404);
        }

        return $frame;
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
        // TODO
        return response('In Development.', 501);
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
        // Performance check.
        if (!$movement = $this->getMovement($movementId)) {
            return response('Movement Not Found.', 404);
        }

        $builder = $movement->frames();

        // Delete an array of frames.
        $deleted = false;
        if (strpos($frameId, ',') !== false)
        {
            $frames = $builder->whereIn('id', explode(',', $frameId))->lists('id')->toArray();

            if (count($frames)) {
                $deleted = MovementFrame::destroy($frames);
            }
        }

        // Delete a single frame.
        elseif ($builder->exists($frames))
        {
            $deleted = MovementFrame::destroy($frames);
        }

        // Frame doesn't exist.
        else {
            return response('', 204);
        }

        return $deleted ? response('', 204) : response('', 500);
    }

    /**
     * Shortcut to retrieve the specified movement.
     *
     * @param int $movementId
     * @return \App\Models\Movement
     */
    private function getMovement($movementId) {
        return Movement::whereIn('profile_id', Auth::user()->getProfileIDs())->find($movementId);
    }
}
