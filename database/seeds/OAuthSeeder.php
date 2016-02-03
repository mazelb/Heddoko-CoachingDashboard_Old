<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Seeds the database with sample OAuth clients
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */

use Illuminate\Database\Seeder;

use App\Models\OAuthClient;
use App\Models\OAuthClientEndpoint;

class OAuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Running OAuthSeeder...');

        // TODO: Create scopes.
        // ...

        // Create sample client.
        if (!OAuthClient::where('name', 'Sample Client')->first())
        {
            $this->command->info('Creating "Sample Client"');
            $this->command->info("--> ID: C7wQaoQ1Zk8Yg6h4ICrZniVwOqpWxkwhsA4mMJkJ");
            $this->command->info("--> Secret: wXkCVjBEOuw1mDUF8lJk5LPjZLek9bKk1V2UnRDh");

            OAuthClient::create([
                'name' => 'Sample Client',
                'id' => 'C7wQaoQ1Zk8Yg6h4ICrZniVwOqpWxkwhsA4mMJkJ',
                'secret' => 'wXkCVjBEOuw1mDUF8lJk5LPjZLek9bKk1V2UnRDh'
            ]);
        }

        // Suits Management Dashboard app
        if (!OAuthClient::where('name', 'Suits Management Dashbaord')->first())
        {
            $this->command->info('Creating "Suits Management Dashbaord Client"');
            $this->command->info("--> ID: oQUuD535CgQ1OwewridIjmokBRpU0g7mAbaJBlrs");
            $this->command->info("--> Secret: r9hEaW2ZAfNndWoDB7uZchd83dygt0K0TbBu283d");

            OAuthClient::create([
                'name' => 'Suits Management Dashbaord',
                'id' => 'oQUuD535CgQ1OwewridIjmokBRpU0g7mAbaJBlrs',
                'secret' => 'r9hEaW2ZAfNndWoDB7uZchd83dygt0K0TbBu283d'
            ]);

            OAuthClientEndpoint::create([
                'client_id' => 'oQUuD535CgQ1OwewridIjmokBRpU0g7mAbaJBlrs',
                'redirect_uri' => 'http://suits.heddoko.vagrant'
            ]);

            OAuthClientEndpoint::create([
                'client_id' => 'oQUuD535CgQ1OwewridIjmokBRpU0g7mAbaJBlrs',
                'redirect_uri' => 'http://localhost'
            ]);

            OAuthClientEndpoint::create([
                'client_id' => 'oQUuD535CgQ1OwewridIjmokBRpU0g7mAbaJBlrs',
                'redirect_uri' => 'http://localhost:8000'
            ]);
        }
    }
}
