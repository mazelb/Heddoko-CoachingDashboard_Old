<?php
/**
 *
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FMSTest extends Model
{
    /**
     *
     */
    protected $table = 'fms_test';

    /**
     * Attributes which are mass-assignable.
     */
    protected $fillable = ['fms_id', 'title', 'score', 'notes', 'created_at', 'updated_at'];

    /**
     * Functional Movement Screening to which this test belongs to.
     */
    public function screening() {
        return $this->belongsTo('App\Models\FMS', 'fms_id');
    }
}
