<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FMSFormSubmission extends Model {
    
	protected $fillable = ['coach_id', 'athlete_id', 'fmsform_id', 'comment'];
	protected $table = 'fmsformsubmissions';
	
	public function movements()
	{
		return $this->hasMany('App\Models\Movement');
	}

	public function athlete()
	{
		return $this->hasOne('App\Models\Athlete');
	}
	
		public function fmsform()
	{
		return $this->hasOne('App\Models\FMSForm');
	}

	public function coach()
	{
		return $this->belongsTo('App\Models\Coach');
	}
}
