<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   The profile meta holds additional information about a profile.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileMeta extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'height',
        'mass',
        'dob',
        'gender',
        'phone',
        'email',
        'medical_history',
        'injuries',
        'notes',
        'meta'
    ];
}
