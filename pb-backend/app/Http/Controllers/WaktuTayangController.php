<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\WaktuTayang;
class WaktuTayangController extends Controller
{
    //

    public function index()
    {
        $waktutayang = WaktuTayang::orderBy('waktu_tayang', 'asc')->get(); // Ambil semua data dari tabel kategoris
        return response()->json($waktutayang); // Tampilkan dalam bentuk JSON (API)
    }

    public function AddWaktuTayang(Request $req)
    {
        $waktu_tayang = new WaktuTayang;
        $waktu_tayang->waktu_tayang = $req->input('waktu_tayang');
        $waktu_tayang->save();

        return response()->json([
            'message' => 'waktu tayang berhasil ditambahkan',
            'waktu_tayang' => $waktu_tayang
        ]);
    }

    public function DeleteWaktuTayang($id)
    {
        $result = WaktuTayang::where('id', $id)->delete();
        if ($result) {
            return response()->json(['message' => 'Waktu Tayang Berhasil Dihapus']);
        } else {
            return response()->json(['message' => 'Waktu Tayang Gagal Dihapus']);
        }
    }

    public function UpdateWaktuTayang($id, Request $req)
    {
        $waktu_tayang = WaktuTayang::find($id);
        if (!$waktu_tayang) {
            return response()->json(['message' => 'Waktu tayang tidak ditemukan'], 404);
        }

        // Update field lain jika ada
        if ($req->filled('waktu_tayang')) {
            $waktu_tayang->waktu_tayang = $req->input('waktu_tayang');
        }

        $waktu_tayang->save();

        return response()->json([
            'message' => 'Waktu tayang berhasil diupdate',
            'data' => $waktu_tayang
        ]);
    }
}