<?php

namespace Database\Factories;

use App\Models\Business;
use Illuminate\Database\Eloquent\Factories\Factory;

class BusinessFactory extends Factory
{
    protected $model = Business::class;

    public function definition()
    {
        return [
            'b_admin_id' => null,
            'b_unique_id' => strtoupper($this->faker->bothify('BUS-??-####')),
            'b_name' => $this->faker->company,
            'b_city_id' => null,
            'b_state_id' => null,
            'b_country_id' => null,
            'b_gst_no' => $this->faker->regexify('[0-9A-Z]{15}'),
            'b_pan_no' => $this->faker->regexify('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
            'b_pin_code' => $this->faker->postcode,
            'b_address' => $this->faker->address,
            'b_status' => $this->faker->boolean(80),
            'b_currency' => 'USD',
        ];
    }
}