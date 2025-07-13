<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeritaDisukai extends Model
{
    use HasFactory;

    protected $table = 'berita_disukai';

    protected $fillable = ['user_id', 'berita_id'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function berita() {
        return $this->belongsTo(berita::class, 'berita_id');
    }
}