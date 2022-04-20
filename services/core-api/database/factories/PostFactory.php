<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userIds = DB::table('users')->pluck('id');

        return [
            'title' => $this->faker->sentence(),
            'body' => $this->faker->paragraphs(3, true),
            'mood' => $this->faker->randomDigit(),
            'locale' => $this->faker->locale(),
            'moderation_flag' => $this->faker->randomDigit(),
            'anonymous' => $this->faker->boolean(),
            'user_id' => $this->faker->randomElement($userIds),
        ];
    }
}
