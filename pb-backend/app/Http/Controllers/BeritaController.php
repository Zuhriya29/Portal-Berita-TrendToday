<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use Illuminate\Support\Facades\Auth;
use App\Models\ViewLog;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BeritaController extends Controller
{
    //
    public function AddBerita(Request $req)
    {
        $user = Auth::user(); // User yang sedang login

        $berita = new Berita;
        $berita->gambar_berita = $req->file('gambar_berita')->store('gambar_berita', 'public');
        $berita->judul_berita = $req->input('judul_berita');
        $berita->id_kategori = $req->input('id_kategori');
        $berita->isi_berita = $req->input('isi_berita');
        $berita->id_user = $user->id; // Ambil dari user login
        $berita->is_approved = 0; // default status "Menunggu Validasi"
        $berita->save();

        return response()->json([
            'message' => 'Berita berhasil ditambahkan',
            'berita' => $berita
        ]);
    }

    // show berita yang ditulis admin
    public function ShowBerita()
    {
        // Ambil berita yang ditulis oleh user dengan is_admin = 1, dan sertakan relasi user
        $berita = Berita::with('user') // ambil data user
            ->whereHas('user', function ($query) {
                $query->where('is_admin', 1);
            })
            ->with('user') // biar username bisa diakses
            ->get();

        return response()->json($berita);
    }

    //show berita yang ditulis semua user
    public function ShowBeritaAll()
    {
        // Ambil semua berita beserta relasi user dan kategori
        $berita = Berita::with(['user'])->get();

        return response()->json($berita);
    }

    //show semua berita yang sudah disetujui
    public function ShowBeritaAllGeneral()
    {
        // Ambil semua berita yang sudah disetujui (is_approved = 1) beserta relasi user dan kategori
        $berita = Berita::with(['user', 'kategori'])
            ->where('is_approved', 1)
            ->get();

        return response()->json($berita);
    }

    public function ShowBeritaByKategori($idKategori)
    {
        $berita = Berita::with(['user', 'kategori'])
            ->where('is_approved', 1)
            ->where('id_kategori', $idKategori)
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json($berita);
    }

    //show berita yang dipublish oleh user yang sedang login
    public function ShowBeritaUser()
    {
        // Pastikan user sudah login
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Ambil berita yang dipublish oleh user yang sedang login
        $berita = Berita::with('user')
            ->where('id_user', $user->id) // filter berdasarkan id user login
            ->get();

        return response()->json($berita);
    }

    //user berita yang punya komentar dari user login, sertakan penulis berita dan user komentar
    public function ShowBeritaKomentar()
    {
        $userId = Auth::id();

        // Ambil berita yang punya komentar dari user login, sertakan penulis berita dan user komentar
        $berita = Berita::with(['user', 'komentar' => function ($query) use ($userId) {
            $query->where('id_user', $userId)->with('user');
        }])
            ->whereHas('komentar', function ($query) use ($userId) {
                $query->where('id_user', $userId);
            })
            ->get();

        return response()->json($berita);
    }

    public function ShowIsiBerita($id)
    {
        // Ambil berita beserta relasi lengkap
        $berita = Berita::with(['user', 'kategori', 'komentar', 'komentar.user'])->findOrFail($id);

        // Update total_view tanpa menyentuh updated_at
        $berita->timestamps = false;
        $berita->increment('total_view');
        $berita->timestamps = true;

        return response()->json($berita);
    }


    public function UpdateBerita($id, Request $req)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json(['message' => 'Berita tidak ditemukan'], 404);
        }

        // Cek apakah ada file gambar yang dikirim
        if ($req->hasFile('gambar_berita')) {
            $gambarPath = $req->file('gambar_berita')->store('gambar_berita', 'public');
            $berita->gambar_berita = $gambarPath;
        }

        // Update field lain jika ada
        if ($req->filled('judul_berita')) {
            $berita->judul_berita = $req->input('judul_berita');
        }

        if ($req->filled('id_kategori')) {
            $berita->id_kategori = $req->input('id_kategori');
        }

        if ($req->filled('isi_berita')) {
            $berita->isi_berita = $req->input('isi_berita');
        }

        $berita->is_approved = $req->is_approved; // Tambahkan ini

        $berita->save();

        return response()->json([
            'message' => 'Berita berhasil diupdate',
            'data' => $berita
        ]);
    }

    public function DeleteBerita($id)
    {
        $result = Berita::where('id', $id)->delete();
        if ($result) {
            return response()->json(['message' => 'Berita Berhasil Dihapus']);
        } else {
            return response()->json(['message' => 'Berita Gagal Dihapus']);
        }
    }

    public function getTotalBerita()
    {
        $total = Berita::where('is_approved', 1)->count();

        return response()->json(['total' => $total]);
    }
    public function getTotalBeritaBelumValidasi()
    {
        $total = Berita::where('is_approved', 0)->count();

        return response()->json(['total' => $total]);
    }

    public function getTotalBeritaBulanIni()
    {
        $total = Berita::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->whereIn('is_approved', [0, 1])
            ->count();

        return response()->json(['total' => $total]);
    }

    public function getStatistikKategori()
    {
        $statistikKategori = DB::table('kategori_beritas')
            ->leftJoin('beritas', 'kategori_beritas.id', '=',  'beritas.id_kategori')
            ->select(
                'kategori_beritas.kategori as kategori',
                DB::raw('COALESCE(SUM(beritas.total_view), 0) as total_pengunjung')
            )
            ->groupBy('kategori_beritas.kategori')
            ->orderBy('kategori_beritas.id')
            ->get();

        return response()->json($statistikKategori);
    }

    public function getStatistikPengunjungBulanan()
    {
        $result = DB::table('beritas')
            ->select(
                DB::raw('MONTH(created_at) as bulan'),
                DB::raw('SUM(total_view) as total_pengunjung')
            )
            ->whereYear('created_at', now()->year) // hanya tahun ini
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('bulan')
            ->get();

        // Inisialisasi semua bulan
        $statistik = [];
        for ($i = 1; $i <= 12; $i++) {
            $statistik[$i] = 0;
        }

        // Isi data dari DB ke array
        foreach ($result as $row) {
            $statistik[$row->bulan] = $row->total_pengunjung;
        }

        // Buat array final dengan format [{ bulan: 1, total_pengunjung: ... }, ...]
        $final = [];
        foreach ($statistik as $bulan => $total) {
            $final[] = [
                'bulan' => $bulan,
                'total_pengunjung' => $total,
            ];
        }

        return response()->json($final);
    }
}