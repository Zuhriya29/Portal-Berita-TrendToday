import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../general/forgot.css";
import { Link } from "react-router-dom";
import Layout from "../general/Layout";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function ResetPasswordUser() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useParams(); // PATH

  // Ambil token & email dari query string
  const params = new URLSearchParams(location.search);
  const initialEmail = params.get("email") || "";
  const [email, setEmail] = useState(initialEmail);


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (password !== passwordConfirmation) {
    setModalMessage("Password dan verifikasi tidak cocok.");
    setShowModal(true);
    setLoading(false);
    return;
  }

  try {
    // Ambil CSRF token terlebih dahulu dari Laravel
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });

    const response = await fetch("http://localhost:8000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
      },
      credentials: "include",
      body: JSON.stringify({
        token: token,
        email: email, // <-- PASTIKAN ADA! HARUS DIAMBIL DARI FORM ATAU URL
        password: password,
        password_confirmation: passwordConfirmation, // Laravel butuh ini!
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setModalMessage(data.message);
      setShowModal(true);

      setTimeout(() => {
        navigate(data.redirect); // Gunakan redirect dari backend
      }, 2000);
    } else if (response.status === 422) {
      const error = data.errors ? Object.values(data.errors).flat()[0] : "Validasi gagal.";
      setModalMessage(error);
      setShowModal(true);
    } else {
      setModalMessage(data.message || "Terjadi kesalahan.");
      setShowModal(true);
    }
  } catch (error) {
    console.error(error);
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
      <div className="utama-pb">
        <h2>Masukkan Password Baru</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Masukkan Alamat Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan Password Baru Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Verifikasi Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan Ulang Password Baru Anda"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
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

export default ResetPasswordUser;
