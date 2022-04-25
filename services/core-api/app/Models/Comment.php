<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Contracts\Likeable;
use App\Models\Concerns\Likes;

class Comment extends Model implements Likeable
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
     * Get the post which this comment belongs to.
     */
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
