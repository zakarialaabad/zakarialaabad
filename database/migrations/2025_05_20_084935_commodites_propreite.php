<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Commodites_propreite', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('propriete_id')->nullable();
            $table->foreign('propriete_id')->references('id')->on('proprietes')->onDelete('cascade');
            $table->unsignedBigInteger('commodite_id')->nullable();
            $table->foreign('commodite_id')->references('id')->on('commodites')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Commodites_propreite', function (Blueprint $table) {
            //
        });
    }
};
