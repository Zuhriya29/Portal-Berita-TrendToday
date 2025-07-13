import React, { useState } from "react";
import "../css/admin/tambah-admin.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../general/Layout";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies
import { toast, ToastContainer } from "react-toastify";

function TambahAdmin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function TaAdmin(e) {
    e.preventDefault();

    // ✅ Validasi form tidak boleh ada yang kosong
    if (!username || !email || !password || !confirmPassword) {
      setModalMessage(
        "Semua kolom wajib diisi. Mohon lengkapi formulir terlebih dahulu."
      );
      setShowModal(true);
      return;
    }

    // Validasi Email (regex sederhana)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setModalMessage(
        "Format email tidak valid. Mohon periksa kembali email Anda."
      );
      setShowModal(true);
      return;
    }

    // Validasi panjang password minimal 8 karakter
    if (password.length < 8 || confirmPassword.length < 8) {
      setModalMessage(
        "Password dan verifikasi password harus memiliki minimal 8 karakter."
      );
      setShowModal(true);
      return;
    }

    // Validasi apakah password dan verifikasi password sama
    if (password !== confirmPassword) {
      setModalMessage("Password dan verifikasi password tidak sama.");
      setShowModal(true);
      return;
    }

    let item = { username, email, password, confirmPassword };
    setIsLoading(true); // Mulai loading

    console.warn(item);
    try {
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      let response = await fetch("http://localhost:8000/api/AddAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        body: JSON.stringify(item),
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      let result = await response.json();
      console.log("result", result);

      if (response.ok) {
        toast.success("Tambah admin berhasil!"); // 👈 Tambahkan ini
        localStorage.setItem("ta-admin", JSON.stringify(result));
        // ⏳ Tunggu 3 detik sebelum navigasi
        setTimeout(() => {
          navigate("/informasi-admin");
        }, 2000);
      } else {
        // ✅ Tambahan untuk handle email sudah terdaftar
        if (result.message === "Invalid credentials") {
          setModalMessage(
            "Password yang Anda masukkan salah. Silakan coba lagi."
          );
        } else if (
          result.message === "Email sudah terdaftar" ||
          result.message?.toLowerCase().includes("email") // Antisipasi variasi pesan error terkait email
        ) {
          setModalMessage(
            "Email yang Anda masukkan sudah terdaftar. Silakan gunakan email lain."
          );
        } else {
          setModalMessage(
            result.message || "Terjadi kesalahan saat mendaftar."
          );
        }

        setShowModal(true);
        setIsLoading(false); // ⬅️ Tambahkan ini
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
      setIsLoading(false); // ⬅️ Tambahkan ini
    }
  }

  return (
    <Layout>
      <ToastContainer position="top-center" />
      <Link to="/informasi-admin">
        <div className="kembali-ta">
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
      <div className="utama-ta">
        <h2>Tambah Admin</h2>
        <Form>
          <div className="fpu-tambah-admin">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="fp-tambah-admin">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput2"
              className="fp-tambah-admin">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </div>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan Password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput4">
            <Form.Label>Verifikasi Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan Ulang Password Anda"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        <br></br>
        {isLoading ? (
          <Button
            className="button"
            style={{ backgroundColor: "#145B73" }}
            disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"></span>
            &nbsp; Loading...
          </Button>
        ) : (
          <Button onClick={TaAdmin} className="button-ta" type="submit">
            Submit
          </Button>
        )}
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

export default TambahAdmin;
