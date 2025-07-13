<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Iklan;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class IklanController extends Controller
{
    //

    public function ShowIklan()
    {
        $today = \Carbon\Carbon::today();

        Iklan::where('is_tayang', '!=', 3)
            ->whereDate('new_date', '<=', $today)
            ->update(['is_tayang' => 3]);

        $iklan = Iklan::with('waktu_tayang')->get();

        return response()->json($iklan);
    }

    public function ShowIklan2()
    {
        $today = \Carbon\Carbon::today();

        Iklan::where('is_tayang', '!=', 3)
            ->whereDate('new_date', '<=', $today)
            ->update(['is_tayang' => 3]);

        $iklan = Iklan::with('waktu_tayang')
            ->where('is_tayang', 1)
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json($iklan);
    }

    public function AddIklan(Request $req)
    {
        $iklan = new Iklan;
        $iklan->gambar_iklan = $req->file('gambar_iklan')->store('gambar_iklan', 'public');
        $iklan->nama_brand = $req->input('nama_brand');
        $iklan->tagline = $req->input('tagline');
        $iklan->id_waktu_tayang = $req->input('id_waktu_tayang');
        $iklan->is_tayang = 0; // default status "Menunggu Validasi"
        $iklan->save();

        return response()->json([
            'message' => 'Iklan berhasil ditambahkan',
            'iklan' => $iklan
        ]);
    }

    public function ShowDetailIklan($id)
    {
        return Iklan::with(['waktu_tayang'])->find($id);
    }

    public function UpdateIklan($id, Request $req)
    {
        $iklan = Iklan::find($id);
        if (!$iklan) {
            return response()->json(['message' => 'iklan tidak ditemukan'], 404);
        }

        // Cek apakah ada file gambar yang dikirim
        if ($req->hasFile('gambar_iklan')) {
            $gambarPath = $req->file('gambar_iklan')->store('gambar_iklan', 'public');
            $iklan->gambar_iklan = $gambarPath;
        }

        // Update field lain jika ada
        if ($req->filled('nama_brand')) {
            $iklan->nama_brand = $req->input('nama_brand');
        }

        if ($req->filled('id_waktu_tayang')) {
            $iklan->id_waktu_tayang = $req->input('id_waktu_tayang');
        }

        if ($req->filled('tagline')) {
            $iklan->tagline = $req->input('tagline');
        }

        $iklan->is_tayang = $req->is_tayang; // Tambahkan ini

        // Jika is_tayang diubah menjadi 1 dan ada waktu_tayang, maka set new_date
        if ($iklan->is_tayang == 1 && $iklan->waktu_tayang && $iklan->waktu_tayang->waktu_tayang && is_numeric($iklan->waktu_tayang->waktu_tayang)) {
            $waktu_tayang = (int) $iklan->waktu_tayang->waktu_tayang; // Ambil waktu_tayang dari relasi
            $updatedAt = $iklan->updated_at ? \Carbon\Carbon::parse($iklan->updated_at) : \Carbon\Carbon::now(); // Pastikan $updated_at adalah Carbon instance
            $iklan->new_date = $updatedAt->addDays($waktu_tayang); // Tambahkan waktu_tayang (dalam hari)
        }

        $iklan->save();

        return response()->json([
            'message' => 'iklan berhasil diupdate',
            'data' => $iklan
        ]);
    }

    public function DeleteIklan($id)
    {
        $result = Iklan::where('id', $id)->delete();
        if ($result) {
            return response()->json(['message' => 'Iklan Berhasil Dihapus']);
        } else {
            return response()->json(['message' => 'Iklan Gagal Dihapus']);
        }
    }

    public function getTotalIklan()
    {
        $total = Iklan::whereIn('is_tayang', [0, 1, 3])->count();

        return response()->json(['total' => $total]);
    }
    public function getTotalIklanSedangTayang()
    {
        $total = Iklan::where('is_tayang', 1)->count();

        return response()->json(['total' => $total]);
    }

    public function getTotalIklanBulanIni()
    {
        $total = Iklan::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->whereIn('is_tayang', [0, 1, 3])
            ->count();

        return response()->json(['total' => $total]);
    }

    public function getStatistikIklanBulanan()
    {
        $result = DB::table('iklans')
            ->select(
                DB::raw('MONTH(created_at) as bulan'),
                DB::raw('COUNT(*) as total_iklan')
            )
            ->whereYear('created_at', now()->year) // Filter hanya tahun berjalan
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('bulan')
            ->get();

        // Lengkapi 12 bulan
        $statistik = [];
        for ($i = 1; $i <= 12; $i++) {
            $statistik[$i] = 0;
        }

        foreach ($result as $row) {
            $statistik[$row->bulan] = $row->total_iklan;
        }

        $final = [];
        foreach ($statistik as $bulan => $total) {
            $final[] = [
                'bulan' => $bulan,
                'total_iklan' => $total,
            ];
        }

        return response()->json($final);
    }
}