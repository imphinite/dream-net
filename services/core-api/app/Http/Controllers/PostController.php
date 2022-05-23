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
        // Filters
        $user_id = Request::input('user_id', null);
        $favored = Request::input('favored', null);
        // $liked = Request::input('liked', null);

        // Pagination
        $currentCursor = Request::input('cursor', null);
        $previousCursor = Request::input('previous', null);
        $limit = Request::input('limit', 10);
        
        // Query
        $query = Post::latest()->take($limit);
        if ($user_id) {
            $query = $query->where('user_id', $user_id);
        }
        if ($favored) {
            $query = $query->join('favors', 'posts.id', '=', 'favors.favorable_id')
                ->select('posts.*', 'favors.user_id', 'favors.favorable_id', 'favors.favorable_type')
                ->where('favorable_type', 'App\Models\Post')
                ->where('posts.user_id', '=', Auth::user()->id);
        }
        if ($currentCursor) {
            $query = $query->where('id', '<', $currentCursor);
        }

        // Get data
        $posts = $query->get();
        
        // Save pagination cursor
        $newCursor = $posts?->last()?->id;
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
        $post = new Post();
        $post->title = Request::input('title', null);
        $post->body = Request::input('body', null);
        $post->mood = Request::input('mood', null);
        $post->locale = Request::input('locale', null);
        $post->moderation_flag = Request::input('moderation_flag', null);
        $post->anonymous = Request::input('anonymous', false);

        // Associate new post to the current user
        Auth::user()->posts()->save($post);

        // Transform models
        $result = fractal()
            ->item($post)
            ->transformWith(new PostTransformer())
            ->includeAuthor()
            ->toArray();

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);

        // Transform models
        $result = fractal()
            ->item($post)
            ->transformWith(new PostTransformer())
            ->includeAuthor()
            ->toArray();

        return $result;
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
        $post = Post::find($id);

        $post->title = Request::input('title', null);
        $post->body = Request::input('body', null);
        $post->mood = Request::input('mood', null);
        $post->anonymous = Request::input('anonymous', false);

        // Update this post
        $post->save();

        return response()->json(['result' => 'success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // TODO soft delete
    }
}
