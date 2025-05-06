<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Propriete;
use Illuminate\Support\Facades\File;

class PropreiteSeeder extends Seeder
{
    private $typesLocairesOptions = ['Tout', 'Famille', 'Marei', 'Étudiant', 'Célibataire', 'Fonctionnaire'];

    public function getRandomImages($folderPath, $count = 5)
    {
        $fullPath = public_path($folderPath);

        if (!File::exists($fullPath)) {
            return [];
        }

        $allFiles = collect(File::files($fullPath))
            ->filter(function ($file) {
                return in_array($file->getExtension(), ['jpg', 'jpeg', 'png', 'webp']);
            })
            ->shuffle()
            ->take($count)
            ->map(function ($file) use ($folderPath) {
                return $folderPath . '/' . $file->getFilename(); // e.g., 'appartements/image1.jpg'
            })
            ->values()
            ->toArray();

        return $allFiles;
    }

    public function run()
    {
        $posts = [
            // Appartement
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Appartement moderne à Casablanca',
                'localisation' => 'Casablanca, Hay Riad',
                'prixParMois' => 6000,
                'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                'description' => 'Appartement moderne de 90 m² avec une vue imprenable sur la mer. Situé dans un quartier calme, l\'appartement comprend 2 chambres, un salon spacieux et une cuisine équipée. Idéal pour une famille ou des professionnels.',
                'disponibilite' => true,
                'type' => 'Appartement',
                'condition' => 'Loyer mensuel de 6000 MAD, 1 mois de caution.',
                'adresse' => 'Casablanca, Hay Riad, Rue Mohammed VI',
                'admin_id' => 1,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => $this->typesLocairesOptions[array_rand($this->typesLocairesOptions)],
                "ville" => "Casablanca"
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Appartement de luxe à Marrakech',
                'description' => 'Spacieux appartement de luxe de 120 m² avec des finitions haut de gamme. L\'appartement offre 3 chambres, un grand salon, une cuisine ouverte, et un balcon avec une vue sur la ville. Emplacement idéal à Gueliz, proche des commerces.',
                'disponibilite' => true,
                'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                "prixParMois"=> 12000,
                'localisation' => 'Marrakech, Gueliz',
                'type' => 'Appartement',
                'condition' => 'Loyer mensuel de 12000 MAD, contrat de 1 an.',
                'adresse' => 'Marrakech, Gueliz, Rue de la Liberté',
                'admin_id' => 2,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Fonctionnaire',
                "ville"=>"Marrakech"

            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Appartement au centre de Rabat',
                'localisation' => 'Rabat, Centre-ville',
                'prixParMois' => 4500,
                'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                'description' => 'Charmant appartement de 70 m² situé dans le centre-ville de Rabat. Il dispose de 2 chambres, un salon lumineux, et une cuisine équipée. Idéal pour les professionnels ou étudiants.',
                'disponibilite' => true,
                'type' => 'Appartement',
                'condition' => 'Loyer mensuel de 4500 MAD, 1 mois de caution.',
                'adresse' => 'Rabat, Centre-ville, Avenue Hassan II',
                'admin_id' => 3,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Étudiant',
                "ville"=>"Rabat"

            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Appartement à Tanger, plage',
                'localisation' => 'Tanger, Plage',
                'prixParMois' => 7000,
                'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                'description' => 'Appartement de 80 m² à proximité de la plage. Il offre une belle vue sur la mer, 2 chambres, un salon, une cuisine moderne, et une grande terrasse. Parfait pour les amoureux de la mer.',
                'disponibilite' => true,
                'type' => 'Appartement',
                'condition' => 'Loyer mensuel de 7000 MAD, 1 mois de caution.',
                'adresse' => 'Tanger, Plage, Rue de la Mer',
                'admin_id' => 4,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Célibataire',
                "ville"=>"Tanger"
            ],

            // Villa
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Villa de luxe à Marrakech',
                'localisation' => 'Marrakech, Palmeraie',
                'prixParMois' => 15000,
                'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                'description' => 'Villa spacieuse de 300 m² située dans la Palmeraie, avec une piscine privée et un grand jardin. Elle dispose de 4 chambres, un salon majestueux, une cuisine équipée et un garage. Idéale pour les grandes familles.',
                'disponibilite' => true,
                'type' => 'Villa',
                'condition' => 'Loyer mensuel de 15000 MAD, 2 mois de caution.',
                'adresse' => 'Marrakech, Palmeraie, Route de l\'Ourika',
                'admin_id' => 1,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Famille',
                "ville"=>"Marrakech"
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Villa avec jardin à Fès',
                'localisation' => 'Fès, Ville Nouvelle',
                'prixParMois' => 12000,
                'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                'description' => 'Grande villa de 250 m² avec un jardin luxuriant. Elle comprend 5 chambres, un salon spacieux, une cuisine moderne et un garage. Idéale pour une famille nombreuse.',
                'disponibilite' => true,
                'type' => 'Villa',
                'condition' => 'Loyer mensuel de 12000 MAD, contrat de 1 an.',
                'adresse' => 'Fès, Ville Nouvelle, Rue des Roses',
                'admin_id' => 2,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Famille',
                "ville"=>"Fès"
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Villa avec piscine à Agadir',
                'localisation' => 'Agadir, Tamraght',
                'prixParMois' => 14000,
                'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                'description' => 'Villa de 280 m² avec piscine privée et jardin. Elle comprend 4 chambres, un salon moderne, une salle à manger et une cuisine équipée. Parfaitement située à Agadir.',
                'disponibilite' => true,
                'type' => 'Villa',
                'condition' => 'Loyer mensuel de 14000 MAD, 1 mois de caution.',
                'adresse' => 'Agadir, Tamraght, Avenue de la Plage',
                'admin_id' => 3,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Famille',
                "ville"=>"Agadir"
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Villa moderne à Essaouira',
                'localisation' => 'Essaouira, Centre-ville',
                'prixParMois' => 10000,
                'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
                'description' => 'Villa moderne de 200 m² à Essaouira, située à proximité de la plage. Elle offre 3 chambres, un salon spacieux et une grande terrasse. L\'idéal pour une location de vacances.',
                'disponibilite' => true,
                'type' => 'Villa',
                'condition' => 'Loyer mensuel de 10000 MAD, 1 mois de caution.',
                'adresse' => 'Essaouira, Centre-ville, Rue des Mouettes',
                'admin_id' => 4,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Tout',
                'ville' => 'Essaouira'
            ],

