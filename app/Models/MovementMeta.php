<?php
/**
 * Copyright Heddoko(TM) 2016, all rights reserved.
 *
 * @author  Francis Amankrah (frank@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class MovementMeta extends Model
{
    use CamelCaseAttrs;

    /**
     * Table name.
     */
    protected $table = 'movement_meta';

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'movement_id',
        'start_keyframe',
        'end_keyframe',
        'score',
        'score_max',
        'notes',
        'virtual_path',
        'filename',
        'params',
    ];

    /**
     * Attributes that should be cast when assigned.
     */
    protected $casts = [
        'score' => 'integer',
        'score_max' => 'integer',
        'params' => 'array',
    ];
}
