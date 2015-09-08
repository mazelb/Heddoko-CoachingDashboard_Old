<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model {
    
	protected $fillable = ['name', 'sportmovement_id', 'movementsub_id', 'fmsformsub_id'];
	
	public function frames()
	{
		return $this->hasMany('App\Models\Frame');
	}

	public function movementrawentries()
	{
		return $this->hasOne('App\Models\MovementRawEntry');
	}
	public function movementsubmission()
	{
		return $this->belongsTo('App\Models\MovementSubmission');
	}
	public function fmsformsubmission()
	{
		return $this->belongsTo('App\Models\FMSFormSubmission');
	}

}
