<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Loueur;


class LoueurSeeder  extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // جلب أول 30 مستخدم نوعهم 'loueur'
        $users = User::where('typeCompte', 'loueur')->take(30)->get();

        foreach ($users as $user) {
            Loueur::create([
                'user_id' => $user->id,
            ]);
        }
    }
}
