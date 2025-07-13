import "../../css/user/detail-berita-general.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Pagination,
    Container,
} from "react-bootstrap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function BeritaLain({ idKategori }) {

    const [/* isLoading */, setIsLoading] = useState(true);

    //Berita Lainnya
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const filteredData = data.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    useEffect(() => {
        if (!idKategori) return; // Pastikan idKategori sudah tersedia

        const fetchBeritaByKategori = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `http://localhost:8000/api/ShowBeritaByKategori/${idKategori}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token-user")}`,
                        },
                        credentials: "include",
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Gagal mengambil berita berdasarkan kategori."
                    );
                }

                setData(result);
            } catch (error) {
                console.error("Error fetch berita by kategori:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBeritaByKategori();
    }, [idKategori]);

    const truncateByWord = (text, maxLength) => {
        if (text.length <= maxLength) return text;

        const trimmed = text.slice(0, maxLength);
        const lastSpace = trimmed.lastIndexOf(" ");
        return trimmed.slice(0, lastSpace) + " ...";
    };

    const [currentPageBerita, setCurrentPageBerita] = useState(1);

    const BeritaPerPage = 8;

    // Data yang akan dipakai (filtered atau semua)
    const displayedData = filteredData.length > 0 ? filteredData : data;

    // Hitung data untuk halaman saat ini
    const indexOfLastBerita = currentPageBerita * BeritaPerPage;
    const indexOfFirstBerita = indexOfLastBerita - BeritaPerPage;
    const currentBerita = displayedData.slice(
        indexOfFirstBerita,
        indexOfLastBerita
    );
    const totalPagesBerita = Math.ceil(displayedData.length / BeritaPerPage);

    // Fungsi ubah halaman
    const handlePageChangeBerita = (pageNumberBerita) => {
        if (pageNumberBerita >= 1 && pageNumberBerita <= totalPagesBerita) {
            setCurrentPageBerita(pageNumberBerita);
        }
    };

    return (
        <div>

            <div className="berita-lainnya-dbg">
                <h1>Berita Lain</h1>
                <Container style={{ marginBottom: "50px" }}>
                    <Row className="justify-content-center">
                        {displayedData.length === 0 ? (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    marginTop: "20px",
                                }}>
                                Data tidak ditemukan
                            </p>
                        ) : (
                            currentBerita.map((item, index) => (
                                <Col
                                    key={index}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    className="elemen-berita-lainnya-dbg"
                                    onClick={() => navigate("/detail-berita-general/" + item.id)}>
                                    <img
                                        src={"http://localhost:8000/storage/" + item.gambar_berita}
                                        alt="Berita"
                                    />

                                    <div className="detail-berita-bawah-dbg">
                                        <h1>{truncateByWord(item.judul_berita, 65)}</h1>
                                        <div className="penulis-berita-depan-dbg">
                                            <p>
                                                {item.updated_at
                                                    ? `${dayjs(item.updated_at).fromNow()}`
                                                    : ""}{" "}
                                                | {item.user?.username}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        )}
                    </Row>

                    {totalPagesBerita > 1 && (
                        <Pagination className="custom-pagination">
                            <Pagination.First
                                onClick={() => handlePageChangeBerita(1)}
                                disabled={currentPageBerita === 1}
                            />
                            <Pagination.Prev
                                onClick={() => handlePageChangeBerita(currentPageBerita - 1)}
                                disabled={currentPageBerita === 1}
                            />

                            {[...Array(totalPagesBerita)].map((_, index) => {
                                const pageberita = index + 1;
                                return (
                                    <Pagination.Item
                                        key={pageberita}
                                        active={pageberita === currentPageBerita}
                                        onClick={() => handlePageChangeBerita(pageberita)}>
                                        {pageberita}
                                    </Pagination.Item>
                                );
                            })}

                            <Pagination.Next
                                onClick={() => handlePageChangeBerita(currentPageBerita + 1)}
                                disabled={currentPageBerita === totalPagesBerita}
                            />
                            <Pagination.Last
                                onClick={() => handlePageChangeBerita(totalPagesBerita)}
                                disabled={currentPageBerita === totalPagesBerita}
                            />
                        </Pagination>
                    )}
                </Container>
            </div>
        </div>
    )
}

export default BeritaLain
