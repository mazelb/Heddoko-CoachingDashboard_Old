<?php
/**
 *
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
    protected $fillable = ['name', 'meta', 'created_at', 'updated_at'];

    /**
     *
     */
    protected $hidden = ['pivot'];

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
        return $this->belongsToMany('App\Models\User');
    }
}
