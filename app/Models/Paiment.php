<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiment extends Model
{
    //
    protected $fillable=[
    "locataire_id",
    "montant",
    "date_paiment",
    "status",
    "methodePaiement"
];
    public function locataire()
    {
        return $this->belongsTo(Locataire::class);
    }

}
