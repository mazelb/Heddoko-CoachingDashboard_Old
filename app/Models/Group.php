<?php
/**
 * @brief   Database model for groups.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasAvatarTrait as HasAvatar;

class Group extends Model
{
    use HasAvatar;

    /**
     * Attributes which are mass-assignable.
     */
    protected $fillable = [
        'name',
        'meta',
        'created_at',
        'updated_at'
    ];

    /**
     * Attributes which should be appended to the model's array form.
     */
    protected $appends = ['avatar_src'];

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
