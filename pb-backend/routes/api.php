<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\KomentarController;
use App\Http\Controllers\IklanController;
use App\Http\Controllers\WaktuTayangController;
use App\Http\Controllers\BeritaDisukaiController;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/SignupUser', [UserController::class, 'SignupUser']);

Route::post('/verifikasi-otp', [UserController::class, 'verifyOtp']);
Route::post('/resend-otp', [UserController::class, 'resendOtp']);

Route::post('/LoginAdmin', [UserController::class, 'LoginAdmin']);
Route::post('/LoginUser', [UserController::class, 'LoginUser']);

Route::post('/forgot-password', [ForgotPasswordController::class, 'ForgotPasswordUser']);
Route::post('/forgot-password-admin', [ForgotPasswordController::class, 'ForgotPasswordAdmin']);
Route::get('/reset-password/{token}', [ForgotPasswordController::class, 'ForgotPasswordToken']);
Route::post('/reset-password', [ForgotPasswordController::class, 'ResetPasswordUser']);
Route::post('/reset-password-admin', [ForgotPasswordController::class, 'ResetPasswordAdmin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/berita/{id}/liked', [BeritaDisukaiController::class, 'isLikedByUser']);
    Route::post('/berita/{id}/like', [BeritaDisukaiController::class, 'like']);
    Route::delete('/berita-disukai/{id}/unlike', [BeritaDisukaiController::class, 'unlike']);
    Route::get('/all-berita-disukai', [BeritaDisukaiController::class, 'ShowAll']);
});
Route::get('/berita-disukai-general', [BeritaDisukaiController::class, 'ShowGeneral']);


Route::post('/AddAdmin', [UserController::class, 'AddAdmin']);
Route::get('/ShowAdmin', [UserController::class, 'ShowAdmin']);
Route::get('/DetailAdmin/{id}', [UserController::class, 'DetailAdmin']);
Route::delete('/DeleteAdmin/{id}', [UserController::class, 'DeleteAdmin']);
Route::put('/UpdateAdmin/{id}', [UserController::class, 'UpdateAdmin']);

Route::get('/ShowUser', [UserController::class, 'ShowUser']);
Route::get('/DetailUser/{id}', [UserController::class, 'DetailUser']);
Route::put('/UpdateUser/{id}', [UserController::class, 'UpdateUser']);

Route::get('/total-user', [UserController::class, 'getTotalUser']);
Route::get('/total-user-bulan-ini', [UserController::class, 'getTotalUserBulanIni']);

Route::middleware('auth:sanctum')->post('/AddBerita', [BeritaController::class, 'AddBerita']);
Route::get('/ShowBerita', [BeritaController::class, 'ShowBerita']);
Route::get('/ShowBeritaAll', [BeritaController::class, 'ShowBeritaAll']);
Route::get('/ShowBeritaAllGeneral', [BeritaController::class, 'ShowBeritaAllGeneral']);
Route::get('/ShowBeritaByKategori/{id}', [BeritaController::class, 'ShowBeritaByKategori']);
Route::middleware('auth:sanctum')->get('/ShowBeritaKomentar', [BeritaController::class, 'ShowBeritaKomentar']);
Route::middleware('auth:sanctum')->get('/ShowBeritaUser', [BeritaController::class, 'ShowBeritaUser']);
Route::get('/ShowIsiBerita/{id}', [BeritaController::class, 'ShowIsiBerita']);
Route::put('/UpdateBerita/{id}', [BeritaController::class, 'UpdateBerita']);
Route::delete('/DeleteBerita/{id}', [BeritaController::class, 'DeleteBerita']);

Route::get('/total-berita', [BeritaController::class, 'getTotalBerita']);
Route::get('/total-berita-belum-validasi', [BeritaController::class, 'getTotalBeritaBelumValidasi']);
Route::get('/total-berita-bulan-ini', [BeritaController::class, 'getTotalBeritaBulanIni']);
Route::get('/statistik-kategori', [BeritaController::class, 'getStatistikKategori']);
Route::get('/statistik-pengunjung-bulanan', [BeritaController::class, 'getStatistikPengunjungBulanan']);


Route::put('/UpdateKomentar/{id}', [KomentarController::class, 'UpdateKomentar']);
Route::get('/ShowKomentar', [KomentarController::class, 'ShowKomentar']);
Route::post('/AddKomentar', [KomentarController::class, 'AddKomentar'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/ShowKomentarUserByBerita/{id_berita}', [KomentarController::class, 'ShowKomentarUserByBerita']);
Route::get('/ShowDetailKomentar/{id}', [KomentarController::class, 'ShowDetailKomentar']);
Route::delete('/DeleteKomentar/{id}', [KomentarController::class, 'DeleteKomentar']);

Route::get('/ShowIklan', [IklanController::class, 'ShowIklan']);
Route::get('/ShowIklan2', [IklanController::class, 'ShowIklan2']);
Route::post('/AddIklan', [IklanController::class, 'AddIklan']);
Route::get('/ShowDetailIklan/{id}', [IklanController::class, 'ShowDetailIklan']);
Route::put('/UpdateIklan/{id}', [IklanController::class, 'UpdateIklan']);
Route::delete('/DeleteIklan/{id}', [IklanController::class, 'DeleteIklan']);

Route::get('/total-iklan', [IklanController::class, 'getTotalIklan']);
Route::get('/total-iklan-sedang-tayang', [IklanController::class, 'getTotalIklanSedangTayang']);
Route::get('/total-iklan-bulan-ini', [IklanController::class, 'getTotalIklanBulanIni']);
Route::get('/statistik-iklan-bulanan', [IklanController::class, 'getStatistikIklanBulanan']);

Route::get('/ShowKategori', [KategoriController::class, 'index']);
Route::post('/AddKategori', [KategoriController::class, 'AddKategori']);
Route::delete('/DeleteKategori/{id}', [KategoriController::class, 'DeleteKategori']);
Route::put('/UpdateKategori/{id}', [KategoriController::class, 'UpdateKategori']);

Route::get('/ShowWaktuTayang', [WaktuTayangController::class, 'index']);
Route::post('/AddWaktuTayang', [WaktuTayangController::class, 'AddWaktuTayang']);
Route::delete('/DeleteWaktuTayang/{id}', [WaktuTayangController::class, 'DeleteWaktuTayang']);
Route::put('/UpdateWaktuTayang/{id}', [WaktuTayangController::class, 'UpdateWaktuTayang']);