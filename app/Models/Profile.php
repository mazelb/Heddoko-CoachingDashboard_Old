<?php
/**
 * @brief   Database model for profiles.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
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
        'mass',
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

    /**
     * Functional Movement Screenings belonging to this profile.
     */
    public function screenings() {
        return $this->hasMany('App\Models\FMS');
    }

    /**
     * Movements belonging to this profile.
     */
    public function movements() {
        return $this->morphMany('App\Models\Movement', 'belongs_to');
    }

    /**
     * Profile avatar.
     */
    public function avatar() {
        return $this->morphOne('App\Models\Image', 'belongs_to');
    }

    /**
     * Accessor for $this->gender.
     *
     * @param int $gender
     * @return string
     */
    public function getGenderAttribute($gender)
    {
        $string = '';

        switch ($gender)
        {
            case static::GENDER_FEMALE:
                $string = 'female';
                break;

            case static::GENDER_MALE:
                $string = 'male';
                break;
        }

        return $string;
    }

    /**
     * Mutator for $this->gender.
     *
     * @param string|int $gender
     * @return void
     */
    public function setGenderAttribute($gender)
    {
        // Set the right gender constant.
        if (!is_integer($gender))
        {
            switch ($gender)
            {
                case 'female':
                    $gender = static::GENDER_FEMALE;
                    break;

                case 'male':
                    $gender = static::GENDER_MALE;
                    break;

                default:
                    $gender = static::GENDER_NOT_SPECIFIED;
            }
        }

        $this->attributes['gender'] = $gender;
    }

    /**
     * Arrays this profile instance, while making sure the relation are arrayed as well.
     *
     * @return array
     */
    public function toArray()
    {
        $groups = $this->groups;
        $managers = $this->managers;

        return parent::toArray();
    }
}
