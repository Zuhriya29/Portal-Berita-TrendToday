import Navbar from "react-bootstrap/Navbar";
import "../css/admin/header.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { ElemenSidebar } from "./elemen-sidebar";
import { Link, useNavigate } from "react-router-dom";

function HeaderAdmin() {
  
  // State untuk mengontrol visibilitas menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal logout

  // Fungsi untuk toggle menu
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  let userAdmin = JSON.parse(localStorage.getItem("user-admin"));
  const navigate = useNavigate();

  // Fungsi untuk menampilkan modal logout
  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  // Fungsi untuk logout jika konfirmasi "Ya"
  const handleLogoutConfirm = () => {
    localStorage.clear();
    navigate("/login-admin");
  };

  console.warn(userAdmin);

  return (
    <div>
      <Navbar className="nav-2 d-flex justify-content-between pe-5 fixed-top">
        <Navbar.Brand className="text2" style={{ color: "white" }} onClick={() => navigate("/admin")}>
          Halaman Admin {/* {userAdmin && userAdmin.username} */}
        </Navbar.Brand>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
          onClick={toggleMenu} // Tambahkan event onClick untuk toggle menu
          style={{ cursor: "pointer" }} // Agar terlihat bisa diklik
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </Navbar>

      {/* Tampilkan menu hanya jika isMenuVisible bernilai true */}
      {isMenuVisible && (
        <div className="d-flex justify-content-end fixed-top">
          <div className="list2">
            <ul className="sidebar2 list-unstyled">
              {ElemenSidebar.map((val, key) => {
                return (
                  <li
                    key={key}
                    className={`elemen2 ${val.action === "logout" ? "elemen-logout-2" : ""}`} // Tambahkan class khusus untuk logout
                    id={window.location.pathname == val.link ? "active" : ""}
                    onClick={() => {
                      if (val.action === "logout") {
                        confirmLogout(); // Panggil modal konfirmasi logout
                      } else {
                        navigate.push(val.link); // Gunakan history.push untuk navigasi
                      }
                    }}
                  >
                    <div>
                      {val.action === "logout" ? (
                        <p>{val.title}</p> // Tidak pakai <Link> karena ini logout
                      ) : (
                        <Link to={val.link}>
                          <p>{val.title}</p>
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Logout */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}  centered size="lg">
        <Modal.Header className="modal-header" closeButton>
        </Modal.Header>
        <Modal.Body>
          <p className="pesan-modal">Apakah Anda yakin ingin logout?</p>
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button className="button-modal" onClick={() => setShowLogoutModal(false)}>
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

export default HeaderAdmin;
