<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Fractal\Pagination\Cursor;
use App\Transformers\PostTransformer;
use App\Models\Post;

class PostController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        // Pagination
        $currentCursor = Request::input('cursor', null);
        $previousCursor = Request::input('previous', null);
        $limit = Request::input('limit', 10);
        if ($currentCursor) {
            // Query
            $posts = Post::where('id', '>', $currentCursor)->latest()->take($limit)->get();
        } else {
            // Query
            $posts = Post::latest()->take($limit)->get();
        }

        // Save pagination cursor
        $newCursor = $posts->last()->id;
        $cursor = new Cursor($currentCursor, $previousCursor, $newCursor, $posts->count());

        // Transform models
        $result = fractal()
            ->collection($posts)
            ->transformWith(new PostTransformer())
            ->includeAuthor()
            ->withCursor($cursor)
            ->toArray();

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(HttpRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(HttpRequest $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
