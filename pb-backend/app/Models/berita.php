<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class berita extends Model
{
    use HasFactory;

    protected $fillable = [
        'gambar_berita',
        'judul_berita',
        'id_kategori',
        'isi_berita',
        'id_user',
        'is_approved',
        'total_view',
    ];

    public $timestamps = true;

    function user()
    {
        return $this->belongsTo(User::class, 'id_user'); // <-- pakai id_user
    }

    function kategori()
    {
        return $this->belongsTo(kategori_berita::class, 'id_kategori');
    }

    function komentar()
    {
        return $this->hasMany(komentar::class, 'id_berita');
    }

    public function disukaiOleh()
    {
        return $this->belongsToMany(User::class, 'berita_disukai')->withTimestamps();
    }
}