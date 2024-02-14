<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('pseudo', 'password');

        if (Auth::attempt($credentials)) {
            return redirect()->intended('/dashboard'); // Rediriger vers la page de tableau de bord
        }

        return redirect()->back()->withInput($request->only('pseudo'))->withErrors([
            'username' => 'Les informations d\'identification fournies ne sont pas valides.',
        ]);
    }
}
