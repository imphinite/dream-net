<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;

interface Favorable
{
    public function favorites(): MorphMany;
}
