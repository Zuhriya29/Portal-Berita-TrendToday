<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kategori_berita extends Model
{
    use HasFactory;

    protected $fillable = ['kategori', 'gambar_kategori'];
}