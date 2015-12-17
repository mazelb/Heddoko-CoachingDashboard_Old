<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Seeds the database with profiles. This should be run after GroupSeeder.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
use App\Models\User;
use App\Models\Group;
use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Running ProfileSeeder...');

        DB::table('profiles')->delete();

        // Demo profiles.
        $profiles = [];

        $kara = Profile::create(['first_name' => 'Kara', 'last_name' => 'Romanu']);
        $kara->meta()->create(['height' => '1.63', 'email' => 'kara@example.com']);
        $profiles[] = $kara->id;

        $mike = Profile::create(['first_name' => 'Mike', 'last_name' => 'Watts']);
        $mike->meta()->create(['height' => '1.88', 'email' => 'mike@example.com']);
        $profiles[] = $mike->id;

        $svetlana = Profile::create(['first_name' => 'Svetlana', 'last_name' => 'Vladsky']);
        $svetlana->meta()->create(['height' => '1.75', 'email' => 'svetlana@example.com']);
        $profiles[] = $svetlana->id;

        // Add profiles to "Dummy Team"
        if ($dummy = Group::where('name', 'Dummy Team')->first()) {
            $dummy->profiles()->attach($profiles);
        }

        // Add "awesomecaoch111" as a manager
        if ($demo = User::where('username', 'awesomecoach111')->first()) {
            $demo->profiles()->attach($profiles);
        }
    }
}
