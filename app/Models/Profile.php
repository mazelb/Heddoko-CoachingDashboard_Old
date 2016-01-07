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
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['firstName', 'lastName', 'tagId'];

    /**
     * Attributes that SHOULD be appended to the model's array form.
     */
    protected $appends = [];

    /**
     * Attributes that CAN be appended to the model's array form.
     */
    public static $appendable = [
        'avatarSrc',
    ];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['tag_id', 'avatar', 'pivot'];

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
     * Accessor for $this->avatarSrc.
     *
     * @param string $src
     * @return string
     */
    public function getAvatarSrcAttribute($src)
    {
        return $this->avatar ? $this->avatar->src : null;
    }
}
