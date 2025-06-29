<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class HomeController extends Controller
{
    public $categoryController;
    public function __construct()
    {
        $this->categoryController = new CategoryController;
    }
    public function index()
    {
        return Inertia::render('Home');
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
}