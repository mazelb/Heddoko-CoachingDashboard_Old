<?php
/**
 *
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScreeningTest extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
    protected $fillable = ['screening_id', 'title', 'score', 'notes', 'created_at', 'updated_at'];

    /**
     * Movement screening to which this test belongs to.
     */
    public function screening() {
        return $this->belongsTo('App\Models\Screening');
    }

    /**
     * Movements belonging to this screening test.
     */
    public function movements() {
        return $this->morphMany('App\Models\Movement', 'belongs_to');
    }
}
