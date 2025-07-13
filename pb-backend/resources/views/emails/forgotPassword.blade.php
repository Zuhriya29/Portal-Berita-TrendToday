<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="utf-8">
    <title>Reset Password</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
            <td
                style="background: #145B73; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <h1 style="margin: 0;">TrendToday</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: left;">
                <h2 style="color: #333333; text-align: center;">Reset Password</h2>
                <p style="font-size: 16px; color: #555555;">Halo, Pengguna TrendToday 👋</p>
                <p style="font-size: 16px; color: #555555;">
                    Anda telah meminta untuk mengatur ulang kata sandi Anda.
                    Klik tombol di bawah ini untuk membuat kata sandi baru:
                </p>

                <p style="text-align: center; margin: 30px 0;">
                    <a href="http://localhost:5173/reset-password-user/{{ $token }}"
                        style="display: inline-block; padding: 12px 24px; background-color: #145B73; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">
                        Reset Password
                    </a>
                </p>

                <p style="font-size: 14px; color: #777777;">
                    Jika Anda tidak meminta pengaturan ulang kata sandi, silakan abaikan email ini.
                </p>
            </td>
        </tr>
        <tr>
            <td
                style="background: #f4f4f4; text-align: center; padding: 15px; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                &copy; {{ date('Y') }} TrendToday. All rights reserved.
            </td>
        </tr>
    </table>
</body>

</html>
