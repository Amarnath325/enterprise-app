<?php

namespace App\Models;

use App\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, Notifiable;
    use HasRoles;

    protected $table = 'admins';
    protected $primaryKey = 'a_id';

    // Optional, clarity ke liye
    protected $guard = 'admin';

    protected $hidden = [
        'a_password',
    ];

    protected $fillable = [
        'a_name',
        'a_email',
        'a_phone',
        'a_password',
        'a_otp',
        'a_auth_token',
        'a_fcm_token',
        'a_otp_created_at',
        'a_profile_photo',
    ];

    public function fh_businesses()
    {
        return $this->hasMany(Business::class, 'b_admin_id', 'a_id');
    }
}