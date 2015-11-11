<?php
/**
 *
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
