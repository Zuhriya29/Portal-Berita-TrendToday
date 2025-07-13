import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/admin"; // Halaman tujuan
import LogInAdmin from "./admin/login-admin"; // Halaman tujuan
import InformasiAdmin from "./admin/informasi-admin"; // Halaman tujuan
import TambahAdmin from "./admin/tambah-admin"; // Halaman tujuan
import DetailAdmin from "./admin/detail-admin"; // Halaman tujuan
import InformasiUser from "./admin/informasi-user"; // Halaman tujuan
import DetailUser from "./admin/detail-user"; // Halaman tujuan
import ValidasiBerita from "./admin/validasi-berita"; // Halaman tujuan
import DetailValidasiBerita from "./admin/detail-validasi-berita"; // Halaman tujuan
import ValidasiKomentar from "./admin/validasi-komentar"; // Halaman tujuan
import DetailValidasiKomentar from "./admin/detail-validasi-komentar"; // Halaman tujuan
import PublishBeritaAdmin from "./admin/publish-berita-admin"; // Halaman tujuan
import TambahBeritaAdmin from "./admin/tambah-berita-admin"; // Halaman tujuan
import LihatBeritaAdmin from "./admin/lihat-berita-admin"; // Halaman tujuan
import DetailBeritaAdmin from "./admin/detail-berita-admin"; // Halaman tujuan
import PengaturanIklan from "./admin/pengaturan-iklan"; // Halaman tujuan
import TambahIklan from "./admin/tambah-iklan"; // Halaman tujuan
import DetailIklan from "./admin/detail-iklan"; // Halaman tujuan
import PengaturanLain from "./admin/pengaturan-lain"; // Halaman tujuan
import ProtectedAdmin from "./admin/protected-admin"; // Halaman tujuan
import ForgotPasswordAdmin from "./admin/forgot-password-admin"; // Halaman tujuan
import ResetPasswordAdmin from "./admin/reset-password-admin"; // Halaman tujuan

import ForgotPasswordUser from "./user/forgot-password-user"; // Halaman tujuan
import ResetPasswordUser from "./user/reset-password-user"; // Halaman tujuan
import ProtectedUser from "./user/protected-user"; // Halaman tujuan
import SignupUser from "./user/signup-user"; // Halaman tujuan
import LoginUser from "./user/login-user"; // Halaman tujuan
import Beranda from "./user/beranda"; // Halaman tujuan

import { isLoggedIn, getUserId } from "./user/authUtils";
import DetailBeritaGeneral from "./user/detail-berita-general"; // Halaman tujuan

import PencarianBeritaBeranda from "./user/pencarian-berita-beranda"; // Halaman tujuan
import EditProfilUser from "./user/edit-profil-user"; // Halaman tujuan
import PublishBeritaUser from "./user/publish-berita-user";
import TambahBeritaUser from "./user/tambah-berita-user"; // Halaman tujuan
import LihatBeritaUser from "./user/lihat-berita-user";
import DetailBeritaUser from "./user/detail-berita-user";
import BeritaDisukai from "./user/berita-disukai";
import KomentarBerita from "./user/komentar-berita";
import DetailKomentar from "./user/detail-komentar";
import EditKomentar from "./user/edit-komentar";
import EditKomentarAdmin from "./admin/edit-komentar-admin";
import VerifikasiOTP from "./user/verifikasi-otp";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/forgot-password-admin" element={<ForgotPasswordAdmin />} />
            <Route path="/reset-password-admin/:token" element={<ResetPasswordAdmin />} />
            <Route path="/login-admin" element={<LogInAdmin />} />
            <Route path="/admin" element={<ProtectedAdmin Cmp={Admin} />} />
            <Route path="/informasi-admin" element={<ProtectedAdmin Cmp={InformasiAdmin} />} />
            <Route path="/tambah-admin" element={<ProtectedAdmin Cmp={TambahAdmin} />} />
            <Route path="/detail-admin/:id" element={<ProtectedAdmin Cmp={DetailAdmin} />} />
            <Route path="/informasi-user" element={<ProtectedAdmin Cmp={InformasiUser} />} />
            <Route path="/detail-user/:id" element={<ProtectedAdmin Cmp={DetailUser} />} />
            <Route path="/validasi-berita" element={<ProtectedAdmin Cmp={ValidasiBerita} />} />
            <Route path="/detail-validasi-berita/:id" element={<ProtectedAdmin Cmp={DetailValidasiBerita} />} />
            <Route path="/validasi-komentar" element={<ProtectedAdmin Cmp={ValidasiKomentar} />} />
            <Route path="/detail-validasi-komentar/:id" element={<ProtectedAdmin Cmp={DetailValidasiKomentar} />} />
            <Route path="/edit-komentar-admin/:id" element={<ProtectedAdmin Cmp={EditKomentarAdmin} />} />
            <Route path="/publish-berita-admin" element={<ProtectedAdmin Cmp={PublishBeritaAdmin} />} />
            <Route path="/tambah-berita-admin" element={<ProtectedAdmin Cmp={TambahBeritaAdmin} />} />
            <Route path="/lihat-berita-admin/:id" element={<ProtectedAdmin Cmp={LihatBeritaAdmin} />} />
            <Route path="/detail-berita-admin/:id" element={<ProtectedAdmin Cmp={DetailBeritaAdmin} />} />
            <Route path="/pengaturan-iklan" element={<ProtectedAdmin Cmp={PengaturanIklan} />} />
            <Route path="/pengaturan-lain" element={<ProtectedAdmin Cmp={PengaturanLain} />} />
            <Route path="/tambah-iklan" element={<ProtectedAdmin Cmp={TambahIklan} />} />
            <Route path="/detail-iklan/:id" element={<ProtectedAdmin Cmp={DetailIklan} />} />
            <Route path="/forgot-password-user" element={<ForgotPasswordUser />} />
            <Route path="/reset-password-user/:token" element={<ResetPasswordUser />} />
            <Route path="/signup-user" element={<SignupUser />} />
            <Route path="/verifikasi-otp" element={<VerifikasiOTP />} />
            <Route path="/login-user" element={<LoginUser />} />
            <Route path="/" element={<Beranda />} />
            <Route path="/detail-berita-general/:id" element={<DetailBeritaGeneral isLoggedIn={isLoggedIn()} userId={getUserId()} />} />
            <Route path="/pencarian-berita-beranda" element={<PencarianBeritaBeranda />} />
            <Route path="/edit-profil-user/:id" element={<ProtectedUser Cmp={EditProfilUser} />} />
            <Route path="/publish-berita-user/:id" element={<ProtectedUser Cmp={PublishBeritaUser} />} />
            <Route path="/tambah-berita-user/" element={<ProtectedUser Cmp={TambahBeritaUser} />} />
            <Route path="/lihat-berita-user/:id" element={<ProtectedUser Cmp={LihatBeritaUser} />} />
            <Route path="/detail-berita-user/:id" element={<ProtectedUser Cmp={DetailBeritaUser} />} />
            <Route path="/berita-disukai/:id" element={<ProtectedUser Cmp={BeritaDisukai} />} />
            <Route path="/komentar-berita/:id" element={<ProtectedUser Cmp={KomentarBerita} />} />
            <Route path="/detail-komentar/:id" element={<ProtectedUser Cmp={DetailKomentar} />} />
            <Route path="/edit-komentar/:id" element={<ProtectedUser Cmp={EditKomentar} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
