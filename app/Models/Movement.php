<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for movement data.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\TaggableTrait as Taggable;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class Movement extends Model
{
    use CamelCaseAttrs, Taggable;

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'profile_id',
        'submitted_by',
        'screening_id',
        'folder_id',
        'title',
    ];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['taggables'];

    /**
     * Attributes that CAN be appended to the model's array form.
     */
    public static $appendable = ['tags'];

    /**
     * Attributes that SHOULD be appended to the model's array form.
     */
    protected $appends = [];

    /**
     * Events belonging to this movement.
     */
	public function events()
    {
		return $this->hasMany('App\Models\MovementEvent');
	}

    /**
     * Frames which make up this movement.
     */
	public function frames()
    {
		return $this->hasMany('App\Models\MovementFrame');
	}

    /**
     * Movement markers belonging to this movement.
     */
	public function markers()
    {
		return $this->hasMany('App\Models\MovementMarker');
	}

    /**
     * Extra details about this movement.
     */
	public function meta()
	{
		return $this->hasOne('App\Models\MovementMeta');
	}

    /**
     * Profile this movement belongs to.
     */
	public function profile()
	{
		return $this->belongsTo('App\Model\Profile');
	}

    /**
     * Screening this movement belongs to.
     */
	public function screening()
	{
		return $this->belongsTo('App\Model\Screening');
	}
}
