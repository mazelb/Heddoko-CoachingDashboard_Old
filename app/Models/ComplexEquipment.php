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
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;

    /**
     * Attributes that SHOULD be appended to the model's array form.
     */
    protected $appends = ['status', 'equipment'];

    /**
     *
     */
	public function status()
	{
		return $this->belongsTo('App\Models\Status');
	}

    /**
     *
     */
	public function equipment()
	{
		return $this->hasMany('App\Models\Equipment', 'complex_equipment_id');
	}
}
