<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for API clients.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class OAuthClient extends Model
{
    use CamelCaseAttrs;

    /**
     * Table name.
     */
    protected $table = 'oauth_clients';

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'id',
        'secret',
        'name'
    ];
}
