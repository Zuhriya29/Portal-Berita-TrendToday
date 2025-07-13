<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background: #f9f9f9;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 40px;
            border-radius: 6px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #145B73;
        }

        p {
            font-size: 16px;
        }

        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #145B73;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }

        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #999;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Reset Password</h2>
        <p>Halo, Pengguna TrendToday</p>
        <p>Anda telah meminta untuk mengatur ulang kata sandi Anda. Klik tombol di bawah ini untuk membuat kata sandi
            baru:</p>
        <a href="http://localhost:5173/reset-password-admin/{{ $token }}" class="button">
            Reset Password
        </a>

        <p>Jika Anda tidak meminta pengaturan ulang kata sandi, silakan abaikan email ini.</p>

        <div class="footer">
            &copy; {{ date('Y') }} TrendToday. All rights reserved.
        </div>
    </div>
</body>

</html>