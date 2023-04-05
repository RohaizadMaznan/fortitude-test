<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => 'P' . rand(000, 999),
            'name' => fake()->name(),
            'category' => fake()->unique()->word(),
            'brand' => fake()->unique()->word(),
            'type' => fake()->unique()->word(),
            'description' => fake()->sentence(),
        ];
    }
}
