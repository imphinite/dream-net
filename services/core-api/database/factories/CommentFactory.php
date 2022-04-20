<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userIds = DB::table('users')->pluck('id');
        $postIds = DB::table('posts')->pluck('id');

        return [
            'body' => $this->faker->paragraphs(2, true),
            'moderation_flag' => $this->faker->randomDigit(),
            'anonymous' => $this->faker->boolean(),
            'user_id' => $this->faker->randomElement($userIds),
            'post_id' => $this->faker->randomElement($postIds),
        ];
    }
}
