import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/user/detail-berita-general.css";

const Suka = ({ userId }) => {
    const { id } = useParams();

    const [, /* isDeleting */ setIsDeleting] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    //API Suka
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);

    useEffect(() => {
        const fetchSuka = async () => {
            try {
                await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                    credentials: "include",
                });

                const response = await fetch(
                    `http://localhost:8000/api/berita/${id}/liked`,
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

                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }

                const data = await response.json(); // { liked: true/false, like_id: number|null }

                setIsLiked(data.liked);
                setLikeId(data.like_id); // PENTING: set likeId dari backend
            } catch (err) {
                console.error("Gagal mengambil data berita disukai:", err);
            }
        };

        fetchSuka();
    }, [id, userId]);

    // Hapus dan Tambah Suka
    const handleLikeToggle = async (beritaId) => {
        try {
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include",
            });

            const xsrfToken = decodeURIComponent(
                document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("XSRF-TOKEN="))
                    ?.split("=")[1] ?? ""
            );

            if (isLiked) {
                // UNLIKE
                if (!likeId) {
                    console.error("likeId tidak ditemukan untuk unlike");
                    return;
                }

                setIsDeleting(true);

                // Ambil CSRF token terlebih dahulu dari Laravel
                await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                    method: "GET",
                    credentials: "include", // Penting agar cookie disimpan
                });

                const token = localStorage.getItem("token-user"); // Ambil token yang disimpan saat login

                const response = await fetch(
                    `http://localhost:8000/api/berita-disukai/${likeId}/unlike`,
                    {
                        method: "DELETE",
                        credentials: "include",
                        headers: {
                            Authorization: `Bearer ${token}`, // token dari login response
                            "X-XSRF-TOKEN": xsrfToken,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    setIsLiked(false);
                    setLikeId(null); // reset likeId saat sudah unlike
                    toast.success("Berita berhasil di-unlike", {
                        position: "top-center",
                        autoClose: 1500,
                    });
                } else {
                    console.error("Gagal unlike berita");
                }
            } else {
                // LIKE
                const token = localStorage.getItem("token-user"); // Ambil token yang disimpan saat login

                if (!token) {
                    toast.info("Silakan login terlebih dahulu untuk menyukai berita!", {
                        position: "top-center",
                        autoClose: 1500,
                    });
                    return; // hentikan proses
                }

                const response = await fetch(
                    `http://localhost:8000/api/berita/${beritaId}/like`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            Authorization: `Bearer ${token}`, // token dari login response
                            "X-XSRF-TOKEN": xsrfToken,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ berita_id: beritaId }),
                    }
                );

                if (response.ok) {
                    const resData = await response.json();
                    setIsLiked(true);
                    setLikeId(resData.like_id); // set likeId hasil create like
                    toast.success("Berita berhasil disukai", {
                        position: "top-center",
                        autoClose: 1500,
                    });
                } else {
                    console.error("Gagal like berita");
                }
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat like/unlike:", error);
        } finally {
            setIsDeleting(false); // ✅ selesai loading
        }
    };

    // share berita
    const handleShare = () => {
        const url = window.location.href; // URL berita saat ini
        const title = document.title; // atau gunakan judul berita jika ada

        if (navigator.share) {
            // 📱 Jika browser mendukung Web Share API (HP modern)
            navigator
                .share({
                    title: title,
                    url: url,
                })
                .then(() => console.log("Berita berhasil dibagikan"))
                .catch((error) => console.error("Gagal membagikan berita:", error));
        } else {
            // 💬 Jika tidak didukung, tampilkan opsi manual (WhatsApp, Telegram, dsb)
            alert("Bagikan link ini ke media sosial:\n" + url);
        }
    };
    return (
        <div>

            <div className="icon-lihat-dbg">
                <div
                    className="suka"
                    onClick={() => handleLikeToggle(Number(id))}
                    onMouseEnter={() => setIsHovered1(true)}
                    onMouseLeave={() => setIsHovered1(false)}
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "1px",
                    }}>
                    {isLiked || isHovered1 ? (
                        <>
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
                            <p style={{ color: "#D80808" }}>Suka</p>
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-heart"
                                viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                            <p>Suka</p>
                        </>
                    )}
                </div>
                <div
                    className="bagikan"
                    onClick={handleShare} // ← tambahkan ini
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "1px",
                    }}>
                    {isHovered2 ? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="green"
                                className="bi bi-share-fill"
                                viewBox="0 0 16 16">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
                            </svg>
                            <p style={{ color: "green" }}>Bagikan</p>
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-share"
                                viewBox="0 0 16 16">
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                            </svg>
                            <p>Bagikan</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Suka
