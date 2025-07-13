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
        Schema::create('komentars', function (Blueprint $table) {
            $table->id();
            $table->string('komentar');
            $table->unsignedBigInteger('id_user'); // Menggunakan unsignedBigInteger
            $table->unsignedBigInteger('id_berita'); // Menggunakan unsignedBigInteger
            $table->timestamps(); // Menambah created_at & updated_at otomatis
            $table->boolean('is_approved')->default(false); // Fix typo & beri default false

            // Jika ada relasi dengan tabel lain, tambahkan foreign key:
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_berita')->references('id')->on('beritas')->onDelete('cascade');

            
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komentar');
    }
};
