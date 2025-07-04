<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name_description',
        'unit_measurement_id',
        'selling_price',
        'stock',
        'cost_price'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function unitMeasurement()
    {
        return $this->belongsTo(UnitMeasurement::class);
    }
}