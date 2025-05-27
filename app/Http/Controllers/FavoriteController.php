<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Propriete;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class FavoriteController extends Controller
{
   
    public function toggle(Request $request)
    {
        $user = Auth::user();
        $propertyId = $request->input('propriete_id');

        if ($user->favorites()->where('propriete_id', $propertyId)->exists()) {
            // Remove from favorites
            $user->favorites()->detach($propertyId);
        } else {
            // Add to favorites
            $user->favorites()->attach($propertyId);
        }

    }
    public function favoris(){  
    $user = Auth::user();
    $properties = Propriete::all();
    $favoriteIds = $user ? $user->favorites()->pluck('propriete_id')->toArray() : [];
    // جلب جميع المفضلات للمستخدم مع بيانات العقار
    return Inertia::render("app/favoris/page",compact('favoriteIds', 'properties' ,"user"));
    }
}
