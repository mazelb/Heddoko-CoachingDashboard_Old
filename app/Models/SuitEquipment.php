<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Maxwell (max@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuitEquipment extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'suits_equipment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'anatomical_position_id', 'suits_equipment_id', 'mac_address', 'physical_location'];

	public $timestamps = false;

	public function equipment()
	{
		return $this->hasMany('App\Models\Equipment', 'suits_equipment_id');
	}

}
