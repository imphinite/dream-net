<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use League\Fractal\ParamBag;
use App\Models\Post;

class PostTransformer extends TransformerAbstract
{
    private $validParams = ['limit', 'order'];

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
        'comments',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Post $post)
    {
        return [
            'id'        => $post->id,
            'title'     => $post->title,
            'body'      => $post->body,
            'mood'      => $post->mood,
            'locale'    => $post->locale,
            'moderationFlag' => $post->moderation_flag,
            'anonymous' => $post->anonymous,
            'createdAt' => $post->created_at,
            'updatedAt' => $post->updated_at,
        ];
    }

    /**
     * Include Author
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeAuthor(Post $post)
    {
        return $this->item($post->author, new UserTransformer);
    }

    /**
     * Include Comments
     *
     * @return \League\Fractal\Resource\Collection
     */
    public function includeComments(Post $post, ParamBag $params = null)
    {
        if ($params === null) {
            $comments = $post->comments;
        } else {
            // Optional params validation
            $usedParams = array_keys(iterator_to_array($params));
            if ($invalidParams = array_diff($usedParams, $this->validParams)) {
                throw new \Exception(sprintf(
                    'Invalid param(s): "%s". Valid param(s): "%s"',
                    implode(',', $usedParams),
                    implode(',', $this->validParams)
                ));
            }

            // Processing
            list($limit, $offset) = $params->get('limit');
            list($orderCol, $orderBy) = $params->get('order');

            $comments = $post->comments
                ->take($limit)
                ->skip($offset)
                ->orderBy($orderCol, $orderBy)
                ->get();
        }

        return $this->collection($comments, new CommentTransformer);
    }
}
