import HeaderAdmin from "./header-admin";
import "../css/admin/validasi-komentar.css";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Layout from "../general/Layout";
import Loading from "../general/loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function ValidasiKomentar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👉 Tambahkan state loading

  const [komentar, setKomentar] = useState([]);

  const [filterStatus, setFilterStatus] = useState("");

  const filteredData = data
    .filter((item) => {
      const matchSearch = item.judul_berita
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const komentarBeritaIni = komentar.filter((k) => k.id_berita === item.id);

      let matchStatus = true;
      if (filterStatus === "no-comments") {
        matchStatus = komentarBeritaIni.length === 0;
      } else if (filterStatus === "validated") {
        matchStatus =
          komentarBeritaIni.length > 0 &&
          komentarBeritaIni.every((k) => k.is_approved === 1);
      } else if (filterStatus === "pending") {
        matchStatus = komentarBeritaIni.some((k) => k.is_approved === 0);
      }

      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      // Ambil komentar terbaru dari setiap berita
      const latestCommentA = komentar
        .filter((k) => k.id_berita === a.id)
        .sort((k1, k2) => new Date(k2.updated_at) - new Date(k1.updated_at))[0];

      const latestCommentB = komentar
        .filter((k) => k.id_berita === b.id)
        .sort((k1, k2) => new Date(k2.updated_at) - new Date(k1.updated_at))[0];

      // Periksa apakah komentar ada, jika tidak, set default ke waktu berita
      const dateA = latestCommentA
        ? new Date(latestCommentA.updated_at)
        : new Date(a.updated_at);
      const dateB = latestCommentB
        ? new Date(latestCommentB.updated_at)
        : new Date(b.updated_at);

      // Urutkan berdasarkan komentar terbaru
      return dateB - dateA;
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // mulai loading

        const [beritaRes, komentarRes] = await Promise.all([
          fetch("http://localhost:8000/api/ShowBeritaAll"),
          fetch("http://localhost:8000/api/ShowKomentar"), // ganti dengan endpoint komentar kamu
        ]);

        const beritaData = await beritaRes.json();
        const komentarData = await komentarRes.json();

        setData(beritaData);
        setKomentar(komentarData);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false); // 👉 Setelah selesai loading
      }
    };

    fetchData();
  }, []);

  console.warn("result", data);

  const truncateByWord = (text, maxLength) => {
    if (text.length <= maxLength) return text;

    const trimmed = text.slice(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace) + " ...";
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <HeaderAdmin />
      <br></br>
      <br></br>
      <br></br>
      <div className="utama-validasi-komentar">
        <h1>Validasi Komentar</h1>
        <div className="search-validasi-komentar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <br></br>
        <Container>
          <Form.Group>
            <div className="radio-buttons-vk">
              <Form.Check
                type="radio"
                label="Semua"
                name="validasi"
                id="all"
                value=""
                checked={filterStatus === ""}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Tidak Ada Komentar"
                name="validasi"
                id="no-comments"
                value="no-comments"
                checked={filterStatus === "no-comments"}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Sudah Divalidasi"
                name="validasi"
                id="validated"
                value="validated"
                checked={filterStatus === "validated"}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Menunggu Validasi"
                name="validasi"
                id="pending"
                value="pending"
                checked={filterStatus === "pending"}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
            </div>
          </Form.Group>
        </Container>
        <br></br>
        <Container>
          <Row className="justify-content-center">
            {filteredData.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Data tidak ditemukan
              </p>
            ) : (
              filteredData.map((item, index) => {
                const komentarBeritaIni = komentar.filter(
                  (k) => k.id_berita === item.id
                );
                const semuaDiterima =
                  komentarBeritaIni.length > 0 &&
                  komentarBeritaIni.every((k) => k.is_approved === 1);
                const adaDiterimaAtauDitolak = komentarBeritaIni.some(
                  (k) => k.is_approved === 1 || k.is_approved === 3
                );

                return (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="elemen-komentar-validasi"
                    onClick={() =>
                      navigate("/detail-validasi-komentar/" + item.id)
                    }
                  >
                    <img
                      src={
                        "http://localhost:8000/storage/" + item.gambar_berita
                      }
                      alt="Berita"
                    />
                    <div className="validasi-komentar-bawah">
                      <h1>{truncateByWord(item.judul_berita, 65)}</h1>
                      <div className="detail-validasi-komentar-depan">
                        <div className="icon-validasi-komentar-depan">
                          {komentarBeritaIni.length === 0 ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="gray"
                                className="bi bi-chat-dots"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2 2a2 2 0 0 0-2 2v8l2-2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm2 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                              </svg>
                              <p style={{ color: "gray" }}>No Comments</p>
                            </>
                          ) : semuaDiterima ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="green"
                                className="bi bi-check-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              <p style={{ color: "green" }}>Diterima</p>
                            </>
                          ) : adaDiterimaAtauDitolak ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="goldenrod"
                                className="bi bi-clock-history"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.515 1.019a7 7 0 1 0 6.466 6.466.5.5 0 0 0-.985.164 6 6 0 1 1-5.645-5.645.5.5 0 0 0 .164-.985z" />
                                <path d="M7.5 4a.5.5 0 0 1 1 0v3.25l2.29 1.528a.5.5 0 0 1-.58.814L7.5 7.75z" />
                              </svg>
                              <p style={{ color: "goldenrod" }}>
                                Menunggu Validasi
                              </p>
                            </>
                          ) : null}
                        </div>
                        <div className="penulis-validasi-komentar-depan">
                          <p>
                            {item.updated_at
                              ? `${dayjs(item.updated_at).fromNow()}`
                              : ""}{" "}
                            | {item.user?.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default ValidasiKomentar;
