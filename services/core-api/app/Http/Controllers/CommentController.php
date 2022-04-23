<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Fractal\Pagination\Cursor;
use App\Transformers\CommentTransformer;
use App\Models\Comment;

class CommentController extends Controller
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
        $post_id = Request::input('post_id', null);

        // Pagination
        $currentCursor = Request::input('cursor', null);
        $previousCursor = Request::input('previous', null);
        $limit = Request::input('limit', 10);
        
        // Query
        $query = Comment::latest()->take($limit);
        if ($user_id) {
            $query = $query->where('user_id', $user_id);
        }
        if ($post_id) {
            $query = $query->where('post_id', $post_id);
        }
        if ($currentCursor) {
            $query = $query->where('id', '>', $currentCursor);
        }

        // Get data
        $comments = $query->get();

        // Save pagination cursor
        $newCursor = $comments->last() ? $comments->last()->id : null;
        $cursor = new Cursor($currentCursor, $previousCursor, $newCursor, $comments->count());

        // Transform models
        $result = fractal()
            ->collection($comments)
            ->transformWith(new CommentTransformer())
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
        $post_id = Request::input('post_id', null);

        $comment = new Comment();
        $comment->body = Request::input('body', null);
        $comment->moderation_flag = Request::input('moderation_flag', null);
        $comment->anonymous = Request::input('anonymous', false);
        $comment->post_id = $post_id;

        // Associate new post to the current user
        Auth::user()->comments()->save($comment);

        return response()->json(['result' => 'success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = Comment::find($id);

        // Transform models
        $result = fractal()
            ->item($comment)
            ->transformWith(new CommentTransformer())
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
        $comment = Comment::find($id);

        $comment->body = Request::input('body', null);
        $comment->anonymous = Request::input('anonymous', false);

        // Update this comment
        $comment->save();

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
