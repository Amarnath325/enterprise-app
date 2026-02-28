<?php

namespace App\Traits;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasRoles
{
    public function roles(): MorphToMany
    {
        return $this->morphToMany(Role::class, 'model', 'model_has_roles');
    }

    public function permissions(): MorphToMany
    {
        return $this->morphToMany(Permission::class, 'model', 'model_has_permissions');
    }

    public function hasRole(string|array $roles): bool
    {
        $roles = (array) $roles;

        return $this->roles()
            ->whereIn('slug', $roles)
            ->exists();
    }

    public function hasPermission(string|array $permissions): bool
    {
        $permissions = (array) $permissions;

        $hasDirect = $this->permissions()
            ->whereIn('slug', $permissions)
            ->exists();

        if ($hasDirect) {
            return true;
        }

        return $this->roles()
            ->whereHas('permissions', function ($q) use ($permissions) {
                $q->whereIn('permissions.slug', $permissions);
            })
            ->exists();
    }

    public function assignRole(string|Role $role): static
    {
        if (is_string($role)) {
            $role = Role::where('slug', $role)->firstOrFail();
        }

        $this->roles()->syncWithoutDetaching([$role->id]);

        return $this;
    }

    public function givePermissionTo(string|Permission $permission): static
    {
        if (is_string($permission)) {
            $permission = Permission::where('slug', $permission)->firstOrFail();
        }

        $this->permissions()->syncWithoutDetaching([$permission->id]);

        return $this;
    }
}