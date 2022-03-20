<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Create a new RegisterController instance.
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Validates user registration fields
     */
    protected function validator(Request $request)
    {
        return Validator::make($request, [
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
    }

    /**
     * Register a user.
     */
    public function register(Request $request)
    {
        // dd($request['username']);

        // Store user in db
        return User::create([
            'name' => $request['username'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);
    }
}
