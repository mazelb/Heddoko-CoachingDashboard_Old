<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StretchJoint extends Model {
    
	protected $table = 'stretchjoints';
	protected $fillable = ['curJointRotE1', 'curJointRotE2', 'curJointRotE3', 'stretch_container_id'];
	
	public function stretchsensors()
    {
        return $this->hasMany('App\Models\StretchSensor');
    }
}
