<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBusinessRequest;
use App\Http\Requests\Admin\UpdateBusinessRequest;
use App\Http\Resources\BusinessResource;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BusinessController extends Controller
{
    public function index(Request $request)
    {
        $query = Business::query();

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where(function ($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%")
                    ->orWhere('phone', 'like', "%{$q}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $perPage = $request->input('per_page', 10);
        $businesses = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return BusinessResource::collection($businesses);
    }

    public function store(StoreBusinessRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }
        $business = Business::create($data);
        return new BusinessResource($business);
    }

    public function show(Business $business)
    {
        return new BusinessResource($business);
    }

    public function update(UpdateBusinessRequest $request, Business $business)
    {
        $data = $request->validated();
        if ($request->hasFile('logo')) {
            if ($business->logo) {
                Storage::disk('public')->delete($business->logo);
            }
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }
        $business->update($data);
        return new BusinessResource($business);
    }

    public function destroy(Business $business)
    {
        if ($business->logo) {
            Storage::disk('public')->delete($business->logo);
        }
        $business->delete();
        return response()->noContent();
    }

    public function toggleStatus(Business $business)
    {
        $business->status = !$business->status;
        $business->save();
        return new BusinessResource($business);
    }
}
