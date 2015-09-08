<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model {
    
	protected $table = 'teams';
	protected $fillable = ['coach_id', 'sport_id', 'name'];
	
	public function athletes()
	{
		return $this->hasMany('App\Models\Athlete');
	}
	
	public function coach()
	{
		return $this->belongsTo('App\Models\Coach');
	}
	
	public function sport()
	{
		return $this->belongsTo('App\Models\Sport');
	}
}
