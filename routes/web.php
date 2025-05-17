<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\ProprieteContoller;
use App\Http\Controllers\FavoriteController ;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
Route::get("/favoris",[FavoriteController::class,"favoris"]);
Route::post('/favorites/toggle', [FavoriteController::class, 'toggle'])
    ->middleware('auth');
Route::get('/', function () {
    return Inertia::render('app/property/page');
})->name('home');
Route::get('/notifications', function () {
    return Inertia::render('app/notifications/page');
});
Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login')->middleware('guest');
Route::get('/deposer-annonce', function () {
    return Inertia::render('app/deposer-annonce/page');
});
Route::get('/Proprietes/{id}', [ProprieteContoller::class, "show"]);
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

Route::get('/',[ProprieteContoller::class,"index"]);
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
