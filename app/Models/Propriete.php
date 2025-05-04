<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propriete extends Model
{
    //
    protected $fillable = [
        'loueur_id', 'titre', 'localisation', 'prixParMois',
        'description', 'disponibilite', 'type', 'caracteristiques',
        'condition', 'adresse'
    ];
    public function photos()
    {
        return $this->hasMany(Photo::class, 'propriete_id');
    }
    public function Notations()
    {
        return $this->hasMany(Notation::class);
    }
        public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
    public function commodite(){
        return $this->hasMany(Commodite::class);
    }
    public function loueur(){
        return $this->belongsTo(Loueur::class);
    }
}
