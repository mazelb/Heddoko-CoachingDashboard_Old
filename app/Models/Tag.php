<?php
/**
 * @brief   Database model for tags.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['title'];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['pivot'];

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * Profiles which are assigned this tag.
     */
    public function profiles()
    {
        return $this->morphedByMany('App\Models\Profile', 'taggable');
    }

    /**
     * Movements which are assigned this tag.
     */
    public function movements()
    {
        return $this->morphedByMany('App\Models\Movement', 'taggable');
    }
}
