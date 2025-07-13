import React, { useState, useEffect, useRef } from "react";
import "../../css/user/detail-berita-general.css";

function Iklan() {
    //iklan gambar
    const [iklanList, setIklanList] = useState([]);
    const [displayList, setDisplayList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/ShowIklan2")
            .then((res) => res.json())
            .then((data) => {
                const filtered = data
                    .filter((item) => item.is_tayang === 1)
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setIklanList(filtered);
            })
            .catch((err) => console.error("Gagal mengambil iklan:", err));
    }, []);

    const currentIndexRef = useRef(0);

    useEffect(() => {
        if (iklanList.length === 0) return;

        const updateDisplay = () => {
            const length = iklanList.length;
            const currentIndex = currentIndexRef.current;

            const nextDisplay = Array.from({ length: 5 }, (_, i) => {
                if (length === 1) return iklanList[0];
                if (length === 2) return iklanList[i % 2];
                return iklanList[(currentIndex + i) % length];
            });

            setDisplayList(nextDisplay);
            currentIndexRef.current = (currentIndex + 1) % length;
        };

        updateDisplay();
        const interval = setInterval(updateDisplay, 3 * 60 * 1000); // Set ke 3 menit

        return () => clearInterval(interval);
    }, [iklanList]);
    return (
        <div>

            <div className="iklan-dbg">
                {displayList.map((iklan, index) => (
                    <img
                        key={index}
                        src={`http://localhost:8000/storage/${iklan.gambar_iklan}`}
                        alt={`Iklan ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Iklan
