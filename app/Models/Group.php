<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for groups.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasAvatarTrait as HasAvatar;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class Group extends Model
{
    use HasAvatar, CamelCaseAttrs;

    /**
     * Attributes which are mass-assignable.
     */
    protected $fillable = ['name', 'meta'];

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
    protected $hidden = ['avatar', 'pivot'];

    /**
     * Profiles beloning to this group.
     */
    public function profiles() {
        return $this->belongsToMany('App\Models\Profile');
    }

    /**
     * Managers of this group.
     */
    public function managers() {
        return $this->belongsToMany('App\Models\User', 'group_manager', 'group_id', 'manager_id');
    }
}
