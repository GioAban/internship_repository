<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function categoryStore(Request $request)
    {
        if (Category::create([
            'name' => $request->name,
            'status' => "Active"
        ])) {
            return response()->json(['message' => 'Category Addded Successfully.'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 500);
        }
    }
    public function getCategory($id)
    {
        $category = Category::find($id);
        return $category;
    }
    public function categorySave($id, Request $request)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found.'], 500);
        }
        if ($category->update([
            'name' => $request->name,
            'status' => $request->status
        ])) {
            return response()->json(['message' => 'Category successfully updated.'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 500);
        }
    }
    public function categoryDelete($id, Request $request)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found.'], 500);
        }
        if ($category->delete()) {
            return response()->json(['message' => 'Category successfully deleted.'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 500);
        }
    }
}