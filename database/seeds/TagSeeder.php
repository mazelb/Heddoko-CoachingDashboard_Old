<?php

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 *
 */
class TagSeeder extends Seeder
{
    /**
     * Generates demo data for the app.
     *
     * @return void
     */
    public function run()
    {
        //

        $tags = [

            // General movements.
            'Back Squat', 'Behind the Neck Press', 'Behind The Neck Push Jerk',
            'Bench Fly', 'Bench Press',
            'Bent Over Row', 'Bicep Curl',
            'Box Squat', 'Bulgarian Squat',
            'Clean', 'Clean Off the Blocks', 'Counter Movement Jump',
            'Deadlift', 'Decline Bench Press', 'Dribble',
            'Front Raise', 'Front Squat',
            'Goblet Squat',
            'Half Squat',
            'Hang Clean', 'Hang Power Clean', 'Hang Power Snatch', 'Hang Snatch', 'Hip Thrust',
            'Incline Bench Fly', 'Incline Bench Press',
            'Jump Squat',
            'Kettlebell Swing',
            'Lateral Raise', 'Lunge',
            'Medicine Ball Slam',
            'One Arm Snatch', 'Overhead Press', 'Overhead Squat',
            'Power Clean', 'Power Clean Off the Blocks', 'Power Snatch', 'Power Snatch Off the Blocks',
            'Push Jerk', 'Push Press',
            'Reverse Fly', 'Romanian Deadlift',
            'Seated Military Press',
            'Snatch', 'Snatch Off the Blocks', 'Split Jerk', 'Split Squat',
            'Squat Jump', 'Standing Military Press', 'Step-ups', 'Stiff-legged Deadlift', 'Sumo Deadlift',
            'Trap Bar Deadlift', 'Travelling Lunges',
            'Wide Grip Behind the Neck Push Jerk', 'Wide Grip Deadlift',

            // Additional tags.
            'Barbell',
            'Dumbbell',
            'Narrow Grip',
            'Wide Grip',
        ];
    }
}
