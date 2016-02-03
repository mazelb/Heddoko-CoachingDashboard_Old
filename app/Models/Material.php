<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Maxwell (max@heddoko.com)
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
    protected $fillable = ['id', 'material_type_id', 'name', 'part_no'];

	public $timestamps = false;

    public function material_type()
    {
        return $this->belongsTo('App\Models\MaterialType');
    }

}
