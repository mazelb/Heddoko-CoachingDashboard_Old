<?php
/**
 * @brief   Database model for images.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['data_uri', 'mime_type'];

    /**
     *
     */
    protected $hidden = ['id', 'belongs_to_id', 'belongs_to_type'];

    /**
     * Group or profile this image belongs to.
     */
	public function parent()
	{
		return $this->morphTo();
	}
}
