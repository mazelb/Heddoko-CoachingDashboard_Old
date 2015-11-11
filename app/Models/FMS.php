<?php
/**
 *
 */
namespace App\Models;

use App\Models\FMSTest;
use Illuminate\Database\Eloquent\Model;

class FMS extends Model
{
    /**
     *
     */
    protected $table = 'fms';

    /**
     * Attributes which are mass-assignable.
     */
    protected $fillable = ['profile_id', 'score', 'notes', 'created_at', 'updated_at'];

    /**
     * Profile to which this Functional Movement Screening belongs to.
     */
    public function profile() {
        return $this->belongsTo('App\Models\Profile');
    }

    /**
     * Tests that are a part of thie Functional Movement Screening.
     */
    public function tests() {
        return $this->hasMany('App\Models\FMSTest', 'fms_id');
    }

    /**
     * Arrays this profile instance, while making sure the relation are arrayed as well.
     *
     * @return array
     */
    public function toArray()
    {
        $tests = $this->tests;

        return parent::toArray();
    }
}
