<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Movement;

class FMSForm extends Model {

    protected $table = 'fmsforms';
    protected $fillable = [
		'athlete_id',
		'deepsquat', 
		'deepsquatcomments', 
		'Lhurdle', 
		'Rhurdle', 
		'hurdlecomments', 
		'Llunge',
		'Rlunge',
		'lungecomments',
		'Lshoulder',
		'Rshoulder',
		'shouldercomments',
		'Limpingement',
		'Rimpingement',
		'impingementcomments',
		'Lactive',
		'Ractive',
		'activecomments',
		'trunk', 
		'trunkcomments',
		'press',
		'presscomments',
		'Lrotary',
		'Rrotary',
		'rotarycomments',
		'posterior',
		'posteriorcomments'];
		
}
