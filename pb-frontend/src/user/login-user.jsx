import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

import "../general/register.css";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal sukses
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Untuk redirect ke halaman login
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  async function loUser(e) {
    e.preventDefault();

    if (!email || !password) {
      setModalMessage("Mohon isi semua kolom sebelum melanjutkan.");
      setShowModal(true);
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setModalMessage(
        "Format email tidak valid. Mohon periksa kembali email Anda."
      );
      setShowModal(true);
      return;
    }

    if (password.length < 8) {
      setModalMessage("Password harus memiliki minimal 8 karakter.");
      setShowModal(true);
      return;
    }

    let item = { email, password };
    setIsLoading(true); // Mulai loading

    console.warn(item);
    try {
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      let response = await fetch("http://localhost:8000/api/LoginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        body: JSON.stringify(item),
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      let data = await response.json();
      console.log("result", data);

      if (!response.ok) {
        if (
          data.message === "Data Tidak Valid atau Mungkin Anda Belum Punya Akun"
        ) {
          setModalMessage(
            "Password yang Anda masukkan salah. Silakan coba lagi."
          );
        } else {
          setModalMessage(data.message || "Login gagal. Coba lagi.");
        }
        setShowModal(true);
        return;
      }

      localStorage.setItem("token-user", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          username: data.user.username,
          nama_user: data.user.nama_user,
          email: data.user.email, // jika ingin juga simpan email
        })
      );

      // **Tampilkan modal sukses**
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/");
      }, 2000); // **Redirect setelah 2 detik**
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
    } finally {
      setIsLoading(false); // Pastikan loading selesai setelah request
    }
  }

  return (
    <div className="background">
      <div className="form-signup">
        <Row className="g-0">
          <Col md={4} lg={4}>
            <div className="kiri-signup">
              <img src="/images/register.png" alt="Register" />
            </div>
          </Col>
          <Col md={8} lg={8}>
            <div className="kanan-signup">
              <div className="text-signup">
                <div className="text-login">
                  <h1 style={{ paddingBottom: 0 }}>Welcome Back!</h1>
                  <div className="detail-text-login">
                    <p>Don't have an account yet?</p>
                    <Link to="/signup-user">
                      <p className="link-signup">Sign-Up</p>
                    </Link>
                  </div>
                </div>
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
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
                  <Button onClick={loUser} className="button" type="submit">
                    Submit
                  </Button>
                )}
                <Link to="/forgot-password-user">
                  <p className="fp-admin">Forgot Password?</p>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal untuk menampilkan error validasi */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="pesan-modal">Terjadi Kesalahan</div>
          </Modal.Title>
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

      {/* Modal untuk login sukses */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p className="pesan-modal">Login Berhasil</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-modal" onClick={() => navigate("/admin")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginUser;
