<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pake extends Model
{
    //
    protected $fillable = ['name', 'prix'];

    public function caracteristiques()
    {
        return $this->belongsToMany(Caracteristique::class, 'caracteristique_pakes');
    }
}
