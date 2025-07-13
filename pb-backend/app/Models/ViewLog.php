<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewLog extends Model
{
    use HasFactory;
    protected $fillable = ['berita_id', 'ip_address'];
}