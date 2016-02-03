<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Maxwell (max@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'equipment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'material_id', 'serial_no', 'physical_location', 'status_id', 'suits_equipment_id'];

	public $timestamps = false;

	public function status()
	{
		return $this->belongsTo('App\Models\Status');
	}

    public function material()
    {
        return $this->belongsTo('App\Models\Material');
    }
}
