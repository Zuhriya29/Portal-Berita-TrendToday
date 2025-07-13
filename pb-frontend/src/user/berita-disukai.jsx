import "../css/user/berita-disukai.css";
import HeaderUser from "./header-user";
import Loading from "../general/loading";
import { useNavigate } from "react-router-dom";
import Promo from "./promo";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function BeritaDisukai() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👉 Tambahkan state loading
  const [filterStatus, /* setFilterStatus */] = useState(""); // "" = semua, "1" = sudah, "0" = belum

  const filteredData = data
    .filter((item) => {
      const matchSearch = item.berita?.judul_berita
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchStatus =
        filterStatus === "" ||
        item.berita?.is_approved?.toString() === filterStatus;

      return matchSearch && matchStatus;
    })
    .sort(
      (a, b) => new Date(b.berita?.updated_at) - new Date(a.berita?.updated_at)
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // mulai loading

        const response = await fetch(
          "http://localhost:8000/api/all-berita-disukai",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token-user")}`, // Kirim token-user login
            },
            credentials: "include", // Penting untuk kirim cookie jika pakai Sanctum
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Gagal mengambil data berita disukai."
          );
        }

        setData(result);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
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
    <div>
      <HeaderUser />
      <br></br>
      <br></br>
      <br></br>
      <Promo />
      <div className="utama-bd">
        <h1>Berita yang Disukai</h1>
        <div className="search-bd">
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
            className="search-input-bd"
          />
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
                  className="elemen-berita-bd"
                  onClick={() =>
                    navigate("/detail-berita-general/" + item.berita?.id)
                  }>
                  <img
                    src={
                      "http://localhost:8000/storage/" +
                      item.berita?.gambar_berita
                    }
                    alt="Berita"
                  />

                  <div className="detail-berita-bawah-bd">
                    <h1>{truncateByWord(item.berita?.judul_berita, 65)}</h1>
                    <div className="detail-berita-depan-bd">
                      <div className="icon-validasi-berita-depan-bd">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#D80808"
                          className="bi bi-heart-fill"
                          viewBox="0 0 16 16">
                          <path
                            fillRule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                          />
                        </svg>
                      </div>

                      <div className="penulis-berita-depan-bd">
                        <p>
                          {item.berita?.updated_at
                            ? `${dayjs(item.berita.updated_at).fromNow()}`
                            : ""}{" "}
                          | {item.berita?.user?.username}
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
    </div>
  );
}

export default BeritaDisukai;
