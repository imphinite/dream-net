<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Comment;

class CommentTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected array $defaultIncludes = [
        //
    ];
    
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected array $availableIncludes = [
        'author',
        'post',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Comment $comment)
    {
        return [
            'id'        => $comment->id,
            'body'      => $comment->body,
            'moderationFlag' => $comment->moderation_flag,
            'anonymous' => $comment->anonymous,
            'createdAt' => $comment->created_at,
            'updatedAt' => $comment->updated_at,
        ];
    }
    
    /**
     * Include Author
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeAuthor(Comment $comment)
    {
        return $this->item($comment->author, new UserTransformer);
    }

    /**
     * Include Post
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includePost(Comment $comment)
    {
        return $this->item($comment->post, new PostTransformer);
    }
}
