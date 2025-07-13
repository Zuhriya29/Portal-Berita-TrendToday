import React, { useEffect, useState } from "react";
import "../css/user/promo.css";

const Promo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [iklanList, setIklanList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/ShowIklan2")
      .then((res) => res.json())
      .then((data) => {
        const filteredIklan = data
          .filter((iklan) => iklan.is_tayang === 1)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setIklanList(filteredIklan);
      })
      .catch((err) => console.error("Gagal mengambil iklan:", err));
  }, []);

  useEffect(() => {
    const popupIndexKey = "popupLastShownIndex";
    const popupTimeKey = "popupLastShownTime";

    const savedIndex = parseInt(localStorage.getItem(popupIndexKey)) || 0;
    const savedTime = parseInt(localStorage.getItem(popupTimeKey)) || 0;
    const now = Date.now();

    const nextTimeReady = now - savedTime > 10 * 60 * 1000;

    if (iklanList.length > 0 && nextTimeReady) {
      const loopIndex = savedIndex % iklanList.length;
      setCurrentIndex(loopIndex);
      setShowPopup(true);
    } else {
      setCurrentIndex(savedIndex % iklanList.length); // Simpan index walau belum tampil
    }
  }, [iklanList]);

  const handleClosePopup = () => {
    const nextIndex = (currentIndex + 1) % iklanList.length; // Loop ke awal jika sudah terakhir
    localStorage.setItem("popupLastShownIndex", nextIndex.toString());
    localStorage.setItem("popupLastShownTime", Date.now().toString());
    setShowPopup(false);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const savedTime = parseInt(localStorage.getItem("popupLastShownTime")) || 0;
      const now = Date.now();
      if (now - savedTime > 10 * 60 * 1000 && iklanList.length > 0) {
        setShowPopup(true);
      }
    }, 60 * 1000); // Cek setiap 1 menit

    return () => clearInterval(interval);
  }, [iklanList]);

  return (
    <>
      {showPopup && iklanList.length > 0 && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img
              src={`http://localhost:8000/storage/${iklanList[currentIndex].gambar_iklan}`}
              alt={`Promo ${currentIndex + 1}`}
            />
            <button onClick={handleClosePopup}>Tutup</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Promo;
