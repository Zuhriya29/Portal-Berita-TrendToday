import HeaderUser from "./header-user";
import "../css/user/pencarian-berita-beranda.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import Promo from "./promo";
import { useEffect, useState } from "react";
import Loading from "../general/loading";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function OffCanvasExample({ selectedKategori,
  setSelectedKategori,
  selectedTanggal,
  setSelectedTanggal,
  selectedUrutan,
  setSelectedUrutan,
  placement,
  onTerapkan }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [kategoriList, setKategoriList] = useState([]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ShowKategori");
        const result = await response.json();
        if (Array.isArray(result)) {
          setKategoriList(result);
        }
      } catch (error) {
        console.error("Failed to fetch kategori data:", error);
      }
    };

    fetchKategori();
  }, []);

  const tanggalList = ["Hari Ini", "7 Hari Terakhir", "30 Hari Terakhir"];

  const urutkanList = ["Terbaru", "Terpopuler", "Paling Banyak Dibaca"];

  return (
    <>
      <div className="button-kategori" onClick={handleShow}>
        <p>Filter</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-funnel"
          viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
        </svg>
      </div>
      <Offcanvas
        style={{ marginTop: "60px" }}
        show={show}
        onHide={handleClose}
        placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="judul-kategori">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-funnel"
              viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
            </svg>
            <p>Filter</p>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="judul-item-filter">Kategori</p>
          <Row className="justify-content-start" style={{ marginLeft: "0px" }}>
            <Col
              xs={4}
              className={`kategori-pencarian ${selectedKategori === null ? "active" : ""}`}
              onClick={() => setSelectedKategori(null)}
            >
              Semua
            </Col>
            {kategoriList.map((kategori, index) => (
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                key={index}
                className={`kategori-pencarian ${selectedKategori === kategori.kategori ? "active" : ""
                  }`}
                onClick={() => setSelectedKategori(kategori.kategori)}>
                {kategori.kategori}
              </Col>
            ))}
          </Row>
          <br />
          <p className="judul-item-filter">Tanggal / Waktu Terbit</p>
          <Row className="justify-content-start" style={{ marginLeft: "0px" }}>
            {tanggalList.map((tanggal, index) => (
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                key={index}
                className={`kategori-pencarian ${selectedTanggal === tanggal ? "active" : ""
                  }`}
                onClick={() => setSelectedTanggal(tanggal)}>
                {tanggal}
              </Col>
            ))}
          </Row>
          <br />
          <p className="judul-item-filter">Urutkan Berasarkan</p>
          <Row className="justify-content-start" style={{ marginLeft: "0px" }}>
            {urutkanList.map((urut, index) => (
              <Col
                xs={6}
                key={index}
                className={`kategori-pencarian ${selectedUrutan === urut ? "active" : ""}`}
                onClick={() => setSelectedUrutan(urut)}
              >
                {urut}
              </Col>
            ))}
          </Row>
          <br />
        </Offcanvas.Body>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button className="button-terapkan-pencarian" onClick={() => {
            onTerapkan();
            handleClose();
          }}>Terapkan</Button>
        </div>
      </Offcanvas>
    </>
  );
}

