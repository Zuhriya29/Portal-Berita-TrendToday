import HeaderAdmin from "./header-admin"
import { LineChart1 } from './diagram/line-chart-1.jsx';
import { LineChart2 } from './diagram/line-chart-2.jsx';
import { LineChart3 } from './diagram/line-chart-3.jsx';
import Layout from "../general/Layout";
import "../css/admin/admin.css";
import Row from "react-bootstrap/esm/Row.js";
import Col from "react-bootstrap/esm/Col.js";
import { useState, useEffect } from "react";
import Loading from "../general/loading";

function Admin() {
    const [totalBerita, setTotalBerita] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

//total berita
    useEffect(() => {
        const fetchTotalBerita = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-berita");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalBerita(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalBerita();
    }, []);

    console.warn("result", totalBerita);

//total berita belum validasi

const [totalBeritaBelumDivalidasi, setTotalBeritaBelumValidasi] = useState(0);

    useEffect(() => {
        const fetchTotalBeritaBelumValidasi = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-berita-belum-validasi");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalBeritaBelumValidasi(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalBeritaBelumValidasi();
    }, []);

    console.warn("result", totalBeritaBelumDivalidasi);

//total berita bulan ini

const [totalBeritaBulanIni, setTotalBeritaBulanIni] = useState(0);

    useEffect(() => {
        const fetchTotalBeritaBulanIni = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-berita-bulan-ini");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalBeritaBulanIni(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalBeritaBulanIni();
    }, []);

    console.warn("result", totalBeritaBulanIni);

//total iklan

const [totalIklan, setTotalIklan] = useState(0);

    useEffect(() => {
        const fetchTotalIklan = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-iklan");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalIklan(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalIklan();
    }, []);

    console.warn("result", totalIklan);

//total iklan sedang Tayang

const [totalIklanSedangTayang, setTotalIklanSedangTayang] = useState(0);

    useEffect(() => {
        const fetchTotalIklanSedangTayang = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-iklan-sedang-tayang");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalIklanSedangTayang(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalIklanSedangTayang();
    }, []);

    console.warn("result", totalIklanSedangTayang);

//total iklan bulan ini

const [totalIklanBulanIni, setTotalIklanBulanIni] = useState(0);

    useEffect(() => {
        const fetchTotalIklanBulanIni = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-iklan-bulan-ini");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalIklanBulanIni(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalIklanBulanIni();
    }, []);

    console.warn("result", totalIklanBulanIni);

//total user

const [totalUser, setTotalUser] = useState(0);

    useEffect(() => {
        const fetchTotalUser = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-user");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalUser(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalUser();
    }, []);

    console.warn("result", totalUser);

//total user bulan ini

const [totalUserBulanIni, setTotalUserBulanIni] = useState(0);

    useEffect(() => {
        const fetchTotalUserBulanIni = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:8000/api/total-user-bulan-ini");
                console.log("Response status:", response.status);

                const result = await response.json();
                console.log("API result:", result);

                setTotalUserBulanIni(result.total);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalUserBulanIni();
    }, []);

    console.warn("result", totalUserBulanIni);

    if (isLoading) {
        return <Loading />;
    }


    return (
        <Layout>
            <HeaderAdmin />
            <br></br>
            <br></br>
            <br></br>
            <div className="utama-admin">
                <h1>Performa Platform</h1>
                <div className="utama-komponen-admin">
                    <Row className="per-komponen-admin">
                        <Col xs={5}
                            sm={6}
                            md={4}
                            lg={3} className="komponen-admin">
                            <p className="header-komponen-admin">Total Berita</p>
                            <p className="value-komponen-admin">{totalBerita}</p>
                        </Col>
                        <Col xs={5}
                            sm={6}
                            md={4}
                            lg={3} className="komponen-admin">
                            <p className="header-komponen-admin">Berita Belum Dipublikasi</p>
                            <p className="value-komponen-admin">{totalBeritaBelumDivalidasi}</p>
                        </Col>
                        <Col xs={5}
                            sm={6}
                            md={4}
                            lg={3} className="komponen-admin">
                            <p className="header-komponen-admin">Berita Baru Bulan Ini</p>
                            <p className="value-komponen-admin">{totalBeritaBulanIni}</p>
                        </Col>
                        <Col xs={5}
                            sm={6}
                            md={4}
                            lg={3} className="komponen-admin">
                            <p className="header-komponen-admin">Total Iklan</p>
                            <p className="value-komponen-admin">{totalIklan}</p>
                        </Col>
                        <Col xs={5}
                            sm={6}
                            md={4}
                            lg={3} className="komponen-admin">
                            <p className="header-komponen-admin">Total Iklan Sedang Tayang</p>
                            <p className="value-komponen-admin">{totalIklanSedangTayang}</p>
                        </Col>
                        <Col xs={5}
                            sm={6}
                            md={4}
                            lg={3} className="komponen-admin">
                            <p className="header-komponen-admin">Total Iklan Bulan Ini</p>
                            <p className="value-komponen-admin">{totalIklanBulanIni}</p>
                        </Col>
                    </Row>
                </div>
                <div className="garis-admin"></div>
                <Row className="utama-komponen-admin-2">
                    <Col xs={12} md={3} order={{ xs: 1, md: 1 }} className="per-komponen-admin-2">
                        <div className="komponen-admin">
                            <p className="header-komponen-admin">Total User</p>
                            <p className="value-komponen-admin">{totalUser}</p>
                        </div>
                        <div className="komponen-admin">
                            <p className="header-komponen-admin">User Baru Bulan Ini</p>
                            <p className="value-komponen-admin">{totalUserBulanIni}</p>
                        </div>
                    </Col>
                    <Col xs={12} md={9} order={{ xs: 2, md: 2 }} className="line-chart">
                        <LineChart1 />
                    </Col>
                </Row>
                <div className="garis-admin"></div>
                <LineChart2 />
                <LineChart3 />
            </div>
        </Layout>
    )
}

export default Admin;