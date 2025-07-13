import Layout from "../general/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../general/forgot.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies


function ForgotPasswordAdmin() {

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalMessage("");
    setLoading(true);

    try {

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      const response = await fetch("http://localhost:8000/api/forgot-password-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Menggunakan CSRF token dari cookie yang sudah diambil
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // Menambahkan token CSRF dari cookie
        },
        credentials: "include", // Penting agar cookie (XSRF-TOKEN) dikirim balik
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage(data.message);
        setShowModal(true);

        // Redirect ke halaman login setelah 2 detik
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 2000);

      } else if (response.status === 422) {
        const data = await response.json();
        const errorMessage = data.errors?.email?.[0] || "Terjadi kesalahan validasi.";
        setModalMessage(errorMessage);
        setShowModal(true);
      } else {
        setModalMessage("Terjadi kesalahan. Silakan coba lagi.");
        setShowModal(true);
      }

    } catch (err) {
      console.error(err);
      setModalMessage("Gagal terhubung ke server.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <Link to={(-1)}>
        <div className="kembali-fp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <p>Kembali</p>
        </div>
      </Link>
      <div className="utama-fp">
        <h2>Masukkan Alamat Email</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              placeholder="Masukkan Alamat Email Anda"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <br></br>
          {isLoading ? (
            <Button
              className="button-fp"
              style={{ backgroundColor: "#145B73" }}
              disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"></span>
              &nbsp; Loading...
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="button-fp" type="submit">
              Submit
            </Button>
          )}
        </Form>
      </div>

      {/* Modal untuk menampilkan error validasi */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
        </Modal.Header>
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

export default ForgotPasswordAdmin;
