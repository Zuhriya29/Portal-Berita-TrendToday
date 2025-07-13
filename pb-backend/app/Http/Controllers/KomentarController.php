<?php

namespace App\Http\Controllers;

use App\Models\komentar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KomentarController extends Controller
{

    public function ShowKomentar()
    {
        $komentar = komentar::with(['user', 'berita'])->get();

        return response()->json($komentar);
    }

    public function AddKomentar(Request $req)
    {
        $user = Auth::user(); // Ambil user yang sedang login

        $komentar = new komentar;
        $komentar->komentar = $req->input('komentar');
        $komentar->id_user = $user->id; // Isi kolom id_user
        $komentar->id_berita = $req->input('id_berita');
        $komentar->save();

        return response()->json([
            'message' => 'Komentar berhasil ditambahkan',
            'komentar' => $komentar
        ]);
    }


    public function ShowKomentarUserByBerita($id_berita)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated'
            ], 401);
        }

        $komentar = komentar::with(['berita', 'user']) // muat relasi berita dan user
            ->where('id_user', $user->id)
            ->where('id_berita', $id_berita)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $komentar
        ]);
    }



    public function ShowDetailKomentar($id)
    {
        $komentar = Komentar::with(['user', 'berita'])->find($id);

        if (!$komentar) {
            return response()->json([
                'message' => 'Komentar tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'komentar' => $komentar->komentar,
            'is_approved' => $komentar->is_approved,
            'detail' => $komentar // kalau mau detail lengkapnya juga
        ]);
    }


    public function UpdateKomentar($id, Request $req)
    {
        $komentar = komentar::find($id);
        if (!$komentar) {
            return response()->json(['message' => 'Komentar tidak ditemukan'], 404);
        }

        if ($req->filled('komentar')) {
            $komentar->komentar = $req->input('komentar');
        }

        $komentar->is_approved = $req->is_approved; // Tambahkan ini

        $komentar->save();

        return response()->json([
            'message' => 'Komentar berhasil diupdate',
            'data' => $komentar
        ]);
    }


    public function DeleteKomentar($id)
    {
        $result = komentar::where('id', $id)->delete();
        if ($result) {
            return response()->json(['message' => 'Komentar Berhasil Dihapus']);
        } else {
            return response()->json(['message' => 'Komentar Gagal Dihapus']);
        }
    }
}