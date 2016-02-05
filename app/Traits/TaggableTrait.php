<?php
/**
 * @brief   Trait for taggable models.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Traits;

trait TaggableTrait
{
    /**
     * Primary tag belonging to this profile.
     */
    public function primaryTag() {
        return $this->belongsTo('App\Models\Tag', 'main_tag_id');
    }

    /**
     * Non-primary tags belonging to this profile.
     */
    public function secondaryTags() {
        return $this->morphToMany('App\Models\Tag', 'taggable');
    }
}
