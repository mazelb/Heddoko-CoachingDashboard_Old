<?php
/**
 *
 */
namespace App\Models;

use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{
    /**
     * Attributes which are mass-assignable.
     */
	protected $fillable = ['name', 'display_name', 'description'];
}
