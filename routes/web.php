<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\ProprieteContoller;

Route::get('/', function () {
    return Inertia::render('app/property/page');
});

Route::get("/favoris",function(){
    return Inertia::render("app/favoris/page");
});

Route::get("/profil",function(){
    return Inertia::render("Profil");
});
Route::get("/filter",function(){
    return Inertia::render("filtrage");
});
Route::get("/discussions",function(){
    return Inertia::render("ChatApp");
});
Route::get("/notification",function(){
    return Inertia::render("not");
});
Route::get("/connexion",function(){
    return Inertia::render("auth-modal");
})->name('connexion');
Route::get('/property/{id}', function ($id) {
    return Inertia::render('app/property/[id]/page', [
        'id' => $id,
        // يمكنك تمرير بيانات إضافية من قاعدة البيانات هنا
    ]);
});
Route::get("/devenir-hote",function(){
    return Inertia::render("app/devenir-hote/page");
});
Route::get("/devenir-hote/verification",function(){
    return Inertia::render("app/devenir-hote/verification/page");
});
Route::get("/devenir-hote/success",function(){
    return Inertia::render("app/devenir-hote/success/page");
});
Route::resource('Proprietes',ProprieteContoller::class)->except("index");
Route::get("auth/google",[SocialiteController::class,"redirectToGoogle"]);
Route::get("auth/google/callback",[SocialiteController::class,"handleGoogleCallback"]);
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::get('/',[ProprieteContoller::class,"index"]);
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
