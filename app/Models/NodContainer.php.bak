<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NodContainer extends Model {
    
	protected $table = 'nodcontainers';
	protected $fillable = ['frame_id'];
	
	public function nodjoints()
    {
        return $this->hasMany('App\Models\NodJoint');
    }
}
