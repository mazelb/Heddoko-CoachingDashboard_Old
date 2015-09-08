<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovementSubmission extends Model {
    
	protected $fillable = ['coach_id', 'athlete_id', 'comment'];
	protected $table = 'movementsubmissions';
	
	public function movements()
	{
		return $this->hasMany('App\Models\Movement');
	}

	public function athlete()
	{
		return $this->hasOne('App\Models\Athlete');
	}

	public function coach()
	{
		return $this->belongsTo('App\Models\Coach');
	}
}
