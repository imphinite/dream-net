<?php

namespace App\Http\Requests;

use App\Http\Requests\LikeRequest;

class UnlikeRequest extends LikeRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('unlike', $this->likeable());
    }
}
