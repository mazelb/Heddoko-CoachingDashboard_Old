<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for API client endpoints.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class OAuthClientEndpoint extends Model
{
    use CamelCaseAttrs;

    /**
     * Table name.
     */
    protected $table = 'oauth_client_endpoints';

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'client_id',
        'redirect_uri',
    ];
}
