import React from 'react'
import { Link } from 'react-router-dom';


export const ElemenSidebar = [
    {
        title: "Performa Platform",
        link : "/admin"
    },
    {
        title: "Informasi Admin",
        link : "/informasi-admin"
    },
    {
        title: "Informasi User",
        link : "/informasi-user"
    },
    {
        title: "Validasi Berita",
        link : "/validasi-berita"
    },
    {
        title: "Validasi Komentar",
        link : "/validasi-komentar"
    },
    {
        title: "Publish Berita",
        link : "/publish-berita-admin"
    },
    {
        title: "Pengaturan Iklan",
        link : "/pengaturan-iklan"
    },
    {
        title: "Pengaturan Lain",
        link : "/pengaturan-lain"
    },
    {
        title: "Log-Out",
        action: "logout" // Tambahkan aksi khusus untuk logout
    },
]
