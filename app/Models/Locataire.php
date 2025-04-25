<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locataire extends Model
{
    //
    protected $fillable = ['user_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function paiment()
    {
        return $this->hasOne(Paiment::class);
    }
    public function Notations()
    {
        return $this->hasMany(Notation::class);
    }
}
