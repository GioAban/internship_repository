<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/point-of-sale', [DashboardController::class, 'pointOfSale'])->name('point-of-sale');
    Route::get('/categories', [DashboardController::class, 'categories'])->name('categories');
    Route::get('/create-category', [DashboardController::class, 'createCategory'])->name('category.create');
    Route::get('/category/{id}', [DashboardController::class, 'viewCategory']);
    Route::get('/edit-category/{id}', [DashboardController::class, 'editCategory']);
    Route::get('/products', [DashboardController::class, 'products'])->name('products');
    Route::get('/product-create', [DashboardController::class, 'productCreate'])->name('product.create');
    Route::get('/product-edit/{id}', [DashboardController::class, 'productEdit']);
});
require __DIR__ . '/auth.php';