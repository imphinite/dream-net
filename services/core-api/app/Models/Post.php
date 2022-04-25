<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Contracts\Likeable;
use App\Models\Concerns\Likes;

class Post extends Model implements Likeable
{
    use HasFactory, Likes;

    /**
     * Get the author of this post.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the comments that belong to the post.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
}
