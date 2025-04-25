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
        Schema::create('caracteristique_pakes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pake_id')->constrained("pakes")->onDelete('cascade')->onUpdate("cascade");
            $table->foreignId('caracteristique_id')->constrained("caracteristiques")->onDelete('cascade')->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caracteristique_pakes');
    }
};
