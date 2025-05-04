<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loueur extends Model
{
        protected $fillable = ["id",'user_id'];
    //
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function Notations()
    {
        return $this->hasMany(Notation::class);
    }
    public function proprietes(){
        return $this->belongsTo(Propriete::class);
    }
}
