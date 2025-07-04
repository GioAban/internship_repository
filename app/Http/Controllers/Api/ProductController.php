<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProduct($id)
    {
        $product = Product::find($id);
        return $product;
    }

    public function productStore(Request $request)
    {
        $product = Product::create([
            'name_description' => $request->name_description,
            'unit_measurement_id' => $request->unit_measurement_id,
            'selling_price' => $request->selling_price,
            'cost_price' => $request->cost_price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
        ]);

        if ($product) {
            return response()->json(['message' => 'Product added successfully.'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 500);
        }
    }
    public function productSave($id, Request $request)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 500);
        }
        if ($product->update([
            'name_description' => $request->name_description,
            'unit_measurement_id' => $request->unit_measurement_id,
            'selling_price' => $request->selling_price,
            'cost_price' => $request->cost_price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
        ])) {
            return response()->json(['message' => 'Product successfully updated.'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 500);
        }
    }
}