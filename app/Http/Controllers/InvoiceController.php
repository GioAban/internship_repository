<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function print($id)
    {
        $invoices = Invoice::with('product') // eager load product
            ->where('receipt_id', $id)
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('Receipt-print', compact('invoices'));
    }
}