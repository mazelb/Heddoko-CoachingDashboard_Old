<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComplexEquipment extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'complex_equipment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status_id', 'mac_address', 'serial_no', 'physical_location'];

    /**
     * Status of complex equipment.
     */
	public function status()
	{
		return $this->belongsTo('App\Models\Status');
	}

    /**
     * Equipment which make up this complex equipment.
     */
	public function equipment()
	{
		return $this->hasMany('App\Models\Equipment', 'complex_equipment_id');
	}

    /**
     * Movements recorded with this complex equipment.
     */
	public function movements()
	{
		return $this->hasMany('App\Models\Movement', 'complex_equipment_id');
	}
}
