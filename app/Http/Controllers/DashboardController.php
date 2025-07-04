<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public $categoryController;
    public $productController;
    public function __construct()
    {
        $this->categoryController = new CategoryController;
        $this->productController = new ProductController;
    }
    public function categories()
    {
        $categories = Category::orderByDesc('id')->get();
        return Inertia::render('Categories', compact('categories'));
    }
    public function createCategory()
    {
        return Inertia::render('Category-create');
    }
    public function viewCategory($id)
    {
        $category = $this->categoryController->getCategory($id);
        return Inertia::render('Category-view', compact('category'));
    }
    public function editCategory($id)
    {
        $category = $this->categoryController->getCategory($id);
        return Inertia::render('Category-edit', compact('category'));
    }
    public function products()
    {
        $products = DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('unit_measurements', 'products.unit_measurement_id', '=', 'unit_measurements.id')
            ->orderByDesc('products.id')
            ->select(
                'products.*',
                'categories.name as category_name',
                'unit_measurements.name as unit_measurement_name',
                'unit_measurements.abbreviation as unit_measurement_abbreviation'
            )
            ->orderByDesc('products.id')
            ->get();
        return Inertia::render('Products', compact('products'));
    }
    public function productCreate()
    {
        $categories = Category::where('status', '!=', 'InActive')->orderByDesc('id')->get();
        $unit_measurements = DB::table('unit_measurements')->orderByDesc('id')->get();
        return Inertia::render('Product-create', compact('categories', 'unit_measurements'));
    }
    public function productEdit($id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::where('status', 'Active')->get();
        $unit_measurements = DB::table('unit_measurements')->orderByDesc('id')->get();

        return Inertia::render('Product-edit', [
            'product' => $product,
            'categories' => $categories,
            'unit_measurements' => $unit_measurements,
        ]);
    }
    public function pointOfSale()
    {
        $categories = Category::where('status', 'Active')->orderByDesc('id')->get();
        $products = DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('unit_measurements', 'products.unit_measurement_id', '=', 'unit_measurements.id')
            ->orderByDesc('products.id')
            ->select(
                'products.*',
                'categories.name as category_name',
                'unit_measurements.name as unit_measurement_name',
                'unit_measurements.abbreviation as unit_measurement_abbreviation'
            )
            ->orderByDesc('products.id')
            ->get();
        return Inertia::render('Point-of-sale', compact('categories', 'products'));
    }
}