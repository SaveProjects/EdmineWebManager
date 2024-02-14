<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route pour afficher le formulaire de connexion
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');

// Route pour traiter les données du formulaire de connexion
Route::post('/login', [AuthController::class, 'login']);

