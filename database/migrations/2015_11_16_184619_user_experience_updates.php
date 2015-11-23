<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserExperienceUpdates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Use "screenings" instead of "FMS", which is a trademarked term.
        Schema::table('fms_test', function ($table)
        {
            $table->dropForeign('fms_test_fms_id_foreign');
        });
        Schema::rename('fms', 'screenings');
        Schema::rename('fms_test', 'screening_tests');
        Schema::table('screening_tests', function ($table)
        {
            $table->renameColumn('fms_id', 'screening_id');
			$table->foreign('screening_id')
                ->references('id')
                ->on('screenings')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        // Move extra movement details to their own table, for efficiency.
        Schema::table('movements', function ($table)
        {
            $table->dropColumn('start_timestamp', 'end_timestamp', 'filename', 'notes');
        });
        Schema::create('movement_meta', function(Blueprint $table)
		{
			$table->increments('id');

            $table->integer('movement_id')->unsigned();
			$table->foreign('movement_id')->references('id')->on('movements');

            // Start and end keyframes, indicating the range of useful frames.
            $table->integer('start_keyframe')->unsigned()->nullable();
			$table->foreign('start_keyframe')->references('id')->on('frames');
            $table->integer('end_keyframe')->unsigned()->nullable();
			$table->foreign('end_keyframe')->references('id')->on('frames');

            // Raw file name.
            $table->string('filename')->nullable();

            // Other notes.
            $table->text('notes')->nullable();
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

        // Increase the length of dataURI field for images.
        Schema::table('images', function(Blueprint $table)
        {
            $table->dropColumn('data_uri');
        });
        Schema::table('images', function(Blueprint $table)
        {
            $table->mediumText('data_uri');
        });

        // Add a few fields to the "profiles" table.
        Schema::table('profiles', function(Blueprint $table)
        {
            $table->text('medical_history')->nullable();
            $table->text('injuries')->nullable();
        });

        // Rename "name" column to "title" in "tags" table.
        Schema::table('tags', function(Blueprint $table)
        {
            $table->renameColumn('name', 'title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Revert name change on "tags" table.
        Schema::table('tags', function(Blueprint $table)
        {
            $table->renameColumn('title', 'name');
        });

        // Remove new fields in "profiles" table.
        Schema::table('profiles', function(Blueprint $table)
        {
            $table->dropColumn('medical_history', 'injuries');
        });

        // Reset length of dataURI field for images.
        Schema::table('images', function(Blueprint $table)
        {
            $table->dropColumn('data_uri');
        });
        Schema::table('images', function(Blueprint $table)
        {
            $table->text('data_uri');
        });

        // Drop "movement_markers" table.
        Schema::drop('movement_markers');

        // Undo changes to "movements" table.
        Schema::drop('movement_meta');
        Schema::table('movements', function ($table)
        {
            $table->integer('start_timestamp')->unsigned()->nullable();
            $table->integer('end_timestamp')->unsigned()->nullable();
            $table->string('filename')->default('');
            $table->text('notes')->nullable();
        });

        // Undo FMS change.
        Schema::table('screening_tests', function ($table)
        {
            $table->dropForeign('screening_tests_screening_id_foreign');
        });
        Schema::rename('screenings', 'fms');
        Schema::rename('screening_tests', 'fms_test');
        Schema::table('fms_test', function ($table)
        {
            $table->renameColumn('screening_id', 'fms_id');
			$table->foreign('fms_id')
                ->references('id')
                ->on('fms')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }
}
