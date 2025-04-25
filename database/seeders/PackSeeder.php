<?php

namespace Database\Seeders;

use App\Models\caracteristique;
use App\Models\Pake;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
                // إنشاء بعض القيود (Caracteristiques)
                $Preconstraint = caracteristique::create(['constraint' => 'Publier votre logement sur E-JAR']);
                $deuconstraint = Caracteristique::create(['constraint' => "Interaction avec les utilisateurs d'E-JAR"]);
                $trconstraint = Caracteristique::create(['constraint' => 'Sponsorisez vos annonces et notifiez les locataires potentiels de votre propriété']);
                $qatconstraint=Caracteristique::create(['constraint' => 'Visualisez votre annonce en 360°']);
                $cinqconstraint=Caracteristique::create(['constraint' => "Notre agence gère votre logement"]);
                $sixconstraint=Caracteristique::create(['constraint' => 'Assurance E-JAR']);
                // إنشاء الباقات وربطها بالقيود
                $premium = Pake::create(['name' => 'Pack Premium', 'prix' => 0]);
                $basique = Pake::create(['name' => 'Pack Basique', 'prix' => 200]);
                $standard = Pake::create(['name' => 'Pack Standard', 'prix' => 300]);
        
                // ربط الباقات بالقيود
                $premium->caracteristiques()->attach([$Preconstraint->id,$deuconstraint->id]);
                $basique->caracteristiques()->attach([$Preconstraint->id,$deuconstraint->id, $trconstraint->id]);
                $standard->caracteristiques()->attach([$qatconstraint->id,$cinqconstraint->id,$sixconstraint->id]);
    }
}
