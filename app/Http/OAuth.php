<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   The main OAuth2 class.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Http;

use Auth;

class OAuth
{
    /**
     * Verifies whether a set of credentials are valid or not.
     *
     * @param string $username
     * @param sring $password
     * @return int|bool
     */
    public function verifyCredentials($username, $password)
    {
        $credentials = [
            'username' => $username,
            'password' => $password,
        ];

        return Auth::once($credentials) ? Auth::user()->id : false;
    }
}
