import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

function ExampleCarouselImage({ index, onDataLoad }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ShowBeritaAllGeneral");
        const result = await response.json();

        const filtered = result
          .filter((item) => item.is_approved === 1)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 5);

        const item = filtered[index];
        setData(item);
        if (onDataLoad && item) {
          onDataLoad(item); // Kirim data ke komponen parent
        }
      } catch (error) {
        console.error("Failed to fetch berita:", error);
      }
    };

    fetchData();
  }, [index, onDataLoad]);

  if (!data) return null;

  return (
    <div style={{ width: "100%", height: "500px", overflow: "hidden" }}>
      <Image
        src={`http://localhost:8000/storage/${data.gambar_berita}`}
        alt={data.judul_berita}
        fluid
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export default ExampleCarouselImage;
