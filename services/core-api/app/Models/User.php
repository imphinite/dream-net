<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Contracts\Likeable;
use App\Contracts\Favorable;
use App\Models\Like;
use App\Models\Favorite;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the posts that belong to the user.
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Get the comments that belong to the user.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * All likes by the user.
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Perform like on the Likeable model
     */
    public function like(Likeable $likeable): self
    {
        if ($this->hasLiked($likeable)) {
            return $this;
        }

        (new Like())
            ->user()->associate($this)
            ->likeable()->associate($likeable)
            ->save();

        return $this;
    }
    
    /**
     * Perform unlike on the Likeable model
     */
    public function unlike(Likeable $likeable): self
    {
        if (! $this->hasLiked($likeable)) {
            return $this;
        }

        $likeable->likes()
            ->whereHas('user', fn($q) => $q->whereId($this->id))
            ->delete();

        return $this;
    }

    /**
     * Check if user has liked/unliked on the Likeable model
     */
    public function hasLiked(Likeable $likeable): bool
    {
        if (!$likeable->exists) {
            return false;
        }

        return $likeable->likes()
            ->whereHas('user', fn($q) =>  $q->whereId($this->id))
            ->exists();
    }


    /**
     * All favorites by the user.
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    /**
     * Perform favor action on the Favorable model
     */
    public function favor(Favorable $favorable): self
    {
        if ($this->hasFavored($favorable)) {
            return $this;
        }

        (new Favorite())
            ->user()->associate($this)
            ->favorable()->associate($favorable)
            ->save();

        return $this;
    }
    
    /**
     * Perform unfavor action on the Favorable model
     */
    public function unfavor(Favorable $favorable): self
    {
        if (! $this->hasFavored($favorable)) {
            return $this;
        }

        $favorable->favorites()
            ->whereHas('user', fn($q) => $q->whereId($this->id))
            ->delete();

        return $this;
    }

    /**
     * Check if user has favored/unfavored on the Favorable model
     */
    public function hasFavored(Favorable $favorable): bool
    {
        if (!$favorable->exists) {
            return false;
        }

        return $favorable->favorites()
            ->whereHas('user', fn($q) =>  $q->whereId($this->id))
            ->exists();
    }
}
