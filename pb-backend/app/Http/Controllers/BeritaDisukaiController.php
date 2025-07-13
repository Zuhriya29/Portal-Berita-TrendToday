<?php

namespace App\Http\Controllers;

use App\Models\BeritaDisukai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class BeritaDisukaiController extends Controller
{
    public function ShowGeneral()
    {
        $likes = DB::table('berita_disukai')
            ->select('berita_id', DB::raw('COUNT(*) as total_like'))
            ->groupBy('berita_id')
            ->get();

        return response()->json($likes);
    }
    //show saat user log in
    public function ShowAll()
    {
        // Pastikan user sudah login
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Log::info("User yang login: " . $user->id);

        // Ambil berita yang dipublish oleh user yang sedang login
        $disukai = BeritaDisukai::with(['berita.user']) // 🟢 memuat penulis berita
            ->where('user_id', $user->id)
            ->get();


        return response()->json($disukai);
    }

    public function isLikedByUser($id)
    {
        $user = auth()->user();

        $like = BeritaDisukai::where('berita_id', $id)
            ->where('user_id', $user->id)
            ->first();

        return response()->json([
            'liked' => !!$like,
            'like_id' => $like ? $like->id : null
        ]);
    }

    public function like($id)
    {
        $user = auth()->user();

        // Cek apakah user sudah like berita ini
        $existingLike = BeritaDisukai::where('berita_id', $id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingLike) {
            return response()->json(['success' => false, 'message' => 'User sudah like berita ini.']);
        }

        // Kalau belum like, buat like baru
        $like = BeritaDisukai::create([
            'berita_id' => $id,
            'user_id' => $user->id
        ]);

        return response()->json(['success' => true, 'like_id' => $like->id]);
    }


    public function unlike($likeId)
    {
        try {
            $user = auth()->user();

            // Validasi login dulu, untuk menghindari error jika user null
            if (!$user) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            // Cari like berdasarkan ID dan pastikan milik user yang sedang login
            $like = BeritaDisukai::where('id', $likeId)
                ->where('user_id', $user->id)
                ->first();

            if (!$like) {
                return response()->json(['message' => 'Data tidak ditemukan atau bukan milik Anda'], 404);
            }

            // Hapus like
            $like->delete();

            return response()->json(['message' => 'Sukses unlike'], 200);
        } catch (\Exception $e) {
            Log::error('Gagal unlike berita: ' . $e->getMessage());

            return response()->json(['message' => 'Terjadi kesalahan saat unlike'], 500);
        }
    }
}