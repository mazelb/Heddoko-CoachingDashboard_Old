<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coach extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'coaches';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['first_name', 'last_name', 'user_id'];
	
	public function teams()
	{
		return $this->hasMany('App\Models\Team');
	}	

	public function movementsubmissions()
	{
		return $this->hasMany('App\Models\MovementSubmission');
	}
	
	public function fmsformsubmissions()
	{
		return $this->hasMany('App\Models\FMSFormSubmission');
	}
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}

}
