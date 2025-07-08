<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReceiptController extends Controller
{

    public function invoiceStore(Request $request)
    {
        $receipt = \App\Models\Receipt::create([
            'receipt_number' => $request->receipt_number,
            'amount_received' => $request->amount_received,
            'amount_discount' => $request->amount_discount,
            'status' => $request->status,
            'customer_name' => $request->customer_name,
            'customer_contact_number' => $request->customer_contact,
            'customer_address' => $request->customer_address,
            'customer_note' => $request->customer_note,
        ]);


        foreach ($request->invoice as $item) {
            \App\Models\Invoice::create([
                'receipt_id' => $receipt->id,
                'product_id' => $item['id'],
                'total_amount' => $item['selling_price'],
                'total_cost_amount' => $item['cost_price'],
                'quantity' => $item['qty'],
            ]);
        }
        return response()->json([
            'success' => true,
            'receipt_id' => $receipt->id
        ]);
    }
}