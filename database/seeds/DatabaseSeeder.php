<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   DB seeder.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$this->call('AccountSeeder');
		$this->call('GroupSeeder');
		$this->call('ProfileSeeder');
		$this->call('TagSeeder');
	}

}
