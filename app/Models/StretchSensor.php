<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StretchSensor extends Model {
    
	protected $table = 'stretchsensors';
	protected $fillable = ['CSValue1', 'CSValue2', 'CSValue3', 'CSValue4', 'CSValue5', 'stretchjoint_id'];

}
