<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class iklan extends Model
{
    use HasFactory;

    protected $fillable = [
        'gambar_iklan',
        'nama_brand',
        'tagline',
        'is_tayang',
        'id_waktu_tayang',
        'new_date',
    ];

    function waktu_tayang()
    {
        return $this->belongsTo(WaktuTayang::class, 'id_waktu_tayang');
    }
}
