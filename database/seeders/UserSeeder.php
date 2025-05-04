<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;
use Illuminate\Support\Str; // ← أضف هذا السطر

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 60; $i++) {
            $gender = $faker->randomElement(['men', 'women']);
            $imgNumber = $faker->numberBetween(0, 99);
            $imgUrl = "https://randomuser.me/api/portraits/{$gender}/{$imgNumber}.jpg";

            User::create([
                'name' => $faker->lastName,
                'prenom' => $faker->firstName($gender == 'men' ? 'male' : 'female'),
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'),
                'admin_id' => null,
                'telephone' => $faker->phoneNumber,
                'typeCompte' => $i % 2 == 0 ? 'loueur' : 'locataire',
                'genre' => $gender == 'men' ? 'homme' : 'femme',
                'villeChoisie' => $faker->city,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'social_id' => Str::random(10),
                'social_type' => $faker->randomElement(['google', 'facebook', 'github']),
                'profile' => $imgUrl,
            ]);
        }
    }
}
