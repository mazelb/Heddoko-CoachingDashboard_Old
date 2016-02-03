<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles OAuth2-replated requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Http\Controllers\Auth;

use Authorizer;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OAuthController extends Controller
{
    /**
     * Constructor.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Issues an access token.
     */
    public function accessToken()
    {
        return Authorizer::issueAccessToken();
    }

    /**
     *
     */
    public function showAuthorizationForm()
    {
        $authParams = Authorizer::getAuthCodeRequestParams();

        $formParams = array_except($authParams,'client');

        $formParams['client_id'] = $authParams['client']->getId();

        $formParams['scope'] = implode(config('oauth2.scope_delimiter'), array_map(function ($scope) {
            return $scope->getId();
        }, $authParams['scopes']));

        return view('auth.oauth-form', [
            'params' => $formParams,
            'client' => $authParams['client']
        ]);
    }

    /**
     *
     */
    public function authorize()
    {
        $params = Authorizer::getAuthCodeRequestParams();
        $params['user_id'] = Auth::user()->id;
        $redirectUri = '/';

        // If the user has allowed the client to access its data, redirect back to the client with
        // an auth code.
        if ($this->request->has('approve')) {
            $redirectUri = Authorizer::issueAuthCode('user', $params['user_id'], $params);
        }

        // If the user has denied the client to access its data, redirect back to the client with
        // an error message.
        if ($this->request->has('deny')) {
            $redirectUri = Authorizer::authCodeRequestDeniedRedirectUri();
        }

        return redirect($redirectUri);
    }
}
