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
        Schema::table('otps', function ($table) {
            $table->integer('resend_count')->default(0);
            $table->timestamp('last_sent_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('otps', function ($table) {
            $table->dropColumn(['resend_count', 'last_sent_at']);
        });
    }
};