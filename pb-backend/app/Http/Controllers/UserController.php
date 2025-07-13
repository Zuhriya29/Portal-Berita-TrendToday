<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PendingUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class UserController extends Controller
{
    public function SignupUser(request $req)
    {
        $req->validate(
            [
                'username' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed',
            ],
            [
                'email.unique' => 'Alamat email sudah terdaftar. Silakan gunakan email lain.',
            ]
        );

        $otp = rand(100000, 999999);

        $user = PendingUser::create([
            'username' => $req->username,
            'email' => $req->email,
            'password' => bcrypt($req->password),
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        // Kirim OTP dengan Mail::send
        Mail::send('emails.signupOtp', ['otp' => $otp], function ($message) use ($req) {
            $message->to($req->email);
            $message->subject('Kode OTP Pendaftaran');
        });

        session(['otp_email' => $req->email]);

        return response()->json([
            'message' => 'Kode OTP berhasil dikirim melalui email',
            'redirect' => '/verifikasi-otp'
        ]);
        /* $user = new User;
        $user->username = $req->input('username');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return $user; */
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $email = session('otp_email');

        $pending = PendingUser::where('email', $email)->firstOrFail();

        if ($pending->otp !== $request->otp) {
            return back()->withErrors(['otp' => 'OTP Tidak Ditemukan']);
        }

        if (Carbon::now()->isAfter($pending->otp_expires_at)) {
            return back()->withErrors(['otp' => 'OTP Tidak Berlaku']);
        }

        // Buat user permanen
        $user = User::create([
            'username' => $pending->username,
            'email' => $pending->email,
            'password' => $pending->password, // sudah hashed
        ]);

        $pending->delete();

        Auth::login($user);

        return response()->json([
            'message' => 'Verifikasi OTP Berhasil. Daftar Akun Sukses',
            'redirect' => '/login-user'
        ]);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        $pending = User::where('email', $request->email)->first();
        $otp = rand(100000, 999999);

        $pending->update([
            'otp' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(10)
        ]);

        // Kirim OTP pakai Mail::send
        Mail::send('emails.signupOtp', ['otp' => $otp], function ($message) use ($pending) {
            $message->to($pending->email);
            $message->subject('Kode OTP Baru Pendaftaran');
        });

        return back()->with('success', 'Kode OTP baru berhasil dikirim melalui alamat email');
    }

    // Function untuk Login Admin
    public function LoginUser(Request $req)
    {
        // Validasi request langsung tanpa menyimpan ke variabel
        $req->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Cek user berdasarkan email
        $user = User::where('email', $req->email)->first();  // Perbaiki bagian ini

        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json(['message' => 'Data Tidak Valid atau Mungkin Anda Belum Punya Akun'], 401);
        }

        // Jika pakai Sanctum untuk token
        $token = $user->createToken('UserAuthToken')->plainTextToken;
        return response()->json([
            'message' => 'Login Berhasil',
            'token' => $token,
            "user" => [
                "id" => $user->id,
                "email" => $user->email,
                "username" => $user->username,
                'nama_user' => $user->nama_user,
            ]
        ], 200);
    }


    public function LoginAdmin(Request $req)
    {
        // Validasi request langsung tanpa menyimpan ke variabel
        $req->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Cek user dengan role admin
        $user = User::where('email', $req->email)->where('is_admin', '1')->first();

        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json(['message' => 'Data Tidak Valid atau Mungkin Anda Bukan Admin.'], 401);
        }

        // Jika pakai Sanctum untuk token
        $token = $user->createToken('AdminAuthToken')->plainTextToken;
        return response()->json([
            'message' => 'Login Berhasil',
            'token' => $token,
            "user" => [
                "email" => $user->email,
                "username" => $user->username,
                "is_admin" => $user->is_admin
            ]
        ], 200);
    }

    // Mengambil semua admin
    public function ShowAdmin()
    {
        $admins = User::where('is_admin', '1')->get();
        return response()->json($admins);
    }

    // Menyimpan admin baru
    public function AddAdmin(Request $req)
    {
        $admin = new User;
        $admin->username = $req->input('username');
        $admin->is_admin = 1; // Set langsung, tidak perlu ambil dari request
        $admin->email = $req->input('email');
        $admin->password = Hash::make($req->input('password'));
        $admin->save();
        return $req->input();
    }

    // Mendapatkan detail admin berdasarkan ID
    public function DetailAdmin($id)
    {
        return User::find($id);
    }

    public function UpdateAdmin($id, Request $req)
    {
        /* return $req->input(); */
        $admin = User::find($id);
        $admin->is_admin = $req->input('is_admin');
        $admin->username = $req->input('username');
        $admin->email = $req->input('email');
        $admin->save();
        return $req->input();
    }

    public function UpdateUser($id, Request $req)
    {
        /* return $req->input(); */
        $user = User::find($id);
        $user->username = $req->input('username');
        $user->nama_user = $req->input('nama_user');
        $user->no_hp = $req->input('no_hp');
        $user->email = $req->input('email');
        $user->jenis_kelamin = $req->input('jenis_kelamin');
        $user->tgl_lahir = $req->input('tgl_lahir');
        $user->save();
        return $req->input();
    }

    public function DeleteAdmin($id)
    {
        $result = User::where('id', $id)->delete();
        if ($result) {
            return response()->json(['message' => 'Admin Berhasil Dihapus']);
        } else {
            return response()->json(['message' => 'Admin Gagal Dihapus']);
        }
    }

    // Mengambil semua user
    public function ShowUser()
    {
        $users = User::where('is_admin', '0')->get();
        return response()->json($users);
    }

    // Mendapatkan detail user  berdasarkan ID
    public function DetailUser($id)
    {
        return User::find($id);
    }

    public function getTotalUser()
    {
        $total = User::where('is_admin', 0)->count();

        return response()->json(['total' => $total]);
    }

    public function getTotalUserBulanIni()
    {
        $total = User::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->where('is_admin', 0)
            ->count();

        return response()->json(['total' => $total]);
    }
}