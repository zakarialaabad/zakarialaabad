<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommoditesSeeder extends Seeder
{
    public function run()
    {
        $commoditesInterieures = [
            'Balcon spacieux', 'Toilette moderne', 'Chauffage central', 'Climatisation',
            'Cuisine équipée', 'Placards intégrés', 'Fenêtres double vitrage', 'Dressing',
            'Buanderie', 'Internet fibre optique', 'Système d’alarme', 'Porte blindée',
            'Rideaux électriques', 'Cheminée', 'Ascenseur (si applicable dans l’immeuble)',
            'Espace bureau à domicile', 'Éclairage encastré'
        ];

        $commoditesExterieures = [
            'Jardin privé', 'Piscine privée', 'Terrasse ou patio', 'Cour intérieure',
            'Espace barbecue', 'Toit exploitable', 'Grandes fenêtres extérieures',
            'Façade sur mer / montagne', 'Garage privé ou fermé', 'Aire de jeux pour enfants',
            'Clôture extérieure', 'Système d’arrosage automatique', 'Espace vert partagé', 'Parking'
        ];

        $commoditesProximite = [
            'École ', 'Supermarché ', 'Transports en commun', 'Hôpital proche',
            'Parc public', 'Salle de sport', 'Centre commercial', 'Pharmacie',
            'Plage', 'Mosquée ou Église', 'Marché local', 'Café ou restaurant',
            'Station-service', 'Banque ou distributeur', 'Université ou institut',
            'Cinéma proche', 'Bibliothèque municipale', 'Boulangerie ou pâtisserie',
            'Arrêt de tramway', 'Zone piétonne', 'Centre culturel', 'Piscine municipale',
            'École maternelle', 'Collège ou lycée', 'Clinique vétérinaire',
            'Parc pour enfants', 'Centre d’affaires', 'Poste de police',
            'Bureau de poste', 'Zone industrielle proche'
        ];

        // دمج وتوحيد قائمة commodites
        $allCommodites = array_unique(array_merge($commoditesInterieures, $commoditesExterieures, $commoditesProximite));

        // إدخال جميع commodites مع تحديد الفئة
        foreach ($allCommodites as $nom) {
            if (in_array($nom, $commoditesInterieures)) {
                $categorie = 'Intérieur';
            } elseif (in_array($nom, $commoditesExterieures)) {
                $categorie = 'Exterieure';
            } elseif (in_array($nom, $commoditesProximite)) {
                $categorie = 'Proximité';
            } else {
                $categorie = 'Divers';
            }

            $this->insertOrGetCommodite($nom, $categorie);
        }

        // الآن نضمن لكل propriété على الأقل 6 commodites
        $this->assignCommoditesToProprietes($allCommodites);
    }

    private function insertOrGetCommodite($nom, $categorie)
    {
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

        return $id;
    }

    private function assignCommoditesToProprietes($allCommodites)
    {
        $proprietes = DB::table('proprietes')->pluck('id')->toArray();

        // جلب جميع commodites في قاعدة البيانات مع IDs
        $commoditesRecords = DB::table('commodites')->pluck('id', 'commodite')->toArray();

        foreach ($proprietes as $propriete_id) {
            // جلب commodites المرتبطة بـ propriete_id
            $assigned = DB::table('commodites_propreite')->where('propriete_id', $propriete_id)->pluck('commodite_id')->toArray();

            // نحتاج عدد كموديت جديد ليصل لـ 6
            $toAssignCount = 6 - count($assigned);

            if ($toAssignCount > 0) {
                // commodites غير المرتبطة بـ propriete_id
                $availableCommodites = array_diff(array_values($commoditesRecords), $assigned);

                // نختار عشوائياً commodites غير موجودة
                shuffle($availableCommodites);

                $commoditesToAdd = array_slice($availableCommodites, 0, $toAssignCount);

                foreach ($commoditesToAdd as $commodite_id) {
                    DB::table('commodites_propreite')->insert([
                        'commodite_id' => $commodite_id,
                        'propriete_id' => $propriete_id,
                    ]);
                }
            }
        }
    }
}
