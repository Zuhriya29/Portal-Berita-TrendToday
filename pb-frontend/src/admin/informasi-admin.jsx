import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderAdmin from "./header-admin";
import "../css/admin/info-admin.css";
import { useNavigate } from "react-router-dom";
import Loading from "../general/loading";

function InformasiAdmin() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👉 Tambahkan state loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch("http://localhost:8000/api/ShowAdmin");
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

  console.warn("result", data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <HeaderAdmin />
      <br></br>
      <br></br>
      <br></br>
      <div className="utama-info-admin">
        <h1>Informasi Admin</h1>
        <div className="tambah-admin" onClick={() => navigate("/tambah-admin")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#145B73"
            className="bi bi-person-plus"
            viewBox="0 0 16 16"
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            <path
              fillRule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
          <p>Tambah Admin</p>
        </div>
        <div className="search-info-admin">
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
        <br></br>
        <Container>
          <Row className="justify-content-center">
            {data.filter((item) =>
              item.username.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
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
              data
                .filter((item) =>
                  item.username.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="admin"
                    onClick={() => navigate("/detail-admin/" + item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                    <p>{item.username}</p>
                  </Col>
                ))
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default InformasiAdmin;
