import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "./header-admin";
import "../css/admin/pengaturan-lain.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Layout from "../general/Layout";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengakses cookies

function PengaturanLain() {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [isAdding2, setIsAdding2] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdating2, setIsUpdating2] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleting2, setIsDeleting2] = useState(false);

  const [showHapusModal, setShowHapusModal] = useState(false);
  const [showHapusModal2, setShowHapusModal2] = useState(false);

  const [showUbahModal, setShowUbahModal] = useState(false);
  const [showUbahModal2, setShowUbahModal2] = useState(false);

  const [kategori, setKategori] = useState("");
  const [kategoriToUpdate, setKategoriToUpdate] = useState("");
  const [kategoriList, setKategoriList] = useState([]); // Ganti dari kategori
  const [idKategoriToDelete, setIdKategoriToDelete] = useState(null);
  const [idKategoriToUpdate, setIdKategoriToUpdate] = useState(null);

  const [waktu_tayang, setWaktuTayang] = useState("");
  const [waktutayangToUpdate, setWaktuTayangToUpdate] = useState("");
  const [waktutayangList, setWaktuTayangList] = useState([]); // Ganti dari kategori
  const [idWaktuTayangToUpdate, setIdWaktuTayangToUpdate] = useState(null);
  const [idWaktuTayangToDelete, setIdWaktuTayangToDelete] = useState(null);

  const fileInputRefMain = useRef(null);
  const fileInputRefDetail = useRef(null);

  const [selectedImageMain, setSelectedImageMain] = useState(null);
  const [selectedImageDetail, setSelectedImageDetail] = useState(null);

  const [imageSizeMain, setImageSizeMain] = useState({
    width: "40vw",
    height: "35vh",
  });

  const [isHovered, setIsHovered] = useState(false);
  const [gambar_kategori, setGambarKategori] = useState("");

  
  // 🟡 Fungsi: Buka modal ubah dan set data awal
  const handleOpenUbahModal = (kategori) => {
    setIdKategoriToUpdate(kategori.id);
    setKategoriToUpdate(kategori.kategori);
    setGambarKategori(null); // reset file
    setSelectedImageDetail(`http://localhost:8000/storage/${kategori.gambar_kategori}`); // ✅ set preview awal
    setShowUbahModal(true);
  };

  const handleCloseUbahModal = () => {
  setShowUbahModal(false);
  setGambarKategori(null);
  setSelectedImageDetail(null);
  setKategoriToUpdate("");
};


  const handleFileChangeMain = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarKategori(file); // jika ini memang shared, tidak masalah
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setImageSizeMain({
          width: `${img.width}px`,
          height: `${img.height}px`,
        });
        setSelectedImageMain(imageUrl);
      };
    }
  };

  const handleFileChangeDetail = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageDetail(imageUrl);
      setGambarKategori(file);
    }
  };

  const filteredKategori = kategoriList.filter(
    (item) =>
      item &&
      item.kategori &&
      item.kategori.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const filteredWaktuTayang = waktutayangList.filter((item) =>
    String(item.waktu_tayang).toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKategori = filteredKategori.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredKategori.length / itemsPerPage);

  const [currentPage2, setCurrentPage2] = useState(1);
  const itemsPerPage2 = 5;

  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
  const currentWaktuTayang = filteredWaktuTayang.slice(
    indexOfFirstItem2,
    indexOfLastItem2
  );
  const totalPages2 = Math.ceil(filteredWaktuTayang.length / itemsPerPage2);

  // tampilkan kategori berita
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ShowKategori");
        const result = await response.json();
        setKategoriList(result); // Simpan array hasil fetch
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      }
    };

    fetchKategori();
  }, []);

  //tambah kategori baru
  const addKategori = async () => {
    if (!kategori || !gambar_kategori) {
      setModalMessage(
        "Semua kolom wajib diisi. Mohon lengkapi formulir terlebih dahulu."
      );
      setShowModal(true);
      return;
    }

    setIsAdding(true);

    try {
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });

      const formData = new FormData();
      formData.append("kategori", kategori);
      formData.append("gambar_kategori", gambar_kategori);

      let response = await fetch("http://localhost:8000/api/AddKategori", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Kategori berhasil ditambahkan!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Tambahkan data baru ke list
        const newKategori = result.data;
        setKategoriList((prevList) => [
          ...prevList,
          {
            ...newKategori,
            gambar_kategori: `${newKategori.gambar_kategori}?t=${Date.now()}`,
          },
        ]);

        // Reset form
        setKategori("");
        setGambarKategori(null);
        setSelectedImageMain(null); // ✅ Kosongkan preview gambar
        setImageSizeMain({ width: "", height: "" }); // ✅ Reset ukuran jika perlu
      } else {
        setModalMessage(
          result.message || "Terjadi kesalahan saat menambahkan."
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
    } finally {
      setIsAdding(false);
    }
  };

  // Hapus Kategori
  const deleteKategori = async () => {
    try {
      setIsDeleting(true);

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(
        `http://localhost:8000/api/DeleteKategori/${idKategoriToDelete}`,
        {
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
        }
      );

      setShowHapusModal(false);

      toast.success("Kategori berhasil dihapus", {
        position: "top-center",
        autoClose: 2000,
      });

      // Refresh data lokal tanpa reload
      setKategoriList((prev) =>
        prev.filter((item) => item.id !== idKategoriToDelete)
      );
    } catch (error) {
      console.error("Gagal menghapus kategori:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  //updated kategori
  const handleUpdateKategori = async () => {
    try {
      setIsUpdating(true);

      const formData = new FormData();
      formData.append("kategori", kategoriToUpdate);
      if (gambar_kategori) {
        formData.append("gambar_kategori", gambar_kategori); // hanya jika ada file baru
      }

      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });

      const response = await fetch(
        `http://localhost:8000/api/UpdateKategori/${idKategoriToUpdate}?_method=PUT`,
        {
          method: "POST", // pakai _method=PUT di FormData
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            // ⛔ JANGAN tambahkan Content-Type, biarkan browser atur otomatis
          },
          body: formData, // ✅ gunakan FormData di sini
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Kategori berhasil diperbarui", {
          position: "top-center",
          autoClose: 2000,
        });

        const updatedKategori = result.data;

        setKategoriList((prev) =>
          prev.map((item) =>
            item.id === idKategoriToUpdate
              ? {
                  ...updatedKategori,
                  gambar_kategori: `${
                    updatedKategori.gambar_kategori
                  }?t=${Date.now()}`,
                }
              : item
          )
        );

        setShowUbahModal(false);
      } else {
        setModalMessage(
          result.message || "Terjadi kesalahan saat memperbarui."
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
    } finally {
      setIsUpdating(false);
    }
  };

  // tampilkan waktu tayang
  useEffect(() => {
    const fetchWaktuTayang = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/ShowWaktuTayang"
        );
        const result = await response.json();
        setWaktuTayangList(result); // Simpan array hasil fetch
      } catch (error) {
        console.error("Gagal mengambil data waktu tayang:", error);
      }
    };

    fetchWaktuTayang();
  }, []);

  //tambah waktu tayang
  const addWaktuTayang = async () => {
    // ✅ Validasi form tidak boleh ada yang kosong
    if (!waktu_tayang) {
      setModalMessage(
        "Semua kolom wajib diisi. Mohon lengkapi formulir terlebih dahulu."
      );
      setShowModal(true);
      return;
    }

    // ✅ Tambahan validasi agar input harus berupa angka
    if (isNaN(waktu_tayang) || !Number.isInteger(Number(waktu_tayang))) {
      setModalMessage(
        "Waktu tayang harus berupa angka bulat, Jangan tambahkan karakter lain"
      );
      setShowModal(true);
      return;
    }

    let item = { waktu_tayang };
    setIsAdding2(true); // Mulai loading

    console.warn(item);
    try {
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      let response = await fetch("http://localhost:8000/api/AddWaktuTayang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
        },
        body: JSON.stringify(item),
        credentials: "include", // penting agar XSRF-TOKEN dikirim
      });

      let result = await response.json();
      console.log("result", result);

      if (response.ok) {
        localStorage.setItem("ta-waktu-tayang", JSON.stringify(result));
        const newWaktuTayang = result.data || item; // tergantung struktur responsmu
        toast.success("Waktu Tayang berhasil ditambahkan!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Tambahkan data baru ke state
        setWaktuTayangList((prevList) => [...prevList, newWaktuTayang]);

        // Reset input form
        setWaktuTayang("");
        setIsAdding2(false); // ✅ tambahkan ini
      } else {
        setModalMessage(result.message || "Terjadi kesalahan saat mendaftar.");
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
      setIsAdding2(false); // ⬅️ Tambahkan ini
    }
  };

  // Hapus Kategori
  const deleteWaktuTayang = async () => {
    try {
      setIsDeleting2(true);

      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      await fetch(
        `http://localhost:8000/api/DeleteWaktuTayang/${idWaktuTayangToDelete}`,
        {
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
        }
      );

      setShowHapusModal2(false);

      toast.success("Waktu Tayang berhasil dihapus", {
        position: "top-center",
        autoClose: 2000,
      });

      // Refresh data lokal tanpa reload
      setWaktuTayangList((prev) =>
        prev.filter((item) => item.id !== idWaktuTayangToDelete)
      );
    } catch (error) {
      console.error("Gagal menghapus waktu tayang:", error);
    } finally {
      setIsDeleting2(false);
    }
  };

  //updated kategori
  const handleUpdateWaktuTayang = async () => {
    try {
      setIsUpdating2(true);
      // Ambil CSRF token terlebih dahulu dari Laravel
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // Penting agar cookie disimpan
      });

      const response = await fetch(
        `http://localhost:8000/api/UpdateWaktuTayang/${idWaktuTayangToUpdate}?_method=PUT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // pastikan ini valid
          },

          body: JSON.stringify({ waktu_tayang: waktutayangToUpdate }),
          credentials: "include", // penting agar XSRF-TOKEN dikirim
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Waktu Tayang berhasil diperbarui", {
          position: "top-center",
          autoClose: 2000,
        });

        // Update data pada state tanpa reload
        setWaktuTayangList((prev) =>
          prev.map((item) =>
            item.id === idWaktuTayangToUpdate
              ? { ...item, waktu_tayang: waktutayangToUpdate }
              : item
          )
        );

        setShowUbahModal2(false); // Menutup modal setelah berhasil update
      } else {
        setModalMessage(
          result.message || "Terjadi kesalahan saat memperbarui."
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti.");
      setShowModal(true);
    } finally {
      setIsUpdating2(false);
    }
  };

  return (
    <Layout>
      <HeaderAdmin />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="judul-pl">Pengaturan Lain</h1>
      <br></br>
      <br></br>
      <div className="utama-pl">
        <div className="utama-topik-pl">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="topik-pl">
                <p>Kategori Berita</p>
              </Accordion.Header>
              <Accordion.Body className="body-pl">
                <br></br>
                <Container>
                  <Row className="utama-kategori-pl">
                    <Col xs={12} md={12} lg={6} className="tabel-topik-pl">
                      <h3>Data Kategori Berita</h3>
                      <div className="search-pl">
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
                          value={searchTerm1}
                          onChange={(e) => setSearchTerm1(e.target.value)}
                          className="search-input-pl"
                        />
                      </div>
                      <br></br>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th
                              style={{
                                textAlign: "center",
                              }}>
                              No
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                              }}>
                              Gambar
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                              }}>
                              Kategori
                            </th>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                width: "1%", // biar kolom menyesuaikan isi, bukan pakai proporsi besar
                                textAlign: "center",
                              }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
  {currentKategori.length === 0 ? (
    <tr>
      <td colSpan="4">Belum ada data.</td>
    </tr>
  ) : (
    currentKategori.map((item, index) => (
      <tr key={item.id || index}>
        <td>{indexOfFirstItem + index + 1}</td>
        <td className="gambar-tabel">
          <img
            src={`http://localhost:8000/storage/${item.gambar_kategori}`}
            alt="Kategori"
            style={{ width: "80px", height: "auto" }}
          />
        </td>
        <td>{item.kategori}</td>
        <td style={{ whiteSpace: "nowrap" }}>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setIdKategoriToDelete(item.id);
              setShowHapusModal(true);
            }}
          >
            Hapus
          </Button>
          &nbsp;
          <Button
            variant="warning"
            size="sm"
            onClick={() => handleOpenUbahModal(item)}
          >
            Ubah
          </Button>
        </td>
      </tr>
    ))
  )}
