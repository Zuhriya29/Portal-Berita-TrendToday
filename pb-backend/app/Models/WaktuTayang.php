<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaktuTayang extends Model
{
    use HasFactory;

    protected $table = 'waktu_tayang';
    protected $fillable = ['waktu_tayang'];
}
