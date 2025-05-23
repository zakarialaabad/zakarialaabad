<?php
// database/migrations/xxxx_xx_xx_create_commodites_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommoditesTable extends Migration
{
    public function up()
    {
        Schema::create('commodites', function (Blueprint $table) {
            $table->id();
            $table->string('categorie'); // The category of the commodity
            $table->string('commodite'); // The commodity/feature itself
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commodites');
    }
}
