<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kode OTP Pendaftaran</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="background: #145B73; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <h1 style="margin: 0;">TrendToday</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: center;">
                <h2 style="color: #145B73;">Verifikasi OTP Anda</h2>
                <p style="font-size: 16px; color: #145B73;">
                    Terima kasih telah mendaftar di TrendToday.<br>
                    Berikut adalah kode OTP Anda:
                </p>
                <p style="font-size: 32px; font-weight: bold; color: black; margin: 20px 0;">
                    {{ $otp }}
                </p>
                <p style="font-size: 14px; color: #777777;">
                    Kode OTP ini berlaku selama 10 menit.<br>
                    Jika Anda tidak meminta OTP ini, abaikan email ini.
                </p>
            </td>
        </tr>
        <tr>
            <td style="background: #f4f4f4; text-align: center; padding: 15px; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                &copy; {{ date('Y') }} TrendToday. Semua hak dilindungi.
            </td>
        </tr>
    </table>
</body>
</html>