            // Bureau
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Bureau moderne à Rabat, centre-ville',
                'localisation' => 'Rabat, Agdal',
                'prixParMois' => 8000,
                'imgs' => json_encode($this->getRandomImages('Bureau')),
                'description' => 'Bureau de 80 m² situé au cœur d\'Agdal, avec un espace ouvert, une salle de réunion et des équipements modernes. Idéal pour une startup ou un professionnel.',
                'disponibilite' => true,
                'type' => 'Bureau',
                'condition' => 'Loyer mensuel de 8000 MAD, dépôt de garantie de 1 mois.',
                'adresse' => 'Rabat, Agdal, Avenue Mohammed V',
                'admin_id' => 5,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Fonctionnaire',
                'ville' => 'Rabat'
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Bureau spacieux à Casablanca, Maarif',
                'localisation' => 'Casablanca, Maarif',
                'prixParMois' => 10000,
                'imgs' =>json_encode($this->getRandomImages('Bureau')),
                'description' => 'Bureau de 100 m² au cœur de Casablanca, bien situé dans un quartier d\'affaires. Parfait pour les entreprises recherchant un environnement professionnel.',
                'disponibilite' => true,
                'type' => 'Bureau',
                'condition' => 'Loyer mensuel de 10000 MAD, 1 mois de caution.',
                'adresse' => 'Casablanca, Maarif, Rue Al Massira',
                'admin_id' => 6,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Fonctionnaire',
                'ville' => 'Casablanca'
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Bureau à Tanger, centre commercial',
                'localisation' => 'Tanger, Centre-ville',
                'prixParMois' => 12000,
                'imgs' => json_encode($this->getRandomImages('Bureau')),
                'description' => 'Bureau de 90 m² dans un centre commercial à Tanger. Il est situé à proximité des commerces et bien desservi par les transports publics.',
                'disponibilite' => true,
                'type' => 'Bureau',
                'condition' => 'Loyer mensuel de 12000 MAD, dépôt de garantie.',
                'adresse' => 'Tanger, Centre-ville, Boulevard Mohamed V',
                'admin_id' => 7,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Fonctionnaire',
                'ville' => 'Tanger'
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Bureau à Marrakech, Hivernage',
                'localisation' => 'Marrakech, Hivernage',
                'prixParMois' => 15000,
                'imgs' => json_encode($this->getRandomImages('Bureau')),
                'description' => 'Bureau moderne et lumineux de 150 m², situé dans le quartier d\'Hivernage. Idéal pour une entreprise de taille moyenne, avec des équipements haut de gamme.',
                'disponibilite' => true,
                'type' => 'Bureau',
                'condition' => 'Loyer mensuel de 15000 MAD, contrat de 1 an.',
                'adresse' => 'Marrakech, Hivernage, Avenue Mohammed VI',
                'admin_id' => 8,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Fonctionnaire',
                'ville' => 'Marrakech'
            ],
            
            // Magasin
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Magasin commercial à Tanger',
                'localisation' => 'Tanger, Centre-ville',
                'prixParMois' => 10000,
                'imgs' => json_encode($this->getRandomImages('Magasin')),
                'description' => 'Magasin de 120 m² en plein centre de Tanger, idéal pour un commerce ou une boutique. L\'emplacement est stratégique avec une forte affluence.',
                'disponibilite' => true,
                'type' => 'Magasin',
                'condition' => 'Loyer mensuel de 10000 MAD, 1 mois de caution.',
                'adresse' => 'Tanger, Centre-ville, Rue Hassan II',
                'admin_id' => 2,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Tout',
                'ville' => 'Tanger'
            ],
            // Entrepôt
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Dépôt à Casablanca, zone industrielle',
                'localisation' => 'Casablanca, Zone Industrielle',
                'prixParMois' => 25000,
                'imgs' =>json_encode($this->getRandomImages('Depot')),
                'description' => 'Entrepôt spacieux de 500 m² situé dans la zone industrielle de Casablanca. Il est bien ventilé et facilement accessible aux poids lourds.',
                'disponibilite' => true,
                'type' => 'Dépôt',
                'condition' => 'Loyer mensuel de 25000 MAD, 2 mois de caution.',
                'adresse' => 'Casablanca, Zone Industrielle, Rue des Usines',
                'admin_id' => 3,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Tout',
                'ville' => 'Casablanca'
            ],
            //Boutique
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Boutique à Marrakech',
                'localisation' => 'Marrakech, Hivernage',
                'prixParMois' => 50000,
                'imgs' => json_encode($this->getRandomImages('Boutique')),
                'description' => 'Grand Boutique de 600 m² situé à Hivernage, idéal pour les grandes enseignes et les marques de luxe. Il comprend plusieurs magasins, espaces de restauration et parkings.',
                'disponibilite' => true,
                'type' => 'Boutique',
                'condition' => 'Loyer mensuel de 50000 MAD, 3 mois de caution.',
                'adresse' => 'Marrakech, Hivernage, Avenue Mohammed VI',
                'admin_id' => 3,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Tout',
                'ville' => 'Marrakech'
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Boutique  à Casablanca, Maarif',
                'localisation' => 'Casablanca, Maarif',
                'prixParMois' => 70000,
                'imgs' =>json_encode($this->getRandomImages('Boutique')),
                'description' => 'Boutique  moderne de 3000 m² dans le quartier Maarif à Casablanca. Parfait pour des enseignes internationales.',
                'disponibilite' => true,
                'type' => 'Boutique ',
                'condition' => 'Loyer mensuel de 70000 MAD, 3 mois de caution.',
                'adresse' => 'Casablanca, Maarif',
                'admin_id' => 2,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Tout',
                'ville' => 'Casablanca'
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Boutique  à Rabat, Agdal',
                'localisation' => 'Rabat, Agdal',
                'prixParMois' => 80000,
                'imgs' =>json_encode($this->getRandomImages('Boutique')),
                'description' => 'Boutique  haut de gamme à Agdal, Rabat, avec des espaces de luxe et de nombreuses marques internationales.',
                'disponibilite' => true,
                'type' => 'Boutique ',
                'condition' => 'Loyer mensuel de 80000 MAD, 3 mois de caution.',
                'adresse' => 'Rabat, Agdal, Avenue Mohammed V',
                'admin_id' => 1,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Tout',
                'ville' => 'Rabat'
            ],
            [
                'loueur_id' => rand(1, 25),
                'titre' => 'Boutique  à Tanger, Zone touristique',
                'localisation' => 'Tanger, Zone Touristique',
                'prixParMois' => 60000,
                'imgs' => json_encode($this->getRandomImages('Boutique')),
                'description' => 'Boutique  de 1500 m², parfait pour les marques de luxe et les grandes enseignes touristiques.',
                'disponibilite' => true,
                'type' => 'Boutique ',
                'condition' => 'Loyer mensuel de 60000 MAD, 3 mois de caution.',
                'adresse' => 'Tanger, Zone Touristique',
                'admin_id' => 3,
                'surface' => rand(40, 300),
                'nbrChambre' => rand(1, 6),
                'typesLocaires' => 'Tout',
                'ville' => 'Tanger'
            ]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement à Casablanca, Ain Diab',
    'localisation' => 'Casablanca, Ain Diab',
    'prixParMois' => 15000,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => "Appartement de 120 m² à Ain Diab, avec une vue magnifique sur l'océan, 3 chambres, salon spacieux, et une terrasse privée.",
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 15000 MAD, 2 mois de caution.',
    'adresse' => 'Casablanca, Ain Diab',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Casablanca'
],

