<?php
/**
 * @brief   Trait for models with "image" relations.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Traits;

use Image;

trait HasAvatarTrait
{
    /**
     * Avatar relation.
     */
    public function avatar() {
        return $this->morphOne('App\Models\Image', 'belongs_to');
    }

    /**
     * Resizes the avatar.
     *
     * @param int $width
     */
    public function resizeAvatar($width)
    {
        // Performance check.
        if (!$this->avatar) {
            return;
        }

        $avatar = Image::make($this->avatar->data_uri);

        if ($avatar->width() > $width)
        {
            $avatar->widen($width);
            $this->avatar->data_uri = (string) $avatar->encode('data-url');
            $this->avatar->data_uri = preg_replace('/^(data:image\/[a-z]+;base64,)/', '', $this->avatar->data_uri);
        }
    }

    /**
     * Accessor for $this->avatar_src.
     *
     * @param string $avatarSrc
     * @return string
     */
    public function getAvatarSrcAttribute($avatarSrc = '') {
        return $this->avatar ? 'data:'. $this->avatar->mime_type .';base64,'. $this->avatar->data_uri : '';
    }
}
