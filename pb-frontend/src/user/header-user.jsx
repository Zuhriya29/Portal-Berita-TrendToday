import Navbar from "react-bootstrap/Navbar";
import "../css/user/header-user.css";
import { useState, useEffect } from "react";
import { ElemenSidebar } from "./elemen-sidebar";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function HeaderUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // false = belum login
  const [isActive, setIsActive] = useState(false); // untuk toggle menu

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // State untuk mengontrol visibilitas menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true); // Menandakan bahwa user sudah login
    }
  }, []);

  const navigate = useNavigate();

  // Fungsi untuk toggle menu
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    setIsActive((prev) => !prev);
  };

  const handleLoginRedirect = () => {
    navigate("/login-user"); // arahkan ke halaman login
  };

  // Fungsi untuk menampilkan modal logout
  const confirmLogout = () => {
    setShowLogoutModal(true);
    navigate(`/`);
  };

  const handleEditProfil = () => {
  navigate(`/edit-profil-user/${user.id}`);
};

  // Fungsi untuk logout jika konfirmasi "Ya"
  const handleLogoutConfirm = () => {
    localStorage.clear();
    setIsLoggedIn(false); // Update state isLoggedIn setelah logout
    navigate("/login-user");
  };

  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar className="nav-custom d-flex justify-content-between pe-5">
        <Navbar.Brand href="/" className="nav-brand">
          <img
            alt=""
            src="/images/logo3.png"
            className="d-inline-block align-top"
            style={{ marginRight: "5px" }}
          />{" "}
          TrenToday
        </Navbar.Brand>
        {!isLoggedIn ? (
          <div
            className="akun-header"
            onClick={handleLoginRedirect}
            style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-door-open"
              viewBox="0 0 16 16">
              <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
              <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
            </svg>
            <p>Login</p>
          </div>
        ) : (
          <div
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
            className={`akun-header ${isActive ? "active" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
            <p>{user?.username}</p>
          </div>
        )}
      </Navbar>

      {/* Tampilkan menu hanya jika isMenuVisible bernilai true */}
      {isMenuVisible && (
        <div className="navbar-2 d-flex justify-content-end fixed-top">
          <div className="nav-akun">
            <div
              className="edit-profil"
              onClick={handleEditProfil}>
              <p>Edit Profil</p>
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
            </div>
            <div className="akun-user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: "bold",
                  fontSize: "1em",
                  marginTop: "5px",
                }}>
                {user?.username}
              </p>
              <p style={{ fontFamily: "'Inter', serif", fontSize: "0.8em" }}>
                {user?.nama_user}
              </p>
            </div>
          </div>
          <div className="list-hu">
            <ul className="sidebar-hu list-unstyled">
              {ElemenSidebar.map((val, key) => {
                return (
                  <li
                    key={key}
                    className={`elemen ${
                      val.action === "logout" ? "elemen-logout" : ""
                    }`}
                    id={window.location.pathname === val.link ? "active" : ""}
                    onClick={() => {
                      if (val.action === "logout") {
                        confirmLogout(); // Panggil modal konfirmasi logout
                      }
                    }}>
                    {val.action === "logout" ? (
                      <div
                        className="elemen-link-hu"
                        style={{
                          all: "unset",
                          width: "100%",
                          height: "100%",
                          paddingTop: "0",
                        }}>
                        <div
                          className="icon-wrapper-logout-hu"
                          dangerouslySetInnerHTML={{ __html: val.icon }}
                        />
                        <p className="elemen-title-logout-hu">{val.title}</p>
                      </div>
                    ) : (
                      <Link to={val.link} className="elemen-link-hu">
                        <div
                          className="icon-wrapper-hu"
                          dangerouslySetInnerHTML={{ __html: val.icon }}
                        />
                        <p className="elemen-title-hu">{val.title}</p>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Logout */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
        size="lg">
        <Modal.Header className="modal-header" closeButton></Modal.Header>
        <Modal.Body>
          <p className="pesan-modal">Apakah Anda yakin ingin logout?</p>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button
            className="button-modal"
            onClick={() => setShowLogoutModal(false)}>
            Tidak
          </Button>
          <Button className="danger" onClick={handleLogoutConfirm}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HeaderUser;
