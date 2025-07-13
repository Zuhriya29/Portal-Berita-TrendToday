import "../css/admin/lihat-berita-admin.css";
import React, { useState, useEffect } from "react";
import Layout from "../general/Layout";
import Loading from "../general/loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { toast } from "react-toastify";

function LihatBeritaAdmin() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const [judul_berita, setJudulBerita] = useState("");
  const [username, setUsername] = useState("");
  const [nama_user, setNamaUser] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar_berita, setGambarBerita] = useState("");
  const [isi_berita, setIsiBerita] = useState("");
  const [is_approved, setApproved] = useState("");
  const [updated_at, setUpdatedAt] = useState("");

  const [komentar, setKomentar] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 6;

  const navigate = useNavigate();

  const [showHapusModal, setShowHapusModal] = useState(false);

  // Ambil detail berita dari API
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch(
          `http://localhost:8000/api/ShowIsiBerita/${id}`
        );
        const data = await response.json();
        setJudulBerita(data.judul_berita || "");
        setUsername(data.user?.username || ""); // dari relasi user
        setNamaUser(data.user?.nama_user || ""); // dari relasi user
        setKategori(data.kategori?.kategori || ""); // dari relasi kategori
        setGambarBerita(data.gambar_berita || "");
        setIsiBerita(data.isi_berita || "");
        setApproved(data.is_approved !== undefined ? data.is_approved : "");
        setUpdatedAt(data.updated_at || "");

        // Menyaring komentar yang is_approved = 1
        const approvedComments =
          data.komentar?.filter((comment) => comment.is_approved === 1) || [];
        setKomentar(approvedComments);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false); // selesai loading
      }
    };
    fetchAdmin();
  }, [id]);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = komentar.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(komentar.length / commentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hapus Admin
  const deleteOperation = async () => {
    try {
      setIsDeleting(true); // ⏳ mulai loading

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(`http://localhost:8000/api/DeleteBerita/${id}`, {
        method: "DELETE",
        credentials: "include", // Penting
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("XSRF-TOKEN="))
              ?.split("=")[1] ?? ""
          ),
          "Content-Type": "application/json",
        },
      });

      setShowHapusModal(false);

      // Tampilkan notifikasi
      toast.success("Berita berhasil dihapus", {
        position: "top-center",
        autoClose: 2000, // otomatis hilang setelah 2 detik
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate("/publish-berita-admin");
      }, 2000);
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
    } finally {
      setIsDeleting(false); // ✅ selesai loading
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="atas-lihat-berita-admin">
        <Link to="/publish-berita-admin">
          <div className="kembali-lba">
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
        <div className="icon-lihat-berita-admin">
          {is_approved === 0 && (
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
              <p style={{ color: "goldenrod" }}>Menunggu Validasi</p>
            </>
          )}

          {is_approved === 1 && (
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
              <p style={{ color: "green" }}>Diterima</p>
            </>
          )}

          {is_approved === 3 && (
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
              <p style={{ color: "red" }}>Ditolak</p>
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center judul-detail-lba-1">
        <h1 className="judul-detail-lba-2">{judul_berita}</h1>
        <p className="penulis-detail-lba">
          {new Date(updated_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })} |{" "}
          {nama_user || username} | {kategori}
        </p>
        <img
          src={"http://localhost:8000/storage/" + gambar_berita}
          alt="Berita"
        />
        <div
          className="isi-berita-lba"
          dangerouslySetInnerHTML={{ __html: isi_berita }}></div>
      </div>
      <div className="komentar-lba">
        <h1>Komentar</h1>
        <Row>
          {komentar.length === 0 ? (
            <Col xs={12}>
              <p className="text-komentar">Belum ada komentar</p>
            </Col>
          ) : (
            currentComments.map((item, index) => (
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={6}
                className="komentars-dvk-2"
                key={index}>
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
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 
                  11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 
                  5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  <p className="nama-user-dvk">{item.user?.username}</p>
                </div>
                <div className="komentar-dvk-2" dangerouslySetInnerHTML={{ __html: item.komentar }}></div>
              </Col>
            ))
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
      </div>
      <div className="button-lba-utama">
        <Button
          className="button-danger-lba"
          type="danger"
          onClick={() => setShowHapusModal(true)}>
          Hapus
        </Button>
        <Button
          className="button-lba"
          onClick={() => navigate("/detail-berita-admin/" + id)}>
          Edit
        </Button>
      </div>

      {/* Modal Konfirmasi */}
      <Modal
        show={showHapusModal}
        onHide={() => setShowHapusModal(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <p className="pesan-modal">
            Apakah anda yakin ingin menghapus admin dengan id {id} ini?
          </p>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button
            className="button-modal"
            variant="secondary"
            onClick={() => setShowHapusModal(false)}>
            Tidak
          </Button>
          <Button
            className={`danger ${isDeleting ? "loading-dots" : ""}`}
            onClick={deleteOperation}
            disabled={isDeleting}>
            {isDeleting ? "Menghapus" : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default LihatBeritaAdmin;
