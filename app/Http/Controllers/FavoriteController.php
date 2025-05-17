<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class FavoriteController extends Controller
{
    public function toggle(Request $request)
    {
        $user = Auth::user();

        $existing = Favorite::where('user_id', $user->id)
            ->where('propriete_id', $request->propriete_id)
            ->first();

        if ($existing) {
            $existing->delete();
            return back()->with('message', 'Removed from favorites');
        } else {
            Favorite::create([
                'user_id' => $user->id,
                'propriete_id' => $request->propriete_id,
            ]);
            return back()->with('message', 'Added to favorites');
        }
    }
    public function favoris(){
        return Inertia::render("/app/favoris/page");
    }
}
