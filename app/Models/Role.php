<?php
/**
 * Copyright Heddoko(TM) 2016, all rights reserved.
 *
 * @brief   Database model for roles.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['name', 'description'];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['pivot'];

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * Users taking on this role.
     */
    public function users() {
        return $this->belongsToMany('App\Models\User');
    }
}
