<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\kategori_berita;

class KategoriController extends Controller
{
    //

    public function index()
    {
        $kategoris = kategori_berita::all(); // Ambil semua data dari tabel kategoris
        return response()->json($kategoris); // Tampilkan dalam bentuk JSON (API)
    }

    public function AddKategori(Request $req)
    {
        $kategori = new kategori_berita;
        $kategori->gambar_kategori = $req->file('gambar_kategori')->store('gambar_kategori', 'public');
        $kategori->kategori = $req->input('kategori');
        $kategori->save();

        return response()->json([
        'message' => 'Kategori berhasil ditambahkan',
        'data' => $kategori, // ✅ pastikan ini dikembalikan
    ]);
    }

    public function DeleteKategori($id)
    {
        $result = kategori_berita::where('id', $id)->delete();
        if ($result) {
            return response()->json(['message' => 'Kategori Berhasil Dihapus']);
        } else {
            return response()->json(['message' => 'Kategori Gagal Dihapus']);
        }
    }

    public function UpdateKategori($id, Request $req)
    {
        $Kategori = kategori_berita::find($id);
        if (!$Kategori) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        // Cek apakah ada file gambar yang dikirim
        if ($req->hasFile('gambar_kategori')) {
            $gambarPath = $req->file('gambar_kategori')->store('gambar_kategori', 'public');
            $Kategori->gambar_kategori = $gambarPath;
        }

        // Update field lain jika ada
        if ($req->filled('kategori')) {
            $Kategori->kategori = $req->input('kategori');
        }

        $Kategori->save();

        return response()->json([
            'message' => 'Kategori berhasil diupdate',
            'data' => $Kategori
        ]);
    }
}