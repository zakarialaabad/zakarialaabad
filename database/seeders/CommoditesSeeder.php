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
            'École ', 'Supermarché ', 'Transports en commun', 'Hôpital proche',
            'Parc public', 'Salle de sport', 'Centre commercial', 'Pharmacie',
            'Plage', 'Mosquée ou Église', 'Marché local', 'Café ou restaurant',
            'Station-service', 'Banque ou distributeur', 'Université ou institut',
            'Cinéma proche', 'Bibliothèque municipale', 'Boulangerie ou pâtisserie',
            'Arrêt de tramway', 'Zone piétonne', 'Centre culturel',
            'Piscine municipale', 'École maternelle', 'Collège ou lycée',
            'Clinique vétérinaire', 'Parc pour enfants', 'Centre d’affaires',
            'Poste de police', 'Bureau de poste', 'Zone industrielle proche'
        ];

        $this->insertCommodites($commoditesInterieures, 'Intérieur');
        $this->insertCommodites($commoditesExterieures, 'Exterieure');
        $this->insertCommodites($commoditesProximite, 'Proximité');
    }

    private function insertCommodites($list, $categorie)
    {
        foreach ($list as $nom) {
            // تحقق من وجودها مسبقًا
            $commodite = DB::table('commodites')->where('commodite', $nom)->first();

            if (!$commodite) {
                $id = DB::table('commodites')->insertGetId([
                    'categorie' => $categorie,
                    'commodite' => $nom,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                $id = $commodite->id;
            }

            // ربطها بـ propriete_id عشوائي (تأكد أنه لا يتكرر لنفس الزوج)
            $propriete_id = rand(3, 20);

            $exists = DB::table('Commodites_propreite')->where([
                ['commodite_id', '=', $id],
                ['propriete_id', '=', $propriete_id],
            ])->exists();

            if (!$exists) {
                DB::table('Commodites_propreite')->insert([
                    'commodite_id' => $id,
                    'propriete_id' => $propriete_id,
                ]);
            }
        }
    }
}
