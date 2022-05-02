<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Model;
use App\Contracts\Favorable;

class FavorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('favor', $this->favorable());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // the class of the favored object
            'favorable_type' => [
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

                    if (! in_array(Favorable::class, class_implements($value))) {
                        $fail($value . " is not App\Contracts\Favorable");
                    }
                },
            ],

            // the id of the favored object
            'id' => [
                "required",
                function ($attribute, $value, $fail) {
                    $class = $this->input('favorable_type');

                    if (! $class::where('id', $value)->exists()) {
                        $fail($value . " does not exists in database");
                    }
                },
            ],
        ];
    }

    public function favorable(): Favorable
    {
        $class = $this->input('favorable_type');
        return $class::findOrFail($this->input('id'));
    }
}
