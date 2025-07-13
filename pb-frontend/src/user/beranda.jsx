import HeaderUser from "./header-user";
import Loading from "../general/loading";
import Layout from "../general/Layout";
import "../css/user/beranda.css";
import Promo from "./promo";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ExampleCarouselImage from "./components/ExampleCarouselImage";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
dayjs.extend(relativeTime);
import { useLocation } from "react-router-dom";

function Beranda() {

  const [index, setIndex] = useState(0);
  const [beritaData, setBeritaData] = useState(Array(5).fill(null)); // Simpan 5 data berita

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // 👇 tambahkan useCallback agar fungsi tidak berubah setiap render
  const handleDataLoad = useCallback((data, i) => {
    setBeritaData((prev) => {
      const newData = [...prev];
      newData[i] = data;
      return newData;
    });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/pencarian-berita-beranda?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  //API Kategori
  const [kategoriList, setKategoriList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState(null);

  useEffect(() => {
    if (kategoriList.length > 0 && selectedKategori === null) {
      const defaultKategori = kategoriList.find((item) => item.id === 1);
      if (defaultKategori) {
        setSelectedKategori(defaultKategori);
      }
    }
  }, [kategoriList, selectedKategori]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8000/api/ShowKategori");
        const result = await response.json();
        setKategoriList(result);

        // Set default kategori (id = 1)
        const defaultKategori = result.find((item) => item.id === 1);
        if (defaultKategori) {
          setSelectedKategori(defaultKategori);
        }

      } catch (error) {
        console.error("Failed to fetch kategori data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const trendingRef = useRef(null);

  const handleClickKategori = (kategori) => {
    setSelectedKategori(kategori);

    // Scroll ke Trending News
    setTimeout(() => {
      trendingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // delay kecil agar render sempat terjadi
  };


  //API Berita
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // mulai loading
        const response = await fetch("http://localhost:8000/api/ShowBeritaAllGeneral");
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

  const [currentPageBerita, setCurrentPageBerita] = useState(1);
  const BeritaPerPage = 8;

  const filteredData = selectedKategori
    ? data.filter((item) => item.kategori?.id === selectedKategori.id)
    : data;

  const sortedData = [...filteredData].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const trendingNews1 = sortedData[0]; // berita paling baru
  const trendingNews2 = sortedData.slice(1, 4); // 3 berita setelahnya (bisa sesuaikan)
  const otherNews = sortedData.slice(4);

  // Reset ke halaman 1 saat kategori berubah
  useEffect(() => {
    setCurrentPageBerita(1);
  }, [selectedKategori]);

  // Hitung index slicing
  const indexOfLastBerita = currentPageBerita * BeritaPerPage;
  const indexOfFirstBerita = indexOfLastBerita - BeritaPerPage;
  const currentBerita = otherNews.slice(indexOfFirstBerita, indexOfLastBerita);
  const totalPagesBerita = Math.ceil(otherNews.length / BeritaPerPage);

  // Ganti halaman
  const handlePageChangeBerita = (pageNumberBerita) => {
    if (pageNumberBerita >= 1 && pageNumberBerita <= totalPagesBerita) {
      setCurrentPageBerita(pageNumberBerita);
    }
  };

  const truncateByWord = (text, maxLength) => {
    if (text.length <= maxLength) return text;

    const trimmed = text.slice(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace) + " ...";
  };

  // Saat ganti kategori, reset halaman ke 1
  useEffect(() => {
    setCurrentPageBerita(1);
  }, [selectedKategori]);

  //kategori lain

  // Ambil query param
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const kategoriIdFromURL = queryParams.get("kategori_id");

  useEffect(() => {
    if (kategoriIdFromURL && kategoriList.length > 0) {
      const kategoriDariURL = kategoriList.find(
        (item) => item.id.toString() === kategoriIdFromURL
      );
      if (kategoriDariURL) {
        setSelectedKategori(kategoriDariURL);
      }
    }
  }, [kategoriList, kategoriIdFromURL]);

  // Asumsikan kategoriList sudah terisi
  const selectedId = selectedKategori?.id || 1; // default id 1
  const selectedIndex = kategoriList.findIndex(k => k.id === selectedId);

  // Bagi jadi dua bagian
  const kategoriSetelahSelected = [
    ...kategoriList.slice(selectedIndex + 1),
    ...kategoriList.slice(0, selectedIndex)
  ];

  const empatKategoriBerikutnya = kategoriSetelahSelected.slice(0, 4);
  const sisaKategori = [...kategoriSetelahSelected.slice(4)]; // tambah kategori aktif ke akhir


  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <HeaderUser />
      <br></br>
      <br></br>
      <Promo />
      <Carousel activeIndex={index} onSelect={handleSelect} controls={false} interval={3000}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Carousel.Item key={i}>
            <Link
              to={
                beritaData[i]
                  ? `/detail-berita-general/${beritaData[i].id}`
                  : "#"
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ExampleCarouselImage index={i} onDataLoad={(data) => handleDataLoad(data, i)} />
              <Carousel.Caption className="text-carousel">
                <h3>{beritaData[i]?.judul_berita || "Loading..."}</h3>
                <p>
                  {beritaData[i]?.updated_at
                    ? `${dayjs(beritaData[i].updated_at).fromNow()}`
                    : ""}{" "}
                  | {beritaData[i]?.user?.username || "Unknown"}
                </p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="search-beranda">
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

      {/* Kategori elemen */}
      <Container style={{ marginBottom: "50px" }}>
        <h1
          className="title-sub-beranda">
          Kategori
        </h1>
        <Row className="justify-content-center">
          {kategoriList.map((kategori) => (
            <Col xs="auto" sm={6} md={4} lg={3} key={kategori.id}>
              <div
                className={`kategori-berita-dbg ${selectedKategori?.id === kategori.id ? "active" : ""
                  }`}
                onClick={() => handleClickKategori(kategori)}
              >
                <div className="gambar-kategori-dbg">
                  <img
                    src={`http://localhost:8000/storage/${kategori.gambar_kategori}`}
                    alt={kategori.kategori}
                  />
                </div>
                <div className="nama-kategori-dbg">
                  <p>{kategori.kategori}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

      </Container>

      {/* Trending News */}
      <Container ref={trendingRef} style={{ marginBottom: "50px" }}>
        <h1
          className="title-sub-beranda">
          Trending News
        </h1>
        <Row className="trending-news g-0">
          {trendingNews1 && (
            <Col xs={12} lg={6} className="trending-news-1">
              <Link to={`/detail-berita-general/${trendingNews1.id}`} className="trending-news-link">
                <img src={`http://localhost:8000/storage/${trendingNews1.gambar_berita}`}
                  alt={trendingNews1.judul_berita} />
                <div className="detail-trend-1">
                  <p className="p2">
                    {trendingNews1.updated_at ? `${dayjs(trendingNews1.updated_at).fromNow()}` : ""}
                    | {trendingNews1.user?.username}
                  </p>
                  <h1>{trendingNews1.judul_berita}</h1>
                  <p dangerouslySetInnerHTML={{ __html: trendingNews1.isi_berita.slice(0, 100) + "..." }} />
                </div>
              </Link>
            </Col>
          )}
          <Col xs={12} lg={6} className="trending-news-2">
            {trendingNews2.map((item) => (
              <Link key={item.id} to={`/detail-berita-general/${item.id}`} className="trending-news-link">
                <div className="trending-news-item">
                  <div className="img-item-tn">
                    <img src={`http://localhost:8000/storage/${item.gambar_berita}`}
                      alt={item.judul_berita} />
                  </div>
                  <div className="ket-detail-tn">
                    <div className="penulis-tn">
                      <p>
                        {item.updated_at
                          ? `${dayjs(item.updated_at).fromNow()}`
                          : ""}{" "}
                        | {item.user?.username}</p>
                    </div>
                    <div className="ket-singkat-tn">
                      <h1>
                        {truncateByWord(item.judul_berita, 60)}
                      </h1>
                      <p dangerouslySetInnerHTML={{ __html: item.isi_berita.slice(0, 100) + "..." }} />
                    </div>
                  </div>
                </div>
              </Link>

            ))}
          </Col>
        </Row>
      </Container>
      <Container style={{ marginBottom: "50px" }}>
        <Row className="justify-content-center">
          {currentBerita.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "20px",
              }}>
              Data tidak ditemukan
            </p>
          ) : (
            currentBerita.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3} className="elemen-berita-beranda" key={item.id} onClick={() => navigate("/detail-berita-general/" + item.id)}>
                <img src={`http://localhost:8000/storage/${item.gambar_berita}`}
                  alt={item.judul_berita} />

                <div className="detail-berita-bawah-beranda">
                  <h1>{truncateByWord(item.judul_berita, 60)}</h1>
                  <div className="penulis-berita-depan-beranda">
                    <p>{item.updated_at
                      ? `${dayjs(item.updated_at).fromNow()}`
                      : ""}{" "}
                      | {item.user?.username}</p>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
        {/* Pagination */}
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
              const pageNumber = index + 1;
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPageBerita}
                  onClick={() => handlePageChangeBerita(pageNumber)}
                >
                  {pageNumber}
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
      <div className="garis-beranda" style={{ marginBottom: "50px" }}></div>

      {/* Berita lainnya */}
      <Container style={{ marginBottom: "50px" }}>
        <div className="utama-per-kategori">
          {empatKategoriBerikutnya.map((kategori) => {
            const beritaKategori = data
              .filter((berita) => berita.kategori?.id === kategori.id)
              .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

            const beritaTerbaru = beritaKategori[0];
            const beritaLainnya = beritaKategori.slice(1, 5); // Ambil 4 berita setelah yg terbaru

            return (
              <div key={kategori.id}>
                {/* Header Kategori dan Baca Selengkapnya */}
                <div className="atas-per-kategori">
                  <h2>{kategori.kategori}</h2>
                  <div className="baca-all-beranda">
                    <Link
                      to={`/?kategori_id=${kategori.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="baca-all-beranda"
                      onClick={() => handleClickKategori(kategori)}
                    >
                      <p>Baca Selengkapnya</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* ✅ Berita Utama */}
                {beritaTerbaru && (
                  <div className="trend-per-kategori">
                    <img src={`http://localhost:8000/storage/${beritaTerbaru.gambar_berita}`}
                      alt={beritaTerbaru.judul_berita} />
                    <div className="detail-trend-per-kategori">
                      <h1>{beritaTerbaru.judul_berita}</h1>
                      <p dangerouslySetInnerHTML={{ __html: beritaTerbaru.isi_berita.slice(0, 250) + "..." }} />
                    </div>
                  </div>
                )}

                {/* ✅ 4 Berita Setelahnya */}
                <Container className="berita-per-kategori">
                  <Row className="justify-content-center">
                    {beritaLainnya.map((item) => (
                      <Col
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="elemen-berita-beranda"
                        onClick={() => navigate(`/detail-berita-general/${item.id}`)}>
                        <img src={`http://localhost:8000/storage/${item.gambar_berita}`}
                          alt={item.judul_berita} />

                        <div className="detail-berita-bawah-beranda">
                          <h1>{truncateByWord(item.judul_berita, 65)}</h1>
                          <div className="penulis-berita-depan-beranda">
                            <p>
                              {item.updated_at
                                ? `${dayjs(item.updated_at).fromNow()}`
                                : ""}{" "}
                              | {item.user?.username}
                            </p></div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Container>

                <div
                  className="garis-beranda"
                  style={{ marginBottom: "50px", marginTop: "30px" }}
                ></div>
              </div>
            );
          })}
        </div>
      </Container>
      <Container>
        <div className="utama-kategori-berita-2">
          <Row>
            {sisaKategori.map((kategori) => {
              const beritaKategori = data
                .filter((berita) => berita.kategori?.id === kategori.id)
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

              const beritaTerbaru = beritaKategori[0];
              const beritaLainnya = beritaKategori.slice(1, 5); // 4 berita setelah terbaru

              return (
                <Col xs={12} sm={6} md={6} lg={6} key={kategori.id}>
                  <div className="utama-berita-1">
                    <div className="atas-per-kategori-2">
                      <h2>{kategori.kategori}</h2>
                      <div className="baca-all-beranda-2">
                        <Link to={`/?kategori_id=${kategori.id}`} style={{ textDecoration: "none", color: "inherit" }} className="baca-all-beranda"
                          onClick={() => handleClickKategori(kategori)}>
                          <p>Baca Selengkapnya</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16">
                            <path
                              fillRule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Berita utama */}
                    {beritaTerbaru && (
                      <div className="elemen-berita-beranda-1" onClick={() => navigate(`/detail-berita-general/${beritaTerbaru.id}`)}
                        style={{ cursor: "pointer" }}>
                        <img src={`http://localhost:8000/storage/${beritaTerbaru.gambar_berita}`}
                          alt={beritaTerbaru.judul_berita} />

                        <div className="detail-berita-bawah-beranda-1">
                          <h1>{truncateByWord(beritaTerbaru.judul_berita, 65)}</h1>
                          <div className="penulis-berita-depan-beranda-1">
                            <p>{beritaTerbaru.updated_at ? `${dayjs(beritaTerbaru.updated_at).fromNow()}` : ""} | {beritaTerbaru.user?.username}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4 berita lainnya */}
                    {beritaLainnya.map((item) => (
                      <React.Fragment key={item.id}>
                        <div className="garis-beranda-3"></div>
                        <div className="elemen-berita-beranda-2" onClick={() => navigate(`/detail-berita-general/${item.id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="detail-berita-bawah-beranda-2">
                            <h1>{truncateByWord(item.judul_berita, 65)}</h1>
                            <div className="penulis-berita-depan-beranda-1">
                              <p>{item.updated_at ? `${dayjs(item.updated_at).fromNow()}` : ""} | {item.user?.username}</p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
      <div className="footer">
        <p className="tagline-footer-beranda">
          " Dunia terus bergerak, begitu juga berita! TrenToday menyajikan tren
          terkini dan informasi terupdate agar Anda selalu terdepan dalam setiap
          perkembangan. "
        </p>
        <div className="footer-medsos-beranda">
          <p>
            Social Media
          </p>
          <div className="icon-medsos">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-whatsapp"
              viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-instagram"
              viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          </div>
        </div>
        <div className="copy-beranda-all" style={{ marginTop: "30px" }}>
          <div className="copy-beranda">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-c-circle"
              viewBox="0 0 16 16">
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
            </svg>
            <p>2025 TrenToday. All Rights Reserved.</p>
          </div>
          <p>
            Seluruh konten dilindungi undang-undang hak cipta. Dilarang menyalin
            atau mempublikasikan ulang tanpa izin
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Beranda;
