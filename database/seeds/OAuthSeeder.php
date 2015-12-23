<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Seeds the database with sample OAuth clients
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
// use DB;
use App\Models\OAuthClient;
use Illuminate\Database\Seeder;

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
    }
}
