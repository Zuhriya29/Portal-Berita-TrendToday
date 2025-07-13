import React, { useState, useEffect } from "react";
import Loading from "../general/loading"; // ✅ Import Loading

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Simulasi loading selesai
    }, 3000);
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : children} {/* ✅ Tampilkan loading jika masih loading */}
    </div>
  );
};

export default Layout;