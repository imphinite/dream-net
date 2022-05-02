<?php

namespace App\Models\Concerns;

use App\Models\Favorite;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Favorites
{
    public function favorites(): MorphMany
    {
        return $this->morphMany(Favorite::class, 'favorable');
    }
}
