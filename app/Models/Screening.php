<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for screenings.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class Screening extends Model
{
    use CamelCaseAttrs;

    /**
     * Attributes that CAN be appended to the model's array form.
     *
     * @var array
     */
    public static $appendable = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'title' => 'string',
        'score' => 'integer',
        'scoreMin' => 'integer',
        'scoreMax' => 'integer',
        'notes' => 'string',
        'meta' => 'array',
    ];

    /**
     * Attributes which are mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profileId',
        'title',
        'score',
        'scoreMin',
        'scoreMax',
        'notes',
        'meta',
    ];

    /**
     * Profile to which this movement set belongs to.
     */
    public function profile() {
        return $this->belongsTo('App\Models\Profile');
    }

    /**
     * Movements that are a part of this set.
     */
    public function movements() {
        return $this->hasMany('App\Models\Movement');
    }
}
