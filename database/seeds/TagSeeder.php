<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Seeds the database with sample tags.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    October 2015
 */
use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Generates demo data for the app.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Running TagSeeder...');

        $tags = [

            // Popular sports.
            'American Football',
            'Cross Fit', 'Curling',
            'Diving',
            'Figure Skating', 'Football', 'Golf',
            'Hockey',
            'Soccer', 'Speed Skating', 'Swimming', 'Synchronized Swimming',
            'Tennis',
            'Weight Lifting',

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

        // We'll only add those tags that aren't already in the database.
        $skip = Tag::whereIn('title', $tags)->lists('title');
        if (count($skip)) {
            $filteredTags = array_where($skip, function($key, $title) use ($tags) {
                return !in_array($title, $tags);
            });
        }

        // If no tags exist, add them all.
        else {
            $filteredTags = $tags;
        }

        // Performance check.
        if (!count($filteredTags)) {
            $this->command->info('No new tags.');
            return;
        }

        // Create tags one by one.
        $total = 0;
        $this->command->info('Adding '. count($filteredTags) .' of '. count($tags) .' tags...');
        foreach ($filteredTags as $tag) {
            Tag::create(['title' => $tag]);
        }
    }
}
