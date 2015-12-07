<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'admins';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'first_name', 'last_name', 'user_id' ];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}

}
