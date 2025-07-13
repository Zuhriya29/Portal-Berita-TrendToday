import "../css/admin/tambah-iklan.css";
import React, { useRef, useState, useEffect } from "react";
import Layout from "../general/Layout";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function TambahIklan() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: "50px", height: "50px" });
  const [isHovered, setIsHovered] = useState(false);

  const [gambar_iklan, setGambarIklan] = useState("");
  const [nama_brand, setNamaBrand] = useState("");
  const [tagline, setTagline] = useState("");
  const [id_waktu_tayang, setIdWaktuTayang] = useState("");

  const [dataWaktuTayang, setDataWaktuTayang] = useState([]);

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [existingTitles, setExistingTitles] = useState([]);

  useEffect(() => {
    const fetchJudulBerita = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ShowIklan");
        const data = await response.json();
        const titles = data.map((item) => item.nama_brand.toLowerCase().trim());
        setExistingTitles(titles);
      } catch (error) {
        console.error("Gagal mengambil judul berita:", error);
      }
    };

    fetchJudulBerita();
  }, []);

  // Fetch waktu tayang iklan
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/ShowWaktuTayang"
        );
        const result = await response.json();
        setDataWaktuTayang(result);
      } catch (error) {
        console.error("Gagal mengambil data waktu tayang iklan:", error);
      }
    };

    fetchKategori();
  }, []);

  // Ketika tombol diklik, input file akan terbuka
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarIklan(file);
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setImageSize({ width: `${img.width}px`, height: `${img.height}px` });
        setSelectedImage(imageUrl);
      };
    }
  };

  const addIklan = async () => {
    if (!gambar_iklan || !nama_brand || !tagline || !id_waktu_tayang) {
      setModalMessage(
        "Semua kolom wajib diisi. Mohon lengkapi formulir terlebih dahulu."
      );
      setShowModal(true);
      return;
    }

    // 🔒 Validasi judul sudah digunakan (pindahkan ke awal sebelum fetch)
    if (existingTitles.includes(nama_brand.trim().toLowerCase())) {
      setModalMessage("Nama brand sudah tersedia.");
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("gambar_iklan", gambar_iklan);
    formData.append("nama_brand", nama_brand);
    formData.append("tagline", tagline);
    formData.append("id_waktu_tayang", id_waktu_tayang);

    setIsLoading(true);
    try {
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      const response = await fetch("http://localhost:8000/api/AddIklan", {
        method: "POST",
        body: formData,
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("ta-iklan", JSON.stringify(result));
        navigate("/pengaturan-iklan");
      } else {
        setModalMessage(
          result.message || "Terjadi kesalahan saat menambahkan iklan."
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
      <div className="utama-ti">
        <Link to="/pengaturan-iklan">
          <div className="kembali-ti">
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
        <h1>Tambah Iklan</h1>
        {/* Tombol yang bisa diklik, jika ada gambar tampilkan gambar */}
        <div
          className="tambah-gambar-iklan"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "relative",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            width: selectedImage ? imageSize.width : "80vw",
            height: selectedImage ? imageSize.height : "35vh",
            maxWidth: "80vw",
            maxHeight: "70vh",
            border: "1px solid #145B73",
            borderRadius: "10px",
          }}>
          {selectedImage ? (
            <>
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  maxWidth: "80vw",
                  maxHeight: "70vh",
                }}
              />
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="white"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <p
                    style={{
                      color: "white",
                    }}>
                    Ganti Gambar
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="#145B73"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <p>Tambah Gambar</p>
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
          <div className="utama-nama-brand">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-nama-brand">
              <Form.Label>Nama Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Brand Iklan Anda"
                onChange={(e) => setNamaBrand(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="utama-form-ti">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-one-ti ">
              <Form.Label>Tagline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Tagline Iklan Anda"
                onChange={(e) => setTagline(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput2"
              className="form-one-ti">
              <Form.Label>Penayangan</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setIdWaktuTayang(e.target.value)}
                value={id_waktu_tayang}>
                <option value="">Pilih Durasi Waktu Tayang Iklan</option>
                {dataWaktuTayang.map((waktu_tayang) => (
                  <option key={waktu_tayang.id} value={waktu_tayang.id}>
                    {waktu_tayang.waktu_tayang + " Hari"} 
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="button-ti">
            <Button
              onClick={addIklan}
              disabled={isLoading}
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

export default TambahIklan;