</tbody>

                      </Table>

                      {totalPages > 1 && (
                        <div className="page-pl d-flex justify-content-center mt-3">
                          <nav>
                            <ul className="pagination">
                              {[...Array(totalPages)].map((_, index) => (
                                <li
                                  key={index}
                                  className={`page-item ${
                                    currentPage === index + 1 ? "active" : ""
                                  }`}>
                                  <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </div>
                      )}
                    </Col>
                    <Col xs={12} md={12} lg={6} className="form-topik-pl mt-5 mt-md-0">
                      <h3>Tambah Kategori Berita Baru</h3>
                      <div
                        className="tambah-gambar-kategori"
                        onClick={() => fileInputRefMain.current.click()}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          width: selectedImageMain
                            ? imageSizeMain.width
                            : "40vw",
                          height: selectedImageMain
                            ? imageSizeMain.height
                            : "250px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "30px",
                          background: selectedImageMain
                            ? "transparent"
                            : "white",
                          border: selectedImageMain
                            ? "none"
                            : "1px solid #145B73",
                          maxWidth: "40vw", // Membatasi ukuran maksimum
                          maxHeight: "70vh", // Membatasi ukuran maksimum
                        }}>
                        {/* Jika belum ada gambar, tampilkan SVG plus & teks */}
                        {!selectedImageMain && (
                          <div
                            style={{ textAlign: "center", color: "#145B73" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="50"
                              fill="currentcolor"
                              viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                            <p style={{ marginTop: "5px", fontSize: "14px" }}>
                              Tambah Gambar
                            </p>
                          </div>
                        )}

                        {/* Jika sudah pilih gambar, tampilkan gambar */}
                        {selectedImageMain && (
                          <>
                            <img
                              src={selectedImageMain}
                              alt="Preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                transition: "opacity 0.3s ease",
                                filter: isHovered
                                  ? "brightness(50%)"
                                  : "brightness(100%)",
                                maxWidth: "40vw", // Membatasi ukuran maksimum lebar gambar
                                maxHeight: "70vh", // Membatasi tinggi gambar agar tidak terlalu besar
                              }}
                            />

                            {/* Overlay muncul saat hover */}
                            {isHovered && (
                              <div
                                className="overlay"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(0, 0, 0, 0.4)",
                                  color: "#fff",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                }}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="50"
                                  height="50"
                                  fill="white"
                                  viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                <p style={{ marginTop: "5px", color: "white" }}>
                                  Tambah Gambar
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Input file tersembunyi */}
                      <input
                        type="file"
                        ref={fileInputRefMain}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChangeMain}
                      />
                      <Form>
                        <Form.Group
                          controlId="exampleForm.ControlInput1"
                          className="form-topik-pl">
                          <Form.Label>Kategori</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Masukkan Kategori Berita Baru"
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            className="input-kategori"
                          />
                        </Form.Group>
                      </Form>
                      <br></br>
                      <br></br>
                      <br></br>
                      <div className="button-pl">
                        <Button
                          onClick={addKategori}
                          disabled={isAdding}
                          style={{
                            backgroundColor: "#145B73",
                            minWidth: "120px", // ✅ agar ukuran tetap
                            height: "38px", // ✅ agar tinggi tetap
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          {isAdding ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"></span>
                              &nbsp;Loading...
                            </>
                          ) : (
                            "Tambahkan"
                          )}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
            <br></br>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="topik-pl">
                <p>Waktu Tayang Iklan</p>
              </Accordion.Header>
              <Accordion.Body className="body-pl">
                <br></br>
                <Container>
                  <Row className="utama-kategori-pl">
                    <Col xs={12} md={12} lg={6} className="tabel-topik-pl">
                      <h3>Data Waktu Tayang Iklan</h3>
                      <div className="search-pl">
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
                          value={searchTerm2}
                          onChange={(e) => setSearchTerm2(e.target.value)}
                          className="search-input-pl"
                        />
                      </div>
                      <br></br>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th
                              style={{
                                textAlign: "center",
                              }}>
                              No
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                              }}>
                              Waktu Tayang
                            </th>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                width: "1%", // biar kolom menyesuaikan isi, bukan pakai proporsi besar
                                textAlign: "center",
                              }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentWaktuTayang.length === 0 ? (
                            <tr>
                              <td colSpan="3">Belum ada data.</td>
                            </tr>
                          ) : (
                            [...currentWaktuTayang]
                              .sort(
                                (a, b) =>
                                  parseInt(a.waktu_tayang) -
                                  parseInt(b.waktu_tayang)
                              )
                              .map((item, index) => (
                                <tr key={item.id || index}>
                                  <td>{indexOfFirstItem2 + index + 1}</td>
                                  <td>{item.waktu_tayang} Hari</td>
                                  <td style={{ whiteSpace: "nowrap" }}>
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => {
                                        setIdWaktuTayangToDelete(item.id);
                                        setShowHapusModal2(true);
                                      }}>
                                      Hapus
                                    </Button>
                                    &nbsp;
                                    <Button
                                      variant="warning"
                                      size="sm"
                                      onClick={() => {
                                        setWaktuTayangToUpdate(
                                          item.waktu_tayang
                                        ); // ✅ set data awal ke form
                                        setIdWaktuTayangToUpdate(item.id);
                                        setShowUbahModal2(true);
                                      }}>
                                      Ubah
                                    </Button>
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </Table>

                      {totalPages2 > 1 && (
                        <div className="page-pl d-flex justify-content-center mt-3">
                          <nav>
                            <ul className="pagination">
                              {[...Array(totalPages2)].map((_, index) => (
                                <li
                                  key={index}
                                  className={`page-item ${
                                    currentPage2 === index + 1 ? "active" : ""
                                  }`}>
                                  <button
                                    className="page-link"
                                    onClick={() => setCurrentPage2(index + 1)}>
                                    {index + 1}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </div>
                      )}
                    </Col>
                    <Col xs={12} md={12} lg={6} className="form-topik-pl mt-5 mt-md-0">
                      <h3>Tambah Waktu Tayang Iklan Baru</h3>
                      <Form>
                        <Form.Group
                          as={Row}
                          className="form-topik-pl"
                          controlId="exampleForm.ControlInput2">
                          <Form.Label>Waktu Tayang</Form.Label>
                          <Col sm="10">
                            <Form.Control
                              type="number"
                              placeholder="Masukkan Waktu Tayang Iklan Baru"
                              value={waktu_tayang}
                              onChange={(e) => setWaktuTayang(e.target.value)}
                              className="no-spinner"
                            />
                          </Col>
                          <Form.Label column sm="2">
                            Hari
                          </Form.Label>
                        </Form.Group>
                      </Form>
                      <br></br>
                      <br></br>
                      <br></br>
                      <div className="button-pl">
                        <Button
                          onClick={addWaktuTayang}
                          disabled={isAdding}
                          style={{
                            backgroundColor: "#145B73",
                            minWidth: "120px", // ✅ agar ukuran tetap
                            height: "38px", // ✅ agar tinggi tetap
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          {isAdding2 ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"></span>
                              &nbsp;Loading...
                            </>
                          ) : (
                            "Tambahkan"
                          )}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      {/* Modal Hapus kategori*/}
      <Modal
        show={showHapusModal}
        onHide={() => setShowHapusModal(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <p className="pesan-modal">
            Apakah anda yakin ingin menghapus kategori ini ?
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
            onClick={deleteKategori}
            disabled={isDeleting}>
            {isDeleting ? "Menghapus..." : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal form ubah kategori */}
      <Modal
        show={showUbahModal}
        onHide={handleCloseUbahModal}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <h5 className="pesan-modal">Ubah Kategori</h5>
          <div
            className="gambar-detail-kategori"
            onClick={() => fileInputRefDetail.current.click()}
            value={"http://localhost:8000/storage/" + gambar_kategori}
            onChange={(e) => setGambarKategori(e.target.value)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: "relative",
              cursor: "pointer",
              width: "fit-content", // Ukuran default
              height: "auto",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {/* Gambar */}
            <img
              src={selectedImageDetail}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s ease",
                filter: isHovered ? "brightness(50%)" : "brightness(100%)",
              }}
            />

            {/* Overlay muncul saat hover */}
            {isHovered && (
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="white"
                  viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                <p style={{ marginTop: "5px" }}>Tambah Gambar</p>
              </div>
            )}
          </div>

          {/* Input file tersembunyi */}
          <input
            type="file"
            ref={fileInputRefDetail}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChangeDetail}
          />
          <Form>
            <Form.Group
              controlId="kategoriToUpdate"
              className="form-topik-pl-2">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Kategori"
                value={kategoriToUpdate}
                onChange={(e) => setKategoriToUpdate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button
            className="button-modal"
            variant="secondary"
            onClick={() => setShowUbahModal(false)}>
            Batal
          </Button>
          <Button
            className={`button-modal ${isUpdating ? "loading-dots" : ""}`}
            onClick={handleUpdateKategori}
            disabled={isUpdating}>
            {isUpdating ? "Memperbarui..." : "Ubah"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Hapus waktu tayang*/}
      <Modal
        show={showHapusModal2}
        onHide={() => setShowHapusModal2(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <p className="pesan-modal">
            Apakah anda yakin ingin menghapus waktu tayang ini ?
          </p>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button
            className="button-modal"
            variant="secondary"
            onClick={() => setShowHapusModal2(false)}>
            Tidak
          </Button>
          <Button
            className={`danger ${isDeleting2 ? "loading-dots" : ""}`}
            onClick={deleteWaktuTayang}
            disabled={isDeleting2}>
            {isDeleting2 ? "Menghapus..." : "Ya"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal form ubah waktu tayang */}
      <Modal
        show={showUbahModal2}
        onHide={() => setShowUbahModal2(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton />
        <Modal.Body>
          <h5 className="pesan-modal">Ubah Waktu Tayang</h5>
          <Form>
            <Form.Group
              as={Row}
              className="form-topik-pl-2 mb-3"
              controlId="waktutayangToUpdate">
              <Form.Label>Waktu Tayang</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder="Masukkan Waktu Tayang Ikan"
                  value={waktutayangToUpdate}
                  onChange={(e) => setWaktuTayangToUpdate(e.target.value)}
                  className="no-spinner"
                />
              </Col>
              <Form.Label column sm="2">
                Hari
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button
            className="button-modal"
            variant="secondary"
            onClick={() => setShowUbahModal2(false)}>
            Batal
          </Button>
          <Button
            className={`button-modal ${isUpdating2 ? "loading-dots" : ""}`}
            onClick={handleUpdateWaktuTayang}
            disabled={isUpdating2}>
            {isUpdating2 ? "Memperbarui..." : "Ubah"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk menampilkan error validasi */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        className="utama-modal">
        <Modal.Header className="modal-header" closeButton></Modal.Header>
        <Modal.Body>
          <p className="pesan-modal">{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-modal" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default PengaturanLain;
