import "../css/user/detail-berita-user.css";
import React, { useRef, useState, useEffect } from "react";
import Promo from "./promo";
import Loading from "../general/loading";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function DetailBeritaUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // State untuk efek hover

  const [gambar_berita, setGambarBerita] = useState("");
  const [judul_berita, setJudulBerita] = useState("");
  const [id_kategori, setIdKategori] = useState("");
  const [isi_berita, setIsiBerita] = useState("");
  const [is_approved, setIsApproved] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);
  const [daftarKategori, setDaftarKategori] = useState([]);

  const { quill, quillRef } = useQuill();
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        setIsiBerita(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef]);

  // Fungsi untuk membuka file input saat div diklik
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Fungsi untuk menangani perubahan gambar
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setGambarBerita(file); // penting: kita set file ke state untuk FormData
    }
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
        setGambarBerita(data.gambar_berita || "");
        setIdKategori(data.id_kategori || "");
        setIsiBerita(data.isi_berita || "");

        // Set preview image dari URL storage
        setSelectedImage(`http://localhost:8000/storage/${data.gambar_berita}`);

        setIsApproved(
          data.is_approved === 1 || data.is_approved === 3
            ? 0
            : data.is_approved
        );
      } catch (error) {
        console.error("Gagal mengambil data admin:", error);
      } finally {
        setIsLoading(false); // selesai loading
      }
    };
    fetchAdmin();
  }, [id]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ShowKategori"); // Ganti dengan endpoint kategori yang benar
        const data = await response.json();
        setDaftarKategori(data); // simpan array kategori
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchKategori();
  }, []);

  // Update Berita
  const UpdateBerita = async () => {
    try {
      setIsUpdating(true); // ⏳ mulai loading
      const formData = new FormData();
      formData.append("gambar_berita", gambar_berita);
      formData.append("judul_berita", judul_berita);
      formData.append("id_kategori", id_kategori);
      formData.append("isi_berita", isi_berita);
      formData.append("is_approved", is_approved);

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

      // Tampilkan notifikasi
      toast.success("Berita berhasil diubah, tunggu validasi dari admin", {
        position: "top-center",
        autoClose: 2000, // otomatis hilang setelah 2 detik
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate("/lihat-berita-user/" + id);
      }, 2000);
    } catch (error) {
      console.error("Gagal mengupdate berita:", error);
    } finally {
      setIsUpdating(false); // ✅ selesai loading
    }
  };

  // State untuk menampilkan modal
  const [showUbahModal, setShowUbahModal] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Promo />
      <div className="utama-dbu">
        <Link to={"/lihat-berita-user/" + id}>
          <div className="kembali-dbu">
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
        <h1>Detail Berita</h1>
        <div
          className="gambar-detail-berita-user"
          onClick={handleClick}
          value={"http://localhost:8000/storage/" + gambar_berita}
          onChange={(e) => setGambarBerita(e.target.value)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "relative",
            cursor: "pointer",
            width: "fit-content", // Ukuran default
            height: "auto",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {/* Gambar */}
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.3s ease",
              filter: isHovered ? "brightness(50%)" : "brightness(100%)",
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
              <p style={{ marginTop: "5px" }}>Tambah Gambar</p>
            </div>
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
          <div className="utama-judul-kategori-dbu">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-one-dbu ">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                placeholder="Judul Berita Anda"
                value={judul_berita}
                onChange={(e) => setJudulBerita(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput2"
              className="form-one-dbu">
              <Form.Label>Kategori</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setIdKategori(e.target.value)}
                value={id_kategori}>
                <option value="">Pilih Kategori Berita Anda</option>
                {daftarKategori.map((kategori) => (
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
            <ReactQuill
              theme="snow"
              value={isi_berita}
              onChange={setIsiBerita}
              style={{
                backgroundColor: "white",
                border: "1px solid #145B73",
                borderRadius: "5px",
                boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.2)",
              }}
            />
          </Form.Group>
          <div className="button-dbu">
            <Button onClick={() => setShowUbahModal(true)}>Ubah Berita</Button>
          </div>
        </Container>
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
            {isUpdating ? "Menyimpan" : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailBeritaUser;
