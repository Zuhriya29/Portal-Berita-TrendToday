import React, { useState, useEffect } from "react";
import "../css/user/edit-profil-user.css";
import Loading from "../general/loading";
import Promo from "./promo";
import "../css/admin/detail-user.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function EditProfilUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [username, setUsername] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [tgl_lahir, setTGL] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");

  const [showUbahModal, setShowUbahModal] = useState(false);

  // Ambil detail user dari API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch(
          `http://localhost:8000/api/DetailAdmin/${id}`
        );
        const data = await response.json();
        setNamaUser(data.nama_user || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
        setNoHp(data.no_hp || "");
        setJenisKelamin(data.jenis_kelamin || "");
        setTGL(data.tgl_lahir || "");
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false); // selesai loading
      }
    };
    fetchUser();
  }, [id]);

  // Update User
  const UpdateUser = async () => {
    try {
      setIsUpdating(true); // ⏳ mulai loading
      const formData = new FormData();
      formData.append("id", id);
      formData.append("username", username);
      formData.append("nama_user", nama_user);
      formData.append("email", email);
      formData.append("no_hp", no_hp);
      formData.append("jenis_kelamin", jenis_kelamin);
      formData.append("tgl_lahir", tgl_lahir);

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/UpdateUser/${id}?_method=PUT`, {
        method: "POST",
        body: formData,
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      // Tampilkan notifikasi
      toast.success("Profil berhasil diubah", {
        position: "top-center",
        autoClose: 2000, // otomatis hilang setelah 2 detik
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Gagal mengupdate user:", error);
    } finally {
      setIsUpdating(false); // ✅ selesai loading
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Promo />
      <div className="kembali-epu" onClick={() => navigate(-1)}>
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
      <div className="utama-epu">
        <h2>Edit Profil</h2>
        <Form>
          <div className="form-detail-user-epu">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-one-epu">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput2"
              className="form-one-epu">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Anda"
                value={nama_user}
                onChange={(e) => setNamaUser(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="form-detail-user-epu">
            <Form.Group
              controlId="exampleForm.ControlInput4"
              className="form-one-epu">
              <Form.Label>Nomor HP</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nomor HP Anda"
                value={no_hp}
                onChange={(e) => setNoHp(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDate" className="form-one-epu">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                value={tgl_lahir}
                onChange={(e) => setTGL(e.target.value)}
              />
            </Form.Group>
          </div>
          <br />
          <div className="form-detail-user-epu radio-group">
            <Form.Group>
              <Form.Label>Jenis Kelamin</Form.Label>
              <div className="radio-buttons">
                <Form.Check
                  type="radio"
                  label="Laki-Laki"
                  name="gender"
                  id="gender-male"
                  value="Laki-Laki"
                  checked={jenis_kelamin === "Laki-Laki"}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Perempuan"
                  name="gender"
                  id="gender-female"
                  value="Perempuan"
                  checked={jenis_kelamin === "Perempuan"}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                />
              </div>
            </Form.Group>
          </div>
        </Form>
        <br></br>
        <Button className="button-epu" onClick={() => setShowUbahModal(true)}>
          Ubah
        </Button>
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
            onClick={UpdateUser}
            disabled={isUpdating}>
            {isUpdating ? "Menyimpan" : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProfilUser;
