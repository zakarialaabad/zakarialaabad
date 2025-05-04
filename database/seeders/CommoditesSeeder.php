<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommoditesSeeder extends Seeder
{
    public function run()
    {
        $commoditesInterieures = [
            'Balcon spacieux',
            'Toilette moderne',
            'Chauffage central',
            'Climatisation',
            'Cuisine équipée',
            'Placards intégrés',
            'Fenêtres double vitrage',
            'Dressing',
            'Buanderie',
            'Internet fibre optique',
            'Système d’alarme',
            'Porte blindée',
            'Rideaux électriques',
            'Cheminée',
            'Ascenseur (si applicable dans l’immeuble)',
            'Espace bureau à domicile',
            'Éclairage encastré'
        ];
        $commoditesExterieures = [
            'Jardin privé',
            'Piscine privée',
            'Terrasse ou patio',
            'Cour intérieure',
            'Espace barbecue',
            'Toit exploitable',
            'Grandes fenêtres extérieures',
            'Façade sur mer / montagne',
            'Garage privé ou fermé',
            'Aire de jeux pour enfants',
            'Clôture extérieure',
            'Système d’arrosage automatique',
            'Espace vert partagé',
            'Parking'
        ];

        foreach ($commoditesInterieures as $nom) {
            DB::table('commodites')->insert([
                'categorie' => 'Intérieur',
                'nom' => $nom,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
