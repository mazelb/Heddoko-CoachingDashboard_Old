<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for folders.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CamelCaseTrait as CamelCaseAttrs;

class Folder extends Model
{
    use CamelCaseAttrs;

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'profile_id',
        'folder_id',
        'name',
        'system_name',
        'path',
    ];

    /**
     * Parent folder.
     */
	public function parent()
    {
		return $this->belongsTo('App\Models\Folder', 'folder_id');
	}

    /**
     * Child folders.
     */
	public function children()
    {
		return $this->hasMany('App\Models\Folder');
	}

    /**
     * Movements in this folder.
     */
    public function movements()
    {
        return $this->hasMany('App\Models\Movement');
    }

    /**
     * Profile this movement belongs to.
     */
	public function profile()
	{
		return $this->belongsTo('App\Model\Profile');
	}
}
