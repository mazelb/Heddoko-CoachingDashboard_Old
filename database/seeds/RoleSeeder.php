<?php

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$admin = new Role();
		$admin->name         = 'admin';
		$admin->display_name = 'System Administrator'; // optional
		$admin->description  = 'Admins have all privileges'; // optional
		$admin->save();

		$coach = new Role();
		$coach->name         = 'coach';
		$coach->display_name = 'Sports Coach'; // optional
		$coach->description  = 'Coaches administer Teams'; // optional
		$coach->save();

		$athlete = new Role();
		$athlete->name         = 'athlete';
		$athlete->display_name = 'Sports Athlete'; // optional
		$athlete->description  = 'Athletes have very limited permissions'; // optional
		$athlete->save();
    }
}
