<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StretchContainer extends Model {
    
	protected $table = 'stretchcontainers';
	protected $fillable = ['frame_id'];
	
	public function stretchjoints()
    {
        return $this->hasMany('App\Models\StretchJoint');
    }
}
