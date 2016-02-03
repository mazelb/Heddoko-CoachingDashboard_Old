<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @author  Maxwell (max@heddoko.com)
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'statuses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name'];

	public $timestamps = false;

	public static function getByName($status_string)
	{
		return Status::where('name', $status_string)->firstOrFail();
	}

}
