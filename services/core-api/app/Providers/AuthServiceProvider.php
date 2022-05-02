<?php

namespace App\Providers;

use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;
use App\Contracts\Likeable;
use App\Contracts\Favorable;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        if (!$this->app->routesAreCached()) {
            Route::prefix('api')->group(function() {
                Passport::routes();
            });
        }
        
        // $user->can('like', $post)
        Gate::define('like', function (User $user, Likeable $likeable) {
            if (!$likeable->exists) {
                return Response::deny("Cannot like an object that doesn't exists");
            }

            if ($user->hasLiked($likeable)) {
                return Response::deny("Cannot like the same thing twice");
            }

            return Response::allow();
        });

        // $user->can('unlike', $post)
        Gate::define('unlike', function (User $user, Likeable $likeable) {
            if (!$likeable->exists) {
                return Response::deny("Cannot unlike an object that doesn't exists");
            }

            if (!$user->hasLiked($likeable)) {
                return Response::deny("Cannot unlike without liking first");
            }

            return Response::allow();
        });

        
        // $user->can('favor', $post)
        Gate::define('favor', function (User $user, Favorable $favorable) {
            if (!$favorable->exists) {
                return Response::deny("Cannot favor an object that doesn't exists");
            }

            if ($user->hasFavored($favorable)) {
                return Response::deny("Cannot favor the same thing twice");
            }

            return Response::allow();
        });

        // $user->can('unfavor', $post)
        Gate::define('unfavor', function (User $user, Favorable $favorable) {
            if (!$favorable->exists) {
                return Response::deny("Cannot unfavor an object that doesn't exists");
            }

            if (!$user->hasFavored($favorable)) {
                return Response::deny("Cannot unfavor without favoring first");
            }

            return Response::allow();
        });
    }
}
