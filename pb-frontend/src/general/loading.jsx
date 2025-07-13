import React from "react";
import "../general/loading.css"; // Buat CSS khusus untuk efek loading

const Loading = () => {
  return (
    <div className="loading-overlay">
        <img src="/images/logo.png" alt="Logo" />
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
