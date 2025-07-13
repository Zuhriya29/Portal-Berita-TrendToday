import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../general/register.css";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function SignupUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal sukses

  const navigate = useNavigate(); // Untuk redirect ke halaman login
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  async function suUser(e) {
    e.preventDefault();

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

    const payload = {
    username,
    email,
    password,
    password_confirmation: confirmPassword, // ✅ ini harus cocok dengan Laravel!
  };
  
  setIsLoading(true);

    try {
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      let response = await fetch("http://localhost:8000/api/SignupUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        body: JSON.stringify(payload),
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      const result = await response.json();
      console.log("result", result);

      if (response.ok) {
        setShowSuccessModal(true); // tampilkan modal sukses

        setTimeout(() => {
        navigate(result.redirect || "/verifikasi-otp"); // ✅ backend kasih redirect path
      }, 2000);
      } else {
        setModalMessage(result.message || "Terjadi kesalahan saat mendaftar.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
    }
  }

  return (
    <div className="background">
      <Link to="/login-user">
        <div className="kembali-user">
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
      <div className="form-signup">
        <Row className="g-0">
          <Col md={4} lg={4}>
            <div className="kiri-signup">
              <img src="/images/register.png" alt="Register" width="300" />
            </div>
          </Col>
          <Col md={8} lg={8}>
            <div className="kanan-signup">
              <div className="text-signup">
                <h1>Sign-Up</h1>
                <Form onSubmit={suUser}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Alamat Email Anda"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukkan Alamat Email Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock1"
                    placeholder="Masukkan Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Label htmlFor="inputPassword6">
                    Verifikasi Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="inputPassword6"
                    aria-describedby="passwordHelpBlock"
                    placeholder="Masukkan Ulang Password Anda"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
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
                  <Button onClick={suUser} className="button" type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal untuk login sukses */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p className="pesan-modal">Kode OTP berhasil dikirim ke alamat email</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-modal" onClick={() => navigate("/verifikasi-otp")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

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
          <Button
            className="button-modal"
            variant="primary"
            onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignupUser;
