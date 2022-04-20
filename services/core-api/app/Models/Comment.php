<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    
    /**
     * Get the author of this post.
     */
    public function author()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the post which this comment belongs to.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
