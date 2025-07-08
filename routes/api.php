<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReceiptController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'web'])->group(function () {
    Route::post('/categoryStore', [CategoryController::class, 'categoryStore']);
    Route::patch('/categorySave/{id}', [CategoryController::class, 'categorySave']);
    Route::delete('/categoryDelete/{id}', [CategoryController::class, 'categoryDelete']);
    Route::post('/productStore', [ProductController::class, 'productStore']);
    Route::patch('/productSave/{id}', [ProductController::class, 'productSave']);
    Route::post('/invoiceStore', [ReceiptController::class, 'invoiceStore']);
});