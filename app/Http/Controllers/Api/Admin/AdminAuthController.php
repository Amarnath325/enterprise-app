<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('a_email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->a_password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Purane tokens delete (optional)
        $admin->tokens()->delete();

        $token = $admin->createToken('admin-api')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'admin' => [
                'id' => $admin->a_id,
                'name' => $admin->a_name,
                'email' => $admin->a_email,
                'phone' => $admin->a_phone,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['success' => true]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['admin' => $request->user()]);
    }
}