<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->bigIncrements('a_id');
            $table->string('a_name')->nullable();
            $table->string('a_email')->nullable()->unique();
            $table->string('a_phone')->nullable()->unique();
            $table->string('a_password')->nullable();
            $table->string('a_otp')->nullable();
            $table->string('a_auth_token')->nullable();
            $table->string('a_fcm_token')->nullable();
            $table->timestamp('a_otp_created_at')->nullable();
            $table->string('a_profile_photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
