<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
class UserSeeder extends Seeder
{
    
    public function run()
    {
        for ($i = 1; $i <= 60; $i++) {
            User::create([
                'name' => 'User' . $i,
                'prenom' => 'Prenom' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => Hash::make('password'),
                'admin_id' => null,
                'telephone' => '06000000' . $i,
                'typeCompte' => $i % 2 == 0 ? 'loueur' : 'locataire',
                'genre' => $i % 2 == 0 ? 'homme' : 'femme',
                'villeChoisie' => 'Ville' . $i,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'social_id' => Str::random(10),
                'social_type' => ['google', 'facebook', 'github'][rand(0, 2)],
            ]);
        }
    }
    
}
