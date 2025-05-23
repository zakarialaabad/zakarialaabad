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
        Schema::create('proprietes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loueur_id')->constrained('loueurs')->onDelete('cascade'); // علاقة One-to-Many
            $table->string('titre');
            $table->string('localisation');
            $table->float('prixParMois');
            $table->json('imgs'); // تخزين الصور كمصفوفة JSON
            $table->text('description')->nullable();
            $table->boolean('disponibilite')->default(true);
            $table->enum('type', ['Appartement', 'Villa', 'Maison', 'Studio', 'Bureau', 'Magasin', 'Dépôt', 'Garage',"Boutique"]);
            $table->json('regles')->nullable();
           $table->string('adresse');
            $table->unsignedBigInteger('admin_id')->nullable();
            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('propreites');
    }
};
