import "../css/admin/detail-iklan.css";
import React, { useRef, useState, useEffect } from "react";
import Loading from "../general/loading";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function DetailIklan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hoverTerima, setHoverTerima] = useState(false);
  const [hoverTolak, setHoverTolak] = useState(false);

  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // State untuk efek hover

  const [gambar_iklan, setGambarIklan] = useState("");
  const [nama_brand, setNamaBrand] = useState("");
  const [tagline, setTagline] = useState("");
  const [id_waktu_tayang, setIdWaktuTayang] = useState("");
  const [is_tayang, setIsTayang] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);
  const [daftarWaktuTayang, setWaktuTayang] = useState([]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [showHapusModal, setShowHapusModal] = useState(false);

  useEffect(() => {
    const storedStatus = localStorage.getItem(`status_tayang_${id}`);
    if (storedStatus) {
      const numericStatus = parseInt(storedStatus, 10);
      setIsTayang(numericStatus);
      setHoverTerima(numericStatus === 1);
      setHoverTolak(numericStatus === 3);
    }
  }, [id]);

  const handleApproveClick = (status) => {
    setIsTayang(status);
    localStorage.setItem(`status_tayang_${id}`, status);
  };

  // Fungsi untuk membuka file input saat div diklik
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Fungsi untuk menangani perubahan gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarIklan(file); // untuk form submission
      setSelectedImage(URL.createObjectURL(file)); // untuk preview
    }
  };

  // Ambil detail iklan dari API
  // Ambil data dari localStorage atau backend jika tidak ada
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/ShowDetailIklan/${id}`
        );
        const data = await response.json();

        setGambarIklan(data.gambar_iklan || "");
        setNamaBrand(data.nama_brand || "");
        setTagline(data.tagline || "");
        setIdWaktuTayang(data.id_waktu_tayang || "");

        // Set preview image dari URL storage
        setSelectedImage(`http://localhost:8000/storage/${data.gambar_iklan}`);

        // Ambil status_tayang dari localStorage jika ada
        const storedStatus = localStorage.getItem(`status_tayang_${id}`);
        if (storedStatus) {
          const numericStatus = parseInt(storedStatus, 10);
          setIsTayang(numericStatus);
          setHoverTerima(numericStatus === 1);
          setHoverTolak(numericStatus === 3);
        } else {
          // Jika tidak ada di localStorage, set dari backend
          setIsTayang(data.is_tayang);
          setHoverTerima(data.is_tayang === 1);
          setHoverTolak(data.is_tayang === 3);
        }
      } catch (error) {
        console.error("Gagal mengambil data iklan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmin();
  }, [id]);

  const UpdateIklan = async () => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append("gambar_iklan", gambar_iklan);
      formData.append("nama_brand", nama_brand);
      formData.append("id_waktu_tayang", id_waktu_tayang);
      formData.append("tagline", tagline);
      formData.append("is_tayang", is_tayang);

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/UpdateIklan/${id}?_method=PUT`, {
        method: "POST",
        body: formData,
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      // Hapus status_tayang dari localStorage
      localStorage.removeItem(`status_tayang_${id}`);
      setIsTayang(0); // Reset ke default
      setHoverTerima(false);
      setHoverTolak(false);

      toast.success("Iklan berhasil diubah", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/pengaturan-iklan");
      }, 2000); // Delay sebelum navigasi
    } catch (error) {
      console.error("Gagal mengupdate iklan:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Hapus Kategori
  const deleteIklan = async () => {
    try {
      setIsDeleting(true);

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/DeleteIklan/${id}`, {
        method: "DELETE",
        credentials: "include", // Penting
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("XSRF-TOKEN="))
              ?.split("=")[1] ?? ""
          ),
          "Content-Type": "application/json",
        },
      });

      setShowHapusModal(false);

      toast.success("Iklan berhasil dihapus", {
        position: "top-center",
        autoClose: 2000,
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate("/pengaturan-iklan");
      }, 2000);
    } catch (error) {
      console.error("Gagal menghapus Iklan:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // ✅ useEffect sekarang hanya untuk fetch data saja
  useEffect(() => {
    const fetchWaktuTayang = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/ShowWaktuTayang"
        );
        const data = await response.json();
        setWaktuTayang(data);
      } catch (error) {
        console.error("Gagal mengambil waktu tayang:", error);
      }
    };

    fetchWaktuTayang();
  }, [id]);

  // State untuk menampilkan modal
  const [showUbahModal, setShowUbahModal] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="utama-di">
        <div className="atas-detail-validasi-berita">
          <Link to="/pengaturan-iklan">
            <div className="kembali-di">
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
              className={`icon-danger ${is_tayang === 3 ? "aktif" : ""}`}
              style={{
                marginRight: "30px",
                display: "flex",
                marginLeft: "30px",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverTolak(true)}
              onMouseLeave={() => setHoverTolak(false)}
              onClick={() => handleApproveClick(3)} // Menangani klik untuk status 3
            >
              {hoverTolak || is_tayang === 3 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="rgb(151, 5, 5)"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
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
              <p style={{ color: "rgb(151, 5, 5)" }}>Tidak Ditayangkan</p>
            </div>

            <div
              className={`icon-terima ${is_tayang === 1 ? "aktif" : ""}`}
              style={{
                marginRight: "30px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverTerima(true)}
              onMouseLeave={() => setHoverTerima(false)}
              onClick={() => handleApproveClick(1)} // Menangani klik untuk status 1
            >
              {hoverTerima || is_tayang === 1 ? (
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
              <p style={{ color: "green" }}>Tayangkan</p>
            </div>
          </div>
        </div>
        <h1>Detail Iklan</h1>
        <div
          className="gambar-iklan"
          onClick={handleClick}
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
          <div className="utama-nama-brand">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-nama-brand">
              <Form.Label>Nama Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Brand Iklan Anda"
                value={nama_brand}
                onChange={(e) => setNamaBrand(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="utama-form-di">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-one-di ">
              <Form.Label>Tagline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tagline Anda"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput2"
              className="form-one-di">
              <Form.Label>Penayangan</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setIdWaktuTayang(e.target.value)}
                value={id_waktu_tayang}>
                <option value="">Pilih Lama Waktu Penayangan Iklan</option>
                {daftarWaktuTayang.map((waktu_tayang) => (
                  <option key={waktu_tayang.id} value={waktu_tayang.id}>
                    {waktu_tayang.waktu_tayang + " Hari"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="button-di">
            <Button
              onClick={() => setShowHapusModal(true)}
              className="danger-di">
              Hapus
            </Button>
            <Button
              onClick={() => setShowUbahModal(true)}
              className="no-danger-di">
              Ubah Iklan
            </Button>
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
            onClick={UpdateIklan}
            disabled={isUpdating}>
            {isUpdating ? "Menyimpan" : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Hapus modal*/}
      <Modal
        show={showHapusModal}
        onHide={() => setShowHapusModal(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <p className="pesan-modal">
            Apakah anda yakin ingin menghapus iklan ini ?
          </p>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button
            className="button-modal"
            variant="secondary"
            onClick={() => setShowHapusModal(false)}>
            Tidak
          </Button>
          <Button
            className={`danger ${isDeleting ? "loading-dots" : ""}`}
            onClick={deleteIklan}
            disabled={isDeleting}>
            {isDeleting ? "Menghapus..." : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailIklan;
