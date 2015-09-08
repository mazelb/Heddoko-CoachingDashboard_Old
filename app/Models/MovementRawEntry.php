<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovementRawEntry extends Model {
    
	protected $table = 'movementrawentries';
	protected $fillable = ['movement_id', 'filename'];
	
}
