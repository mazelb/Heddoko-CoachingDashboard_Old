<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for movement data.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'submitted_by',
        'movement_set_id',
        'title',
        'score',
        'score_max',
    ];

    /**
     * Extra details about this movement.
     */
	public function meta()
	{
		return $this->hasOne('App\Models\MovementMeta');
	}

    /**
     * Frames which make up this movement.
     */
	public function frames()
    {
		return $this->hasMany('App\Models\Frame');
	}

    /**
     * Movement markers belonging to this movement.
     */
	public function markers()
    {
		return $this->hasMany('App\Models\MovementMarker');
	}

    /**
     * Tags belonging to this movement.
     */
    public function tags()
    {
        return $this->morphToMany('App\Models\Tag', 'taggable');
    }

    /**
     * Profile this movement belongs to.
     */
	public function profile()
	{
		return $this->belongsTo('App\Model\Profile');
	}
}
