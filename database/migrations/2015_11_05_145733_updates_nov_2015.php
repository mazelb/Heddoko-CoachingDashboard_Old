<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatesNov2015 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Drop "admins" table (use "roles" instead).
		Schema::drop('admins');

        // Update users table.
        Schema::table('users', function ($table)
        {
            // We'll use the "profile" table to store and streamline this information.
            $table->dropColumn('city', 'dob', 'sex', 'mobile');

            // Add a parameters column.
            $table->text('config');
        });

        // Create "images" table.
        Schema::create('images', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('belongs_to_id')->unsigned();
			$table->string('belongs_to_type');
			$table->string('mime_type');
			$table->text('data_uri');

			$table->timestamps();
		});

        // Create "profiles" table.
        Schema::create('profiles', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

			$table->string('first_name');
			$table->string('last_name')->default('');
			$table->integer('age')->unsigned()->nullable();
            $table->float('height')->nullable();        // In meters (SI units).
            $table->float('mass')->nullable();          // In kilograms (SI units).
            $table->timestamp('dob')->nullable();
            $table->tinyInteger('gender')->default(0);  // 1: female, 2: male.
            $table->string('phone')->default('');
            $table->text('notes')->default('');
            $table->text('meta')->default('');          // Other details in JSON format.

			$table->timestamps();
		});

        // Update "movements" table.
        Schema::table('movements', function ($table)
        {
            $table->dropColumn('sportmovement_id', 'movementsub_id', 'fmsformsub_id');

            // Movements can be associated with profiles or FMS test trials.
			$table->integer('belongs_to_id')->unsigned();
			$table->string('belongs_to_type');

            // User responsible for submission.
			$table->integer('submitted_by')->unsigned()->nullable();
			$table->foreign('submitted_by')->references('id')->on('users');

            // Start and end timestamps, indicating the range of useful frames.
            $table->integer('start_timestamp')->unsigned()->nullable();
            $table->integer('end_timestamp')->unsigned()->nullable();

            // Raw file name.
            $table->string('filename')->default('');

            // Other notes.
            $table->text('notes')->default('');
        });
        Schema::drop('movementrawentries');

        // Drop "movementsubmissions" table and aggregate the extra details in the "movements" table.
		Schema::drop('movementsubmissions');

        // Use tags to classify movements instead.
		Schema::drop('sportmovements');

        // Rename "teams" to "groups" for generalization and rebuild the table schema.
		Schema::drop('teams');
		Schema::create('groups', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');

            // Other details (JSON-encoded).
            $table->text('meta')->default('');

			$table->timestamps();
		});

        // Rename "sports" to "tags" for generalization.
        Schema::rename('sports', 'tags');
        Schema::table('tags', function ($table)
        {
            // Drop timestamps.
            $table->dropTimestamps();
        });

        // Drop "fmsformsubmissions" table.
		Schema::drop('fmsformsubmissions');

        // Drop "athletes" table (use "roles" instead).
		Schema::drop('athletes');

        // Drop "coaches" table (use "roles" instead).
		Schema::drop('coaches');

        // Restructure "fmsforms" table.
        Schema::drop('fmsforms');
		Schema::create('fms', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('profile_id')->unsigned();
			$table->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Total score.
            $table->tinyInterger('score')->unsigned()->nullable();

            // General notes.
            $table->text('notes')->default('');

			$table->timestamps();
		});

        // Create "fms_test" table for individual tests.
        Schema::create('fms_test', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('fms_id')->unsigned();
			$table->foreign('fms_id')
                ->references('id')
                ->on('fms')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Test score.
            $table->tinyInterger('score')->nullable();

            // General notes.
            $table->text('notes')->default('');

			$table->timestamps();
		});

        // Update "frames" table with a timestamp.
        Schema::table('frames', function ($table)
        {
            // Timestamp in milliseconds.
            $table->timestamp('timestamp');
        });

        // Rename "Nod..." to "IMU..." and remove timestamps.
        Schema::create('imu_containers', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('frame_id')->unsigned();
			$table->foreign('frame_id')
                ->references('id')
                ->on('frames')
                ->onUpdate('cascade')
                ->onDelete('cascade');
		});
        Schema::create('imu_joints', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('imu_container_id')->unsigned();
			$table->foreign('imu_container_id')->references('id')->on('imu_containers')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->float('cur_joint_euler_1')->default(0.0);
			$table->float('cur_joint_euler_2')->default(0.0);
			$table->float('cur_joint_euler_3')->default(0.0);
		});
		Schema::create('imu_sensors', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('imu_joint_id')->unsigned();
			$table->foreign('imu_joint_id')->references('id')->on('imu_joints')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->float('init_rot_1')->default(0.0);
			$table->float('init_rot_2')->default(0.0);
			$table->float('init_rot_3')->default(0.0);
			$table->float('init_rot_4')->default(0.0);
			$table->float('cur_rot_1')->default(0.0);
			$table->float('cur_rot_2')->default(0.0);
			$table->float('cur_rot_3')->default(0.0);
			$table->float('cur_rot_4')->default(0.0);
			$table->float('cur_joint_euler_1')->default(0.0);
			$table->float('cur_joint_euler_2')->default(0.0);
			$table->float('cur_joint_euler_3')->default(0.0);
			$table->float('cur_joint_euler_4')->default(0.0);
		});
        Schema::drop('nodsensors');
        Schema::drop('nodjoints');
        Schema::drop('nodcontainers');

        // Rename "Stretch..." to "Fabric..." and remove timestamps.
        Schema::create('fabric_containers', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('frame_id')->unsigned();
			$table->foreign('frame_id')
                ->references('id')
                ->on('frames')
                ->onUpdate('cascade')
                ->onDelete('cascade');
		});
		Schema::create('fabric_joints', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('fabric_container_id')->unsigned();
			$table->foreign('fabric_container_id')
                ->references('id')
                ->on('fabric_containers')
                ->onUpdate('cascade')
                ->onDelete('cascade');

			$table->float('cur_joint_euler_1')->default(0.0);
			$table->float('cur_joint_euler_2')->default(0.0);
			$table->float('cur_joint_euler_3')->default(0.0);
		});
		Schema::create('fabric_sensors', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('fabric_joint_id')->unsigned();
			$table->foreign('fabric_joint_id')
                ->references('id')
                ->on('fabric_joints')
                ->onUpdate('cascade')
                ->onDelete('cascade');

			$table->integer('csv_value_1')->default(0);
			$table->integer('csv_value_2')->default(0);
			$table->integer('csv_value_3')->default(0);
			$table->integer('csv_value_4')->default(0);
			$table->integer('csv_value_5')->default(0);
		});
        Schema::drop('stretchsensors');
        Schema::drop('stretchjoints');
        Schema::drop('stretchcontainers');

        // Create generic containers for future sensors.
        Schema::create('generic_containers', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('frame_id')->unsigned();
			$table->foreign('frame_id')
                ->references('id')
                ->on('frames')
                ->onUpdate('cascade')
                ->onDelete('cascade');
		});
		Schema::create('generic_joints', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('generic_container_id')->unsigned();
			$table->foreign('generic_container_id')
                ->references('id')
                ->on('generic_joints')
                ->onUpdate('cascade')
                ->onDelete('cascade');

			$table->float('cur_joint_euler_1')->default(0.0);
			$table->float('cur_joint_euler_2')->default(0.0);
			$table->float('cur_joint_euler_3')->default(0.0);
		});
		Schema::create('generic_sensors', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('generic_joint_id')->unsigned();
			$table->foreign('generic_joint_id')
                ->references('id')
                ->on('generic_joints')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // JSON-encoded data.
			$table->text('data')->default('');
		});

        //
        // Pivot tables.
        //

        $pivots = [
            'group' => 'profile',
            'movement' => 'tag',
            'profile' => 'tag',
        ];

        foreach ($pivots as $table1 => $table2)
        {
            $pivotName = $table1 .'_'. $table2;

            Schema::create($pivotName, function(Blueprint $table) use ($table1, $table2)
    		{
    			$table->increments('id');

                // Reference the primary key on the first table.
    			$table->integer($table1 .'_id')->unsigned();
                $table->foreign($table1 .'_id')
                    ->references('id')
                    ->on($table1 .'s')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                // Reference the primary key on the second table.
    			$table->integer($table2 .'_id')->unsigned();
                $table->foreign($table2 .'_id')
                    ->references('id')
                    ->on($table2 .'s')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
    		});
        }
    }

    /**
     * Reverse the migrations. For simplicity, we will drop most tables in reverse order
     * and rerun the "create_all_tables" and "photo_src" migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop pivot tables.
        Schema::hasTable('profile_tag') ?           Schema::drop('profile_tag') : null;
        Schema::hasTable('movement_tag') ?          Schema::drop('movement_tag') : null;
        Schema::hasTable('group_profile') ?         Schema::drop('group_profile') : null;

        // Drop movement-related tables.
        Schema::hasTable('generic_sensors') ?       Schema::drop('generic_sensors') : null;
        Schema::hasTable('generic_joints') ?        Schema::drop('generic_joints') : null;
        Schema::hasTable('generic_containers') ?    Schema::drop('generic_containers') : null;
        Schema::hasTable('fabric_sensors') ?        Schema::drop('fabric_sensors') : null;
        Schema::hasTable('fabric_joints') ?         Schema::drop('fabric_joints') : null;
        Schema::hasTable('fabric_containers') ?     Schema::drop('fabric_containers') : null;
        Schema::hasTable('imu_sensors') ?           Schema::drop('imu_sensors') : null;
        Schema::hasTable('imu_joints') ?            Schema::drop('imu_joints') : null;
        Schema::hasTable('imu_containers') ?        Schema::drop('imu_containers') : null;

        // Drop remaining tables.
        Schema::hasTable('frames') ?        Schema::drop('frames') : null;
        Schema::hasTable('fms_test') ?      Schema::drop('fms_test') : null;
        Schema::hasTable('fms') ?           Schema::drop('fms') : null;
        Schema::hasTable('groups') ?        Schema::drop('groups') : null;
        Schema::hasTable('movements') ?     Schema::drop('movements') : null;
        Schema::hasTable('profiles') ?      Schema::drop('profiles') : null;
        Schema::hasTable('images') ?        Schema::drop('images') : null;

        // Rename "tags" to "sports".
        Schema::rename('tags', 'sports');
        Schema::table('sports', function ($table)
        {
            $table->timestamps();
        });

        // Rebuild "users" table.
        Schema::table('users', function ($table)
        {
            $table->string('city', 255);
            $table->string('dob', 16);
            $table->string('sex', 11);
            $table->string('mobile', 20);

            $table->dropColumn('config');
        });


        //
        // The following is a copy & paste (more or less) from the "create_all_tables" migration.
        //


		Schema::create('admins', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('first_name');
			$table->string('last_name');

			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');

			$table->rememberToken();
			$table->timestamps();
		});

		Schema::create('coaches', function(Blueprint $table)
		{
			$table->increments('id');

			$table->string('first_name');
			$table->string('last_name');
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');

			$table->rememberToken();
			$table->timestamps();
		});

        Schema::create('teams', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('coach_id')->unsigned();
			$table->foreign('coach_id')->references('id')->on('coaches');
			$table->integer('sport_id')->unsigned();
			$table->foreign('sport_id')->references('id')->on('sports');
			$table->string('name');

			$table->timestamps();
		});

        Schema::create('sportmovements', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('sport_id')->unsigned();
			$table->foreign('sport_id')->references('id')->on('sports');
			$table->string('name');

			$table->timestamps();
		});

		Schema::create('athletes', function(Blueprint $table)
		{
			$table->increments('id');

			$table->string('first_name');
			$table->string('last_name');

			$table->integer('user_id')->unsigned()->nullable();
			$table->foreign('user_id')->references('id')->on('users');
			$table->integer('team_id')->unsigned()->nullable();
			$table->foreign('team_id')->references('id')->on('teams');

			$table->integer('age')->unsigned();
			$table->integer('height_cm')->unsigned();
			$table->integer('weight_cm')->unsigned();
			$table->string('primary_sport');
			$table->string('primary_position');
			$table->string('hand_leg_dominance');
			$table->string('previous_injuries');
			$table->string('underlying_medical');
			$table->string('notes');

			$table->timestamps();
		});

		Schema::create('movementsubmissions', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('coach_id')->unsigned();
			$table->foreign('coach_id')->references('id')->on('coaches');
			$table->integer('athlete_id')->unsigned();
			$table->foreign('athlete_id')->references('id')->on('athletes');

			$table->string('comment');

			$table->timestamps();
		});

        Schema::create('fmsforms', function(Blueprint $table)
		{
			$table->increments('id');

			$table->tinyInteger('deepsquat');
			$table->string('deepsquatcomments', 255);
			$table->tinyInteger('Lhurdle');
			$table->tinyInteger('Rhurdle');
			$table->string('hurdlecomments', 255);
			$table->tinyInteger('Llunge');
			$table->tinyInteger('Rlunge');
			$table->string('lungecomments', 255);
			$table->tinyInteger('Lshoulder');
			$table->tinyInteger('Rshoulder');
			$table->string('shouldercomments', 255);
			$table->tinyInteger('Limpingement');
			$table->tinyInteger('Rimpingement');
			$table->string('impingementcomments', 255);
			$table->tinyInteger('Lactive');
			$table->tinyInteger('Ractive');
			$table->string('activecomments', 255);
			$table->tinyInteger('trunk');
			$table->string('trunkcomments', 255);
			$table->tinyInteger('press');
			$table->string('presscomments', 255);
			$table->tinyInteger('Lrotary');
			$table->tinyInteger('Rrotary');
			$table->string('rotarycomments', 255);
			$table->tinyInteger('posterior');
			$table->string('posteriorcomments', 255);
			$table->tinyInteger('totalscore');

			$table->timestamps();
		});

		Schema::create('fmsformsubmissions', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('coach_id')->unsigned();
			$table->foreign('coach_id')->references('id')->on('coaches');
			$table->integer('athlete_id')->unsigned();
			$table->foreign('athlete_id')->references('id')->on('athletes');
			$table->integer('fmsform_id')->unsigned();
			$table->foreign('fmsform_id')->references('id')->on('fmsforms');

			$table->string('comment');

			$table->timestamps();
		});

        Schema::create('movements', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('sportmovement_id')->unsigned()->nullable();
			$table->foreign('sportmovement_id')->references('id')->on('sportmovements');
			$table->integer('movementsub_id')->unsigned()->nullable();
			$table->foreign('movementsub_id')->references('id')->on('movementsubmissions');
			$table->integer('fmsformsub_id')->unsigned()->nullable();
			$table->foreign('fmsformsub_id')->references('id')->on('fmsformsubmissions');

			$table->string('name');

			$table->timestamps();
		});

		Schema::create('movementrawentries', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')->references('id')->on('movements');
			$table->string('filename')->unique();

			$table->timestamps();
		});

        Schema::create('frames', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')->references('id')->on('movements');

			$table->timestamps();
		});

		Schema::create('nodcontainers', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('frame_id')->unsigned();
			$table->foreign('frame_id')->references('id')->on('frames');

			$table->timestamps();
		});

		Schema::create('nodjoints', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('nod_container_id')->unsigned();
			$table->foreign('nod_container_id')->references('id')->on('nodcontainers');

			$table->float('iInitRot1');
			$table->float('iInitRot2');
			$table->float('iInitRot3');
			$table->float('iInitRot4');

			$table->timestamps();
		});

		Schema::create('nodsensors', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('nod_joint_id')->unsigned();
			$table->foreign('nod_joint_id')->references('id')->on('nodjoints');

			$table->float('InitRot1');
			$table->float('InitRot2');
			$table->float('InitRot3');
			$table->float('InitRot4');
			$table->float('CurRot1');
			$table->float('CurRot2');
			$table->float('CurRot3');
			$table->float('CurRot4');
			$table->float('CurRotEuler1');
			$table->float('CurRotEuler2');
			$table->float('CurRotEuler3');
			$table->float('CurRotEuler4');

			$table->timestamps();
		});

		Schema::create('stretchcontainers', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('frame_id')->unsigned();
			$table->foreign('frame_id')->references('id')->on('frames');

			$table->timestamps();
		});

		Schema::create('stretchjoints', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('stretch_container_id')->unsigned();
			$table->foreign('stretch_container_id')->references('id')->on('stretchcontainers');

			$table->float('curJointRotE1');
			$table->float('curJointRotE2');
			$table->float('curJointRotE3');

			$table->timestamps();
		});

		Schema::create('stretchsensors', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('stretch_joint_id')->unsigned();
			$table->foreign('stretch_joint_id')->references('id')->on('stretchjoints');

			$table->integer('CSValue1');
			$table->integer('CSValue2');
			$table->integer('CSValue3');
			$table->integer('CSValue4');
			$table->integer('CSValue5');

			$table->timestamps();
		});


        //
        // The following is a copy & paste from the "photo_src" migration.
        //


        // Add "photo_src" column to "teams" table.
        Schema::table('teams', function ($table) {
            $table->string('photo_src')->default('');
        });

        // Add "photo_src" column to "athletes" table.
        Schema::table('athletes', function ($table) {
            $table->string('photo_src')->default('');
        });
    }
}
