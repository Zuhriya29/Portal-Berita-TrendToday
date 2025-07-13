import "../css/admin/peraturan-iklan.css";
import HeaderAdmin from "./header-admin";
import Layout from "../general/Layout";
import Loading from "../general/loading";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function PengaturanIklan() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👉 Tambahkan state loading

  const [filterStatus, setFilterStatus] = useState(""); // "" = semua, "1" = sudah, "0" = belum
  const [countdowns, setCountdowns] = useState({}); // Untuk menyimpan countdown

  const filteredData = data
    .filter((item) => {
      const matchSearch = item.nama_brand
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchStatus =
        filterStatus === "" || item.is_tayang?.toString() === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch("http://localhost:8000/api/ShowIklan");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false); // 👉 Setelah selesai loading
      }
    };

    fetchData();
  }, []);

  // Logika untuk menghitung countdown berdasarkan new_date
  useEffect(() => {
    const newCountdowns = {};

    data.forEach((item) => {
      if (item.is_tayang === 1 && item.new_date) {
        const dateOnly = new Date(item.new_date);
        const targetDate = new Date(
          dateOnly.getFullYear(),
          dateOnly.getMonth(),
          dateOnly.getDate(),
          23,
          59,
          59
        );

        const interval = setInterval(() => {
          const now = new Date();
          const timeRemaining = targetDate - now;

          if (timeRemaining <= 0) {
            clearInterval(interval);
            setCountdowns((prev) => ({
              ...prev,
              [item.id]: "Expired",
            }));
          } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
            );

            setCountdowns((prev) => ({
              ...prev,
              [item.id]: `${days} hr ${hours} jam ${minutes} mnt`,
            }));
          }
        }, 1000);

        newCountdowns[item.id] = interval;
      }
    });

    return () => {
      // Clear all intervals when component unmounts
      Object.values(newCountdowns).forEach(clearInterval);
    };
  }, [data]);

  console.warn("result", data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <HeaderAdmin />
      <br></br>
      <br></br>
      <br></br>
      <div className="utama-pi">
        <h1>Peraturan Iklan</h1>
        <div className="tambah-iklan" onClick={() => navigate("/tambah-iklan")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#145B73"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <p>Tambah Iklan</p>
        </div>
        <div className="search-pi">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-pi"
          />
        </div>
        <br></br>
        <div className="radio-group-pi">
          <Container>
            <Form.Group>
              <div className="radio-buttons-pi">
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
                  label="Belum Tayang"
                  name="validasi"
                  id="not-validated"
                  value="0"
                  checked={filterStatus === "0"}
                  onChange={(e) => setFilterStatus(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Sedang Tayang"
                  name="validasi"
                  id="validated"
                  value="1"
                  checked={filterStatus === "1"}
                  onChange={(e) => setFilterStatus(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Tidak Tayang"
                  name="validasi"
                  id="not-validate"
                  value="3"
                  checked={filterStatus === "3"}
                  onChange={(e) => setFilterStatus(e.target.value)}
                />
              </div>
            </Form.Group>
          </Container>
        </div>
        <br></br>
        <Container>
          <Row className="justify-content-center">
            {filteredData.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}>
                Data tidak ditemukan
              </p>
            ) : (
              filteredData.map((item, index) => (
                <Col
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="elemen-iklan"
                  onClick={() => navigate("/detail-iklan/" + item.id)}>
                  <img
                    src={"http://localhost:8000/storage/" + item.gambar_iklan}
                    alt="Berita"
                  />
                  <div className="detail-iklan-bawah">
                    <h1>{item.nama_brand}</h1>
                    <div className="detail-iklan-depan">
                      <div className="icon-validasi-iklan-depan">
                        {item.is_tayang === 0 && (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="gold"
                              className="bi bi-clock-history"
                              viewBox="0 0 16 16">
                              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                            <p style={{ color: "goldenrod" }}>Belum tayang</p>
                          </>
                        )}
                        {item.is_tayang === 1 && (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="green"
                              className="bi bi-check-circle-fill"
                              viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                            <p style={{ color: "green" }}>Sedang Tayang</p>
                          </>
                        )}
                        {item.is_tayang === 3 && (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="red"
                              className="bi bi-x-circle-fill"
                              viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>
                            <p style={{ color: "red" }}>Tidak Tayang</p>
                          </>
                        )}
                      </div>

                      <div className="lama-tayang">
                        <p>
                          {item.is_tayang === 1
                            ? countdowns[item.id] || "Menunggu waktu..."
                            : item.waktu_tayang?.waktu_tayang + " " + " Hari"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default PengaturanIklan;
