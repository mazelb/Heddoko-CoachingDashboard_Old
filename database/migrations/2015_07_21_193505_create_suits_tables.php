<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Tables for Suites Management Dashboard.
 * @author  Maxwell (max@heddoko.com); Francis Amankrah (frank@heddoko.com)
 * @date    July 2015
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSuitsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('anatomical_positions', function(Blueprint $table)
		{
			$table->integer('id')->unsigned();
			$table->primary('id');

			$table->string('name');
		});

		Schema::create('statuses', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
		});

		Schema::create('material_types', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('identifier');
		});

		Schema::create('materials', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('material_type_id')->unsigned();
			$table->foreign('material_type_id')->references('id')->on('material_types');

			$table->string('name');
			$table->string('part_no');
		});

		Schema::create('suits_equipment', function(Blueprint $table)
		{
			$table->increments('id');

			$table->string('mac_address');
			$table->string('physical_location');

			$table->integer('anatomical_position_id')->unsigned();
			$table->foreign('anatomical_position_id')->references('id')->on('anatomical_positions');
		});

		Schema::create('equipment', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('material_id')->unsigned();
			$table->foreign('material_id')->references('id')->on('materials');

			$table->string('serial_no');
			$table->string('physical_location');

			$table->integer('status_id')->unsigned();
			$table->foreign('status_id')->references('id')->on('statuses');

			$table->integer('suits_equipment_id')->unsigned()->nullable();
			$table->foreign('suits_equipment_id')->references('id')->on('suits_equipment');
		});

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('equipment');
        Schema::drop('statuses');
        Schema::drop('materials');
        Schema::drop('material_types');
        Schema::drop('suits_equipment');
        Schema::drop('anatomical_positions');
    }
}
