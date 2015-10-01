<?php
/**
 * @file    Team.php
 * @author  Maxwell Mowbray (max@heddoko.com) and Francis Amankrah (frank@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /**
     * Associated MySQL table.
     */
	protected $table = 'teams';

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['coach_id', 'sport_id', 'name'];

    /**
     * The attributes that should be hidden from the model's array form.
     */
    protected $hidden = ['athletes', 'coach', 'sport'];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = ['sport_name'];

    /**
     * Athletes relation.
     */
	public function athletes()
	{
		return $this->hasMany('App\Models\Athlete');
	}

    /**
     * Coach relation.
     */
	public function coach()
	{
		return $this->belongsTo('App\Models\Coach');
	}

    /**
     * Sport relation.
     */
	public function sport()
	{
		return $this->belongsTo('App\Models\Sport');
	}

    /**
     * Accessor for $this->sport_name.
     *
     * @param string $name
     * @return string
     */
    public function getSportNameAttribute($name = '')
    {
        return $this->sport->name;
    }
}
