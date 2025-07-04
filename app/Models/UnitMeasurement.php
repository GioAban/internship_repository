<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitMeasurement extends Model
{
    protected $fillable = [
        'unit',
        'abbreviation',
    ];
}