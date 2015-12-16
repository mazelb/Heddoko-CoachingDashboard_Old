<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for users.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use DB;

use App\Traits\HasAvatarTrait as HasAvatar;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, EntrustUserTrait, HasAvatar, CamelCaseAttrs;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'username',
        'password',
        'first_name',
        'last_name',
        'phone',
        'config',
    ];

    /**
     * Attributes which should be appended to the model's array form.
     */
    protected $appends = ['avatar_src'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'pivot'
    ];

    /**
     * Profiles managed by this user.
     */
    public function profiles() {
        return $this->belongsToMany('App\Models\Profile', 'manager_profile', 'manager_id', 'profile_id');
    }

    /**
     * Groups managed by this user.
     */
    public function groups() {
        return $this->belongsToMany('App\Models\Group', 'group_manager', 'manager_id', 'group_id');
    }

    /**
     * Gets the IDs of profiles managed by this user. This is necessary for retrieving secondary
     * relations as we cannot use Laravel's "Has-Many-Through" relation here.
     *
     * @return array
     */
    public function getProfileIDs()
    {
        // Profile IDs.
        $profiles = DB::table('profiles')
            ->select('profiles.id')
            ->join('manager_profile', 'profiles.id', '=', 'manager_profile.profile_id')
            ->where('manager_profile.manager_id', '=', $this->id)
            ->get();

        // Mapper to convert objects to IDs.
        $mapper = function($profile) {
            return $profile->id;
        };

        return array_map($mapper, $profiles);
    }
}
