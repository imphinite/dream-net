<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Favorite extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'favors';

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function favorable()
    {
        return $this->morphTo();
    }
}
