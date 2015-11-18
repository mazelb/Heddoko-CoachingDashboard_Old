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
     * Attributes which should be appended to the model's array form.
     */
    protected $appends = ['src'];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['id', 'belongs_to_id', 'belongs_to_type'];

    /**
     * Group or profile this image belongs to.
     */
	public function parent()
	{
		return $this->morphTo();
	}

    /**
     * Accessor for $this->src.
     *
     * @param string $src
     * @return string
     */
    public function getSrcAttribute($src = '') {
        return 'data:'. $this->mime_type .';base64,'. $this->data_uri;
    }
}
