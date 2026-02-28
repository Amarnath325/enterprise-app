<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $table = 'businesses';
    protected $primaryKey = 'b_id';

    protected $casts = [
        'b_category_id' => 'int',
        'b_type_id' => 'int',
        'b_city_id' => 'int',
        'b_state_id' => 'int',
        'b_country_id' => 'int',
        'b_is_verified' => 'int',
        'b_status' => 'int',
        'is_face_detection_active' => 'bool',
        'demo_setup_completed' => 'bool',
        'b_lodging_bill_required' => 'bool',
        'b_local_expense_settings' => 'array',
        'b_outstation_expense_settings' => 'array',
        'b_international_expense_settings' => 'array',
    ];

    protected $fillable = [
        'b_admin_id',
        'b_unique_id',
        'b_category_id',
        'b_type_id',
        'b_dashboard_id',
        'b_name',
        'b_city_id',
        'b_state_id',
        'b_country_id',
        'b_gst_no',
        'b_pan_no',
        'b_pin_code',
        'b_address',
        'b_logo',
        'b_is_verified',
        'b_status',
        'b_longitude',
        'b_latitude',
        'b_emp_code',
        'b_emp_code_type',
        'b_currency',
        'is_face_detection_active',
        'b_tag_line',
        'b_bank_name',
        'b_bank_acc_no',
        'b_bank_ifsc',
        'b_bank_address',
        'b_cheque_no',
        'bridge_url',
        'demo_setup_completed',
        'b_tada_km_variation',
        'b_lodging_bill_required',
        'b_gps_path',
        'b_travel_puch_type',
        'b_local_expense_settings',
        'b_outstation_expense_settings',
        'b_international_expense_settings',
        'b_loc_out_travel_claim_days',
        'b_timezone',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'b_admin_id', 'a_id');
    }

    // Neeche wale relations tumhare FixHR wale design ke hisaab se placeholder hain.
    // Inko tab use karna jab corresponding models bana loge.

    public function fh_city()
    {
        return $this->belongsTo(City::class, 'b_city_id');
    }

    public function fh_state()
    {
        return $this->belongsTo(State::class, 'b_state_id');
    }

    public function fh_country()
    {
        return $this->belongsTo(Country::class, 'b_country_id');
    }

    public function fh_currency()
    {
        return $this->belongsTo(Country::class, 'b_currency');
    }

    public function fh_branches()
    {
        return $this->hasMany(Branch::class, 'br_b_id', 'b_id');
    }

    public function fh_departments()
    {
        return $this->hasMany(Department::class, 'd_b_id', 'b_id');
    }

    public function fh_designations()
    {
        return $this->hasMany(Designation::class, 'dg_b_id', 'b_id');
    }

    public function fh_employees()
    {
        return $this->hasMany(Employee::class, 'emp_b_id', 'b_id');
    }

}