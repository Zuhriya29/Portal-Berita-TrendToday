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
          Schema::create('beritas', function (Blueprint $table) {
              $table->id();
              $table->string('judul_berita');
              $table->text('isi_berita'); // Menggunakan text() untuk berita yang panjang
              $table->string('gambar_berita');
              $table->unsignedBigInteger('id_kategori'); // Menggunakan unsignedBigInteger
              $table->unsignedBigInteger('id_user'); // Menggunakan unsignedBigInteger
              $table->boolean('is_approved')->default(false); // Fix typo & beri default false
  
              // Jika ada relasi dengan tabel lain, tambahkan foreign key:
              $table->foreign('id_kategori')->references('id')->on('kategori_beritas')->onDelete('cascade');
              $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
  
              $table->timestamps(); // Menambah created_at & updated_at otomatis
          });
      }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berita');
    }
};
