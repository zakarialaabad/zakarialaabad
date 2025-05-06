<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Propriete;
class FavorisControler extends Controller
{
    //
    public function favoris()
    {
        $proprietes = Propriete::with('loueur.user')->get();
        return inertia("app/favoris/page", compact("proprietes"));
    }
}