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
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;
}
