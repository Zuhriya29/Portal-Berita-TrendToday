import "../css/admin/detail-validasi-komentar.css";
import React, { useState, useEffect } from "react";
import Loading from "../general/loading";
import Layout from "../general/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function DetailValidasiKomentar() {

  const [isLoading, setIsLoading] = useState(true);

  const [komentar, setKomentar] = useState([]);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 6;

  const [filterStatus, setFilterStatus] = useState("");

  const filteredComments = Array.isArray(komentar)
    ? komentar
      .filter((item) => {
        const matchStatus =
          filterStatus === "" ||
          item.is_approved?.toString() === filterStatus;
        return matchStatus;
      })
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    : [];

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { id } = useParams();

  // Ambil detail berita dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:8000/api/ShowIsiBerita/${id}`, // <-- pastikan ini ada!
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const result = await response.json();
        console.log("result:", result); // <-- bukan result.data!

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        // Langsung akses result.komentar
        if (!Array.isArray(result.komentar)) {
          console.warn("Tidak ada komentar yang ditemukan atau bukan array.");
          setKomentar([]);
        } else {
          setKomentar(result.komentar);
        }

      } catch (error) {
        console.error("Failed to fetch komentar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // idBerita harus didefinisikan (dari params atau props)


  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="atas-detail-validasi-komentar">
        <Link to="/validasi-komentar">
          <div className="kembali-dvk">
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
      </div>
      <Container className="utama-dvk">
        <h1 className="judul-dvk">Detail Komentar</h1>
        <div className="radio-group-dvk">
         <Container>
                     <Form.Group>
                       <div className="radio-buttons-dvk">
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
                           label="Belum Divalidasi"
                           name="validasi"
                           id="not-validated"
                           value="0"
                           checked={filterStatus === "0"}
                           onChange={(e) => setFilterStatus(e.target.value)}
                         />
                         <Form.Check
                           type="radio"
                           label="Sudah Divalidasi"
                           name="validasi"
                           id="validated"
                           value="1"
                           checked={filterStatus === "1"}
                           onChange={(e) => setFilterStatus(e.target.value)}
                         />
                         <Form.Check
                           type="radio"
                           label="Tidak Divalidasi"
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
        <Row className="komentars-dvk-1">
          {filteredComments.length === 0 ? (
            <Col xs={12}>
              <p className="text-komentar">Belum ada komentar</p>
            </Col>
          ) : (
            currentComments.map((item, index) => {

              return (
                <Col
                  key={index}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  className="komentars-dvk-2">
                  <div className="user-dvk">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                    <p className="nama-user-dvk">{item.user?.username}</p>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: item.komentar }} className="komentar-dvk" />
                  <div className="action-dvk">
                    <div className="icon-detail-validasi-komentar">
                      {" "}
                      {item.is_approved === 0 && (
                        <div className="icon-terima-dvk">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="gold"
                            className="bi bi-clock-history-fill"
                            viewBox="0 0 16 16">
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </div>
                      )}

                      {item.is_approved === 1 && (
                        <div className="icon-terima-dvk" >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="green"
                            className="bi bi-check-circle-fill"
                            viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                          </svg>
                        </div>
                      )}

                      {item.is_approved === 3 && (
                        <div className="icon-terima-dvk">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="red"
                            className="bi bi-x-circle-fill"
                            viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p onClick={() => navigate("/edit-komentar-admin/" + item.id)}>Edit</p>
                  </div>
                </Col>
              );
            })
          )}
        </Row>

        <Pagination className="custom-pagination">
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}>
                {page}
              </Pagination.Item>
            );
          })}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Container>
    </Layout>
  );
}

export default DetailValidasiKomentar;
