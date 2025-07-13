<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class ForgotPasswordController extends Controller
{
    public function ForgotPasswordUser(Request $request)
    {
        $request->validate([
            "email" => "required|email|exists:users"
        ]);

        $token = Str::random(65);

        DB::table("password_forgot")->insert([
            "email" => $request->email,
            "token" => $token,
            "created_at" => now(),
            "updated_at" => now(),

        ]);

        Mail::send("emails.forgotPassword", ["token" => $token], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject("Forgot Password");
        });

        return response()->json([
            "message" => "Link reset password sudah dikirim. Chek email anda",
            "redirect" => "/login-user"
        ], 200);
    }

    public function ForgotPasswordAdmin(Request $request)
    {
        $request->validate([
            "email" => "required|email|exists:users"
        ]);

        $token = Str::random(65);

        DB::table("password_forgot")->insert([
            "email" => $request->email,
            "token" => $token,
            "created_at" => now(),
            "updated_at" => now(),

        ]);

        Mail::send("emails.forgotPasswordAdmin", ["token" => $token], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject("Forgot Password");
        });

        return response()->json([
            "message" => "Link reset password sudah dikirim. Chek email anda",
            "redirect" => "/login-admin"
        ], 200);
    }

    public function ResetPasswordUser(Request $request)
    {
        $request->validate([
            "token" => "required",
            "email" => "required|email|exists:users",
            "password" => "required|confirmed"
        ]);

        $first = DB::table("password_forgot")->where("email", $request->email)
            ->where("token", $request->token)
            ->first();

        if (is_null($first)) {
            return back()->with("eror", "Terjadi Kesalahan");
        }

        $user = User::where("email", $request->email)->first();

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table("password_forgot")->where("email", $request->email)
            ->where("token", $request->token)
            ->delete();

         return response()->json([
        "message" => "Reset Password Berhasil.",
        "redirect" => "/login-user"
    ], 200);
    }

    public function ResetPasswordAdmin(Request $request)
    {
        $request->validate([
            "token" => "required",
            "email" => "required|email|exists:users",
            "password" => "required|confirmed"
        ]);

        $first = DB::table("password_forgot")->where("email", $request->email)
            ->where("token", $request->token)
            ->first();

        if (is_null($first)) {
            return back()->with("eror", "Terjadi Kesalahan");
        }

        $user = User::where("email", $request->email)->first();

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table("password_forgot")->where("email", $request->email)
            ->where("token", $request->token)
            ->delete();

         return response()->json([
        "message" => "Reset Password Berhasil.",
        "redirect" => "/login-admin"
    ], 200);
    }
}