<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPhotoSrc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add "photo_src" column to "teams" table.
        Schema::table('teams', function ($table) {
            $table->string('photo_src')->default('');
        });

        // Add "photo_src" column to "athletes" table.
        Schema::table('athletes', function ($table) {
            $table->string('photo_src')->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Remove the "photo_src" column from the "teams" and "athletes" tables.
        Schema::table('teams', function ($table) {
            $table->dropColumn('photo_src');
        });
        Schema::table('athletes', function ($table) {
            $table->dropColumn('photo_src');
        });
    }
}
