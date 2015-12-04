<?php
/**
 *
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 *
 * @brief   Database model for profiles.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasAvatarTrait as HasAvatar;

class Profile extends Model
{
    use HasAvatar;

    /**
     * Gender not specified.
     */
    CONST GENDER_NOT_SPECIFIED = 0;

    /**
     * Gender option: female.
     */
    CONST GENDER_FEMALE = 1;

    /**
     * Gender option: male
     */
    CONST GENDER_MALE = 2;

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['first_name', 'last_name', 'tag_id'];

    /**
     * Attributes which should be appended to the model's array form.
     */
    protected $appends = ['avatar_src'];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['tag_id', 'meta', 'avatar'];

    /**
     * Validation rules.
     */
    public $validationRules  = [
        'first_name' => 'required|min:1|max:200',
        'last_name' => 'max:200'
    ];

    /**
     * Profile's additional details.
     */
    public function meta() {
        return $this->hasOne('App\Models\ProfileMeta');
    }

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
     * Movement sets belonging to this profile.
     */
    public function movementSets() {
        return $this->hasMany('App\Models\MovementSet');
    }

    /**
     * Movements belonging to this profile.
     */
    public function movements() {
        return $this->hasMany('App\Models\Movement');
    }

    /**
     * Primary tag belonging to this profile.
     */
    public function primaryTag() {
        return $this->belongsTo('App\Models\Tag', 'tag_id');
    }

    /**
     * Non-primary tags belonging to this profile.
     */
    public function secondaryTags() {
        return $this->morphToMany('App\Models\Tag', 'taggable');
    }

    /**
     * Adds meta data to model.
     */
    public function appendMeta()
    {
        if ($this->meta)
        {
            foreach ($this->meta->toArray() as $attr => $val)
            {
                $this->{$attr} = $val;
            }
        }
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
}
