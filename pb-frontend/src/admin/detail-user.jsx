import React, { useState, useEffect } from "react";
import Loading from "../general/loading";
import "../css/admin/detail-user.css";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";

function DetailUser() {

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [nama_user, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNohp] = useState("");
  const [jenis_kelamin, setGender] = useState("");
  const [tanggal_lahir, setTGL] = useState("");

  // Ambil detail user dari API
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch(
          `http://localhost:8000/api/DetailUser/${id}`
        );
        const data = await response.json();
        setUsername(data.username || "");
        setNama(data.nama_user || "");
        setEmail(data.email || "");
        setNohp(data.no_hp || "");
        setGender(data.jenis_kelamin || "");
        setTGL(data.tanggal_lahir || "");
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false); // selesai loading
      }
    };
    fetchAdmin();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Link to="/informasi-user">
        <div className="kembali-du">
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
      <div className="utama-du">
        <h2>Detail Profil User</h2>
        <Form>
          <div className="form-detail-user">
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="form-one-du"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username Anda"
                value={username}
                readOnly
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput2"
              className="form-one-du"
            >
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Anda"
                value={nama_user}
                readOnly
              />
            </Form.Group>
          </div>
          <div className="form-detail-user">
            <Form.Group
              controlId="exampleForm.ControlInput3"
              className="form-one-du"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Anda"
                value={email}
                readOnly
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput4"
              className="form-one-du"
            >
              <Form.Label>Nomor HP</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nomor HP Anda"
                value={no_hp}
                readOnly
              />
            </Form.Group>
          </div>
          <div className="form-detail-user radio-group">
            <Form.Group controlId="formDate" className="form-one-du">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                value={tanggal_lahir}
                onChange={(e) => setTGL(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group style={{ marginLeft: "5vw" }}>
              <Form.Label>Jenis Kelamin</Form.Label>
              <div className="radio-buttons-du">
                <Form.Check
                  type="radio"
                  label="Laki-Laki"
                  name="gender"
                  id="gender-male"
                  value="Laki-Laki"
                  checked={jenis_kelamin === "Laki-Laki"}
                  onChange={(e) => setGender(e.target.value)}
                  disabled
                />
                <Form.Check
                  type="radio"
                  label="Perempuan"
                  name="gender"
                  id="gender-female"
                  value="Perempuan"
                  checked={jenis_kelamin === "Perempuan"}
                  onChange={(e) => setGender(e.target.value)}
                  disabled
                />
              </div>
            </Form.Group>
          </div>
        </Form>
        <br></br>
      </div>
    </div>
  );
}

export default DetailUser;
