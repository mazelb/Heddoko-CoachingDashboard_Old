<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Athlete extends Model {

	protected $table = 'athletes';
	protected $fillable = ['first_name', 'last_name', 'team_id', 'user_id', 'age', 'height_cm', 'weight_cm', 'primary_sport', 'primary_position', 'hand_leg_dominance', 'previous_injuries', 'underlying_medical', 'notes'];
	
	public function team()
	{
		return $this->belongsTo('App\Models\Team');
	}
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}
