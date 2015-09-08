<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Frame extends Model {
    
	protected $fillable = ['movement_id'];
	
	public function stretchcontainers()
    {
        return $this->hasMany('App\Models\StretchContainer');
    }
	
	public function nodcontainers()
    {
        return $this->hasMany('App\Models\NodContainer');
    }
}