[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement à Marrakech, Gueliz',
    'localisation' => 'Marrakech, Gueliz',
    'prixParMois' => 10000,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement de 90 m² à Gueliz, à proximité des commerces et restaurants. Il comprend 2 chambres, 2 salles de bains et un balcon.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 10000 MAD, 1 mois de caution.',
    'adresse' => 'Marrakech, Gueliz',
    'admin_id' => 1,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Fonctionnaire',
    'ville' => 'Marrakech'
],

[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement à Rabat, Hay Riad',
    'localisation' => 'Rabat, Hay Riad',
    'prixParMois' => 12000,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement de 110 m² dans le quartier calme de Hay Riad. Il offre 3 chambres, un salon lumineux, et une cuisine équipée.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 12000 MAD, 2 mois de caution.',
    'adresse' => 'Rabat, Hay Riad',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Étudiant',
    'ville' => 'Rabat'
],

[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement à Tanger, Centre Ville',
    'localisation' => 'Tanger, Centre Ville',
    'prixParMois' => 8000,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement de 70 m², 2 chambres, dans un immeuble moderne à Tanger. Très bien situé, proche des commerces et des transports.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 8000 MAD, 1 mois de caution.',
    'adresse' => 'Tanger, Centre Ville',
    'admin_id' => 1,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Célibataire',
    'ville' => 'Tanger'
],

