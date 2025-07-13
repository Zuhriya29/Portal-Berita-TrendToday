import "../css/admin/edit-komentar-admin.css";
import React, { useState, useEffect } from "react";
import Layout from "../general/Layout";
import Loading from "../general/loading";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function EditKomentarAdmin() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [hoverTerima, setHoverTerima] = useState(false);
    const [hoverTolak, setHoverTolak] = useState(false);

    const [komentar, setKomentar] = useState("");
    const [is_approved, setIsApproved] = useState("");

    const [showUbahModal, setShowUbahModal] = useState(false);

    // Ambil komentar detail dari API
    useEffect(() => {
        const fetchKomentar = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`http://localhost:8000/api/ShowDetailKomentar/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const result = await response.json();
                console.log("Komentar result:", result);

                setKomentar(result.komentar);
                const approved = String(result.is_approved ?? "0");
                setIsApproved(approved);

                setHoverTerima(approved === "1");
                setHoverTolak(approved === "3");

                localStorage.setItem(`status_approved_${id}`, approved);

            } catch (error) {
                console.error("Gagal mengambil data komentar:", error.message);
            } finally {
                setIsLoading(false);
            }
        };


        if (id) fetchKomentar();
    }, [id]);

    const [selectedStatus, setSelectedStatus] = useState(null);

    // Set ulang status ketika berubah
    useEffect(() => {
        if (is_approved !== undefined && is_approved !== null) {
            setHoverTerima(is_approved === "1");
            setHoverTolak(is_approved === "3");
            localStorage.setItem(`status_approved_${id}`, is_approved);
        }
    }, [id, is_approved]);


    const handleApproveClick = (status) => {
        setSelectedStatus(status); // simpan status baru ke state lain
        setShowUbahModal(true);
    };


    // Fungsi update komentar (PUT)
    const UpdateKomentar = async () => {
        try {
            setIsUpdating(true);

            const formData = new FormData();
            formData.append("is_approved", selectedStatus); // pakai status TERPILIH, BUKAN state is_approved

            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include",
            });

            await fetch(`http://localhost:8000/api/UpdateKomentar/${id}?_method=PUT`, {
                method: "POST",
                body: formData,
                headers: {
                    "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
                },
                credentials: "include",
            });

            toast.success("Komentar berhasil diubah", {
                position: "top-center",
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error) {
            console.error("Gagal:", error);
            toast.error("Gagal mengupdate validasi komentar", {
                position: "top-center",
                autoClose: 2000,
            });
        } finally {
            setIsUpdating(false);
            setShowUbahModal(false);
        }
    };


    if (isLoading) return <Loading />;

    return (
        <Layout>
            <div className="utama-dk">
                <div className="atas-detail-validasi-berita">
                    <Link to={(-1)}>
                        <div className="kembali-dk">
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
                    <div className="icon-detail-validasi-berita">
                        <div
                            className={`icon-danger ${is_approved === "3" ? "aktif" : ""}`}
                            style={{
                                marginRight: "30px",
                                display: "flex",
                                marginLeft: "30px",
                                cursor: "pointer",
                            }}
                            onMouseEnter={() => setHoverTolak(true)}
                            onMouseLeave={() => setHoverTolak(false)}
                            onClick={() => handleApproveClick("3")}>
                            {hoverTolak || is_approved === "3" ? (
                                // versi fill
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="rgb(151, 5, 5)"
                                    className="bi bi-x-circle-fill"
                                    viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg> // versi outline
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="rgb(151, 5, 5)"
                                    className="bi bi-x-circle"
                                    viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            )}
                            <p style={{ color: "rgb(151, 5, 5)" }}>Ditolak</p>
                        </div>
                        <div
                            className={`icon-terima ${is_approved === "1" ? "aktif" : ""}`}
                            style={{
                                marginRight: "30px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                            onMouseEnter={() => setHoverTerima(true)}
                            onMouseLeave={() => setHoverTerima(false)}
                            onClick={() => handleApproveClick("1")}>
                            {hoverTerima || is_approved === 1 ? (
                                // versi fill
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="green"
                                    className="bi bi-check-circle-fill"
                                    viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            ) : (
                                // versi outline
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="green"
                                    className="bi bi-check-circle"
                                    viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                            )}
                            <p style={{ color: "green" }}>Diterima</p>
                        </div>
                    </div>
                </div>
                <h1>Validasi Status Komentar</h1>
                <Form.Group className="mb-3 utama-text-berita-dk" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Isi Komentar</Form.Label>
                    <div
                        style={{
                            backgroundColor: "white",
                            border: "1px solid #145B73",
                            borderRadius: "5px",
                            boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.2)",
                            padding: "10px",
                            minHeight: "120px",
                        }}
                        dangerouslySetInnerHTML={{ __html: komentar }}
                    ></div>
                </Form.Group>

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
                    <p className="pesan-modal">Yakin ingin mengubah status komentar? </p>
                </Modal.Body>
                <Modal.Footer className="footer-modal">
                    <Button className="danger" onClick={() => setShowUbahModal(false)}>
                        Tidak
                    </Button>
                    <Button
                        className={`button-modal ${isUpdating ? "loading-dots" : ""}`}
                        onClick={UpdateKomentar}
                        disabled={isUpdating}>
                        {isUpdating ? "Menyimpan " : "Ya"}
                    </Button>

                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default EditKomentarAdmin
