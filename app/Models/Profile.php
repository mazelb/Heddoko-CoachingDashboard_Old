<?php
/**
 * @brief   Database model for profiles.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Image;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //
    // Constants representing gender options.
    //

    CONST GENDER_NOT_SPECIFIED = 0;
    CONST GENDER_FEMALE = 1;
    CONST GENDER_MALE = 2;

    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = [
        'first_name',
        'last_name',
        'height',
        'mass',
        'dob',
        'gender',
        'phone',
        'email',
        'notes',
        'meta'
    ];

    /**
     * Attributes which should be appended to the model's array form.
     */
    protected $appends = ['avatar_src'];

    /**
     * Attributes which should be hidden from the models' array form.
     */
    protected $hidden = ['avatar'];

    /**
     * Groups profile belongs to.
     */
    public function groups() {
        return $this->belongsToMany('App\Models\Group');
    }

    /**
     * Managers who manage this profile.
     */
    public function managers() {
        return $this->belongsToMany('App\Models\User', 'manager_profile', 'profile_id', 'manager_id');
    }

    /**
     * Functional Movement Screenings belonging to this profile.
     */
    public function screenings() {
        return $this->hasMany('App\Models\FMS');
    }

    /**
     * Movements belonging to this profile.
     */
    public function movements() {
        return $this->morphMany('App\Models\Movement', 'belongs_to');
    }

    /**
     * Profile avatar.
     */
    public function avatar() {
        return $this->morphOne('App\Models\Image', 'belongs_to');
    }

    /**
     * Resizes the profile's avatar.
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
     * Accessor for $this->gender.
     *
     * @param int $gender
     * @return string
     */
    public function getGenderAttribute($gender)
    {
        $string = '';

        switch ($gender)
        {
            case static::GENDER_FEMALE:
                $string = 'female';
                break;

            case static::GENDER_MALE:
                $string = 'male';
                break;
        }

        return $string;
    }

    /**
     * Mutator for $this->gender.
     *
     * @param string|int $gender
     * @return void
     */
    public function setGenderAttribute($gender)
    {
        // Set the right gender constant.
        if (!is_integer($gender))
        {
            switch ($gender)
            {
                case 'female':
                    $gender = static::GENDER_FEMALE;
                    break;

                case 'male':
                    $gender = static::GENDER_MALE;
                    break;

                default:
                    $gender = static::GENDER_NOT_SPECIFIED;
            }
        }

        $this->attributes['gender'] = $gender;
    }

    /**
     * Accessor for $this->avatar_src.
     *
     * @param string $src
     * @return string
     */
    public function getAvatarSrcAttribute($src = '') {
        return $this->avatar ? 'data:'. $this->avatar->mime_type .';base64,'. $this->avatar->data_uri : '';
    }

    /**
     * Arrays this profile instance, while making sure the relation are arrayed as well.
     *
     * @return array
     */
    public function toArray()
    {
        $groups = $this->groups;
        $managers = $this->managers;

        return parent::toArray();
    }
}
