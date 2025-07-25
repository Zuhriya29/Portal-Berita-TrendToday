<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendingUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'email',
        'password',
        'otp',
        'otp_expires_at',
    ];
}