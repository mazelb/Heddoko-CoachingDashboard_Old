<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Database model for screenings.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Screening extends Model
{
    /**
     * Attributes which are mass-assignable.
     */
    protected $fillable = ['profile_id', 'score', 'score_max', 'notes'];

    /**
     * Profile to which this movement set belongs to.
     */
    public function profile() {
        return $this->belongsTo('App\Models\Profile');
    }

    /**
     * Movements that are a part of this set.
     */
    public function movements() {
        return $this->hasMany('App\Models\Movement');
    }
}
