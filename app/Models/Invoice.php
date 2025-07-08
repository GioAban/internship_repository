<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'receipt_id',
        'product_id',
        'total_amount',
        'total_cost_amount',
        'quantity',
    ];
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}