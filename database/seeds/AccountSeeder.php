<?php

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Clearing Users table.');

        DB::table('users')->delete();

        $this->command->info('Creating users which existed in October 2015');

        $demoUser = User::create([
			'email' => 'demo@example.com',
			'username' => 'awesomecoach111',
			'password' => bcrypt('password'),
            'created_at' => '2015-09-01 00:00:00'
		]);
        $demoUser2 = User::create([
			'email' => 'demo@example.com',
			'username' => 'awesomeathlete111',
			'password' => bcrypt('password'),
            'created_at' => '2015-09-01 00:00:00'
		]);
        $sglivingstonUser = User::create([
			'email' => 'sglivingston1@gmail.com',
			'username' => 'sglivingston',
			'password' => '$2y$10$EI09RAYtiyJ1QHFZGfxIX.QS55pHkuN7JZMvRtvuNt.ckNO8Actce',
            'created_at' => '2015-10-05 15:51:33'
		]);
        $concordiaUser = User::create([
			'email' => 'lizbret26@hotmail.com',
			'username' => 'concordia.athletics',
			'password' => '$2y$10$3dsmTVYvQunTwu9H2vGqieUimI8SU8UM9/76mYnWuTBv9S0B88xg6',
            'created_at' => '2015-10-05 21:35:49'
		]);
        $charlotteUser = User::create([
			'email' => 'charlottegreenwood@me.com',
			'username' => 'CapOp',
			'password' => '$2y$10$hbcVQW5AEiqurfrlRBh4Se6NGIL4lnryUcJUyZnJ8Ibewm9bpYX6q',
            'created_at' => '2015-10-08 14:43:45'
		]);
        $lzaneUser = User::create([
			'email' => 'lzane@rogers.com',
			'username' => 'lzane',
			'password' => '$2y$10$90iLLFYyAJtL1G9G6m46s.owiggfZD4xe0Q7OaMyIhfrIXc/YsHXu',
            'created_at' => '2015-10-15 14:33:45'
		]);
        $sclarkUser = User::create([
			'email' => 'stacy.clark@cirquedusoleil.com',
			'username' => 'sclark',
			'password' => '$2y$10$o8w.8V3G5EswbPu7Rg1Gf.3pzG5oHywAjv.V6XqYQqg323Fh7Ukre',
            'created_at' => '2015-10-21 19:24:19'
		]);
        $paoloUser = User::create([
			'email' => 'paolo.pacione@gmail.com',
			'username' => 'paolo',
			'password' => '$2y$10$vf/TyMxpezLdLjcppxpZcunED4Wsjxe4sgZb5LWdR1F6OFtzI1YBC',
            'created_at' => '2015-10-21 20:58:19'
		]);

        $this->command->info('Creating roles');

        DB::table('roles')->delete();
        DB::table('role_user')->delete();

        $admin = Role::create([
            'name' => 'admin',
            'display_name' => 'Administrator',
            'description' => 'Manages the web app.'
        ]);

        $manager = Role::create([
            'name' => 'manager',
            'display_name' => 'Manager',
            'description' => 'Manages one or more groups.'
        ]);

        $this->command->info('Attaching "manager" role to users.');

        $manager->users()->attach([
            $demoUser->id,
            $demoUser2->id,
            $sglivingstonUser->id,
            $concordiaUser->id,
            $charlotteUser->id,
            $lzaneUser->id,
            $sclarkUser->id,
            $paoloUser->id
        ]);
    }
}
