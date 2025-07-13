import "../css/user/edit-komentar.css";
import React, { useState, useEffect } from "react";
import Promo from "./promo";
import Layout from "../general/Layout";
import Loading from "../general/loading";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function EditKomentar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [komentar, setKomentar] = useState("");

  // State untuk menampilkan modal
  const [showUbahModal, setShowUbahModal] = useState(false);
  const [showHapusModal, setShowHapusModal] = useState(false);

  const { quill, quillRef } = useQuill();
   React.useEffect(() => {
      if (quill) {
        quill.on("text-change", () => {
          console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
          setKomentar(quillRef.current.firstChild.innerHTML);
        });
      }
    }, [quill, quillRef]);

  // Ambil detail komentar dari API
  useEffect(() => {
    const fetchKomentar = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/ShowDetailKomentar/${id}`
        );
        const result = await response.json();

        console.log("Data komentar:", result);

        const isi = result.komentar || ""; // asumsi response JSON mengandung data.isi_komentar
        setKomentar(isi); // simpan semua komentar
      } catch (error) {
        console.error("Gagal mengambil data komentar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchKomentar();
    }
  }, [id]);

  // Update Komentar
  const UpdateKomentar = async () => {
    try {
      setIsUpdating(true); // ⏳ mulai loading
      const formData = new FormData();
      formData.append("komentar", komentar);
      formData.append("is_approved", 0);

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(
        `http://localhost:8000/api/UpdateKomentar/${id}?_method=PUT`,
        {
          method: "POST",
          body: formData,
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
          },
          credentials: "include", // penting agar XSRF-TOKEN dikirim
        }
      );

      // Tampilkan notifikasi
      toast.success("Komentar berhasil diubah, tunggu validasi dari admin", {
        position: "top-center",
        autoClose: 2000, // otomatis hilang setelah 2 detik
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Gagal mengupdate komentar:", error);
    } finally {
      setIsUpdating(false); // ✅ selesai loading
    }
  };

  // Hapus Komentar
  const deleteOperation = async () => {
    try {
      setIsDeleting(true); // ⏳ mulai loading

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/DeleteKomentar/${id}`, {
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

      // Tampilkan notifikasi
      toast.success("Komentar berhasil dihapus", {
        position: "top-center",
        autoClose: 2000, // otomatis hilang setelah 2 detik
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
    } finally {
      setIsDeleting(false); // ✅ selesai loading
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Promo />
      <div className="utama-dk">
        <Link to={(-1)}>
          <div className="kembali-dk">
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
        <h1>Edit Komentar</h1>
        <Form.Group className="mb-3 utama-text-berita-dk" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Isi Komentar</Form.Label>
          <ReactQuill
            theme="snow"
            value={komentar}
            onChange={setKomentar}
            style={{
              backgroundColor: "white",
              border: "1px solid #145B73",
              borderRadius: "5px",
              boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.2)",
            }}
          />
        </Form.Group>

        <div className="button-dk-utama">
          <Button
            className="button-danger-dk"
            type="danger"
            onClick={() => setShowHapusModal(true)}>
            Hapus
          </Button>
          <Button className="button-dk" onClick={() => setShowUbahModal(true)}>
            Edit
          </Button>
        </div>
      </div>

      {/* Modal Hapus */}
      <Modal
        show={showHapusModal}
        onHide={() => setShowHapusModal(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <p className="pesan-modal">
            Apakah anda yakin ingin menghapus komentar ini?
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
            onClick={deleteOperation}
            disabled={isDeleting}>
            {isDeleting ? "Menghapus" : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>

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
            onClick={UpdateKomentar}
            disabled={isUpdating}>
            {isUpdating ? "Menyimpan" : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default EditKomentar;
