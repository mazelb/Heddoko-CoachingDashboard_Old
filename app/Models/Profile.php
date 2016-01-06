<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for profiles.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasAvatarTrait as HasAvatar;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class Profile extends Model
{
    use HasAvatar, CamelCaseAttrs;

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
	protected $fillable = ['firstName', 'lastName', 'tagId'];

    /**
     * Attributes which should be appended to the model's array form.
     */
    protected $appends = ['avatarSrc'];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['tagId', 'avatar'];

    /**
     * Validation rules.
     */
    public $validationRules  = [
        'firstName' => 'required|min:1|max:200',
        'lastName' => 'max:200',
        'tagId' => 'int'
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
     * Screenings belonging to this profile.
     */
    public function screenings() {
        return $this->hasMany('App\Models\Screening');
    }

    /**
     * Movements belonging to this profile.
     */
    public function movements() {
        return $this->hasMany('App\Models\Movement');
    }

    /**
     * Folders belonging to this profile.
     */
    public function folders() {
        return $this->hasMany('App\Models\Folder');
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
