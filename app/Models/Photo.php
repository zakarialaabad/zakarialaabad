<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    //
    protected $fillable = ['propriete_id', 'path'];

    public function propriete()
    {
        return $this->belongsTo(Propriete::class, 'propriete_id');
    }
}
