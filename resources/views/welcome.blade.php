<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'administration d'Edmine Network</title>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
<div class="login-container">
    <h2>Connexion au manager</h2>
    <form action="{{ route('login') }}" method="POST" class="login-form">
        @csrf
        @if ($errors->any())
        <div class="error">
            <ul>
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif
        <div>
            <input type="text" id="pseudo" placeholder="Pseudo" name="pseudo" value="{{ old('pseudo') }}" required>
        </div>
        <div>
            <input type="password" id="password" placeholder="Mot de passe" name="password" required>
        </div>
        <button type="submit">Login</button>
    </form>
</div>
</body>
</html>
