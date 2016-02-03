<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Maxwell (max@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialType extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'material_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'identifier'];

	public $timestamps = false;

    public function materials()
    {
        return $this->hasMany('App\Models\Material');
    }

}
