<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class caracteristique extends Model
{
      protected $fillable = ['constraint'];

    public function packs()
    {
        return $this->belongsToMany(Pake::class, 'caracteristique_pakes');
    }
}
