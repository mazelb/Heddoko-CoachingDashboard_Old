<?php
/**
 *
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //
    // Constants representing gender options.
    //
    CONST GENDER_NOT_SPECIFIED = 0;
    CONST GENDER_FEMALE = 1;
    CONST GENDER_MALE = 2;

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'age',
        'height',
        'weight',
        'dob',
        'gender',
        'phone',
        'email',
        'notes',
        'meta'
    ];

    /**
     * Groups profile belongs to.
     */
    public function groups() {
        return $this->belongsToMany('App\Models\Group');
    }

    /**
     * Account associated with profile.
     */
    public function user() {
		return $this->belongsTo('App\Models\User');
	}
}
