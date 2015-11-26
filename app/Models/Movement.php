<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['name', 'sportmovement_id', 'movementsub_id', 'fmsformsub_id'];

    /**
     * Frames which make up this movement.
     */
	public function frames() {
		return $this->hasMany('App\Models\Frame');
	}

    /**
     * Extra details about this movement.
     */
	public function meta()
	{
		return $this->hasOne('App\Models\MovementMeta');
	}

    /**
     * Movement markers belonging to this movement.
     */
	public function markers() {
		return $this->hasMany('App\Models\MovementMarker');
	}

    /**
     * Tags belonging to this movement.
     */
    public function tags() {
        return $this->morphToMany('App\Models\Tag', 'taggable');
    }

    /**
     * Profile or movement screening test this movement belongs to.
     */
	public function parent()
	{
		return $this->morphTo();
	}
}
