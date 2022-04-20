<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
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
     * Get the comments that belong to the post.
     */
    public function comments()
    {
        return $this->hasMany(Post::class);
    }
}
