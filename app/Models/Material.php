<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Models;

use App\Models\MaterialType;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'materials';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['material_type_id', 'name', 'part_no'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;

    /**
     *
     */
    public function materialType()
    {
        return $this->belongsTo('App\Models\MaterialType');
    }
}
