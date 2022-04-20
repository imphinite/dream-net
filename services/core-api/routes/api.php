<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth
Route::middleware('auth:passport')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/self', [UserController::class, 'self']);

// Posts
// Route::get('/posts', [PostController::class, 'index']);
Route::controller(PostController::class)->group(function () {
    Route::get('/posts', 'index');
    Route::post('/posts', 'store');
    Route::get('/posts/{id}', 'show');
    Route::patch('/posts/{id}', 'update');
    Route::delete('/posts/{id}', 'destroy');
});

// Comments
Route::controller(CommentController::class)->group(function () {
    Route::get('/comments', 'index');
    Route::post('/comments', 'store');
    Route::get('/comments/{id}', 'show');
    Route::patch('/comments/{id}', 'update');
    Route::delete('/comments/{id}', 'destroy');
});

// Likes


// Favorites