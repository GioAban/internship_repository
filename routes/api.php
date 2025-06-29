<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::post('/categoryStore', [CategoryController::class, 'categoryStore']);
Route::patch('/categorySave/{id}', [CategoryController::class, 'categorySave']);
Route::delete('/categoryDelete/{id}', [CategoryController::class, 'categoryDelete']);