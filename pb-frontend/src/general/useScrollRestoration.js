import { useEffect } from "react";

export default function useScrollRestoration() {
  // Simpan posisi scroll saat keluar/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Kembalikan posisi scroll saat masuk kembali
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition !== null) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPosition));
        console.log("Scroll restored to:", scrollPosition);
      }, 100); // Delay agar semua komponen dan gambar sudah dirender
    }
  }, []);
}
