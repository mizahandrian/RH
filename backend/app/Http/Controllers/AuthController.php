<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 🔍 chercher user
        $user = User::where('name', $request->fullName)->first();

        // ❌ si user pas trouvé
        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur introuvable'
            ], 401);
        }

        // ❌ mauvais mot de passe
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Mot de passe incorrect'
            ], 401);
        }

        // ✅ succès
        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user
        ]);
    }
}