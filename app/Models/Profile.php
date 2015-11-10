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
        'first_name',
        'last_name',
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
     * Managers who manage this profile.
     */
    public function managers() {
        return $this->belongsToMany('App\Models\User', 'manager_profile', 'profile_id', 'manager_id');
    }
}
