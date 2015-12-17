<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Seeds the database with profiles. This should be run after GroupSeeder.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
use App\Models\Group;
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

        if ($dummy = Group::where('name', 'Dummy Team')->first())
        {
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

            $dummy->profiles()->attach($profiles);
        }
    }
}
