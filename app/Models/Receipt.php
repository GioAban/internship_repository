<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $fillable = [
        'receipt_number',
        'amount_received',
        'amount_discount',
        'status',
        'customer_name',
        'customer_contact_number',
        'customer_address',
        'customer_note',
    ];
}