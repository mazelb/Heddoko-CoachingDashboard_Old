<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Francis Amankrah (frank@heddoko.com)
 */
namespace App\Http\Controllers;

use Response;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController
{
	use DispatchesCommands, ValidatesRequests;

    /**
     * Gets the embedable relations and attributes that may be appended to a model.
     *
     * @param array|string $embed   The properties to be appended to a model.
     * @param array $appendable     Those properties which aren't database relations.
     * @return array
     */
    protected function getEmbedArrays($embed = null, array $appendable = [])
    {
        // Relations and attributes to append
        $embed = is_string($embed) ? @explode(',', $embed) : (array) $embed;

        // Extract the attributes from the list of embeds.
        $attributes = array_intersect($appendable, $embed);

        // Separate the database relations from the appendable attributes.
        foreach ($embed as $key => $embedable)
        {
            // Remove invalid relations.
            $embedable = preg_replace('/[^0-9a-z]/i', '', $embedable);
            if (empty($embedable)) {
                unset($embed[$key]);
            }

            if (in_array($embedable, $attributes)) {
                unset($embed[$key]);
            }
        }

        return [
            'relations' => $embed,
            'attributes' => $attributes
        ];
    }

    /**
     * Shortcut to send a response to the client with a specific HTTP code.
     *
     * @param int $status   The HTTP status to send.
     * @param mixed $data   The data to send to the client.
     * @return Response
     */
    public function error($status, $msg = '', array $headers = [])
    {
        return Response::make($msg, $status, $headers);
    }
}