function PencarianBeritaBeranda() {

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedKategori, setSelectedKategori] = useState(null);
  const [selectedTanggal, setSelectedTanggal] = useState(null);

  const [filterKategoriAktif, setFilterKategoriAktif] = useState(null);
  const [filterTanggalAktif, setFilterTanggalAktif] = useState(null);

  const [selectedUrutan, setSelectedUrutan] = useState(null);
  const [filterUrutanAktif, setFilterUrutanAktif] = useState(null)

  // Fetch semua data berita saat pertama kali halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch data berita
        const resBerita = await fetch("http://localhost:8000/api/ShowBeritaAllGeneral");
        const berita = await resBerita.json();

        // Fetch data jumlah like per berita
        const resLike = await fetch("http://localhost:8000/api/berita-disukai-general");
        const likes = await resLike.json();

        // Gabungkan total_like ke setiap item berita
        const beritaWithLikes = berita.map((item) => {
          const likeData = likes.find((l) => l.berita_id === item.id);
          return {
            ...item,
            total_like: likeData ? likeData.total_like : 0,
          };
        });

        setData(beritaWithLikes);
        setResults(beritaWithLikes); // jika ingin tampilkan semua awalnya
      } catch (error) {
        console.error("Failed to fetch berita atau likes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  // 🔁 Filter otomatis saat query, kategori aktif, atau tanggal aktif berubah
  useEffect(() => {
    let filtered = [...data];

    // Filter pencarian judul (langsung)
    if (query.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.judul_berita?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter kategori (setelah Terapkan)
    if (filterKategoriAktif) {
      filtered = filtered.filter(
        (item) =>
          item.kategori?.kategori?.toLowerCase() === filterKategoriAktif.toLowerCase()
      );
    }

    // Filter tanggal (setelah Terapkan)
    if (filterTanggalAktif) {
      const now = new Date();
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.updated_at);
        const diffInDays = (now - itemDate) / (1000 * 60 * 60 * 24);

        if (filterTanggalAktif === "Hari Ini") {
          return itemDate.toDateString() === now.toDateString();
        } else if (filterTanggalAktif === "7 Hari Terakhir") {
          return diffInDays <= 7;
        } else if (filterTanggalAktif === "30 Hari Terakhir") {
          return diffInDays <= 30;
        }
        return true;
      });
    }

    if (filterUrutanAktif) {
    if (filterUrutanAktif === "Terbaru") {
      filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (filterUrutanAktif === "Terpopuler") {
      filtered.sort((a, b) => b.total_like - a.total_like); // like sudah digabung sebelumnya
    } else if (filterUrutanAktif === "Paling Banyak Dibaca") {
      filtered.sort((a, b) => b.total_view - a.total_view); // ini bagian yang kamu maksud
    }
  }

    setResults(filtered);
  }, [query, data, filterKategoriAktif, filterTanggalAktif, filterUrutanAktif]);


  console.log("Filter kategori aktif:", filterKategoriAktif);
  console.log("Semua kategori berita:", data.map((d) => d.kategori_berita));


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchParams(searchTerm.trim() === "" ? {} : { q: searchTerm });
    }
  };

  const handleTerapkanFilter = () => {
    setFilterKategoriAktif(selectedKategori); // baru aktif setelah klik Terapkan
    setFilterTanggalAktif(selectedTanggal);
    setFilterUrutanAktif(selectedUrutan);
  };

  const truncateByWord = (text, maxLength) => {
    if (text.length <= maxLength) return text;

    const trimmed = text.slice(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace) + " ...";
  };


  if (isLoading) return <Loading />;

  return (
    <div>
      <HeaderUser />
      <br></br>
      <br></br>
      <Promo />
      <div className="kembali-pencarian" onClick={() => navigate("/")}>
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
      <div className="atas-pencarian">
        <div className="search-pencarian">
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
            onKeyDown={handleKeyDown}
            className="search-input"
          />
        </div>
        {["end"].map((placement, idx) => (
          <OffCanvasExample
            key={idx}
            placement={placement}
            name={placement}
            selectedKategori={selectedKategori}
            setSelectedKategori={setSelectedKategori}
            selectedTanggal={selectedTanggal}
            setSelectedTanggal={setSelectedTanggal}
            selectedUrutan={selectedUrutan}
            setSelectedUrutan={setSelectedUrutan}
            onTerapkan={handleTerapkanFilter}
          />
        ))}
      </div>
      <br />

      {results.length > 0 ? (
        <Container>
          <Row className="justify-content-center">
            {results.map((item, idx) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={idx}
                onClick={() => navigate("/detail-berita-general/" + item.id)}
                className="elemen-berita-pencarian">
                <img src={"http://localhost:8000/storage/" + item.gambar_berita} />

                <div className="detail-berita-bawah-pencarian">
                  <h1>{truncateByWord(item.judul_berita, 65)}</h1>
                  <div className="penulis-berita-depan-pencarian">
                    <p>
                      {" "}
                      {item.updated_at
                        ? `${dayjs(item.updated_at).fromNow()}`
                        : ""}{" "}
                      | {item.user?.username}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <p style={{
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "20px",
        }}>Tidak ada hasil ditemukan.</p>
      )}
    </div>
  );
}

export default PencarianBeritaBeranda;
