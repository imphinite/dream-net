<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\LikeRequest;
use App\Http\Requests\UnlikeRequest;
use League\Fractal\Manager;

class LikeController extends Controller
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
     * User likes the content.
     *
     * @param  \App\Http\Requests\LikeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function like(LikeRequest $request)
    {
        Auth::user()->like($request->likeable());

        return response()->json([
            'likes' => $request->likeable()->likes()->count(),
        ]);
    }

    /**
     * User unlikes the content.
     *
     * @param  \App\Http\Requests\UnlikeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function unlike(UnlikeRequest $request)
    {
        Auth::user()->unlike($request->likeable());

        return response()->json([
            'likes' => $request->likeable()->likes()->count(),
        ]);
    }
}
