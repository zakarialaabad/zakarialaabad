<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    //
    
    protected $fillable = ['date', 'contenu', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