[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement à Fès, Ville Nouvelle',
    'localisation' => 'Fès, Ville Nouvelle',
    'prixParMois' => 9500,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement de 85 m² avec 2 chambres et un grand salon. Parfaitement situé dans le quartier Ville Nouvelle.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 9500 MAD, 2 mois de caution.',
    'adresse' => 'Fès, Ville Nouvelle',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Fonctionnaire',
    'ville' => 'Fès'
]
,[
    'loueur_id' => rand(1, 25),
    'titre' => 'Espace commercial à Boujdour',
    'localisation' => 'Boujdour',
    'prixParMois' => 25000,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Espace commercial dans un Boutique avec des enseignes de renommée. Parfait pour un commerce de détail.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => 'Loyer mensuel de 25000 MAD, 3 mois de caution.',
    'adresse' => 'Boujdour, Boutique Al-Nour',
    'admin_id' => 14,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Laâyoune, Quartier Sidi Abderrahmane',
    'localisation' => 'Laâyoune',
    'prixParMois' => 1500,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage privé de 20 m² pour un ou deux véhicules, situé dans un quartier résidentiel calme.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 1500 MAD, 1 mois de caution.',
    'adresse' => 'Laâyoune, Quartier Sidi Abderrahmane',
    'admin_id' => 16,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Dépôt à Guelmim',
    'localisation' => 'Guelmim',
    'prixParMois' => 10000,
    'imgs' =>  json_encode($this->getRandomImages('Depot')),
    'description' => 'Dépôt de 150 m², avec un accès facile et sécurisé. Idéal pour le stockage ou une petite entreprise industrielle.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Loyer mensuel de 10000 MAD, 1 mois de caution.',
    'adresse' => 'Guelmim, Zone Industrielle',
    'admin_id' => 12,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Magasin à Dakhla, centre-ville',
    'localisation' => 'Dakhla',
    'prixParMois' => 15000,
    'imgs' => json_encode($this->getRandomImages('Magasin')),
    'description' => 'Magasin de 80 m² avec vitrine et emplacement stratégique dans le centre-ville de Dakhla.',
    'disponibilite' => true,
    'type' => 'Magasin',
    'condition' => 'Loyer mensuel de 15000 MAD, 2 mois de caution.',
    'adresse' => 'Dakhla, Avenue Mohammed V',
    'admin_id' => 10,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Dakhla'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Bureau spacieux à Tantan',
    'localisation' => 'Tantan',
    'prixParMois' => 7000,
    'imgs' => json_encode($this->getRandomImages('Bureau')),
    'description' => 'Bureau de 50 m² avec plusieurs postes de travail, idéal pour une petite entreprise ou une startup.',
    'disponibilite' => true,
    'type' => 'Bureau',
    'condition' => 'Loyer mensuel de 7000 MAD, 1 mois de caution.',
    'adresse' => 'Tantan, Centre Ville',
    'admin_id' => 8,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Tantan'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio moderne à Laâyoune',
    'localisation' => 'Laâyoune',
    'prixParMois' => 3500,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio de 30 m² avec une vue magnifique sur la ville. Idéal pour un étudiant ou un jeune professionnel.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => 'Loyer mensuel de 3500 MAD, 1 mois de caution.',
    'adresse' => 'Laâyoune, Quartier Al-Matar',
    'admin_id' => 6,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,

[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison avec jardin à Boujdour',
    'localisation' => 'Boujdour',
    'prixParMois' => 12000,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Maison spacieuse avec 3 chambres, un grand jardin et un garage. Idéale pour une famille. Située à Boujdour.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 12000 MAD, 2 mois de caution.',
    'adresse' => 'Boujdour, Quartier Al-Wahda',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Villa luxueuse à Boujdour',
    'localisation' => 'Boujdour, Plage Oum Lajoul',
    'prixParMois' => 15000,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Villa de luxe avec piscine privée, 4 chambres et un grand jardin, située à Boujdour, Plage Oum Lajoul.',
    'disponibilite' => true,
    'type' => 'Villa',
    'condition' => 'Loyer mensuel de 15000 MAD, 3 mois de caution.',
    'adresse' => 'Boujdour, Plage Oum Lajoul',
    'admin_id' => 1,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Boujdour'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Villa avec jardin à Laayoun',
    'localisation' => 'Laayoun, Quartier Al Fajr',
    'prixParMois' => 13000,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Villa spacieuse avec jardin et 5 chambres à Laayoun, Quartier Al Fajr.',
    'disponibilite' => true,
    'type' => 'Villa',
    'condition' => 'Loyer mensuel de 13000 MAD, 2 mois de caution.',
    'adresse' => 'Laayoun, Quartier Al Fajr',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Laayoun'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Villa moderne à Tantan',
    'localisation' => 'Tantan, Avenue Hassan II',
    'prixParMois' => 14000,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Villa moderne avec piscine et terrasse à Tantan, idéale pour les réceptions.',
    'disponibilite' => true,
    'type' => 'Villa',
    'condition' => 'Loyer mensuel de 14000 MAD, 2 mois de caution.',
    'adresse' => 'Tantan, Avenue Hassan II',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Tantan'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Villa familiale à Dhakla',
    'localisation' => 'Dhakla, Quartier Hassan II',
    'prixParMois' => 12000,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Villa familiale avec 3 chambres, jardin et garage à Dhakla.',
    'disponibilite' => true,
    'type' => 'Villa',
    'condition' => 'Loyer mensuel de 12000 MAD, 2 mois de caution.',
    'adresse' => 'Dhakla, Quartier Hassan II',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Dhakla'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Villa avec vue sur mer à Glemim',
    'localisation' => 'Glemim, Quartier de la Mer',
    'prixParMois' => 16000,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Villa avec une magnifique vue sur la mer, offrant 4 chambres et un grand salon à Glemim.',
    'disponibilite' => true,
    'type' => 'Villa',
    'condition' => 'Loyer mensuel de 16000 MAD, 3 mois de caution.',
    'adresse' => 'Glemim, Quartier de la Mer',
    'admin_id' => 5,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Glemim'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement moderne à Boujdour',
    'localisation' => 'Boujdour, Quartier Plage',
    'prixParMois' => 8500,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement moderne de 90 m² avec 2 chambres et un grand salon, situé à Boujdour, Quartier Plage.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 8500 MAD, 2 mois de caution.',
    'adresse' => 'Boujdour, Quartier Plage',
    'admin_id' => 1,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Boujdour'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement spacieux à Laayoun',
    'localisation' => 'Laayoun, Centre Ville',
    'prixParMois' => 7500,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement spacieux avec 3 chambres à coucher et un grand balcon à Laayoun, Centre Ville.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 7500 MAD, 2 mois de caution.',
    'adresse' => 'Laayoun, Centre Ville',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Laayoun'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement de luxe à Tantan',
    'localisation' => 'Tantan, Avenue Mohamed V',
    'prixParMois' => 10000,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement de luxe de 110 m² à Tantan, offrant une vue imprenable sur la mer et une cuisine équipée.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 10000 MAD, 3 mois de caution.',
    'adresse' => 'Tantan, Avenue Mohamed V',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Célibataire',
    'ville' => 'Tantan'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement cosy à Dhakla',
    'localisation' => 'Dhakla, Quartier Touristique',
    'prixParMois' => 9500,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement cosy de 85 m² avec 2 chambres et un balcon à Dhakla, Quartier Touristique.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 9500 MAD, 2 mois de caution.',
    'adresse' => 'Dhakla, Quartier Touristique',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Célibataire',
    'ville' => 'Dhakla'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Appartement à Glemim',
    'localisation' => 'Glemim, Rue de la Liberté',
    'prixParMois' => 7000,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Appartement pratique avec 2 chambres, idéal pour une petite famille à Glemim.',
    'disponibilite' => true,
    'type' => 'Appartement',
    'condition' => 'Loyer mensuel de 7000 MAD, 1 mois de caution.',
    'adresse' => 'Glemim, Rue de la Liberté',
    'admin_id' => 5,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Célibataire',
    'ville' => 'Glemim'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison à Boujdour, Quartier Al-Madina',
    'localisation' => 'Boujdour',
    'prixParMois' => 8000,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison spacieuse de 130 m² avec 3 chambres, un grand salon, une cuisine équipée, et un jardin. Idéale pour une famille.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 8000 MAD, 1 mois de caution.',
    'adresse' => 'Boujdour, Quartier Al-Madina',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Boujdour'
]
,[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison à Laâyoune, proche du centre-ville',
    'localisation' => 'Laâyoune',
    'prixParMois' => 8500,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison moderne de 145 m² avec 4 chambres, une terrasse, un salon spacieux et une cuisine équipée.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 8500 MAD, 2 mois de caution.',
    'adresse' => 'Laâyoune, Quartier Hay Riad',
    'admin_id' => 14,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Laâyoune'
]
,[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison familiale à Boujdour',
    'localisation' => 'Boujdour',
    'prixParMois' => 7800,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison de 130 m² avec 3 chambres à coucher, un grand salon, un balcon, et un garage. Située à proximité des écoles et des magasins.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 7800 MAD, 1 mois de caution.',
    'adresse' => 'Boujdour, Quartier Al-Moulay Ismail',
    'admin_id' => 12,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Boujdour'
]
,[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison moderne à Dakhla',
    'localisation' => 'Dakhla',
    'prixParMois' => 9500,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison de 160 m² avec 5 chambres, un grand salon lumineux, une cuisine moderne, un jardin et un garage privé.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 9500 MAD, 1 mois de caution.',
    'adresse' => 'Dakhla, Quartier Al-Nour',
    'admin_id' => 10,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Dakhla'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison de campagne à Guelmim',
    'localisation' => 'Guelmim',
    'prixParMois' => 6500,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison de campagne de 140 m² avec 4 chambres, un salon traditionnel marocain, un grand jardin, et une vue magnifique sur la nature.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 6500 MAD, 1 mois de caution.',
    'adresse' => 'Guelmim, Zone rurale',
    'admin_id' => 8,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison à Tantan, zone résidentielle',
    'localisation' => 'Tantan',
    'prixParMois' => 7500,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison moderne de 120 m² avec 3 chambres, 2 salles de bain, un grand salon, et un petit jardin. Quartier sécurisé.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 7500 MAD, 2 mois de caution.',
    'adresse' => 'Tantan, Quartier Al-Nassim',
    'admin_id' => 6,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Tantan'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison à Laâyoune, Quartier Al-Fath',
    'localisation' => 'Laâyoune',
    'prixParMois' => 10000,
    'imgs' =>json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison de 150 m² avec 4 chambres, un salon spacieux, un garage, et un grand jardin. Très bien située dans un quartier calme.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 10000 MAD, 1 mois de caution.',
    'adresse' => 'Laâyoune, Quartier Al-Fath',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Maison à Boujdour, Quartier Al-Madina',
    'localisation' => 'Boujdour',
    'prixParMois' => 8000,
    'imgs' => json_encode($this->getRandomImages('Appartement--Villa--Maison')),
    'description' => 'Maison spacieuse de 130 m² avec 3 chambres, un grand salon, une cuisine équipée, et un jardin. Idéale pour une famille.',
    'disponibilite' => true,
    'type' => 'Maison',
    'condition' => 'Loyer mensuel de 8000 MAD, 1 mois de caution.',
    'adresse' => 'Boujdour, Quartier Al-Madina',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Famille',
    'ville' => 'Boujdour'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Boujdour, Centre-ville',
    'localisation' => 'Boujdour',
    'prixParMois' => 1500,
    'imgs' =>json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage privé de 30 m², idéal pour une voiture ou un petit espace de stockage. Situé au centre-ville.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 1500 MAD.',
    'adresse' => 'Boujdour, Centre-ville',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Tantan, Proche du Marché',
    'localisation' => 'Tantan',
    'prixParMois' => 1800,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage privé de 35 m² avec accès facile. Idéal pour stockage ou garage pour véhicule.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 1800 MAD.',
    'adresse' => 'Tantan, Proche du Marché',
    'admin_id' => 7,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Tantan'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Laâyoune, Quartier Al-Fath',
    'localisation' => 'Laâyoune',
    'prixParMois' => 2000,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage fermé de 40 m² avec porte sécurisée. Idéal pour une voiture ou des objets personnels.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 2000 MAD.',
    'adresse' => 'Laâyoune, Quartier Al-Fath',
    'admin_id' => 5,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Tantan, Près du Port',
    'localisation' => 'Tantan',
    'prixParMois' => 1700,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage de 40 m² situé près du port de Tantan. Parfait pour un bateau ou un véhicule de grande taille.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 1700 MAD.',
    'adresse' => 'Tantan, Près du Port',
    'admin_id' => 17,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Tantan'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Laâyoune, Près de la Plage',
    'localisation' => 'Laâyoune',
    'prixParMois' => 2500,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage fermé de 45 m², avec accès sécurisé, idéal pour une voiture de luxe ou stockage.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 2500 MAD.',
    'adresse' => 'Laâyoune, Près de la Plage',
    'admin_id' => 15,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Boujdour, Zone Industrielle',
    'localisation' => 'Boujdour',
    'prixParMois' => 1300,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage de 30 m², sécurisé avec porte en métal. Idéal pour véhicules ou stockage.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 1300 MAD.',
    'adresse' => 'Boujdour, Zone Industrielle',
    'admin_id' => 13,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Dakhla, Quartier Al-Madina',
    'localisation' => 'Dakhla',
    'prixParMois' => 2200,
    'imgs' => json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage sécurisé de 50 m², idéal pour une voiture, une moto, ou un espace de stockage.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 2200 MAD.',
    'adresse' => 'Dakhla, Quartier Al-Madina',
    'admin_id' => 11,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Dakhla'
]
,[
    'loueur_id' => rand(1, 25),
    'titre' => 'Garage à Tantan, Quartier Souk Al Jumaâ',
    'localisation' => 'Tantan',
    'prixParMois' => 1700,
    'imgs' =>json_encode($this->getRandomImages('Garage')),
    'description' => 'Garage de 40 m² situé près du souk de Tantan. Parfait pour un véhicule ou du stockage.',
    'disponibilite' => true,
    'type' => 'Garage',
    'condition' => 'Loyer mensuel de 1700 MAD.',
    'adresse' => 'Tantan, Quartier Souk Al Jumaâ',
    'admin_id' => 17,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Tantan'
]
,[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio à Boujdour, Hay Al Wifaq',
    'localisation' => 'Boujdour',
    'prixParMois' => 1900,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Charmant studio de 25 m² bien éclairé avec cuisine ouverte. Idéal pour une personne seule.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => "1 mois d'avance, 1 mois de caution.",
    'adresse' => 'Boujdour, Hay Al Wifaq',
    'admin_id' => 2,
    'surface' => rand(40, 300),
    'nbrChambre' => rand(1, 6),
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio moderne à Laâyoune, Quartier Al Qods',
    'localisation' => 'Laâyoune',
    'prixParMois' => 2100,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio rénové de 30 m² avec balcon et vue dégagée. Quartier calme et sécurisé.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => '2 mois de caution requis.',
    'adresse' => 'Laâyoune, Quartier Al Qods',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio à Tantan, Hay Nahda',
    'localisation' => 'Tantan',
    'prixParMois' => 1500,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Petit studio meublé de 20 m² proche des commerces. Parfait pour étudiant.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => "Paiement mensuel exigé à l'avance.",
    'adresse' => 'Tantan, Hay Nahda',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Tantan'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio bien équipé à Guelmim, Riad Al Massira',
    'localisation' => 'Guelmim',
    'prixParMois' => 1800,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio avec coin cuisine, salle de bain privée, dans un immeuble sécurisé.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => "1 mois d'avance + 1 mois de garantie.",
    'adresse' => 'Guelmim, Riad Al Massira',
    'admin_id' => 5,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio à Dakhla, Quartier Al-Matar',
    'localisation' => 'Dakhla',
    'prixParMois' => 2300,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio lumineux avec terrasse, idéal pour jeune couple ou professionnel.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => 'Loyer mensuel fixe avec 2 mois de dépôt.',
    'adresse' => 'Dakhla, Quartier Al-Matar',
    'admin_id' => 6,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Dakhla'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio simple à Boujdour, Hay Al Amal',
    'localisation' => 'Boujdour',
    'prixParMois' => 1400,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio calme, entrée indépendante, cuisine américaine, salle de bain moderne.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => 'Loyer à verser chaque début de mois.',
    'adresse' => 'Boujdour, Hay Al Amal',
    'admin_id' => 7,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio à Laâyoune, Miftah Hay Salam',
    'localisation' => 'Laâyoune',
    'prixParMois' => 2000,
    'imgs' =>json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio de 28 m² refait à neuf, dans un immeuble familial. Quartier vivant.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => "2 mois de caution + frais d'agence.",
    'adresse' => 'Laâyoune, Miftah Hay Salam',
    'admin_id' => 8,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio à Laâyoune, Miftah Hay Salam',
    'localisation' => 'Laâyoune',
    'prixParMois' => 2000,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio de 28 m² refait à neuf, dans un immeuble familial. Quartier vivant.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => "2 mois de caution + frais d'agence.",
    'adresse' => 'Laâyoune, Miftah Hay Salam',
    'admin_id' => 8,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Studio meublé à Guelmim, Hay Al Wahda',
    'localisation' => 'Guelmim',
    'prixParMois' => 1700,
    'imgs' => json_encode($this->getRandomImages('Studio')),
    'description' => 'Studio entièrement meublé avec lit double, placards et petite cuisine équipée.',
    'disponibilite' => true,
    'type' => 'Studio',
    'condition' => 'Paiement mensuel + dépôt de garantie requis.',
    'adresse' => 'Guelmim, Hay Al Wahda',
    'admin_id' => 9,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Boutique à louer à Boujdour, Hay Nahda',
    'localisation' => 'Boujdour',
    'prixParMois' => 3200,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Local commercial de 30 m² idéal pour salon de coiffure ou petite épicerie.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => 'Contrat annuel avec 2 mois de caution.',
    'adresse' => 'Boujdour, Hay Nahda',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Boutique à Laâyoune, Boulevard Mekka',
    'localisation' => 'Laâyoune',
    'prixParMois' => 5000,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Boutique de 45 m² située sur un boulevard très fréquenté, parfaite pour prêt-à-porter.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => "Loyer payable chaque 3 mois, 1 mois d'avance.",
    'adresse' => 'Laâyoune, Boulevard Mekka',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
],

[
    'loueur_id' => rand(1, 25),
    'titre' => 'Local commercial à Tantan, Hay Al Massira',
    'localisation' => 'Tantan',
    'prixParMois' => 2700,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Local de 25 m² au cœur du quartier, idéal pour service télécom ou librairie.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => '2 mois de garantie + loyer mensuel.',
    'adresse' => 'Tantan, Hay Al Massira',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Tantan'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Boutique rénovée à Dakhla, Quartier Al Fath',
    'localisation' => 'Dakhla',
    'prixParMois' => 4500,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Espace commercial rénové avec vitrine, sol carrelé, parfait pour agence.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => 'Bail de 1 an minimum, 2 mois de caution.',
    'adresse' => 'Dakhla, Quartier Al Fath',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Dakhla'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Magasin à Guelmim, Hay Al Amal',
    'localisation' => 'Guelmim',
    'prixParMois' => 3800,
    'imgs' =>json_encode($this->getRandomImages('Boutique')),
    'description' => 'Magasin de 35 m² dans une rue commerçante, équipé de volet métallique.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => "Paiement mensuel + frais d'entretien partagés.",
    'adresse' => 'Guelmim, Hay Al Amal',
    'admin_id' => 5,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Boutique à Boujdour, Hay Salam',
    'localisation' => 'Boujdour',
    'prixParMois' => 2950,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Espace de vente de 28 m², idéal pour alimentation ou téléboutique.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => '1 an minimum, avec dépôt de garantie.',
    'adresse' => 'Boujdour, Hay Salam',
    'admin_id' => 6,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Local à usage commercial à Laâyoune, Hay Moulay Rachid',
    'localisation' => 'Laâyoune',
    'prixParMois' => 4300,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Très bon emplacement pour un commerce de proximité. Surface de 40 m².',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => "2 mois d'avance, bail signé chez notaire.",
    'adresse' => 'Laâyoune, Hay Moulay Rachid',
    'admin_id' => 7,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Boutique fonctionnelle à Guelmim, Quartier Tantan Road',
    'localisation' => 'Guelmim',
    'prixParMois' => 3600,
    'imgs' => json_encode($this->getRandomImages('Boutique')),
    'description' => 'Boutique de coin avec double façade, bon éclairage naturel.',
    'disponibilite' => true,
    'type' => 'Boutique',
    'condition' => 'Paiement anticipé chaque trimestre.',
    'adresse' => 'Guelmim, Quartier Tantan Road',
    'admin_id' => 8,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Dépôt sécurisé à Boujdour, Zone Industrielle',
    'localisation' => 'Boujdour',
    'prixParMois' => 6500,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Dépôt de 120 m² avec grande porte métallique et accès camion.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => '1 an de bail + 2 mois de caution.',
    'adresse' => 'Boujdour, Zone Industrielle',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Grand dépôt à Laâyoune, Route de Smara',
    'localisation' => 'Laâyoune',
    'prixParMois' => 8500,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Surface de 200 m² avec électricité industrielle et sol renforcé.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Contrat notarié, minimum 1 an.',
    'adresse' => 'Laâyoune, Route de Smara',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Hangar de stockage à Tantan, Zone Logistique',
    'localisation' => 'Tantan',
    'prixParMois' => 4900,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Dépôt propre et aéré, parfait pour stockage marchandises générales.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Loyer trimestriel, 1 mois de caution.',
    'adresse' => 'Tantan, Zone Logistique',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Tantan'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Dépôt industriel à Dakhla, Quartier Tawarta',
    'localisation' => 'Dakhla',
    'prixParMois' => 9100,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Local couvert de 180 m² avec éclairage naturel et ventilation.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Bail 12 mois minimum avec garantie bancaire.',
    'adresse' => 'Dakhla, Quartier Tawarta',
    'admin_id' => 5,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Dakhla'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Entrepôt à Guelmim, Zone Saharienne',
    'localisation' => 'Guelmim',
    'prixParMois' => 7300,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Espace spacieux pour stockage de matériaux de construction.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Contrat simple avec versement annuel.',
    'adresse' => 'Guelmim, Zone Saharienne',
    'admin_id' => 6,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Local de dépôt à Boujdour, Hay Salam',
    'localisation' => 'Boujdour',
    'prixParMois' => 4000,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Petite unité de 60 m², bien sécurisée avec portail métallique.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => "2 mois d'avance, sans engagement long terme.",
    'adresse' => 'Boujdour, Hay Salam',
    'admin_id' => 7,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Boujdour'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Espace industriel à Laâyoune, Avenue 24 Novembre',
    'localisation' => 'Laâyoune',
    'prixParMois' => 7800,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Très bon accès routier, grande capacité de stockage intérieur.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Paiement semestriel.',
    'adresse' => 'Laâyoune, Avenue 24 Novembre',
    'admin_id' => 8,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Laâyoune'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Grand entrepôt à Guelmim, Route de Tata',
    'localisation' => 'Guelmim',
    'prixParMois' => 8800,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Dépôt moderne avec plafond haut, accès poids lourds.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Engagement de 2 ans, bail notarié.',
    'adresse' => 'Guelmim, Route de Tata',
    'admin_id' => 9,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Guelmim'
]
,
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Dépôt moderne à Rabat, Hay Ryad',
    'localisation' => 'Rabat',
    'prixParMois' => 9800,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Dépôt spacieux de 180 m² avec accès sécurisé 24/7.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Loyer mensuel, 3 mois de garantie.',
    'adresse' => 'Rabat, Hay Ryad',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Rabat'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Petit entrepôt à Rabat, Agdal',
    'localisation' => 'Rabat',
    'prixParMois' => 6500,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Local de 90 m² pour stockage matériel léger.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Engagement 6 mois minimum.',
    'adresse' => 'Rabat, Agdal',
    'admin_id' => 2,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Rabat'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Dépôt à louer à Rabat, Yacoub El Mansour',
    'localisation' => 'Rabat',
    'prixParMois' => 7200,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Accès facile aux camions, zone semi-industrielle.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Caution de 2 mois requise.',
    'adresse' => 'Rabat, Yacoub El Mansour',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Rabat'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Espace de stockage à Rabat, Route de Zaer',
    'localisation' => 'Rabat',
    'prixParMois' => 8700,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Entrepôt bien ventilé avec éclairage naturel.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Paiement annuel obligatoire.',
    'adresse' => 'Rabat, Route de Zaer',
    'admin_id' => 3,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Rabat'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Grand dépôt à Marrakech, Sidi Ghanem',
    'localisation' => 'Marrakech',
    'prixParMois' => 9900,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Zone industrielle active avec caméras de sécurité.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Contrat notarié de 1 an.',
    'adresse' => 'Marrakech, Sidi Ghanem',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Marrakech'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Entrepôt à Marrakech, Targa',
    'localisation' => 'Marrakech',
    'prixParMois' => 6800,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Local propre de 110 m² avec double accès.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => '2 mois de caution.',
    'adresse' => 'Marrakech, Targa',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Marrakech'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Local industriel à Marrakech, Massira',
    'localisation' => 'Marrakech',
    'prixParMois' => 7200,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Dépôt avec sol renforcé pour matériel lourd.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Loyer trimestriel exigé.',
    'adresse' => 'Marrakech, Massira',
    'admin_id' => 4,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Marrakech'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Dépôt à Marrakech, route de Safi',
    'localisation' => 'Marrakech',
    'prixParMois' => 8100,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Près de la rocade, 160 m² avec toit en tôle.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Bail 1 an minimum.',
    'adresse' => 'Marrakech, Route de Safi',
    'admin_id' => 5,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Marrakech'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Entrepôt à Casablanca, Ain Sebaa',
    'localisation' => 'Casablanca',
    'prixParMois' => 11000,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => '200 m² dans quartier industriel actif.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Contrat annuel renouvelable.',
    'adresse' => 'Casablanca, Ain Sebaa',
    'admin_id' => 6,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Casablanca'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Dépôt à Casablanca, Sidi Maârouf',
    'localisation' => 'Casablanca',
    'prixParMois' => 9700,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Proche autoroute, idéal pour e-commerce.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => '2 mois de dépôt de garantie.',
    'adresse' => 'Casablanca, Sidi Maârouf',
    'admin_id' => 6,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Casablanca'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Local logistique à Casablanca, Derb Ghallef',
    'localisation' => 'Casablanca',
    'prixParMois' => 8800,
    'imgs' => json_encode($this->getRandomImages('Depot')),
    'description' => 'Accès facile au centre-ville, adapté stockage.',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Paiement mensuel ou annuel.',
    'adresse' => 'Casablanca, Derb Ghallef',
    'admin_id' => 7,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Casablanca'
],
[
    'loueur_id' => rand(1, 25),
    'titre' => 'Hangar industriel à Casablanca, Moulay Rachid',
    'localisation' => 'Casablanca',
    'prixParMois' => 9400,
    'imgs' =>json_encode($this->getRandomImages('Depot')),
    'description' => 'Toit haut, ventilation naturelle, 170 m².',
    'disponibilite' => true,
    'type' => 'Dépôt',
    'condition' => 'Engagement 6 mois minimum.',
    'adresse' => 'Casablanca, Moulay Rachid',
    'admin_id' => 7,
    'surface' => rand(40, 300), // أو حسب نوع العقار
    'nbrChambre' => rand(1, 6), // أو حسب نوع العقار
    'typesLocaires' => 'Tout',
    'ville' => 'Casablanca'
],

        ];
        foreach ($posts as $post) {
            Propriete::create($post);
        }
    }
}
