<?php
namespace Database\Seeders;
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
        $commoditesProximite = [
            'École ',
            'Supermarché ',
            'Transports en commun',
            'Hôpital proche',
            'Parc public',
            'Salle de sport',
            'Centre commercial',
            'Pharmacie',
            'Plage',
            'Mosquée ou Église',
            'Marché local',
            'Café ou restaurant',
            'Station-service',
            'Banque ou distributeur',
            'Université ou institut',
            'Cinéma proche',
            'Bibliothèque municipale',
            'Boulangerie ou pâtisserie',
            'Arrêt de tramway',
            'Zone piétonne',
            'Centre culturel',
            'Piscine municipale',
            'École maternelle',
            'Collège ou lycée',
            'Clinique vétérinaire',
            'Parc pour enfants',
            'Centre d’affaires',
            'Poste de police',
            'Bureau de poste',
            'Zone industrielle proche'
        ];
        foreach ($commoditesInterieures as $nom) {
            DB::table('commodites')->insert([
                'categorie' => 'Intérieur',
                'commodite' => $nom,
                'propriete_id'  => rand(3, 20), // ربط عشوائي مع propriété
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }  
        foreach ($commoditesExterieures as $nom) {
            DB::table('commodites')->insert([
                'categorie' => 'Exterieure',
                'commodite' => $nom,
                'propriete_id'  => rand(3, 20), // ربط عشوائي مع propriété

                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }   
        foreach ($commoditesProximite as $nom) {
            DB::table('commodites')->insert([
                'categorie' => 'proximité',
                'commodite' => $nom,
                'propriete_id'  => rand(3, 30), // ربط عشوائي مع propriété

                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
