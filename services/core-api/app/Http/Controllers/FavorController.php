<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\FavorRequest;
use App\Http\Requests\UnfavorRequest;
use League\Fractal\Manager;

class FavorController extends Controller
{
    private $fractal;
    
    /**
     * Create a new UserController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        
        $this->fractal = new Manager();
    }

    /**
     * User favors the content.
     *
     * @param  \App\Http\Requests\FavorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function favor(FavorRequest $request)
    {
        Auth::user()->favor($request->favorable());

        return response()->json([
            'favorites' => $request->favorable()->favorites()->count(),
        ]);
    }

    /**
     * User unfavors the content.
     *
     * @param  \App\Http\Requests\UnfavorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function unfavor(UnfavorRequest $request)
    {
        Auth::user()->unfavor($request->favorable());

        return response()->json([
            'favorites' => $request->favorable()->favorites()->count(),
        ]);
    }
}
