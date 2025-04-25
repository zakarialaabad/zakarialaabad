<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    //
    protected $fillable = ['name', 'email', 'password'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function proprietes()
    {
        return $this->hasMany(Propriete::class);
    }
}
