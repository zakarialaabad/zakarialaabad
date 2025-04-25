<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notation extends Model
{
    //
    protected $fillable = ['propriete_id', 'locataire_id', 'note', 'date'];

    public function propriete()
    {
        return $this->belongsTo(Propriete::class);
    }

    public function locataire()
    {
        return $this->belongsTo(Locataire::class);
    }
}
