<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Model;
use App\Contracts\Likeable;

class LikeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('like', $this->likeable());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // the class of the liked object
            'likeable_type' => [
                "bail",
                "required",
                "string",
                function ($attribute, $value, $fail) {
                    if (! class_exists($value, true)) {
                        $fail($value . " is not an existing class");
                    }

                    if (! in_array(Model::class, class_parents($value))) {
                        $fail($value . " is not Illuminate\Database\Eloquent\Model");
                    }

                    if (! in_array(Likeable::class, class_implements($value))) {
                        $fail($value . " is not App\Contracts\Likeable");
                    }
                },
            ],

            // the id of the liked object
            'id' => [
                "required",
                function ($attribute, $value, $fail) {
                    $class = $this->input('likeable_type');

                    if (! $class::where('id', $value)->exists()) {
                        $fail($value . " does not exists in database");
                    }
                },
            ],
        ];
    }

    public function likeable(): Likeable
    {
        $class = $this->input('likeable_type');
        return $class::findOrFail($this->input('id'));
    }
}
