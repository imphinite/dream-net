<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Create a new UserController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Register a user.
     */
    public function self(Request $request)
    {
        $user = Auth::user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'avatar' => $user->avatar,
            'email' => $user->email,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at
        ]);
    }
}
