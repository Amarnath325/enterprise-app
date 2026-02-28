<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('emp_id');

            // Basic status + org
            $table->integer('emp_status')->default(1);
            $table->unsignedBigInteger('emp_b_id')->nullable();
            $table->unsignedBigInteger('emp_br_id')->nullable();

            // Codes / names
            $table->string('emp_sap_budget_code')->nullable();
            $table->string('emp_code')->nullable();
            $table->string('emp_prefix')->nullable();
            $table->string('emp_full_name')->nullable();
            $table->string('emp_fname')->nullable();
            $table->string('emp_mname')->nullable();
            $table->string('emp_lname')->nullable();

            // Org ids
            $table->unsignedBigInteger('emp_d_id')->nullable();
            $table->unsignedBigInteger('emp_dg_id')->nullable();
            $table->unsignedBigInteger('emp_role_id')->default(0);
            $table->unsignedBigInteger('emp_type_id')->nullable();
            $table->unsignedBigInteger('emp_contractual_type_id')->nullable();

            // Contact
            $table->string('emp_phone')->nullable()->index();
            $table->string('emp_email')->nullable()->index();
            $table->string('emp_company_email')->nullable();

            // Dates (basic)
            $table->date('emp_dob')->nullable();
            $table->date('emp_date_of_joining')->nullable();
            $table->date('emp_group_date_of_joining')->nullable();
            $table->date('emp_date_of_gratuity')->nullable();
            $table->date('emp_date_of_transfer')->nullable();
            $table->date('emp_date_of_expected_confirmation')->nullable();
            $table->date('emp_date_of_confirmation')->nullable();
            $table->date('emp_date_of_pay_structure')->nullable();
            $table->integer('emp_probation_period')->nullable();

            // Personal master refs
            $table->unsignedBigInteger('emp_gender_id')->nullable();
            $table->unsignedBigInteger('emp_marital_status_id')->nullable();
            $table->unsignedBigInteger('emp_cast_id')->nullable();
            $table->unsignedBigInteger('emp_blood_group_id')->nullable();
            $table->unsignedBigInteger('emp_gov_doc_type_id')->nullable();
            $table->string('emp_gov_doc_type_number')->nullable();
            $table->string('emp_nationality')->nullable();
            $table->unsignedBigInteger('emp_religion_id')->nullable();

            // Address
            $table->text('emp_address')->nullable();
            $table->string('emp_temporary_pin_code')->nullable();
            $table->string('emp_permanent_pin_code')->nullable();

            // Shift / work
            $table->unsignedBigInteger('emp_shift_type_id')->nullable();
            $table->time('emp_assign_shift_start_time')->nullable();
            $table->time('emp_assign_shift_end_time')->nullable();
            $table->unsignedBigInteger('emp_reporting_manager_id')->nullable();
            $table->string('emp_imei_no')->nullable();
            $table->unsignedBigInteger('emp_work_mode_id')->nullable();
            $table->json('emp_checkin_method_id')->nullable();
            $table->string('emp_profile_photo')->nullable();
            $table->unsignedBigInteger('emp_grade_id')->nullable();

            // Bank details
            $table->string('emp_bank_ifsc_code')->nullable();
            $table->string('emp_bank_name')->nullable();
            $table->string('emp_bank_branch_name')->nullable();
            $table->string('emp_bank_account_no')->nullable();
            $table->string('emp_bank_branch_code')->nullable();
            $table->string('emp_bank_micr_code')->nullable();
            $table->text('emp_bank_address_line1')->nullable();
            $table->text('emp_bank_address_line2')->nullable();

            // PF / LWF / EPS / ESIC
            $table->string('emp_pf_no')->nullable();
            $table->boolean('emp_is_pf_enabled')->nullable();
            $table->string('emp_pf_trust_code')->nullable();
            $table->string('emp_pf_found_member')->nullable();
            $table->string('emp_pf_universal_ac_no')->nullable();
            $table->decimal('emp_vpf_percentage', 5, 2)->nullable();
            $table->date('emp_pf_joining_date')->nullable();
            $table->date('emp_pf_leaving_date')->nullable();
            $table->text('emp_pr_leaving_reason')->nullable();
            $table->string('emp_pf_joining_no')->nullable();
            $table->string('emp_lwf_no')->nullable();
            $table->string('emp_eps_no')->nullable();
            $table->string('emp_esic_no')->nullable();
            $table->date('emp_esic_joining_date')->nullable();
            $table->date('emp_esic_leaving_date')->nullable();
            $table->text('emp_esic_leaving_reason')->nullable();
            $table->string('emp_esic_dispensary')->nullable();
            $table->unsignedBigInteger('emp_esic_limit')->nullable();

            // Service / exit
            $table->integer('emp_year_of_service')->nullable();
            $table->date('emp_retirement_date')->nullable();
            $table->date('emp_separation_submit_date')->nullable();
            $table->date('emp_expected_leaving_date')->nullable();
            $table->date('emp_leaving_date_as_per_notice_period')->nullable();
            $table->integer('emp_notice_period_req_days')->nullable();
            $table->text('emp_leaving_reason')->nullable();
            $table->date('emp_leave_date')->nullable();
            $table->integer('emp_notice_period_serve_days')->nullable();
            $table->date('emp_settlement_from_date')->nullable();
            $table->date('emp_final_settlement_date')->nullable();
            $table->date('emp_exit_interview_date')->nullable();
            $table->date('emp_last_working_date')->nullable();
            $table->text('emp_remark')->nullable();

            // Extra notice-period fields
            $table->integer('emp_notice_period_day_for_employer')->nullable();
            $table->integer('emp_notice_period_day_for_employee')->nullable();
            $table->integer('emp_notice_period_shortfall_days')->nullable();

            // Emergency contact
            $table->string('emp_relative_name')->nullable();
            $table->string('emp_relationship')->nullable();
            $table->string('emp_relative_phone_no')->nullable();
            $table->text('emp_documents_ref_file')->nullable();

            // Auth / tokens
            $table->string('emp_otp')->nullable();
            $table->timestamp('emp_otp_created_at')->nullable();
            $table->text('emp_auth_token')->nullable();
            $table->text('emp_web_auth_token')->nullable();
            $table->text('emp_bg_auth_token')->nullable();
            $table->text('emp_fcm_token')->nullable();
            $table->string('emp_password')->nullable();

            // Job / misc
            $table->unsignedBigInteger('emp_job_status')->nullable();
            $table->string('emp_account_code')->nullable();
            $table->unsignedBigInteger('emp_supervisor_id')->nullable();

            // Geo + addresses
            $table->text('emp_permanent_address')->nullable();
            $table->decimal('emp_permanent_longitude', 11, 8)->nullable();
            $table->decimal('emp_permanent_latitude', 10, 8)->nullable();
            $table->text('emp_temporary_address')->nullable();
            $table->decimal('emp_temporary_longitude', 11, 8)->nullable();
            $table->decimal('emp_temporary_latitude', 10, 8)->nullable();

            // TADA / policies
            $table->decimal('emp_tada_settlement_amt', 12, 2)->nullable();
            $table->unsignedBigInteger('emp_ap_id')->nullable();
            $table->unsignedBigInteger('emp_pl_id')->nullable();
            $table->boolean('emp_allow_joining_leave')->nullable();
            $table->string('emp_joining_leave_calc_type')->nullable();
            $table->date('emp_joining_leave_before_date')->nullable();
            $table->boolean('emp_allow_probation_leave')->nullable();
            $table->date('emp_probation_last_date')->nullable();
            $table->unsignedBigInteger('emp_pwo_id')->nullable();
            $table->unsignedBigInteger('emp_attendance_preference')->nullable();
            $table->boolean('emp_is_geofencing_active')->nullable();
            $table->boolean('emp_is_geowork_active')->nullable();
            $table->json('emp_assign_geo_branch')->nullable();
            $table->integer('emp_offline_status')->nullable();
            $table->boolean('emp_is_wifi_restricted')->nullable();
            $table->integer('emp_is_notification_enabled')->nullable();
            $table->boolean('emp_is_reminder_enabled')->nullable();
            $table->text('emp_profile_s3_url')->nullable();
            $table->text('emp_rekognition_id')->nullable();
            $table->boolean('emp_is_temporary_add_same')->nullable();
            $table->unsignedBigInteger('emp_dlr_id')->nullable();

            // Group insurance
            $table->string('emp_group_insured_by')->nullable();
            $table->string('emp_group_insurance_no')->nullable();
            $table->date('emp_group_insurance_start_date')->nullable();
            $table->date('emp_group_insurance_till_date')->nullable();

            // About / optional info
            $table->string('emp_official_email')->nullable();
            $table->string('emp_official_contact')->nullable();
            $table->string('emp_emergency_contact')->nullable();
            $table->string('emp_emergency_relation')->nullable();
            $table->unsignedBigInteger('emp_category_id')->nullable();
            $table->text('emp_body_mark')->nullable();

            // Salary bank
            $table->string('emp_salary_account_code')->nullable();
            $table->string('emp_salary_bank_ifsc_code')->nullable();
            $table->string('emp_salary_bank_name')->nullable();
            $table->string('emp_salary_bank_branch_name')->nullable();
            $table->string('emp_salary_bank_micr_code')->nullable();
            $table->string('emp_salary_bank_branch_code')->nullable();
            $table->string('emp_salary_bank_account_no')->nullable();

            // Joining / project / assets
            $table->string('emp_profit_center')->nullable();
            $table->unsignedBigInteger('emp_region_id')->nullable();
            $table->json('emp_project_id')->nullable();
            $table->json('emp_assets_id')->nullable();

            // Identity
            $table->string('emp_aadhar_number')->nullable();
            $table->string('emp_account_number')->nullable();
            $table->string('emp_driving_license_number')->nullable();
            $table->string('emp_voter_id_number')->nullable();
            $table->string('emp_passport_number')->nullable();
            $table->string('emp_pan_number')->nullable();
            $table->boolean('emp_is_eps_enabled')->nullable();
            $table->string('emp_paymentmode')->nullable();
            $table->string('emp_accountpurpose')->nullable();
            $table->date('emp_drivng_license_valid')->nullable();
            $table->date('emp_passport_valid')->nullable();

            // Documents
            $table->text('emp_aadhar_file')->nullable();
            $table->text('emp_driving_license_file')->nullable();
            $table->text('emp_voter_id_file')->nullable();
            $table->text('emp_passbook_file')->nullable();
            $table->text('emp_passport_file')->nullable();
            $table->text('emp_pan_file')->nullable();

            // 2FA
            $table->string('emp_google2fa_secret')->nullable();
            $table->timestamp('emp_google2fa_enabled_at')->nullable();

            // Policy-tax link
            $table->unsignedBigInteger('emp_pt_id')->nullable();

            $table->timestamps();

            // Basic indexes only
            $table->index('emp_b_id');
            $table->index('emp_br_id');
            $table->index('emp_d_id');
            $table->index('emp_dg_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};