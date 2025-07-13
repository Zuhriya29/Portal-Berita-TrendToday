import "../css/admin/detail-validasi-berita.css";
import React, { useState, useEffect } from "react";
import Layout from "../general/Layout";
import Loading from "../general/loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function DetailValidasiBerita() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hoverTerima, setHoverTerima] = useState(false);
  const [hoverTolak, setHoverTolak] = useState(false);

  const [judul_berita, setJudulBerita] = useState("");
  const [username, setUsername] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar_berita, setGambarBerita] = useState("");
  const [isi_berita, setIsiBerita] = useState("");
  const [updated_at, setUpdatedAt] = useState("");
  const [is_approved, setIsApproved] = useState("");

  useEffect(() => {
    console.log("Dari backend: is_approved =", is_approved);
    if (is_approved !== undefined && is_approved !== null) {
      setIsApproved(is_approved);
      setHoverTerima(is_approved === "1");
      setHoverTolak(is_approved === "3");
      localStorage.setItem(`status_approved_${id}`, is_approved);
    }
  }, [id, is_approved]);

  const handleApproveClick = (status) => {
    setIsApproved(status);
    localStorage.setItem(`status_approved_${id}`, status);
    setShowUbahModal(true);
  };

  // Ambil detail berita dari API
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch(
          `http://localhost:8000/api/ShowIsiBerita/${id}`
        );
        const data = await response.json();

        setJudulBerita(data.judul_berita || "");
        setUsername(data.user?.username || "");
        setNamaUser(data.user?.nama_user || "");
        setKategori(data.kategori?.kategori || "");
        setGambarBerita(data.gambar_berita || "");
        setIsiBerita(data.isi_berita || "");
        setUpdatedAt(data.updated_at || "");

        // Ambil dan simpan status approval ke localStorage + state
        const status = String(data.is_approved); // pastikan tipe string
        if (["0", "1", "3"].includes(status)) {
          setIsApproved(status);
          setHoverTerima(status === "1");
          setHoverTolak(status === "3");
          localStorage.setItem(`status_approved_${id}`, status);
        } else {
          console.warn("Status is_approved tidak valid:", status);
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false); // selesai loading
      }
    };

    fetchAdmin();
  }, [id]);

  // Update Berita
  const UpdateBerita = async () => {
    try {
      setIsUpdating(true);

      const formData = new FormData();
      formData.append("is_approved", is_approved); // pastikan isApproved diset sebelumnya

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/UpdateBerita/${id}?_method=PUT`, {
        method: "POST",
        body: formData,
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      toast.success("Berita berhasil diubah", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/validasi-berita");
      }, 2000);
    } catch (error) {
      console.error("Gagal mengupdate berita:", error);
      toast.error("Gagal mengupdate berita", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setIsUpdating(false);
      setShowUbahModal(false); // ✅ tutup modal
    }
  };

  const [showUbahModal, setShowUbahModal] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="atas-detail-validasi-berita">
        <Link to="/validasi-berita">
          <div className="kembali-dvb">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            <p>Kembali</p>
          </div>
        </Link>
        <div className="icon-detail-validasi-berita">
          <div
            className={`icon-danger ${is_approved === "3" ? "aktif" : ""}`}
            style={{
              marginRight: "30px",
              display: "flex",
              marginLeft: "30px",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoverTolak(true)}
            onMouseLeave={() => setHoverTolak(false)}
            onClick={() => handleApproveClick("3")}>
            {hoverTolak ? (
              // versi fill
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgb(151, 5, 5)"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg> // versi outline
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgb(151, 5, 5)"
                className="bi bi-x-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            )}
            <p style={{ color: "rgb(151, 5, 5)" }}>Ditolak</p>
          </div>
          <div
            className={`icon-terima ${is_approved === "1" ? "aktif" : ""}`}
            style={{
              marginRight: "30px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoverTerima(true)}
            onMouseLeave={() => setHoverTerima(false)}
            onClick={() => handleApproveClick("1")}>
            {hoverTerima ? (
              // versi fill
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="green"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            ) : (
              // versi outline
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="green"
                className="bi bi-check-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
            )}
            <p style={{ color: "green" }}>Diterima</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center judul-detail-vb-1">
        <h1 className="judul-detail-vb-2">{judul_berita}</h1>
        <p className="penulis-detail-vb">
          {new Date(updated_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })} |{" "}
          {nama_user || username} | {kategori}
        </p>
        <img
          src={"http://localhost:8000/storage/" + gambar_berita}
          alt="Berita"
        />
        <div
          className="isi-berita-dvb"
          dangerouslySetInnerHTML={{ __html: isi_berita }}></div>
      </div>

      {/* Modal Ubah */}
      <Modal
        show={showUbahModal}
        onHide={() => setShowUbahModal(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <p className="pesan-modal">Apakah anda yakin ingin mengubahnya?</p>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button className="danger" onClick={() => setShowUbahModal(false)}>
            Tidak
          </Button>
          <Button
            className={`button-modal ${isUpdating ? "loading-dots" : ""}`}
            onClick={UpdateBerita}
            disabled={isUpdating}>
            {isUpdating ? "Menyimpan..." : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default DetailValidasiBerita;
