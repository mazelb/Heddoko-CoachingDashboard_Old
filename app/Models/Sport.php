<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
	protected $table = 'sports';
	protected $fillable = ['name'];

	public function sportmovements()
	{
		return $this->hasMany('App\Models\SportMovement', 'sport_id');
	}

	public function teams()
	{
		return $this->hasMany('App\Models\Teams', 'sport_id');
	}
}
