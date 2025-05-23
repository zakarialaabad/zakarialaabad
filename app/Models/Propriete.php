<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propriete extends Model
{
    //
    protected $fillable = [
        'loueur_id', 'titre', 'localisation', 'prixParMois',
        'description', 'disponibilite', 'type', 'nbrchambre',"surface",
        'regles', 'adresse',"imgs","typesLocaires"
    ];
    
    protected $casts = [
        'imgs' => 'array',
        'regles' => 'array',
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
    public function commodites(){
        return $this->belongsToMany(Commodite::class,"Commodites_propreite");
    }
    public function loueur(){
        return $this->belongsTo(Loueur::class);
    }
    public function favoredBy()
{
    return $this->belongsToMany(User::class, 'favorites', 'propriete_id', 'user_id');
}

}
