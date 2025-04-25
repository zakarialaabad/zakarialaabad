<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Louer;
use App\Models\Locataire;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'prenom', 
        'telephone',
        'typeCompte',
        'genre',
        'photo', 
        'villeChoisie',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function locataire()
    {
        return $this->hasOne(Locataire::class);
    }

    public function loueur()
    {
        return $this->hasOne(Loueur::class);
    }
    public function messages()
  {
    return $this->hasMany(Message::class);
  }
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
