<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class komentar extends Model
{
    use HasFactory;

    public function berita()
    {
        return $this->belongsTo(Berita::class, 'id_berita');
    }

    function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}