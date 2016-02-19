<?php
/**
 * @brief   Trait for taggable models.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Traits;

use App\Models\Tag;

trait TaggableTrait
{
    /**
     * Tags beloning to this model
     */
    public function taggables() {
        return $this->morphToMany('App\Models\Tag', 'taggable');
    }

    /**
     * Accessor for $this->tags
     */
    public function getTagsAttribute() {
        return array_map(function($tag) {
            return $tag['title'];
        }, $this->taggables->toArray());
    }

    /**
     * Saves and creates new tags.
     *
     * @param array|string $tagTitles
     * @param array|string $tadIds
     */
    public function saveTags($tagTitles = [], $tadIds = [])
    {
        // TODO: combine titles and IDs, then sync the combined array to let clients update
        // tags by title and/or ID.

        $tags = [];

        // Add IDs.
        $tadIds = is_array($tadIds) ? $tadIds : @explode(',', (string) $tadIds);
        if (count($tadIds)) {
            $tags = array_merge($tags, $tadIds);
        }

        // Add titles
        $tagTitles = is_array($tagTitles) ? $tagTitles : @explode(',', (string) $tagTitles);
        if (count($tagTitles))
        {
            foreach ($tagTitles as $title)
            {
                if ($tag = Tag::firstOrCreate(['title' => $title]))
                {
                    $tags[] = $tag->id;
                }
            }
        }

        // Sync tags.
        $this->taggables()->sync($tags);
    }
}
