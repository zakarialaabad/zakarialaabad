<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propriete extends Model
{
    //
    protected $fillable = [
        'loueur_id', 'titre', 'localisation', 'prixParMois',
        'description', 'disponibilite', 'type', 'nbrchambre',"surface",
        'condition', 'adresse',"imgs","typesLocaires"
    ];
    
    protected $casts = [
        'imgs' => 'array',
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
