<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordCustom extends Notification
{
    public $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Reset Password Notification')
            ->line('Anda menerima email ini karena kami menerima permintaan reset password.')
            ->action('Reset Password', $this->url)
            ->line('Jika Anda tidak meminta reset password, abaikan email ini.');
    }
}