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
    protected $fillable = [
        'status_id',
        'material_id',
        'anatomical_position_id',
        'complex_equipment_id',
        'mac_address',
        'serial_no',
        'physical_location'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;

    /**
     * Attributes that SHOULD be appended to the model's array form.
     */
    protected $appends = ['status', 'material', 'anatomical_position'];

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
    public function material()
    {
        return $this->belongsTo('App\Models\Material');
    }

    /**
     *
     */
    public function anatomicalPosition()
    {
        return $this->belongsTo('App\Models\AnatomicalPosition');
    }

    /**
     *
     */
    public function complexEquipment()
    {
        return $this->belongsTo('App\Models\ComplexEquipment');
    }
}
