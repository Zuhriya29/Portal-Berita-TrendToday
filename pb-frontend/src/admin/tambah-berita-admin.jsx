import "../css/admin/tambah-berita-admin.css";
import React, { useRef, useState, useEffect } from "react";
import Layout from "../general/Layout";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function TambahBeritaAdmin() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: "50px", height: "50px" });
  const [isHovered, setIsHovered] = useState(false);

  const [gambar_berita, SetGambarBerita] = useState("");
  const [judul_berita, SetJudulBerita] = useState("");
  const [id_kategori, SetIdKategori] = useState("");
  const [isi_berita, SetIsiBerita] = useState("");

  const { quill, quillRef } = useQuill();
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        SetIsiBerita(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef]);

  const [dataKategori, setDataKategori] = useState([]);

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [existingTitles, setExistingTitles] = useState([]);

  useEffect(() => {
    const fetchJudulBerita = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ShowBerita");
        const data = await response.json();
        const titles = data.map((item) =>
          item.judul_berita.toLowerCase().trim()
        );
        setExistingTitles(titles);
      } catch (error) {
        console.error("Gagal mengambil judul berita:", error);
      }
    };

    fetchJudulBerita();
  }, []);

  // Fetch kategori berita
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ShowKategori");
        const result = await response.json();
        setDataKategori(result);
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      }
    };

    fetchKategori();
  }, []);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      SetGambarBerita(file);
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setImageSize({ width: `${img.width}px`, height: `${img.height}px` });
        setSelectedImage(imageUrl);
      };
    }
  };

  const addBerita = async () => {
    if (!gambar_berita || !judul_berita || !id_kategori || !isi_berita) {
      setModalMessage(
        "Semua kolom wajib diisi. Mohon lengkapi formulir terlebih dahulu."
      );
      setShowModal(true);
      return;
    }

    // 🔒 Validasi judul sudah digunakan (pindahkan ke awal sebelum fetch)
    if (existingTitles.includes(judul_berita.trim().toLowerCase())) {
      setModalMessage("Judul berita sudah digunakan. Gunakan judul lain.");
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("gambar_berita", gambar_berita);
    formData.append("judul_berita", judul_berita);
    formData.append("id_kategori", id_kategori);
    formData.append("isi_berita", isi_berita);

    const token = localStorage.getItem("token");

    setIsLoading(true);
    try {
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      const response = await fetch("http://localhost:8000/api/AddBerita", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("ta-berita-admin", JSON.stringify(result));
        toast.success("Berita berhasil ditambahkan", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/publish-berita-admin");
        }, 2000);
      } else {
        setModalMessage(
          result.message || "Terjadi kesalahan saat menambahkan berita."
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="utama-tba">
        <Link to="/publish-berita-admin">
          <div className="kembali-tba">
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
        <h1>Tambah Berita</h1>
        {/* Tombol yang bisa diklik, jika ada gambar tampilkan gambar */}
        <div
          className="tambah-gambar-berita-admin"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "relative",
            cursor: "pointer",
            width: selectedImage ? imageSize.width : "80vw",
            height: selectedImage ? imageSize.height : "35vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: selectedImage ? "transparent" : "white",
            border: selectedImage ? "none" : "1px solid #145B73",
            maxWidth: "80vw", // Membatasi ukuran maksimum
            maxHeight: "70vh", // Membatasi ukuran maksimum
          }}>
          {/* Jika belum ada gambar, tampilkan SVG plus & teks */}
          {!selectedImage && (
            <div style={{ textAlign: "center", color: "#145B73" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentcolor"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <p style={{ marginTop: "5px", fontSize: "14px" }}>
                Tambah Gambar
              </p>
            </div>
          )}

          {/* Jika sudah pilih gambar, tampilkan gambar */}
          {selectedImage && (
            <>
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "opacity 0.3s ease",
                  filter: isHovered ? "brightness(50%)" : "brightness(100%)",
                  maxWidth: "80vw", // Membatasi ukuran maksimum lebar gambar
                  maxHeight: "70vh", // Membatasi tinggi gambar agar tidak terlalu besar
                }}
              />

              {/* Overlay muncul saat hover */}
              {isHovered && (
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 0, 0, 0.4)",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="white"
                    viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <p style={{ marginTop: "5px", color: "white" }}>
                    Tambah Gambar
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input file tersembunyi */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <br></br>
        <Container>
          <div className="utama-judul-kategori-tba">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-one-tba ">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Judul Berita Anda"
                onChange={(e) => SetJudulBerita(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput2"
              className="form-one-tba">
              <Form.Label>Kategori</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => SetIdKategori(e.target.value)}
                value={id_kategori}>
                <option value="">Pilih Kategori Berita Anda</option>
                {dataKategori.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.kategori}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group
            className="mb-3 utama-text-berita"
            controlId="exampleForm.ControlTextarea1">
            <Form.Label>Isi Berita</Form.Label>
            <div
              ref={quillRef}
              style={{
                height: "250px",
                backgroundColor: "white",
                border: "1px solid #145B73",
                boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
              }}
            />
          </Form.Group>
          <div className="button-tba">
            <Button
              onClick={addBerita}
              disabled={isLoading}
              className="button-tba"
              style={{
                backgroundColor: "#145B73",
                minWidth: "120px", // ✅ agar ukuran tetap
                height: "38px", // ✅ agar tinggi tetap
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"></span>
                  &nbsp;Loading...
                </>
              ) : (
                "Tambahkan"
              )}
            </Button>
          </div>
        </Container>
      </div>

      {/* Modal untuk menampilkan error validasi */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton></Modal.Header>
        <Modal.Body>
          <p className="pesan-modal">{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-modal" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default TambahBeritaAdmin;
