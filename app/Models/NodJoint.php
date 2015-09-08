<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NodJoint extends Model {
    
	protected $table = 'nodjoints';
	protected $fillable = ['iInitRot1', 'iInitRot2', 'iInitRot3', 'iInitRot4', 'nod_container_id'];
	
	public function nodsensors()
    {
        return $this->hasMany('App\Models\NodSensor');
    }
}
