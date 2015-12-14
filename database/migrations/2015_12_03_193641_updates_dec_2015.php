<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   DB updates.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    December 2015
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatesDec2015 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
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

			$table->string('first_name');
			$table->string('last_name')->default('');
            $table->integer('tag_id')->unsigned()->nullable();
			$table->foreign('tag_id')
                ->references('id')
                ->on('tags')
                ->onUpdate('cascade')
                ->onDelete('cascade');

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
            $table->tinyInteger('gender')->unsigned()->nullable();  // 1: female, 2: male.
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->text('medical_history')->nullable();
            $table->text('injuries')->nullable();
            $table->text('notes')->nullable();
            $table->text('params')->nullable();         // Other details in JSON format.
		});

        // Create "movement_sets" table.
		Schema::create('movement_sets', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('profile_id')->unsigned()->nullable();
			$table->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->tinyInteger('score')->unsigned()->nullable();
            $table->tinyInteger('score_max')->unsigned()->nullable();
            $table->text('notes')->nullable();
        });

        // Create "movements" table.
		Schema::create('movements', function(Blueprint $table)
		{
			$table->increments('id');

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

			$table->integer('movement_set_id')->unsigned()->nullable();
			$table->foreign('movement_set_id')
                ->references('id')
                ->on('movement_sets');

            $table->string('title')->nullable();
            $table->tinyInteger('score')->unsigned()->nullable();
            $table->tinyInteger('score_max')->unsigned()->nullable();

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

            // Timestamp in milliseconds.
            $table->timestamp('timestamp');
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

            // Other notes.
            $table->text('notes')->nullable();

            // Virtual path
            $table->string('virtual_path')->nullable();

            // Raw file name.
            $table->string('filename')->nullable();
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

        // Create "groups" table.
		Schema::create('groups', function(Blueprint $table)
		{
			$table->increments('id');

			$table->string('name');
            $table->text('meta')->nullable();

			$table->timestamps();
		});

        //
        // Pivot tables.
        //

        $pivots = [
            ['group', 'profile'],
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
        // Drop pivot tables.
        Schema::hasTable('taggables') ? Schema::drop('taggables') : null;
        Schema::hasTable('group_manager') ? Schema::drop('group_manager') : null;
        Schema::hasTable('manager_profile') ? Schema::drop('manager_profile') : null;
        Schema::hasTable('group_profile') ? Schema::drop('group_profile') : null;

        // Drop other tables.
		Schema::hasTable('groups') ? Schema::drop('groups') : null;
		Schema::hasTable('movement_markers') ? Schema::drop('movement_markers') : null;
		Schema::hasTable('movement_meta') ? Schema::drop('movement_meta') : null;
		Schema::hasTable('frames') ? Schema::drop('frames') : null;
		Schema::hasTable('movements') ? Schema::drop('movements') : null;
		Schema::hasTable('movement_sets') ? Schema::drop('movement_sets') : null;
		Schema::hasTable('profile_meta') ? Schema::drop('profile_meta') : null;
		Schema::hasTable('profiles') ? Schema::drop('profiles') : null;
		Schema::hasTable('tags') ? Schema::drop('tags') : null;
		Schema::hasTable('images') ? Schema::drop('images') : null;
    }
}
