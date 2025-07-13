import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/user/detail-berita-general.css";
import {
    Row,
    Col,
    Form,
    Button,
    Modal,
    Pagination,
    Container,
} from "react-bootstrap";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

const Komentar = ({ isLoggedIn }) => {
    const { id } = useParams();

    const [/* isLoading */, setIsLoading] = useState(true);

    // Ambil detail berita dari API
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                setIsLoading(true); // mulai loading
                const response = await fetch(
                    `http://localhost:8000/api/ShowIsiBerita/${id}`
                );
                const data = await response.json();

                // Menyaring komentar yang is_approved = 1
                const approvedComments =
                    data.komentar?.filter((comment) => comment.is_approved === 1) || [];

                // ⬇️ Tambahkan sorting berdasarkan updated_at descending
                const sortedComments = approvedComments.sort((a, b) => {
                    return new Date(b.updated_at) - new Date(a.updated_at);
                });

                setKomentar(sortedComments);

            } catch (error) {
                console.error("Gagal mengambil data user:", error);
            } finally {
                setIsLoading(false); // selesai loading
            }
        };
        fetchAdmin();
    }, [id]);

    // komentar

    const [content, setContent] = useState("");

    const [komentar, setKomentar] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const commentsPerPage = 3;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = komentar.slice(
        indexOfFirstComment,
        indexOfLastComment
    );
    const totalPages = Math.ceil(komentar.length / commentsPerPage);

    //API Komentar
    const addKomentar = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        if (!content || content.trim() === "") {
            setModalMessage(
                "Semua kolom wajib diisi. Mohon lengkapi formulir terlebih dahulu."
            );
            setShowErrorModal(true);
            return;
        }

        const formData = new FormData();
        formData.append("komentar", content);
        formData.append("id_berita", id);

        const token = localStorage.getItem("token-user");

        try {
            // Ambil CSRF token terlebih dahulu dari Laravel
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include", // Penting agar cookie disimpan
            });

            const response = await fetch("http://localhost:8000/api/AddKomentar", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
                },
                credentials: "include", // penting agar XSRF-TOKEN dikirim
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("ta-komentar-user", JSON.stringify(result));
                toast.success("Komentar berhasil ditambahkan, tunggu validasi admin", {
                    position: "top-center",
                    autoClose: 2000,
                });
                setContent(""); // reset textarea
            } else {
                setModalMessage(
                    result.message || "Terjadi kesalahan saat menambahkan berita."
                );
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error("Error:", error);
            setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
            setShowErrorModal(true);
        }

        console.log("ID Berita:", id);
    };

    const handleEditorFocus = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>

            <Row className="utama-komentar-dbg">
                <h1>Komentar</h1>
                <Col xs={12} sm={12} md={6} lg={6} className="komentar-dbg">
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
                                    lg={12}
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
                                    <p className="komentar-teks-dbg" dangerouslySetInnerHTML={{
                                        __html: item.komentar
                                    }}></p>
                                </Col>
                            ))
                        )}
                    </Row>

                    {
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
                    }
                </Col>
                {/* Tambah Komentar */}
                <Col xs={12} sm={12} md={6} lg={6} className="form-komentar-dbg">
                    <Form.Group
                        className="mb-3 utama-text-berita"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{ marginBottom: "30px" }}>
                            Tambahkan Komentar Anda
                        </Form.Label>
                        <div onClick={handleEditorFocus}>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid #145B73",
                                    boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.2)",
                                    borderRadius: "5px",
                                    resize: "none",
                                }}
                            />
                        </div>
                    </Form.Group>
                    <div className="button-komentar-dbg">
                        <Button onClick={addKomentar}>Submit</Button>
                    </div>
                </Col>
            </Row>

            {/* Modal Not Logged In */}
            <Modal
                show={showLoginModal}
                onHide={() => setShowLoginModal(false)}
                size="lg"
                className="utama-modal"
                centered>
                <Modal.Header className="modal-header" closeButton></Modal.Header>
                <Modal.Body>
                    <p className="pesan-modal">
                        Anda harus login terlebih dahulu untuk menambahkan komentar.
                    </p>
                </Modal.Body>
                <Modal.Footer className="footer-modal">
                    <Button className="button-modal" href="/login-user">
                        Login
                    </Button>
                    <Button className="danger" onClick={() => setShowLoginModal(false)}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal untuk menampilkan error validasi */}
            <Modal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
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
                        onClick={() => setShowErrorModal(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Komentar
