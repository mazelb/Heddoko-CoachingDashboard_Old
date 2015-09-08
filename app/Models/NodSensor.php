<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NodSensor extends Model {
    
	protected $table = 'nodsensors';
	protected $fillable = ['InitRot1', 'InitRot2', 'InitRot3', 'InitRot4', 'CurRot1', 'CurRot2', 'CurRot3', 'CurRot4', 'CurRotEuler1', 'CurRotEuler2', 'CurRotEuler3', 'CurRotEuler4', 'nodjoint_id'];

}
