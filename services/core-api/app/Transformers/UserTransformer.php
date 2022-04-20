<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Model\User;

class UserTransformer extends TransformerAbstract
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
        'posts',
        'comments',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id'        => $user->id,
            'name'      => $user->title,
            'email'     => $user->body,
        ];
    }
    
    /**
     * Include Posts
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
