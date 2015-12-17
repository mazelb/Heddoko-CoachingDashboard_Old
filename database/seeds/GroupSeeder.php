<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Seeds the database with groups. This should be run after AccountSeeder.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Running GroupSeeder...');

        DB::table('groups')->delete();

        // Groups belonging to demo user.
        if ($demo = User::where('username', 'awesomecoach111')->first())
        {
            $demoGroups = [];

            $dummyTeam = Group::create(['name' => 'Dummy Team']);
            $demoGroups[] = $dummyTeam->id;

            $chargers = Group::create(['name' => 'Chargers']);
            $demoGroups[] = $chargers->id;

            $falcons = Group::create(['name' => 'Falcons']);
            $demoGroups[] = $falcons->id;

            $stampeders = Group::create(['name' => 'The Stampeders']);
            $demoGroups[] = $stampeders->id;

            $vikings = Group::create(['name' => 'Vikings']);
            $demoGroups[] = $vikings->id;

            $volley = Group::create(['name' => 'Volleyball Team Supreme']);
            $demoGroups[] = $volley->id;

            $capop = Group::create(['name' => 'capop']);
            $demoGroups[] = $capop->id;

            $olympians = Group::create(['name' => 'Olympians']);
            $demoGroups[] = $olympians->id;

            $heddoko = Group::create(['name' => 'Heddoko']);
            $demoGroups[] = $heddoko->id;

            $bulls = Group::create(['name' => 'Bulls']);
            $demoGroups[] = $bulls->id;

            $lions = Group::create(['name' => 'Lions']);
            $demoGroups[] = $lions->id;

            $oilers = Group::create(['name' => 'Oilers']);
            $demoGroups[] = $oilers->id;

            $mtc = Group::create(['name' => 'MTC']);
            $demoGroups[] = $mtc->id;

            $demo->groups()->attach($demoGroups);
        }

        // Groups belonging to Lisa
        if ($lisa = User::where('username', 'lzane')->first())
        {
            $lions = Group::create(['name' => 'Lions']);

            $lisa->groups()->attach($lions->id);
        }
    }
}
