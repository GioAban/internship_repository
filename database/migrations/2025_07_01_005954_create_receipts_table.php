<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->integer('receipt_number');
            $table->double('amount_received')->nullable();
            $table->double('amount_discount')->default(0);
            $table->string('status')->default('paid');
            $table->string('customer_name')->nullable();
            $table->string('customer_contact_number')->nullable();
            $table->string('customer_address')->nullable();
            $table->longText('customer_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};