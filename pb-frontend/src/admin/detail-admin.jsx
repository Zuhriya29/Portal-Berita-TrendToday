import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../general/loading";
import "../css/admin/detail-admin.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function DetailAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem("adminSwitch")) || false;
  });

  const [showHapusModal, setShowHapusModal] = useState(false);
  const [showUbahModal, setShowUbahModal] = useState(false);

  // Simpan ke localStorage saat switch berubah
  useEffect(() => {
    localStorage.setItem("adminSwitch", JSON.stringify(isChecked));
  }, [isChecked]);

  // Ambil detail admin dari API
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch(
          `http://localhost:8000/api/DetailAdmin/${id}`
        );
        const data = await response.json();
        setUsername(data.username || "");
        setEmail(data.email || "");
        setIsChecked(data.is_admin === 1); // sesuaikan jika backend mengembalikan boolean atau angka
      } catch (error) {
        console.error("Gagal mengambil data admin:", error);
      } finally {
        setIsLoading(false); // selesai loading
      }
    };
    fetchAdmin();
  }, [id]);

  // Hapus Admin
  const deleteOperation = async () => {
    try {
      setIsDeleting(true); // ⏳ mulai loading

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/DeleteAdmin/${id}`, {
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
      toast.success("Admin berhasil dihapus", {
        position: "top-center",
        autoClose: 2000, // otomatis hilang setelah 2 detik
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate("/informasi-admin");
      }, 2000);
    } catch (error) {
      console.error("Gagal menghapus admin:", error);
    } finally {
      setIsDeleting(false); // ✅ selesai loading
    }
  };

  // Update Admin
  const UpdateAdmin = async () => {
    try {
      setIsUpdating(true); // ⏳ mulai loading
      const formData = new FormData();
      formData.append("is_admin", isChecked ? 1 : 0);
      formData.append("username", username);
      formData.append("email", email);

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/UpdateAdmin/${id}?_method=PUT`, {
        method: "POST",
        body: formData,
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      // Tampilkan notifikasi
      toast.success("Admin berhasil diubah", {
        position: "top-center",
        autoClose: 2000, // otomatis hilang setelah 2 detik
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate("/informasi-admin");
      }, 2000);
    } catch (error) {
      console.error("Gagal mengupdate admin:", error);
    } finally {
      setIsUpdating(false); // ✅ selesai loading
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Link to="/informasi-admin">
        <div className="kembali-da">
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

      <div className="utama-da">
        <h2>Detail Admin</h2>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Is Admin"
            className="check-admin"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
        <br />
        <div className="button-da-utama">
          <Button
            className="button-danger-da"
            onClick={() => setShowHapusModal(true)}>
            Hapus
          </Button>
          <Button className="button-da" onClick={() => setShowUbahModal(true)}>
            Ubah
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
            Apakah anda yakin ingin menghapus admin dengan id {id} ini?
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
            onClick={UpdateAdmin}
            disabled={isUpdating}>
            {isUpdating ? "Menyimpan" : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailAdmin;
