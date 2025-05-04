<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Commodite extends Model
{
    //
    protected $fillable=[
        "commodite",
        "categorie",
        "id"
    ];
    public function proprietes(){
        $this->belongsT(Propriete::class);
    }
}
