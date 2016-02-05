<?php
/**
 * Copyright Heddoko(TM) 2016, all rights reserved.
 *
 * @brief   Consolidated migration for Coaching & Suits Management dashboards.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AppTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        // Create Suits Management Dashboard tables.
        //

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

		Schema::create('complex_equipment', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('status_id')->unsigned();
			$table->foreign('status_id')->references('id')->on('statuses');

			$table->string('mac_address');
            $table->string('serial_no');
			$table->string('physical_location');

			$table->timestamps();
		});

		Schema::create('equipment', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('status_id')->unsigned();
			$table->foreign('status_id')->references('id')->on('statuses');

			$table->integer('material_id')->unsigned();
			$table->foreign('material_id')->references('id')->on('materials');

			$table->integer('anatomical_position_id')->unsigned();
			$table->foreign('anatomical_position_id')->references('id')->on('anatomical_positions');

			$table->integer('complex_equipment_id')->unsigned()->nullable();
			$table->foreign('complex_equipment_id')->references('id')->on('complex_equipment');

            $table->string('mac_address');
			$table->string('serial_no');
			$table->string('physical_location');

			$table->timestamps();
		});

        //
        // Create Coaching Dashboard tables.
        //

        // Create "roles" table.
        Schema::create('roles', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('name')->unique();
            $table->string('description')->nullable();

            $table->timestamps();
        });

        // Create "images" table.
        Schema::create('images', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('belongs_to_id')->unsigned();
			$table->string('belongs_to_type');
			$table->string('mime_type');
			$table->mediumText('data_uri');

			$table->timestamps();
		});

        // Create "tags" table.
		Schema::create('tags', function(Blueprint $table)
		{
			$table->increments('id');

			$table->string('title');
		});

        // Create "profiles" and "profile_meta" table.
        Schema::create('profiles', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('main_tag_id')->unsigned()->nullable();
			$table->foreign('main_tag_id')->references('id')->on('tags');

			$table->string('first_name');
			$table->string('last_name')->default('');

			$table->timestamps();
		});
        Schema::create('profile_meta', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('profile_id')->unsigned();
			$table->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->float('height')->unsigned()->nullable();        // In meters (SI units).
            $table->float('mass')->unsigned()->nullable();          // In kilograms (SI units).
            $table->timestamp('dob')->nullable();
            $table->tinyInteger('gender')->unsigned()->nullable();  // 1: female, 2: male, 0: not specified
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->text('data')->nullable();                       // Other details in JSON format.
		});

        // Create "screenings" table.
		Schema::create('screenings', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('profile_id')->unsigned()->nullable();
			$table->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('title')->nullable();
            $table->tinyInteger('score')->nullable()->default(0);
            $table->tinyInteger('score_max')->nullable()->default(100);
            $table->tinyInteger('score_min')->nullable()->default(0);
            $table->text('notes')->nullable();

			$table->timestamps();
        });

        // Create "folders" table.
		Schema::create('folders', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('profile_id')->unsigned();
			$table->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('name');
            $table->string('system_name');
            $table->string('path');
		});
        Schema::table('folders', function(Blueprint $table)
        {
            $table->integer('folder_id')->unsigned()->nullable();
            $table->foreign('folder_id')
                ->references('id')
                ->on('folders')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        // Create "movements" table.
		Schema::create('movements', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('complex_equipment_id')->unsigned()->nullable();
			$table->foreign('complex_equipment_id')->references('id')->on('complex_equipment');

			$table->integer('profile_id')->unsigned()->nullable();
			$table->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

			$table->integer('submitted_by')->unsigned()->nullable();
			$table->foreign('submitted_by')
                ->references('id')
                ->on('users');

			$table->integer('screening_id')->unsigned()->nullable();
			$table->foreign('screening_id')
                ->references('id')
                ->on('screenings')
                ->onUpdate('cascade')
                ->onDelete('cascade');

			$table->integer('folder_id')->unsigned()->nullable();
			$table->foreign('folder_id')
                ->references('id')
                ->on('folders')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('title')->nullable();

			$table->timestamps();
		});

        // Create "frames" table.
		Schema::create('frames', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')
                ->references('id')
                ->on('movements')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Formet version
            $table->string('format_revision')->nullable();

            // Timestamp in milliseconds.
            $table->timestamp('timestamp')->nullabe();
		});

        // Create "movement_meta" table.
        Schema::create('movement_meta', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')
                ->references('id')
                ->on('movements')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Start and end keyframes, indicating the range of useful frames.
            $table->integer('start_keyframe')->unsigned()->nullable();
			$table->foreign('start_keyframe')->references('id')->on('frames');
            $table->integer('end_keyframe')->unsigned()->nullable();
			$table->foreign('end_keyframe')->references('id')->on('frames');

            // Other fields.
            $table->tinyInteger('score')->nullable();
            $table->tinyInteger('score_max')->nullable()->default(100);
            $table->tinyInteger('score_min')->nullable()->default(0);
            $table->text('notes')->nullable();
            $table->text('params')->nullable();
        });

        // Create "movement_markers" table.
        Schema::create('movement_markers', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')
                ->references('id')
                ->on('movements')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Start and end keyframes, indicating how long a marker comment should be displayed
            // during a playback of the movement.
            $table->integer('start_keyframe')->unsigned()->nullable();
			$table->foreign('start_keyframe')->references('id')->on('frames');
            $table->integer('end_keyframe')->unsigned()->nullable();
			$table->foreign('end_keyframe')->references('id')->on('frames');

            // Marker comment.
            $table->string('comment')->nullable();
        });

        // Create "movement_events" table.
        Schema::create('movement_events', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')
                ->references('id')
                ->on('movements')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Start and end keyframes, indicating how long a marker comment should be displayed
            // during a playback of the movement.
            $table->integer('start_keyframe')->unsigned()->nullable();
			$table->foreign('start_keyframe')->references('id')->on('frames');
            $table->integer('end_keyframe')->unsigned()->nullable();
			$table->foreign('end_keyframe')->references('id')->on('frames');

            $table->string('type')->nullable();
            $table->text('data')->nullable();
        });

        // Create "aggregate_data" table.
        Schema::create('aggregate_data', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')
                ->references('id')
                ->on('movements')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('type')->nullable();
            $table->text('data')->nullable();
        });

        // Create "groups" table.
		Schema::create('groups', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('main_tag_id')->unsigned()->nullable();
			$table->foreign('main_tag_id')->references('id')->on('tags');

			$table->string('name');
            $table->text('meta')->nullable();

			$table->timestamps();
		});

        //
        // Pivot tables.
        //

        $pivots = [
            ['group', 'profile'],
            ['role', 'user'],
        ];

        foreach ($pivots as $tableNames)
        {
            $pivotName = $tableNames[0] .'_'. $tableNames[1];

            Schema::create($pivotName, function(Blueprint $table) use ($tableNames)
    		{
    			$table->increments('id');

                // Reference the primary key on the first table.
    			$table->integer($tableNames[0] .'_id')->unsigned();
                $table->foreign($tableNames[0] .'_id')
                    ->references('id')
                    ->on($tableNames[0] .'s')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                // Reference the primary key on the second table.
    			$table->integer($tableNames[1] .'_id')->unsigned();
                $table->foreign($tableNames[1] .'_id')
                    ->references('id')
                    ->on($tableNames[1] .'s')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
    		});
        }

        // The "manager_profile" pivot table follows a different convention.
        Schema::create('manager_profile', function(Blueprint $table)
        {
            $table->increments('id');

            // Reference the primary key on the first table.
            $table->integer('manager_id')->unsigned();
            $table->foreign('manager_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Reference the primary key on the second table.
            $table->integer('profile_id')->unsigned();
            $table->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        // The "group_manager" pivot table follows a different convention.
        Schema::create('group_manager', function(Blueprint $table)
        {
            $table->increments('id');

            // Reference the primary key on the first table.
            $table->integer('group_id')->unsigned();
            $table->foreign('group_id')
                ->references('id')
                ->on('groups')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Reference the primary key on the second table.
            $table->integer('manager_id')->unsigned();
            $table->foreign('manager_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        // Create "taggables" table for polymorphic many-to-many relations.
        Schema::create('taggables', function(Blueprint $table)
		{
			$table->integer('tag_id')->unsigned();
			$table->integer('taggable_id')->unsigned();
            $table->string('taggable_type');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        // Drop Coaching Dashboard tables.
        //

        // Drop pivot tables.
        Schema::hasTable('taggables') ? Schema::drop('taggables') : null;
        Schema::hasTable('group_manager') ? Schema::drop('group_manager') : null;
        Schema::hasTable('manager_profile') ? Schema::drop('manager_profile') : null;
        Schema::hasTable('role_user') ? Schema::drop('role_user') : null;
        Schema::hasTable('group_profile') ? Schema::drop('group_profile') : null;

        // Drop other tables.
		Schema::hasTable('groups') ? Schema::drop('groups') : null;
		Schema::hasTable('aggregate_data') ? Schema::drop('aggregate_data') : null;
		Schema::hasTable('movement_events') ? Schema::drop('movement_events') : null;
		Schema::hasTable('movement_markers') ? Schema::drop('movement_markers') : null;
		Schema::hasTable('movement_meta') ? Schema::drop('movement_meta') : null;
		Schema::hasTable('frames') ? Schema::drop('frames') : null;
		Schema::hasTable('movements') ? Schema::drop('movements') : null;

        if (Schema::hasTable('folders'))
        {
            Schema::table('folders', function(Blueprint $table)
            {
                $table->dropForeign('folders_folder_id_foreign');
            });

            Schema::drop('folders');
        }

		Schema::hasTable('screenings') ? Schema::drop('screenings') : null;
		Schema::hasTable('profile_meta') ? Schema::drop('profile_meta') : null;
		Schema::hasTable('profiles') ? Schema::drop('profiles') : null;
		Schema::hasTable('tags') ? Schema::drop('tags') : null;
		Schema::hasTable('images') ? Schema::drop('images') : null;
		Schema::hasTable('roles') ? Schema::drop('roles') : null;

        //
        // Drop Suits Management Dashboard tables.
        //

        Schema::drop('equipment');
        Schema::drop('complex_equipment');
        Schema::drop('materials');
        Schema::drop('material_types');
        Schema::drop('statuses');
        Schema::drop('anatomical_positions');
    }
}
