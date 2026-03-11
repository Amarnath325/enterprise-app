<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBusinessRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $businessId = $this->route('business')->id;

        return [
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:businesses,email,{$businessId}",
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'status' => 'boolean',
            'logo' => 'nullable|image|max:2048',
        ];
    }
}