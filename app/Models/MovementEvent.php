<?php
/**
 * Copyright Heddoko(TM) 2016, all rights reserved.
 *
 * @brief   Database model for movement frames.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Models;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

use Illuminate\Database\Eloquent\Model;

class MovementEvent extends Model
{
    use CamelCaseAttrs;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
