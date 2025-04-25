<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    
    protected $fillable = ['message', 'dateHeure', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
