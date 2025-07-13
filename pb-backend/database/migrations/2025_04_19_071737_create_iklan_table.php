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
        Schema::create('iklans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_brand');
            $table->string('tagline');
            $table->string('gambar_iklan');
            $table->unsignedBigInteger('id_waktu_tayang');
            $table->boolean('is_tayang')->default(false); // Default false untuk non-admin
            $table->timestamps();

            // Foreign key ke tabel waktu_tayang
            $table->foreign('id_waktu_tayang')->references('id')->on('waktu_tayang')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('iklan');
    }
};
