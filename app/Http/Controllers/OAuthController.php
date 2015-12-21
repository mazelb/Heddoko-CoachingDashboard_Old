<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles OAuth2-replated requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Http\Controllers;

use Authorizer;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OAuthController extends Controller
{
    /**
     *
     */
    public function accessToken()
    {
        return Authorizer::issueAccessToken();
    }
}
