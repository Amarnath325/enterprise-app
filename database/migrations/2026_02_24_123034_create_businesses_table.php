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
        Schema::create('businesses', function (Blueprint $table) {
            $table->bigIncrements('b_id');

            // Optional: super admin / owner admin ka reference
            $table->unsignedBigInteger('b_admin_id')->nullable();

            $table->string('b_unique_id')->nullable();
            $table->unsignedBigInteger('b_category_id')->nullable();
            $table->unsignedBigInteger('b_type_id')->nullable();
            $table->unsignedBigInteger('b_dashboard_id')->nullable();
            $table->string('b_name')->nullable();

            $table->unsignedBigInteger('b_city_id')->nullable();
            $table->unsignedBigInteger('b_state_id')->nullable();
            $table->unsignedBigInteger('b_country_id')->nullable();

            $table->string('b_gst_no')->nullable();
            $table->string('b_pan_no')->nullable();
            $table->string('b_pin_code')->nullable();
            $table->text('b_address')->nullable();
            $table->string('b_logo')->nullable();

            $table->tinyInteger('b_is_verified')->nullable()->default(0);
            $table->tinyInteger('b_status')->nullable()->default(1);

            $table->decimal('b_longitude', 11, 8)->nullable();
            $table->decimal('b_latitude', 10, 8)->nullable();

            $table->string('b_emp_code')->nullable();
            $table->string('b_emp_code_type')->nullable();
            $table->string('b_currency')->nullable();
            $table->boolean('is_face_detection_active')->nullable()->default(false);

            $table->string('b_tag_line')->nullable();

            $table->string('b_bank_name')->nullable();
            $table->string('b_bank_acc_no')->nullable();
            $table->string('b_bank_ifsc')->nullable();
            $table->string('b_bank_address')->nullable();
            $table->string('b_cheque_no')->nullable();

            $table->string('bridge_url')->nullable();
            $table->boolean('demo_setup_completed')->nullable()->default(false);

            $table->integer('b_tada_km_variation')->nullable();
            $table->boolean('b_lodging_bill_required')->nullable()->default(false);
            $table->string('b_gps_path')->nullable();
            $table->string('b_travel_puch_type')->nullable();

            $table->json('b_local_expense_settings')->nullable();
            $table->json('b_outstation_expense_settings')->nullable();
            $table->json('b_international_expense_settings')->nullable();

            $table->integer('b_loc_out_travel_claim_days')->nullable();

            $table->unsignedBigInteger('b_timezone')->nullable();

            $table->timestamps();

            // FK: admin (optional)
            $table->foreign('b_admin_id')
                ->references('a_id')->on('admins')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
