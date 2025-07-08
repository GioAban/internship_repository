<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Invoice;

class ReviewInvoiceController extends Controller
{
    public function reviewInvoice()
    {
        $invoiceKey = 'invoice_' . now()->timestamp;
        session(['invoiceKey' => $invoiceKey]);
        return redirect()->route('review.invoice.show');
    }
    public function show(Request $request)
    {
        $invoiceKey = session('invoiceKey');
        $receiptNumber = DB::table('receipts')->max('receipt_number') + 1;
        return Inertia::render('Review-invoice', [
            'invoiceKey' => $invoiceKey,
            'receiptNumber' => $receiptNumber,
        ]);
    }
    public function proceedPayment()
    {
        return Inertia::render('Payment');
    }
}