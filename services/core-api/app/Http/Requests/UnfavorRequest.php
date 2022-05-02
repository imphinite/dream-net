<?php

namespace App\Http\Requests;

use App\Http\Requests\FavorRequest;

class UnfavorRequest extends FavorRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('unfavor', $this->favorable());
    }
}
