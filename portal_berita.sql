-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2025 at 12:52 PM
-- Server version: 11.7.1-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portal_berita`
--

-- --------------------------------------------------------

--
-- Table structure for table `beritas`
--

CREATE TABLE `beritas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul_berita` varchar(255) NOT NULL,
  `isi_berita` text NOT NULL,
  `gambar_berita` varchar(255) NOT NULL,
  `id_kategori` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `total_view` bigint(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `beritas`
--

INSERT INTO `beritas` (`id`, `judul_berita`, `isi_berita`, `gambar_berita`, `id_kategori`, `id_user`, `is_approved`, `total_view`, `created_at`, `updated_at`) VALUES
(1, 'Bali Kembali Menjadi Destinasi Favorit Wisatawan Internasional di Tahun 2025', '<p><em>Denpasar, 12 Mei 2025</em> — Pulau Bali kembali mencatat lonjakan kunjungan wisatawan internasional pada kuartal pertama tahun 2025. Data dari Dinas Pariwisata Provinsi Bali menunjukkan bahwa jumlah kunjungan mencapai lebih dari 2 juta orang, meningkat 35% dibandingkan periode yang sama tahun sebelumnya.</p><p>Kepala Dinas Pariwisata Bali, I Wayan Adnyana, menyampaikan bahwa peningkatan ini didorong oleh promosi pariwisata yang masif, pembukaan rute penerbangan baru dari berbagai negara, serta pemulihan sektor pariwisata pasca pandemi.</p><p>“Kami terus mendorong pengembangan pariwisata berbasis budaya dan keberlanjutan, yang menjadi daya tarik utama bagi wisatawan mancanegara,” ujar Adnyana dalam konferensi pers di Denpasar.</p><p>Destinasi yang paling banyak dikunjungi antara lain Ubud, Seminyak, Canggu, dan Nusa Penida. Selain itu, festival budaya seperti Bali Spirit Festival dan Ubud Food Festival turut menarik minat wisatawan.</p><p>Pelaku industri pariwisata lokal juga merasakan dampak positif dari peningkatan kunjungan ini. “Hotel kami mulai terisi penuh sejak Maret lalu. Wisatawan Eropa dan Australia menjadi mayoritas tamu,” ungkap Made Sugiarta, manajer salah satu resort di Ubud.</p><p>Pemerintah Provinsi Bali menargetkan total 7 juta kunjungan wisatawan internasional hingga akhir tahun 2025. Upaya peningkatan kualitas layanan, kebersihan, dan digitalisasi informasi pariwisata menjadi fokus pengembangan ke depan.</p>', 'gambar_berita/9qpSpfd9EpDGxgQAXZXZntuwSHJqGBnyQYYn4vRk.jpg', 1, 6, 1, 217, '2025-05-11 21:25:56', '2025-06-21 21:12:18'),
(3, 'Indonesia Resmi Jadi Tuan Rumah KTT ASEAN 2025: Fokus pada Inovasi Digital dan Keamanan Regional', '<p><strong>Jakarta, 1 Juni 2025</strong> – Indonesia resmi ditunjuk sebagai tuan rumah Konferensi Tingkat Tinggi (KTT) ASEAN 2025 yang akan digelar di Bali pada November mendatang. Keputusan ini diumumkan dalam pertemuan tingkat menteri ASEAN yang digelar di Manila, Filipina, minggu lalu.</p><p>Presiden Joko Widodo menyambut baik penunjukan tersebut dan menegaskan bahwa Indonesia siap menjadi tuan rumah yang baik serta mendorong agenda-agenda strategis kawasan, terutama dalam bidang transformasi digital, keamanan regional, dan kerja sama ekonomi inklusif.</p><p>“Indonesia berkomitmen menjadikan KTT ASEAN 2025 sebagai momentum penting untuk memperkuat integrasi digital antarnegara Asia Tenggara serta mempererat solidaritas kawasan dalam menghadapi tantangan global,” ujar Presiden Jokowi dalam konferensi pers di Istana Negara, Jakarta.</p><h3><strong>Fokus pada Inovasi Digital dan Stabilitas Kawasan</strong></h3><p>Kementerian Luar Negeri menyampaikan bahwa tema utama KTT ASEAN tahun ini adalah <strong>“Digital Harmony for a Stronger ASEAN”</strong>, yang menyoroti pentingnya transformasi digital yang inklusif dan aman di tengah pesatnya perkembangan teknologi, seperti kecerdasan buatan (AI), fintech, dan keamanan siber.</p><p>Selain itu, isu-isu krusial seperti konflik Laut China Selatan, perubahan iklim, serta kerja sama ekonomi pasca-pandemi juga akan menjadi pembahasan penting dalam forum ini.</p><h3><strong>Dampak Ekonomi dan Pariwisata</strong></h3><p>Kepala Dinas Pariwisata Provinsi Bali, I Gusti Ngurah Dharma, menyatakan bahwa penunjukan ini akan berdampak positif bagi sektor pariwisata dan UMKM lokal.</p><p>“Kami memperkirakan lebih dari 5.000 delegasi dan jurnalis internasional akan hadir. Ini peluang besar untuk menunjukkan potensi budaya, kuliner, dan ekonomi kreatif Bali kepada dunia,” katanya.</p><h3><strong>Persiapan Infrastruktur dan Keamanan</strong></h3><p>Pemerintah pusat dan daerah kini tengah mempersiapkan infrastruktur, termasuk penyempurnaan fasilitas di Bandara Internasional I Gusti Ngurah Rai dan peningkatan keamanan di lokasi strategis. Polda Bali bekerja sama dengan TNI dan Badan Intelijen Negara (BIN) untuk menjamin kelancaran dan keamanan acara tersebut.</p><p><strong>KTT ASEAN 2025</strong> menjadi bukti kepercayaan internasional terhadap peran Indonesia di kawasan. Dengan persiapan matang dan dukungan semua pihak, diharapkan forum ini akan menciptakan langkah konkret bagi masa depan Asia Tenggara yang lebih solid dan berdaya saing.</p>', 'gambar_berita/0Dz017ZT5CABBrmKjwk5YAuzZl667W42Bmc8vizt.jpg', 1, 1, 1, 3, '2025-06-01 00:47:40', '2025-06-21 08:48:36'),
(4, 'Produksi Beras Nasional 2025 Meningkat, Indonesia Tak Lagi Impor Beras', '<p><strong>Jakarta, 1 Juni 2025</strong> – Pemerintah melalui Kementerian Pertanian mengumumkan bahwa produksi beras nasional pada tahun 2025 mengalami peningkatan signifikan hingga mencapai 36 juta ton. Angka ini dinilai cukup untuk memenuhi kebutuhan dalam negeri, sehingga Indonesia tidak melakukan impor beras sejak awal tahun.</p><p>Menteri Pertanian, Andi Arman Sudirman, menyatakan bahwa capaian ini merupakan hasil kerja sama antara pemerintah pusat, daerah, dan petani lokal, serta pemanfaatan teknologi pertanian presisi.</p><p>“Dengan sistem irigasi modern, penggunaan benih unggul, dan pendampingan digital pertanian, hasil panen meningkat rata-rata 20% dibanding tahun lalu,” jelas Menteri Andi dalam konferensi pers di Gedung Kementan.</p><h3><strong>Dampak Positif bagi Petani Lokal</strong></h3><p>Peningkatan produksi beras berdampak langsung pada kesejahteraan petani. Harga gabah di tingkat petani stabil pada kisaran Rp5.800 per kilogram, dan distribusi hasil panen pun lebih cepat berkat platform digital yang menghubungkan petani langsung dengan pembeli besar seperti koperasi dan BUMN pangan.</p><p>Sugeng, seorang petani asal Klaten, Jawa Tengah, mengaku terbantu dengan pelatihan pertanian digital dari pemerintah.</p><p>“Sekarang kami bisa pantau cuaca, atur pupuk, dan jual gabah lewat aplikasi. Hasil panen juga meningkat,” ujarnya.</p><h3><strong>Indonesia Menuju Swasembada Berkelanjutan</strong></h3><p>Presiden Joko Widodo menegaskan bahwa pemerintah akan terus mendorong swasembada pangan yang berkelanjutan, tidak hanya untuk beras tetapi juga komoditas strategis lainnya seperti jagung, kedelai, dan gula.</p><p>Selain memperluas lahan pertanian produktif, pemerintah juga meningkatkan investasi dalam riset pertanian dan pengembangan pupuk ramah lingkungan.</p><p><strong>Dengan tidak lagi mengimpor beras di tahun 2025</strong>, Indonesia menegaskan posisinya sebagai negara agraris yang berdaya saing tinggi. Ke depan, swasembada pangan menjadi fondasi penting dalam menjaga kedaulatan ekonomi nasional.</p>', 'gambar_berita/zSAfjtnM17J1rzz9windwKsJEfgIwaNDQZQgptiI.jpg', 1, 1, 1, 9, '2025-06-01 00:48:46', '2025-06-01 01:01:51'),
(5, 'Peluncuran Satelit Merah Putih 3 Sukses, Indonesia Perkuat Konektivitas Digital Nasional', '<p><strong>Biak, Papua, 1 Juni 2025</strong> – Indonesia kembali mencatat sejarah dalam dunia teknologi luar angkasa dengan berhasil meluncurkan <strong>Satelit Merah Putih 3</strong> dari Bandar Antariksa Nasional di Biak, Papua. Satelit ini dirancang khusus untuk memperkuat jaringan internet dan komunikasi di seluruh pelosok tanah air, terutama wilayah 3T (tertinggal, terdepan, dan terluar).</p><p>Peluncuran dilakukan tepat pukul 07.30 WIT dan disiarkan secara langsung melalui kanal resmi Lembaga Penerbangan dan Antariksa Nasional (LAPAN). Satelit Merah Putih 3 berhasil masuk ke orbit geostasioner pada ketinggian 36.000 km di atas permukaan bumi.</p><h3><strong>Akses Internet Lebih Merata</strong></h3><p>Menteri Komunikasi dan Informatika, Budi Santoso, menyampaikan bahwa satelit ini akan meningkatkan akses internet cepat di lebih dari 20.000 desa terpencil.</p><p>“Kami menargetkan dalam waktu enam bulan ke depan, seluruh desa di Papua, Maluku, Kalimantan, dan Nusa Tenggara sudah dapat menikmati layanan internet stabil berkat satelit ini,” ujar Budi saat konferensi pers di Jakarta.</p><p>Satelit Merah Putih 3 memiliki kapasitas 150 Gbps, tiga kali lebih besar dari pendahulunya, dan menggunakan teknologi high-throughput satellite (HTS) yang memungkinkan transmisi data lebih cepat dan efisien.</p><h3><strong>Dukung Pendidikan dan Kesehatan Digital</strong></h3><p>Satelit ini juga mendukung pelaksanaan program <strong>digitalisasi sekolah dan layanan kesehatan jarak jauh (telemedicine)</strong>. Kementerian Pendidikan dan Kebudayaan menyambut positif peluncuran ini karena akan mempercepat transformasi digital di dunia pendidikan.</p><p>“Kami akan distribusikan 50.000 perangkat belajar digital ke sekolah-sekolah yang sebelumnya tidak terjangkau sinyal internet,” kata Dirjen Pendidikan Dasar dan Menengah, Ahmad Taufik.</p><p>Dengan keberhasilan ini, <strong>Indonesia membuktikan komitmennya dalam membangun infrastruktur digital merata dan inklusif</strong>, sebagai fondasi menuju Visi Indonesia Emas 2045.</p>', 'gambar_berita/gdEYroV74jnIotQ3pwCTbj86mtwFArZ0Tb9V9FDe.jpg', 1, 1, 1, 0, '2025-06-01 00:49:52', '2025-06-21 09:03:57'),
(6, 'Festival Budaya Nusantara 2025 di Yogyakarta Tarik Ribuan Wisatawan Lokal dan Mancanegara', '<p><strong>Yogyakarta, 1 Juni 2025</strong> – Suasana meriah dan semarak memenuhi kawasan Malioboro hingga Alun-Alun Utara Yogyakarta saat <strong>Festival Budaya Nusantara 2025</strong> resmi dibuka oleh Gubernur DIY, Sri Sultan Hamengkubuwono X, Jumat malam.</p><p>Festival tahunan yang berlangsung selama lima hari ini menampilkan lebih dari 150 pertunjukan seni dan budaya dari berbagai provinsi di Indonesia, mulai dari tari tradisional, musik etnik, pameran kerajinan tangan, hingga kuliner khas daerah.</p><h3><strong>Wajah Keberagaman Indonesia</strong></h3><p>Dalam sambutannya, Sri Sultan menegaskan bahwa festival ini merupakan wujud nyata dari semangat <strong>Bhinneka Tunggal Ika</strong>, sekaligus sarana memperkuat identitas budaya bangsa di tengah arus globalisasi.</p><p>“Melalui panggung budaya, kita bisa belajar saling menghormati, menjaga tradisi, dan menyampaikan pesan persatuan secara damai,” ujarnya.</p><p>Ribuan pengunjung memadati kawasan festival sejak hari pertama, termasuk wisatawan mancanegara dari Jepang, Belanda, dan Australia yang tertarik menyaksikan keberagaman budaya Indonesia dalam satu tempat.</p><h3><strong>Penampilan Unggulan dan Inovasi Digital</strong></h3><p>Salah satu penampilan yang paling menarik perhatian adalah <strong>Tari Saman Aceh massal</strong> yang dibawakan oleh 500 penari dari berbagai perguruan tinggi. Selain itu, ada juga pawai budaya bertema “Kisah Negeri Seribu Pulau” yang memvisualisasikan mitos, legenda, dan sejarah dari berbagai daerah dengan kostum megah dan teatrikal.</p><p>Menariknya, tahun ini festival juga menghadirkan zona digital interaktif, di mana pengunjung dapat menggunakan teknologi <strong>Augmented Reality (AR)</strong> untuk mengenal sejarah tarian dan alat musik tradisional melalui ponsel pintar mereka.</p><h3><strong>Dampak Ekonomi dan Pariwisata</strong></h3><p>Dinas Pariwisata DIY mencatat kenaikan hunian hotel hingga 90% selama festival berlangsung. Pelaku UMKM lokal pun meraup omzet tinggi dari penjualan produk kerajinan dan makanan tradisional.</p><p>“Festival ini bukan hanya tentang budaya, tapi juga mendongkrak ekonomi kreatif masyarakat,” ujar Kepala Dinas Pariwisata, Kurniawati Anjani.</p><p>Dengan semangat pelestarian budaya dan inovasi teknologi, <strong>Festival Budaya Nusantara 2025</strong> menjadi momentum penting bagi Indonesia untuk menunjukkan kekayaan warisan budayanya kepada dunia sekaligus mendukung pertumbuhan sektor pariwisata nasional.</p>', 'gambar_berita/dojTrZyPtOcmUi1ZreTGlMlVEy7VNj7oB1sjd77e.jpg', 1, 1, 1, 0, '2025-06-01 00:50:33', '2025-06-01 01:01:21'),
(7, 'Kebangkitan Energi Terbarukan: Indonesia Resmikan Pembangkit Listrik Tenaga Surya Terbesar di Asia Tenggara', '<p><strong>Kupang, Nusa Tenggara Timur, 1 Juni 2025</strong> – Indonesia kembali mencatat sejarah dalam transisi energi bersih dengan meresmikan <strong>Pembangkit Listrik Tenaga Surya (PLTS) terbesar di Asia Tenggara</strong> yang berlokasi di Kabupaten Kupang, Nusa Tenggara Timur.</p><p>Pembangkit berkapasitas 400 megawatt ini diresmikan langsung oleh Presiden Joko Widodo, didampingi Menteri Energi dan Sumber Daya Mineral (ESDM), Arifin Tasrif, serta Gubernur NTT Viktor Laiskodat. Proyek ini merupakan hasil kerja sama antara pemerintah Indonesia dan konsorsium investor energi dari Eropa dan Asia.</p><h3><strong>Langkah Strategis Menuju Net Zero Emission 2060</strong></h3><p>Dalam sambutannya, Presiden Jokowi menegaskan bahwa proyek ini merupakan bagian dari peta jalan nasional menuju target <strong>Net Zero Emission pada tahun 2060</strong>.</p><p>“PLTS ini adalah simbol komitmen kita dalam menghadirkan energi bersih, ramah lingkungan, dan berkelanjutan bagi seluruh rakyat Indonesia,” ujar Presiden.</p><p>Selain sebagai sumber energi alternatif, pembangkit ini juga diperkirakan mampu mengurangi emisi karbon hingga 600 ribu ton CO₂ per tahun.</p><h3><strong>Manfaat Ekonomi dan Lapangan Kerja</strong></h3><p>Pembangunan PLTS ini juga membawa dampak positif bagi masyarakat lokal. Lebih dari 2.000 tenaga kerja lokal terlibat selama proses konstruksi, dan sekitar 500 orang direkrut sebagai tenaga operasional jangka panjang.</p><p>“Kami dilatih, diberi sertifikasi, dan sekarang bisa bekerja dekat rumah tanpa harus ke kota besar,” ungkap Yohana, warga lokal yang kini bekerja sebagai teknisi pemeliharaan.</p><p>Selain itu, pemerintah daerah NTT juga akan memperoleh bagi hasil dari proyek ini untuk mendukung pendidikan, kesehatan, dan infrastruktur desa.</p><h3><strong>Dorong Penggunaan Energi Hijau di Kawasan Timur</strong></h3><p>Dengan beroperasinya PLTS Kupang, total kapasitas energi baru terbarukan (EBT) Indonesia kini mencapai lebih dari 15.000 MW. Pemerintah menargetkan peningkatan bauran energi EBT hingga 25% pada 2030.</p><p>“Wilayah timur Indonesia memiliki potensi matahari yang luar biasa. Ini harus dimanfaatkan demi kemandirian energi nasional,” ujar Menteri ESDM Arifin Tasrif.</p><p>Dengan langkah besar ini, <strong>Indonesia semakin mengukuhkan diri sebagai pemimpin energi terbarukan di Asia Tenggara</strong>, sekaligus menjaga komitmennya terhadap kelestarian lingkungan dan keberlanjutan generasi masa depan.</p>', 'gambar_berita/A5h0NsDZMJKFQ5XQLy2QykrKvUpvUh0maPjxldxR.jpg', 1, 1, 1, 2, '2025-06-01 00:51:53', '2025-06-01 01:00:18'),
(8, 'Indonesia Menangkan Juara Umum SEA Games 2025 di Thailand', '<p><strong>Bangkok, 1 Juni 2025</strong> – Indonesia resmi dinobatkan sebagai <strong>juara umum SEA Games 2025</strong> setelah berhasil meraih total <strong>198 medali emas</strong>, mengungguli tuan rumah Thailand dan Vietnam. Ini menjadi pencapaian bersejarah setelah terakhir kali Indonesia menjadi juara umum pada SEA Games 1997 di Jakarta.</p><p>Pencapaian ini disambut sorak sorai dari seluruh kontingen Merah Putih yang hadir di Bangkok serta masyarakat Indonesia yang menyaksikan secara langsung maupun lewat siaran televisi dan platform digital.</p><h3><strong>Cabor Unggulan Berkontribusi Besar</strong></h3><p>Cabang olahraga (cabor) yang paling banyak menyumbangkan medali emas antara lain:</p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Bulutangkis</strong>: 8 emas</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Pencak silat</strong>: 11 emas</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Angkat besi</strong>: 10 emas</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Atletik</strong>: 15 emas</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Renang</strong>: 13 emas</li></ol><p>Tim bulutangkis Indonesia tampil luar biasa dengan memborong seluruh nomor beregu dan ganda campuran.</p><p>Pelatih kepala bulutangkis, Hendra Wijaya, mengatakan bahwa regenerasi atlet dan latihan disiplin sejak usia dini menjadi kunci keberhasilan.</p><p>“Kami tidak hanya mengandalkan atlet senior. Para pemain muda juga menunjukkan mental juara,” ujarnya.</p><h3><strong>Bonus dan Penghargaan dari Pemerintah</strong></h3><p>Presiden Joko Widodo menyampaikan ucapan selamat kepada seluruh atlet melalui sambungan video call langsung dari Istana Merdeka. Pemerintah juga menjanjikan <strong>bonus Rp500 juta</strong> untuk setiap peraih emas, serta beasiswa pendidikan dan jaminan karier bagi atlet berprestasi.</p><p>Menteri Pemuda dan Olahraga, Dito Ariotedjo, menambahkan bahwa hasil ini adalah bukti nyata keberhasilan program Desain Besar Olahraga Nasional (DBON) yang dicanangkan sejak 2021.</p><p>“Prestasi ini bukan akhir, tapi awal kebangkitan olahraga Indonesia menuju Olimpiade Paris 2028,” tegasnya.</p><h3><strong>Antusiasme Publik Melonjak</strong></h3><p>Di berbagai kota di Indonesia, masyarakat menggelar nonton bareng (nobar) final beberapa cabang olahraga populer. Media sosial pun dipenuhi ucapan selamat, tagar #IndonesiaJuara menjadi trending topic selama dua hari berturut-turut.</p><p>Dengan pencapaian gemilang ini, <strong>Indonesia menunjukkan bahwa dengan pembinaan jangka panjang, kerja keras, dan dukungan penuh dari pemerintah serta masyarakat, kejayaan olahraga bukan hanya impian, tetapi kenyataan.</strong></p>', 'gambar_berita/OtT36zeyYQrVwrI8n2pfSBb5n5bICGkY9FWtwKoi.jpg', 1, 1, 1, 0, '2025-06-01 00:53:19', '2025-06-01 01:00:00'),
(9, 'Indonesia Toreh Prestasi di Ajang Olimpiade Matematika Internasional 2025', '<p><strong>Jakarta, 1 Juni 2025</strong> – Indonesia kembali mengharumkan nama bangsa di kancah internasional. Tim pelajar Indonesia berhasil meraih <strong>2 medali emas, 3 perak, dan 1 perunggu</strong> dalam ajang <strong>International Mathematical Olympiad (IMO) 2025</strong> yang diselenggarakan di Tokyo, Jepang.</p><p>Kompetisi yang diikuti oleh 112 negara ini mempertemukan pelajar-pelajar terbaik dunia dalam bidang matematika tingkat SMA. Tim Indonesia tampil gemilang dan menempati peringkat ke-7 dunia, naik dari peringkat ke-10 pada tahun sebelumnya.</p><h3><strong>Prestasi dari Anak Bangsa</strong></h3><p>Kepala Pusat Prestasi Nasional (Puspresnas), Dr. Lestari Wibowo, menyampaikan rasa bangganya terhadap pencapaian tim.</p><p>“Ini bukti bahwa generasi muda Indonesia mampu bersaing secara global dalam bidang ilmu pengetahuan,” ujarnya saat konferensi pers di Bandara Soekarno-Hatta.</p><p>Salah satu peraih medali emas, Aditya Rahman (17 tahun) dari SMA Negeri 8 Jakarta, menyatakan bahwa perjuangan mereka tidak mudah.</p><p>“Kami belajar setiap hari hingga larut malam, dibimbing oleh dosen dan pelatih dari universitas ternama. Hasil ini untuk Indonesia,” kata Aditya dengan mata berkaca-kaca.</p><h3><strong>Dukungan Pemerintah dan Pendidikan STEM</strong></h3><p>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek) menyatakan bahwa capaian ini merupakan hasil program intensif pembinaan Olimpiade Sains Nasional (OSN) dan penguatan kurikulum STEM (Science, Technology, Engineering, Mathematics) di sekolah-sekolah.</p><p>“Kami berkomitmen terus mendorong budaya riset, logika, dan pemecahan masalah sejak dini,” ujar Menteri Nadiem Makarim.</p><h3><strong>Hadiah dan Beasiswa</strong></h3><p>Selain penghargaan dari pemerintah, para siswa peraih medali akan mendapatkan beasiswa penuh dari beberapa universitas ternama di dalam dan luar negeri, serta uang pembinaan dari Kementerian.</p><p>Prestasi ini membuktikan bahwa <strong>Indonesia memiliki generasi muda yang unggul dan siap berkontribusi dalam kemajuan ilmu pengetahuan global</strong>. Ke depan, Indonesia diharapkan semakin memperkuat investasi dalam pendidikan sains dan teknologi demi mencetak lebih banyak juara dunia.</p>', 'gambar_berita/kdUnnvqqY5qSn2WuOA87QbXql4glXYVSJT9Pk8Jh.jpg', 1, 1, 1, 0, '2025-06-01 00:55:40', '2025-06-01 00:59:35'),
(10, 'Petani Muda Indonesia Gencarkan Pertanian Organik untuk Ketahanan Pangan Nasional', '<p><strong>Bandung, 1 Juni 2025</strong> – Seiring meningkatnya kesadaran masyarakat akan pola hidup sehat dan ramah lingkungan, sekelompok petani muda di Jawa Barat menggagas program pertanian organik terpadu yang kini mulai mendapat perhatian nasional.</p><p>Program ini digagas oleh komunitas <strong>Tani Muda Berdaya</strong>, yang beranggotakan lebih dari 500 petani milenial dari berbagai daerah seperti Garut, Lembang, dan Subang. Mereka mengembangkan pertanian bebas pestisida dan pupuk kimia, menggunakan teknologi pertanian presisi dan metode agroekologi.</p><h3><strong>Teknologi Bertemu Tradisi</strong></h3><p>Ketua komunitas, Ahmad Rizky (28), mengatakan bahwa pertanian organik bukan hanya tentang gaya hidup, tetapi juga solusi nyata bagi <strong>ketahanan pangan dan kelestarian tanah</strong>.</p><p>“Kami menggunakan drone untuk pemetaan lahan, aplikasi IoT untuk monitoring kelembaban, tapi tetap memadukannya dengan kearifan lokal seperti pupuk kompos dan rotasi tanam,” jelasnya.</p><p>Program ini telah menghasilkan berbagai komoditas seperti sayuran hijau, buah-buahan, dan beras organik yang kini dipasarkan ke supermarket besar dan lewat platform digital seperti TaniHub dan Sayurbox.</p><h3><strong>Dukungan Pemerintah dan Akademisi</strong></h3><p>Dinas Pertanian Jawa Barat mendukung inisiatif ini melalui pelatihan, bantuan alat pertanian ramah lingkungan, serta promosi ke pasar ekspor.</p><p>“Kami ingin petani muda menjadi garda terdepan dalam pertanian berkelanjutan,” ujar Kepala Dinas Pertanian, Ir. Endang Ratnasari.</p><p>Sejumlah universitas seperti IPB dan Universitas Padjadjaran juga turut terlibat dalam riset dan pengembangan produk organik, termasuk studi nutrisi dan ketahanan pasar.</p><h3><strong>Potensi Ekspor dan Masa Depan Pertanian Hijau</strong></h3><p>Menteri Pertanian Andi Amran Sulaiman menyebut pertanian organik sebagai sektor strategis masa depan. Ia menargetkan 1 juta hektare lahan organik di Indonesia pada 2030 dan menjadikan produk Indonesia sebagai pemain besar di pasar organik global.</p><p>“Kita punya lahan, tenaga muda, dan permintaan dunia yang terus tumbuh. Kita hanya perlu menyambungkan semua potensi itu,” tegasnya.</p><p>Dengan semangat inovasi dan cinta tanah, <strong>generasi petani muda Indonesia tengah menunjukkan bahwa pertanian bisa modern, menguntungkan, dan tetap menjaga bumi</strong>. Gerakan ini bukan hanya tren, tapi fondasi masa depan pangan nasional.</p>', 'gambar_berita/WUz34taxeiRPjoAVj3ss4g79BDjUYI6PFSCvnN0k.jpg', 1, 1, 1, 0, '2025-06-01 00:56:49', '2025-06-01 00:59:18'),
(11, 'Pulau Komodo Ditetapkan sebagai Kawasan Konservasi Dunia oleh UNESCO', '<p><strong>Labuan Bajo, 1 Juni 2025</strong> – Kabar membanggakan datang dari Nusa Tenggara Timur. Pulau Komodo resmi ditetapkan sebagai <strong>Kawasan Konservasi Dunia</strong> oleh <strong>UNESCO</strong> dalam sidang tahunan yang berlangsung di Paris, Prancis.</p><p>Penetapan ini diberikan setelah evaluasi panjang terhadap upaya pelestarian habitat komodo dan ekosistemnya oleh pemerintah Indonesia, khususnya Balai Taman Nasional Komodo (BTNK), bersama masyarakat lokal dan komunitas internasional.</p><h3><strong>Pengakuan Internasional atas Keanekaragaman Hayati</strong></h3><p>Dalam pernyataan resminya, UNESCO menyebut Pulau Komodo sebagai “warisan hayati yang unik, rumah bagi spesies langka yang hanya bisa ditemukan di Indonesia dan contoh luar biasa dari upaya konservasi yang berkelanjutan.”</p><p>“Ini adalah bentuk pengakuan dunia atas komitmen Indonesia menjaga warisan alamnya,” ujar Menteri Lingkungan Hidup dan Kehutanan, Siti Nurbaya Bakar.</p><h3><strong>Langkah Nyata Konservasi</strong></h3><p>Sejak 2022, pemerintah telah membatasi jumlah wisatawan harian, memperkuat pengawasan ekosistem laut, dan meningkatkan edukasi kepada masyarakat serta pelaku wisata lokal tentang pentingnya menjaga lingkungan.</p><p>Program rehabilitasi terumbu karang, larangan plastik sekali pakai, serta pemberdayaan ekonomi masyarakat melalui ekowisata juga menjadi kunci keberhasilan upaya konservasi ini.</p><p>“Kami tidak hanya menjaga komodo, tapi seluruh rantai kehidupan di taman nasional ini,” jelas Kepala BTNK, Antonius Watu.</p><h3><strong>Dampak Positif untuk Ekowisata Berkelanjutan</strong></h3><p>Status baru ini diperkirakan akan meningkatkan minat wisatawan mancanegara sekaligus mempertegas posisi Indonesia sebagai pemimpin dalam konservasi lingkungan tropis.</p><p>Namun, pemerintah menegaskan bahwa fokus utama tetap pada <strong>ekowisata yang bertanggung jawab</strong>, bukan pariwisata massal.</p><p>“Konservasi tetap nomor satu. Wisata yang datang harus tunduk pada aturan menjaga alam,” tegas Menteri Pariwisata, Sandiaga Uno.</p><p>Dengan ditetapkannya Pulau Komodo sebagai Kawasan Konservasi Dunia, Indonesia sekali lagi membuktikan diri sebagai negara yang kaya akan alam dan berkomitmen menjaga kelestariannya demi generasi mendatang.</p>', 'gambar_berita/OqdlTBHJ24xxArlwAHWKJNonU9502znz0v2gVVnc.jpg', 1, 1, 1, 3, '2025-06-01 00:57:47', '2025-06-21 21:11:25'),
(12, 'Negosiasi Perdamaian Ukraina–Rusia Capai Titik Terobosan di Jenewa', '<p><strong>Jenewa, 1 Juni 2025</strong> – Setelah lebih dari dua tahun konflik yang menelan ribuan korban jiwa, perwakilan Ukraina dan Rusia akhirnya mencapai <strong>terobosan penting dalam proses negosiasi damai</strong> yang difasilitasi oleh Perserikatan Bangsa-Bangsa (PBB) di Jenewa, Swiss.</p><p>Pertemuan yang berlangsung selama lima hari tersebut menghasilkan <em>\"Kesepakatan Jenewa 2025\"</em>, sebuah kerangka perdamaian yang mencakup penghentian tembak-menembak, penarikan pasukan secara bertahap, dan pembukaan jalur kemanusiaan di wilayah konflik.</p><h3><strong>Butuh Kompromi Besar</strong></h3><p>Delegasi Ukraina, yang dipimpin oleh Menteri Luar Negeri Dmytro Kuleba, menyebut ini sebagai \"langkah besar menuju perdamaian yang adil\", meskipun masih terdapat sejumlah poin yang perlu dinegosiasikan lebih lanjut.</p><p>Pihak Rusia melalui Menteri Luar Negeri Sergey Lavrov mengatakan kesepakatan ini menunjukkan bahwa <strong>dialog diplomatik lebih kuat dari senjata</strong>.</p><p>“Tidak ada pemenang dalam perang ini. Yang menang adalah rakyat jika perdamaian tercapai,” ujar Lavrov.</p><h3><strong>Peran Penting PBB dan Negara Penengah</strong></h3><p>Sekjen PBB António Guterres menyatakan bahwa kesepakatan ini adalah hasil dari diplomasi yang panjang dan kerja sama semua pihak, termasuk mediator dari Turki, Tiongkok, dan Uni Eropa.</p><p>“Ini bukan akhir, tetapi awal baru menuju rekonsiliasi dan pembangunan kembali,” kata Guterres.</p><h3><strong>Reaksi Dunia dan Tantangan Selanjutnya</strong></h3><p>Negara-negara Barat seperti Jerman, Prancis, dan Kanada menyambut positif kesepakatan ini, sementara Amerika Serikat meminta Rusia untuk menunjukkan komitmen nyata dengan menghentikan serangan dan mendukung pemulihan Ukraina.</p><p>Namun, para analis internasional memperingatkan bahwa pelaksanaan di lapangan akan menjadi ujian sebenarnya, mengingat adanya kelompok separatis dan dinamika politik domestik di kedua negara.</p><p>Kesepakatan Jenewa 2025 menjadi secercah harapan bagi dunia, menunjukkan bahwa <strong>perdamaian masih mungkin terjadi</strong>, bahkan setelah konflik berkepanjangan. Dunia kini menanti langkah-langkah nyata berikutnya demi menghentikan penderitaan jutaan warga sipil.</p>', 'gambar_berita/CRVch4zMoahvf2yhQnIk2oeMgG9b4QPmq4GNj8pS.jpg', 2, 10, 1, 0, '2025-06-01 21:27:55', '2025-06-21 07:09:04'),
(13, 'RUU Perlindungan Data Pribadi Resmi Disahkan DPR, Indonesia Masuki Era Regulasi Digital Baru', '<p><strong>Jakarta, 1 Juni 2025</strong> – Dewan Perwakilan Rakyat (DPR) Republik Indonesia secara resmi mengesahkan <strong>Rancangan Undang-Undang Perlindungan Data Pribadi (RUU PDP)</strong> menjadi undang-undang dalam Sidang Paripurna hari ini, setelah melalui pembahasan panjang lintas fraksi dan konsultasi publik.</p><p>Pengesahan ini menandai tonggak penting dalam regulasi digital Indonesia, di tengah meningkatnya kekhawatiran masyarakat terkait kebocoran data dan penyalahgunaan informasi pribadi oleh berbagai pihak, termasuk platform digital.</p><h3><strong>Isi Pokok UU PDP</strong></h3><p>Undang-Undang ini mencakup sejumlah hal krusial, antara lain:</p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Hak subjek data untuk mengakses, memperbaiki, dan menghapus data pribadinya</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Kewajiban pengendali data untuk menjaga keamanan data</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Sanksi administratif dan pidana bagi pelanggaran, termasuk denda miliaran rupiah dan ancaman penjara</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Pembentukan <strong>Otoritas Perlindungan Data Pribadi</strong> yang independen</li></ol><p>“Ini adalah kemenangan bagi hak digital rakyat Indonesia,” ujar Menteri Komunikasi dan Informatika, Budi Arie Setiadi.</p><h3><strong>Dukungan dan Kritik</strong></h3><p>Mayoritas fraksi di DPR menyatakan dukungan terhadap UU ini sebagai bentuk perlindungan warga negara di era digital. Namun, beberapa anggota menyuarakan kritik terkait independensi otoritas pengawas dan potensi penyalahgunaan oleh aparat penegak hukum.</p><p>“Kita perlu memastikan implementasinya tidak mengekang kebebasan berekspresi dan akses informasi,” kata Willy Aditya, anggota Komisi I DPR.</p><h3><strong>Respons Publik dan Sektor Swasta</strong></h3><p>Banyak aktivis digital dan LSM seperti SAFEnet dan ICJR menyambut baik undang-undang ini namun menuntut transparansi dalam pelaksanaannya. Sementara itu, perusahaan teknologi dan e-commerce bersiap menyesuaikan sistem dan kebijakan internal mereka sesuai dengan regulasi baru.</p><p>“Kami mendukung regulasi ini dan siap beradaptasi untuk menjaga kepercayaan pengguna,” ujar perwakilan dari Asosiasi E-Commerce Indonesia (idEA).</p><p>Dengan pengesahan UU PDP, Indonesia resmi memasuki <strong>era regulasi digital yang lebih ketat dan berpihak pada perlindungan hak privasi warganya</strong>. Tantangan berikutnya adalah memastikan penerapannya konsisten, adil, dan tidak melanggar hak-hak sipil.</p>', 'gambar_berita/y1COpkTjOYWPfFpbqaEecD081BNORQxynOcnAYRm.jpg', 3, 10, 1, 2, '2025-06-01 21:57:01', '2025-06-21 20:31:32'),
(14, 'UMKM Indonesia Catat Pertumbuhan Tertinggi Pasca Pandemi, Digitalisasi Jadi Kunci', '<p><strong>Jakarta, 1 Juni 2025</strong> – Sektor <strong>Usaha Mikro, Kecil, dan Menengah (UMKM)</strong> di Indonesia mencatatkan pertumbuhan signifikan dalam kuartal pertama tahun 2025, menurut laporan terbaru Kementerian Koperasi dan UKM. Pertumbuhan sebesar <strong>7,4%</strong> ini menjadi yang tertinggi sejak masa pemulihan pasca pandemi COVID-19.</p><p>Faktor utama yang mendorong pertumbuhan tersebut adalah <strong>adopsi teknologi digital</strong> oleh pelaku UMKM, terutama dalam hal pemasaran, pembayaran, hingga manajemen inventaris.</p><h3><strong>Digitalisasi dan Akses Pembiayaan</strong></h3><p>Menteri Koperasi dan UKM, Teten Masduki, menyatakan bahwa program pemerintah seperti <strong>UMKM Go Digital</strong> dan dukungan pembiayaan dari lembaga keuangan turut memberikan dampak besar.</p><p>“Lebih dari 22 juta UMKM kini sudah terhubung dengan platform digital. Ini menunjukkan bahwa adaptasi teknologi menjadi penentu daya saing UMKM kita,” ujar Teten dalam konferensi pers di Jakarta.</p><p>Selain itu, peran fintech dalam memberikan akses pinjaman modal kerja juga mempercepat pertumbuhan pelaku usaha kecil di berbagai daerah, termasuk di luar Jawa.</p><h3><strong>Sektor Kuliner dan Fesyen Pimpin Pertumbuhan</strong></h3><p>Laporan juga menunjukkan bahwa sektor kuliner, fesyen lokal, dan produk kerajinan mencatat pertumbuhan penjualan tertinggi. Platform seperti Tokopedia, Shopee, dan TikTok Shop disebut sebagai kanal utama distribusi produk UMKM.</p><p>“Penjualan kue kering, batik modern, hingga produk eco-friendly naik drastis selama Ramadhan dan Lebaran,” ungkap Rizky, analis dari Lembaga Riset Ekonomi Mandiri.</p><h3><strong>Tantangan dan Arah Kebijakan ke Depan</strong></h3><p>Meski pertumbuhan tinggi, tantangan tetap ada, seperti literasi digital, kesenjangan infrastruktur internet, serta risiko persaingan dengan produk luar negeri. Pemerintah menyiapkan insentif baru berupa pelatihan bersertifikat, akses ekspor, dan <strong>subsidi logistik untuk UMKM digital</strong>.</p><p>Pertumbuhan UMKM yang solid ini memperkuat posisi sektor tersebut sebagai <strong>tulang punggung ekonomi nasional</strong>, yang menyumbang lebih dari 60% PDB dan menyerap 97% tenaga kerja Indonesia. Dengan arah kebijakan yang tepat, Indonesia berpeluang menjadikan UMKM sebagai motor pertumbuhan ekonomi berkelanjutan.</p>', 'gambar_berita/ZmB4p12nmDNgaIgd8llUxoPazdovuBqLPjS6FD8H.jpg', 4, 10, 1, 3, '2025-06-01 21:59:49', '2025-06-21 07:09:53'),
(16, 'Startup Indonesia Luncurkan AI Lokal Pertama, Saingi Teknologi Global', '<p><strong>Jakarta, 1 Juni 2025</strong> – Startup teknologi asal Bandung, <strong>NeuroAI Nusantara</strong>, resmi meluncurkan <strong>asisten kecerdasan buatan (AI) lokal pertama</strong> di Indonesia yang dirancang khusus untuk memahami konteks budaya, bahasa daerah, dan kebutuhan masyarakat Tanah Air.</p><p>Produk bernama <strong>\"SoraID\"</strong> ini dikembangkan oleh tim peneliti muda dari berbagai universitas terkemuka di Indonesia, dan mendapat dukungan dari Kementerian Komunikasi dan Informatika serta investor lokal.</p><h3><strong>Dirancang untuk Masyarakat Indonesia</strong></h3><p>SoraID mampu berkomunikasi dalam Bahasa Indonesia, Jawa, Sunda, hingga Minangkabau, serta bisa menjawab pertanyaan seputar layanan publik, pendidikan, UMKM, hingga pertanian.</p><p>“Kami ingin menciptakan AI yang tidak hanya pintar, tapi juga relevan dan membumi. Ini bukan sekadar meniru ChatGPT, tapi membangun dari akar lokal,” ujar CEO NeuroAI Nusantara, Rizal Mahendra.</p><h3><strong>Fitur Unggulan</strong></h3><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Multibahasa Lokal</strong>: Bisa digunakan oleh pengguna di desa-desa dengan bahasa daerah masing-masing</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Integrasi dengan Sistem Pemerintah</strong>: Dapat menjawab informasi dari layanan publik seperti BPJS, pajak, dan KTP</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Mode Offline</strong>: Bisa digunakan tanpa koneksi internet di daerah terpencil</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Dukungan UMKM</strong>: Menyediakan fitur pembuatan katalog, laporan keuangan, dan saran pemasaran</li></ol><h3><strong>Dukungan Pemerintah dan Swasta</strong></h3><p>Peluncuran ini mendapat sambutan dari Menkominfo Budi Arie Setiadi yang menyebut SoraID sebagai langkah awal menuju <strong>kedaulatan teknologi digital nasional</strong>.</p><p>“Kita tidak bisa terus bergantung pada teknologi luar. Sudah saatnya kita menciptakan dan menguasai teknologi kita sendiri,” tegasnya.</p><p>Sementara itu, beberapa perusahaan besar seperti Telkom, Gojek, dan Bukalapak menyatakan ketertarikan untuk berkolaborasi dengan AI lokal ini demi efisiensi dan peningkatan layanan pelanggan.</p><p>SoraID menjadi simbol baru bahwa <strong>Indonesia siap bersaing dalam dunia kecerdasan buatan</strong>, tidak hanya sebagai pengguna, tetapi juga sebagai inovator. Langkah ini diyakini akan membuka jalan bagi lebih banyak talenta digital dan teknologi asli Indonesia ke panggung dunia.</p>', 'gambar_berita/XVvW63GnpQPHBxFrcPMR5oLxzUPgrABIM95Xlbx9.jpg', 5, 10, 1, 5, '2025-06-08 00:35:48', '2025-06-21 09:07:44'),
(17, 'Pemerintah Luncurkan Program Digitalisasi UMKM Nasional untuk Tingkatkan Daya Saing Global', '<p><strong>Jakarta</strong> – Pemerintah Indonesia secara resmi meluncurkan Program Digitalisasi UMKM Nasional pada Rabu (25/6) di Jakarta. Program ini bertujuan untuk mempercepat transformasi digital bagi Usaha Mikro, Kecil, dan Menengah (UMKM) agar mampu bersaing di pasar global dan menjawab tantangan era ekonomi digital.</p><p>Dalam sambutannya, Presiden Joko Widodo menegaskan bahwa UMKM adalah tulang punggung ekonomi Indonesia yang harus segera beradaptasi dengan perkembangan teknologi. “Saat ini ada lebih dari 60 juta UMKM di Indonesia. Namun, baru sekitar 30% yang telah terdigitalisasi. Program ini akan menjadi motor penggerak untuk membawa UMKM naik kelas dan go global,” ujar Presiden.</p><p>Melalui program ini, pemerintah bekerja sama dengan berbagai pihak, termasuk platform e-commerce, perusahaan teknologi, dan lembaga keuangan untuk memberikan pelatihan digital, bantuan pemasaran online, dan akses pembiayaan yang lebih mudah. Kementerian Koperasi dan UKM juga menargetkan 20 juta UMKM bisa terdigitalisasi penuh hingga akhir tahun 2026.</p><p>Menteri Koperasi dan UKM, Teten Masduki, menambahkan bahwa digitalisasi bukan hanya soal menjual produk secara daring, tetapi juga meningkatkan efisiensi produksi, pengelolaan keuangan, dan inovasi produk. “Dengan memanfaatkan teknologi, UMKM bisa menghemat biaya operasional dan memperluas pasar tanpa harus membuka cabang fisik,” jelasnya.</p><p>Program ini disambut baik oleh pelaku UMKM. Siti Aisyah, pemilik usaha kerajinan tangan dari Yogyakarta, mengaku optimis dengan peluang yang ditawarkan. “Selama ini kami kesulitan menjangkau konsumen luar daerah. Dengan pelatihan dan pendampingan digital, kami jadi lebih percaya diri untuk menjual produk secara online,” ungkapnya.</p><p>Peluncuran program ini diharapkan menjadi langkah awal dalam mendorong pertumbuhan ekonomi nasional yang inklusif dan berbasis teknologi. Pemerintah juga berkomitmen untuk memantau implementasi program ini secara berkala dan menyesuaikan kebijakan sesuai kebutuhan di lapangan.</p>', 'gambar_berita/71aidluwTymxB291jIEgECS6cQbASiwTJsbaIWs1.jpg', 1, 3, 1, 107, '2025-06-25 09:06:10', '2025-06-27 07:34:18'),
(18, 'Pemerintah Perluas Akses Pendidikan Digital untuk Pelajar di Daerah Terpencil', '<p><strong>Tanggal:</strong> 25 Juni 2025</p><p> <strong>Penulis:</strong> Redaksi Nasional</p><p><strong>Jakarta</strong> – Pemerintah Indonesia melalui Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek) resmi meluncurkan program <strong>\"Sekolah Digital Nusantara\"</strong>, sebuah inisiatif nasional yang bertujuan memperluas akses pendidikan berbasis teknologi di daerah 3T (tertinggal, terdepan, dan terluar).</p><p>Program ini diresmikan oleh Menteri Nadiem Makarim di Istana Negara dan merupakan bagian dari strategi nasional untuk mengurangi kesenjangan akses pendidikan antara wilayah perkotaan dan pedesaan.</p><p>“Kita tidak bisa membiarkan anak-anak Indonesia tertinggal hanya karena lokasi geografis. Dengan program ini, siswa di pelosok Papua, NTT, Kalimantan, hingga perbatasan Sumatra akan mendapatkan akses materi pembelajaran digital yang sama seperti siswa di kota besar,” ujar Nadiem dalam pidatonya.</p><p>Melalui program ini, pemerintah akan mendistribusikan lebih dari <strong>500.000 perangkat tablet pendidikan</strong>, memasang <strong>jaringan internet satelit</strong> di 10.000 sekolah terpencil, dan menyediakan pelatihan daring untuk guru dalam pemanfaatan teknologi.</p><p>Langkah ini disambut positif oleh berbagai pihak. Ketua Komisi X DPR RI, Syaiful Huda, menyatakan dukungan penuh terhadap program tersebut. “Ini adalah wujud nyata komitmen negara dalam mencerdaskan kehidupan bangsa secara merata,” ujarnya.</p><p>Sementara itu, Kepala Sekolah SDN Sawai, Maluku Tengah, mengaku optimis dengan dampaknya. “Selama ini kami hanya mengandalkan buku cetak lama dan sinyal yang terbatas. Jika fasilitas ini betul-betul masuk ke sekolah kami, maka pembelajaran akan jauh lebih berkembang,” katanya.</p><p>Pemerintah menargetkan program ini selesai dalam dua tahun, dengan evaluasi berkala setiap semester. Selain perangkat dan koneksi, kurikulum pembelajaran digital juga akan dikembangkan agar sesuai dengan kebutuhan lokal.</p><p>Program \"Sekolah Digital Nusantara\" menjadi salah satu langkah penting dalam menciptakan sistem pendidikan nasional yang inklusif, adaptif, dan berkeadilan di era digital.</p>', 'gambar_berita/QlCVxMOoBq7KIZ9Y2D4fVCQlQH7YH2eg7EBMzerj.jpg', 1, 3, 0, 3, '2025-06-25 09:08:14', '2025-06-25 09:10:53'),
(19, 'Pemerintah Tetapkan 1 Juli sebagai Hari Literasi Digital Nasional', '<p><strong>Tanggal:</strong> 25 Juni 2025</p><p> <strong>Penulis:</strong> Redaksi Nasional</p><p><strong>Jakarta</strong> – Pemerintah Indonesia menetapkan tanggal <strong>1 Juli sebagai Hari Literasi Digital Nasional</strong>, sebagai upaya memperkuat kesadaran masyarakat terhadap pentingnya keterampilan digital di era modern. Penetapan ini diumumkan secara resmi oleh Menteri Komunikasi dan Informatika, Budi Arie Setiadi, dalam konferensi pers di Jakarta, Selasa (25/6).</p><p>Langkah ini merupakan bagian dari strategi nasional dalam menghadapi tantangan digitalisasi, termasuk maraknya hoaks, penyalahgunaan data, dan rendahnya kemampuan digital dasar masyarakat.</p><p>“Hari Literasi Digital Nasional akan menjadi momentum tahunan untuk mendorong masyarakat Indonesia melek digital secara cerdas, aman, dan produktif,” ujar Budi Arie.</p><p>Pemerintah juga meluncurkan program \"Gerakan Nasional Melek Digital\" yang menargetkan <strong>10 juta warga teredukasi literasi digital hingga akhir 2026</strong>, melalui pelatihan daring dan luring, kerja sama dengan komunitas, universitas, hingga platform teknologi.</p><p>Presiden Joko Widodo dalam sambutannya menekankan bahwa kemajuan teknologi harus dibarengi dengan kesiapan sumber daya manusia.</p><p>“Literasi digital bukan lagi pilihan, melainkan kebutuhan mendasar. Bangsa yang cerdas secara digital akan mampu bersaing di kancah global,” tegas Presiden.</p><p>Pakar komunikasi digital dari Universitas Indonesia, Dr. Ratna Sari, menyambut baik kebijakan ini. Ia menilai literasi digital sangat penting dalam membentuk masyarakat yang tidak hanya terhubung secara teknologi, tetapi juga memiliki etika dan kemampuan berpikir kritis.</p><p>Sementara itu, sejumlah pelajar dan guru juga menyambut positif inisiatif ini. “Semoga akses ke pelatihan dan modul literasi digital bisa sampai ke sekolah-sekolah desa seperti kami,” ujar Siti Nurhaliza, guru di Kabupaten Tana Toraja.</p><p>Dengan penetapan ini, 1 Juli akan diperingati secara nasional setiap tahun dengan berbagai kegiatan edukatif seperti seminar, pelatihan, lomba konten positif, dan kampanye anti-hoaks.</p>', 'gambar_berita/F6rCvWhY4D2aHCCZ87TRDTesFyEH8nq3GSKAdZop.jpg', 1, 3, 0, 2, '2025-06-25 09:09:03', '2025-06-25 09:10:36'),
(20, 'Timnas Indonesia U-23 Raih Emas di Final Sepak Bola SEA Games 2025', '<p><strong>Bangkok, 1 Juni 2025</strong> – Tim Nasional Sepak Bola Indonesia U-23 kembali mencatat sejarah dengan meraih <strong>medali emas</strong> di ajang <strong>SEA Games 2025</strong> setelah mengalahkan Thailand dengan skor dramatis 2-1 di Stadion Rajamangala, Bangkok, semalam.</p><p>Pertandingan berlangsung sengit dengan dukungan ribuan suporter Garuda yang memadati tribun. Gol kemenangan Indonesia dicetak oleh <strong>Rizky Ramadhan</strong> pada menit ke-88 melalui tendangan bebas indah yang tak mampu dibendung kiper Thailand.</p><h3><strong>Torehan Sejarah Setelah Penantian Panjang</strong></h3><p>Kemenangan ini menjadi <strong>medali emas kedua</strong> bagi Timnas U-23 di cabang sepak bola SEA Games dalam dua dekade terakhir, setelah terakhir diraih pada SEA Games 2023 di Kamboja.</p><p>Pelatih kepala, Shin Tae-yong, menyampaikan rasa bangga atas kerja keras anak asuhnya.</p><p>“Mereka bermain dengan hati dan disiplin tinggi. Ini untuk rakyat Indonesia,” ujarnya dalam konferensi pers usai laga.</p><h3><strong>Suasana Haru dan Selebrasi</strong></h3><p>Usai peluit panjang, para pemain dan ofisial merayakan kemenangan dengan membentangkan bendera Merah Putih di tengah lapangan. Tangis haru tampak di wajah para pemain muda yang telah berlatih keras selama berbulan-bulan.</p><p>Di Tanah Air, ribuan warga merayakan kemenangan dengan konvoi di jalan-jalan utama Jakarta, Surabaya, dan kota besar lainnya. Istana Kepresidenan juga mengucapkan selamat melalui siaran pers resmi.</p><p>“Prestasi ini membanggakan bangsa dan menjadi motivasi untuk terus membangun sepak bola nasional,” kata Presiden Joko Widodo.</p><h3><strong>Bonus dan Masa Depan</strong></h3><p>PSSI berjanji akan memberikan bonus khusus bagi para pemain dan pelatih sebagai bentuk penghargaan atas kerja keras mereka. Keberhasilan ini juga diharapkan menjadi batu loncatan bagi pemain muda Indonesia untuk bersaing di level Asia dan dunia.</p>', 'gambar_berita/JBIc2yAOuHzhbUXOWBKQIrsUWlF11yGs0qT0uxI9.jpg', 6, 10, 1, 7, '2025-07-06 00:36:41', '2025-07-08 20:26:04');
INSERT INTO `beritas` (`id`, `judul_berita`, `isi_berita`, `gambar_berita`, `id_kategori`, `id_user`, `is_approved`, `total_view`, `created_at`, `updated_at`) VALUES
(21, 'Kasus DBD Meningkat, Pemerintah Imbau Masyarakat Waspada dan Jalankan PSN', '<p><strong>Jakarta, 1 Juni 2025</strong> – Kementerian Kesehatan Republik Indonesia (Kemenkes) mencatat lonjakan kasus <strong>Demam Berdarah Dengue (DBD)</strong> di beberapa provinsi, terutama di wilayah Jawa Barat, Jawa Tengah, dan Kalimantan Selatan. Hingga akhir Mei 2025, tercatat lebih dari <strong>35.000 kasus</strong> dengan 250 kasus kematian.</p><p>Peningkatan kasus ini disebabkan oleh cuaca pancaroba dan curah hujan tinggi yang memicu berkembangnya jentik nyamuk <strong>Aedes aegypti</strong>, vektor penular utama DBD.</p><p><br></p><h3><strong>Gerakan PSN Kembali Digalakkan</strong></h3><p>Menteri Kesehatan, dr. Dante Saksono Harbuwono, mengimbau masyarakat untuk kembali menjalankan <strong>Gerakan Pemberantasan Sarang Nyamuk (PSN)</strong> 3M Plus, yaitu: menguras tempat penampungan air, menutup rapat wadah air, dan mendaur ulang barang bekas yang berpotensi menjadi tempat berkembang biak nyamuk.</p><p>“Masyarakat harus lebih disiplin menjaga kebersihan lingkungan. Kunci utama pencegahan DBD adalah pemberantasan sarang nyamuk,” ujar Menkes di Jakarta.</p><p>Selain itu, pemerintah daerah diminta rutin melakukan <strong>fogging</strong> di wilayah endemis dan mengaktifkan kader jumantik (juru pemantau jentik) di lingkungan RT/RW.</p><p><br></p><h3><strong>Waspada Gejala DBD</strong></h3><p>Kemenkes juga mengingatkan masyarakat untuk mengenali gejala DBD, seperti demam tinggi mendadak, nyeri otot, sakit kepala hebat, bintik merah di kulit, dan pendarahan ringan pada gusi atau hidung.</p><p>Jika mengalami gejala tersebut, masyarakat diimbau segera memeriksakan diri ke fasilitas kesehatan terdekat agar mendapatkan penanganan medis lebih cepat.</p><p><br></p><h3><strong>Upaya Vaksinasi dan Riset</strong></h3><p>Selain upaya pencegahan konvensional, pemerintah melalui Badan Riset dan Inovasi Nasional (BRIN) juga sedang mempercepat uji klinis vaksin DBD yang dikembangkan bersama beberapa universitas dalam negeri.</p><p>“Kami targetkan Indonesia memiliki vaksin DBD buatan lokal yang aman dan efektif pada 2027,” ungkap Kepala BRIN, Laksana Tri Handoko.</p><p><br></p><p><br></p><p class=\"ql-align-center\"><img src=\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QClRXhpZgAASUkqAAgAAAADAA4BAgBbAAAAMgAAABoBBQABAAAAjQAAABsBBQABAAAAlQAAAAAAAABEZW5ndWUgdmlydXMgaW5mb2dyYXBoaWM6IHZpcnVzIHN0cnVjdHVyZSwgdHJhbnNtaXNzaW9uLCBwcmV2ZW50aW9uLCBzeW1wdG9tcyBhbmQgdHJlYXRtZW50LAEAAAEAAAAsAQAAAQAAAP/hBcpodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMTAzMDI1MDk0NiIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL2xlZ2FsL2xpY2Vuc2UtYWdyZWVtZW50P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiBwbHVzOkRhdGFNaW5pbmc9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYvdm9jYWIvRE1JLVBST0hJQklURUQtRVhDRVBUU0VBUkNIRU5HSU5FSU5ERVhJTkciID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5lbGVuYWJzPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5EZW5ndWUgdmlydXMgaW5mb2dyYXBoaWM6IHZpcnVzIHN0cnVjdHVyZSwgdHJhbnNtaXNzaW9uLCBwcmV2ZW50aW9uLCBzeW1wdG9tcyBhbmQgdHJlYXRtZW50PC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6ZGVzY3JpcHRpb24+CjxwbHVzOkxpY2Vuc29yPjxyZGY6U2VxPjxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPjxwbHVzOkxpY2Vuc29yVVJMPmh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9waG90by9saWNlbnNlLWdtMTAzMDI1MDk0Ni0/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZjpEZXNjcmlwdGlvbj4KCTwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz4K/+0AmlBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAB9HAJQAAdlbGVuYWJzHAJ4AFtEZW5ndWUgdmlydXMgaW5mb2dyYXBoaWM6IHZpcnVzIHN0cnVjdHVyZSwgdHJhbnNtaXNzaW9uLCBwcmV2ZW50aW9uLCBzeW1wdG9tcyBhbmQg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\"></p>', 'gambar_berita/rbkqVTQuW5wjW2frSOVk7bEchd5vg2vJ37nFZIQM.jpg', 9, 1, 1, 18, '2025-07-08 20:25:31', '2025-07-08 20:26:22');

-- --------------------------------------------------------

--
-- Table structure for table `berita_disukai`
--

CREATE TABLE `berita_disukai` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `berita_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `berita_disukai`
--

INSERT INTO `berita_disukai` (`id`, `user_id`, `berita_id`, `created_at`, `updated_at`) VALUES
(3, 10, 3, NULL, NULL),
(5, 10, 1, '2025-06-07 22:43:13', '2025-06-07 22:43:13'),
(7, 4, 5, NULL, NULL),
(8, 1, 17, '2025-07-08 18:08:47', '2025-07-08 18:08:47'),
(13, 10, 17, '2025-07-09 05:57:33', '2025-07-09 05:57:33');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `iklans`
--

CREATE TABLE `iklans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_brand` varchar(255) NOT NULL,
  `tagline` varchar(255) NOT NULL,
  `gambar_iklan` varchar(255) NOT NULL,
  `id_waktu_tayang` bigint(20) UNSIGNED NOT NULL,
  `is_tayang` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `new_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `iklans`
--

INSERT INTO `iklans` (`id`, `nama_brand`, `tagline`, `gambar_iklan`, `id_waktu_tayang`, `is_tayang`, `created_at`, `updated_at`, `new_date`) VALUES
(3, 'Private Class', 'Class With Me', 'gambar_iklan/XD4lHSpwlgeyaTwZSAdKltDQ88YGRGTDmSSjdOcV.jpg', 5, 3, '2025-05-12 04:59:37', '2025-07-08 20:51:16', '2025-07-01 08:03:12'),
(4, 'Shopee', 'Beli Aja Di Shopee', 'gambar_iklan/okWO0s2RAgqG3IBORETbSbOhJsXbkeHfU9UksqW3.jpg', 4, 3, '2025-06-01 01:05:31', '2025-07-08 20:51:16', '2025-06-22 08:05:53'),
(5, 'Cornetto', 'Ice Cream Mu', 'gambar_iklan/USNTX5K16o4gPyKGcZ6A0NGhJtVcsukwJT4z8vE0.jpg', 5, 1, '2025-06-08 02:59:27', '2025-07-10 07:33:12', '2025-08-08 03:51:16'),
(6, 'Greefields', 'Susu Sehat', 'gambar_iklan/kgZZ2l95LWqzXO5qjwiVbA9bRqeUh4cvRDhPeprM.jpg', 6, 1, '2025-06-08 03:01:56', '2025-06-30 07:05:05', '2025-08-07 10:02:09'),
(7, 'Cimory', 'yogurt drink', 'gambar_iklan/sCQxFUeMATHa9UrlpJKFeLO8jZMJervpCWEvdU5x.jpg', 12, 1, '2025-07-06 01:27:01', '2025-07-08 20:40:14', '2025-10-04 08:27:01');

-- --------------------------------------------------------

--
-- Table structure for table `kategori_beritas`
--

CREATE TABLE `kategori_beritas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gambar_kategori` varchar(255) DEFAULT NULL,
  `kategori` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori_beritas`
--

INSERT INTO `kategori_beritas` (`id`, `gambar_kategori`, `kategori`, `created_at`, `updated_at`) VALUES
(1, 'gambar_kategori/O2LTWEp9DhlPhpSfyZDzDApiApHIAKf091Zmh2Zy.jpg', 'Nasional', NULL, '2025-05-12 00:26:27'),
(2, 'gambar_kategori/sh0HrXXyiXnhXGK0FX6IU8Ag7s1nCy9uLR2eQyve.jpg', 'Internasional', NULL, '2025-05-12 00:33:06'),
(3, 'gambar_kategori/zJYSsITHRDwKHori4vNX5cF2Vy34AwH4cg8fcONC.jpg', 'Politik', NULL, '2025-05-12 00:35:57'),
(4, 'gambar_kategori/jGDafldY0KYOMQaiIOu1DOcF6fT7OEP2UYqNfggx.jpg', 'Ekonomi & Bisnis', NULL, '2025-05-12 00:37:01'),
(5, 'gambar_kategori/s7CabEYDJDzrDIsBu1MYAb0KCYDk9lpgJm9qnQTD.jpg', 'Teknologi', NULL, '2025-05-12 04:50:24'),
(6, 'gambar_kategori/Sq0SP1gF07PdEAlSB7PqQUaclC56EcqwV33viyh3.jpg', 'Olahraga', NULL, '2025-05-12 04:50:47'),
(7, 'gambar_kategori/6ceiyiTVtkC6jzSsIt4wMNMQbmcZqWCr8A0Ajtiw.jpg', 'Hiburan', NULL, '2025-05-12 04:51:03'),
(8, 'gambar_kategori/jGPE9hhzMUdvXgzdESFRZY1QngHqb8b1uHhyNZRT.jpg', 'Pendidikan', NULL, '2025-05-12 04:51:21'),
(9, 'gambar_kategori/sOPCbxHlTuPKmIdwVb3WoMAcvFw6p3761bLAkr8f.jpg', 'Kesehatan', NULL, '2025-05-12 04:51:40'),
(21, 'gambar_kategori/JnuByoRzXfpqpjXO8aVHgDRLwwTYtpmoqdlSaT0k.jpg', 'K-Pop', '2025-05-12 00:38:00', '2025-05-12 00:38:00');

-- --------------------------------------------------------

--
-- Table structure for table `komentars`
--

CREATE TABLE `komentars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `komentar` varchar(255) NOT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `id_berita` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `komentars`
--

INSERT INTO `komentars` (`id`, `komentar`, `id_user`, `id_berita`, `created_at`, `updated_at`, `is_approved`) VALUES
(2, 'sangat bermanfaat terimakasih', 10, 1, NULL, NULL, 1),
(3, '<p>good mntap joss joss</p>', 10, 1, NULL, '2025-07-05 02:53:15', 1),
(7, 'cukup informatif yeahh', 10, 1, '2025-06-10 06:39:19', '2025-07-03 21:48:12', 3),
(8, 'waahh bagus banget', 10, 1, '2025-06-10 06:56:12', '2025-06-10 06:56:12', 1),
(9, 'suka banget', 10, 1, '2025-06-10 07:09:24', '2025-06-10 07:09:24', 1),
(11, 'baik', 10, 1, '2025-06-10 07:34:30', '2025-07-03 22:19:51', 3),
(12, 'bermanfaat banget', 10, 1, '2025-06-10 07:39:00', '2025-07-03 21:43:43', 1),
(13, 'makasihh informasinya', 10, 11, '2025-06-12 08:14:29', '2025-06-12 08:14:29', 1),
(14, 'cukup bagus poll', 10, 1, '2025-07-08 18:36:04', '2025-07-08 18:36:04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_04_19_071431_create_waktu_tayang_table', 1),
(6, '2025_04_19_071737_create_iklan_table', 2),
(7, '2025_04_19_071903_create_kategori_berita_table', 2),
(8, '2025_04_19_072039_create_berita_table', 2),
(9, '2025_04_19_072330_create_komentar_table', 2),
(10, '2025_04_19_075731_create_waktu_tayang_table', 3),
(11, '2025_04_25_145210_add_new_date_to_iklans_table', 4),
(12, '2025_07_11_073817_create_password_forgot', 5),
(13, '2025_07_12_060528_create_pending_users_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `password_forgot`
--

CREATE TABLE `password_forgot` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`id`, `email`, `token`, `created_at`, `expires_at`) VALUES
(2, 'tasbiriya29@gmail.com', 'O1e7HpB4PQSMRUsVrWxl2zTo1vmeZEXDmjJT6wg0SseBfGnnvPXTuxmfGkaD', '2025-07-10 21:53:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pending_users`
--

CREATE TABLE `pending_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `otp_expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'AdminAuthToken', 'b4c2c3729389e31284595a35b6e6d39a83e76baee418378f6fda1054a447f046', '[\"*\"]', NULL, NULL, '2025-04-19 01:25:41', '2025-04-19 01:25:41'),
(2, 'App\\Models\\User', 3, 'UserAuthToken', 'd7b501942e3bc7ec8e01bdcc61843e89f9864debfb874c18be384455853124b3', '[\"*\"]', NULL, NULL, '2025-05-09 23:10:19', '2025-05-09 23:10:19'),
(3, 'App\\Models\\User', 3, 'UserAuthToken', 'a8793b31587f3a83bbbab30de06b15a4012f77f901dd817f83aa6f347dc8a9bc', '[\"*\"]', NULL, NULL, '2025-05-09 23:21:17', '2025-05-09 23:21:17'),
(4, 'App\\Models\\User', 3, 'UserAuthToken', 'abefe556c69947754262e00d115175cb54fe8577febf026d40840faf443c5fe3', '[\"*\"]', NULL, NULL, '2025-05-09 23:22:53', '2025-05-09 23:22:53'),
(5, 'App\\Models\\User', 6, 'AdminAuthToken', '7d2f3a59a5d101b9720dac7039283784f8797ff5a4eee48f54e25a23e88ae116', '[\"*\"]', NULL, NULL, '2025-05-11 20:16:15', '2025-05-11 20:16:15'),
(6, 'App\\Models\\User', 6, 'AdminAuthToken', 'f67f2655639680275586444ec60cbb04eeb9a3534e9ef5b901cfee16a36af304', '[\"*\"]', '2025-05-12 05:11:41', NULL, '2025-05-11 21:15:08', '2025-05-12 05:11:41'),
(7, 'App\\Models\\User', 1, 'AdminAuthToken', '101784ba399ebc94008fbd40c14ccf22bf983c59547e721a25f7181671501dd3', '[\"*\"]', '2025-06-01 00:57:47', NULL, '2025-06-01 00:35:55', '2025-06-01 00:57:47'),
(8, 'App\\Models\\User', 3, 'UserAuthToken', 'fcda4d187505f88a59f64b0222b25005b650f27df147ba8628a74c1d307db17f', '[\"*\"]', NULL, NULL, '2025-06-01 01:37:46', '2025-06-01 01:37:46'),
(9, 'App\\Models\\User', 10, 'UserAuthToken', '9b7213b6f4af0b5696d6db4c3322735495b7e14ee7a7ff66f35238eecbd791ea', '[\"*\"]', NULL, NULL, '2025-06-01 01:44:21', '2025-06-01 01:44:21'),
(10, 'App\\Models\\User', 10, 'UserAuthToken', '9f5840ee6be44cccd822e16f58e204a08e13aaf14b0e57803808d90e3da17431', '[\"*\"]', NULL, NULL, '2025-06-01 01:53:58', '2025-06-01 01:53:58'),
(11, 'App\\Models\\User', 10, 'UserAuthToken', '8bc86be0e1da2f122b5900b5eba155f209fe55dd063055c44317fb533234a21d', '[\"*\"]', '2025-06-08 00:04:05', NULL, '2025-06-01 01:59:56', '2025-06-08 00:04:05'),
(12, 'App\\Models\\User', 1, 'AdminAuthToken', 'c64ab517b4d2059ddf855d1f8e6e7b6b679b8a6ef26f357e1b522154a3ebc1f4', '[\"*\"]', '2025-06-08 00:27:13', NULL, '2025-06-07 23:44:00', '2025-06-08 00:27:13'),
(13, 'App\\Models\\User', 10, 'UserAuthToken', '6c6a0e02585de9215b096b97c6302e073509f405e8b68505c66c3c518c5d0567', '[\"*\"]', '2025-06-10 05:07:43', NULL, '2025-06-08 00:29:25', '2025-06-10 05:07:43'),
(14, 'App\\Models\\User', 1, 'AdminAuthToken', '1b1e453e1041338e2f17adebae9c5583d9b1bb3ab17cb8d89b1052f561a92081', '[\"*\"]', NULL, NULL, '2025-06-08 02:55:23', '2025-06-08 02:55:23'),
(15, 'App\\Models\\User', 10, 'UserAuthToken', '052d37e68f9714a26afce0b18d326b00fdf0a40f62d0368d70a80bb6d777cbff', '[\"*\"]', '2025-06-12 07:02:28', NULL, '2025-06-10 05:28:34', '2025-06-12 07:02:28'),
(16, 'App\\Models\\User', 1, 'AdminAuthToken', '32d4e78a90d69ae354cc867bfa6f95696e2db76d082b21a3c34eebe8c7029857', '[\"*\"]', NULL, NULL, '2025-06-10 06:27:56', '2025-06-10 06:27:56'),
(17, 'App\\Models\\User', 1, 'UserAuthToken', 'd1e1be72c9f39258efb4afdfbdc42e7ad198e7d4805920fc490477a31c43dc2c', '[\"*\"]', '2025-06-12 08:05:47', NULL, '2025-06-12 07:03:14', '2025-06-12 08:05:47'),
(18, 'App\\Models\\User', 10, 'UserAuthToken', '7045d574a4274fd85d096ef794dbd3ebf869786f32b5b6dffeabeccb8c5bcf31', '[\"*\"]', '2025-06-21 07:45:38', NULL, '2025-06-12 08:06:35', '2025-06-21 07:45:38'),
(19, 'App\\Models\\User', 1, 'AdminAuthToken', 'c752224105c1e72663f41023e0e11ec163b532c593b14be8618ac57c78369747', '[\"*\"]', '2025-06-12 08:45:31', NULL, '2025-06-12 08:14:54', '2025-06-12 08:45:31'),
(20, 'App\\Models\\User', 10, 'UserAuthToken', 'da420b14fd6df69a093612f8f4e040ff93f665b18f1ce11ded33c1a082a48865', '[\"*\"]', '2025-06-21 22:06:21', NULL, '2025-06-19 02:08:33', '2025-06-21 22:06:21'),
(21, 'App\\Models\\User', 1, 'AdminAuthToken', '280be66be0b2fb07cad1da6589d5fe9f7105c04d9425bb5e43f6a60be07a2ada', '[\"*\"]', NULL, NULL, '2025-06-20 06:06:07', '2025-06-20 06:06:07'),
(22, 'App\\Models\\User', 3, 'UserAuthToken', '200330d1cae9e31daec33e03407d1f46acc4a8118b1b81b13e92c4b56c1dbcc5', '[\"*\"]', '2025-06-25 09:20:30', NULL, '2025-06-25 09:04:53', '2025-06-25 09:20:30'),
(23, 'App\\Models\\User', 1, 'AdminAuthToken', 'f65d994202e7134f58526dfe0d32b956956e582ca6eff46e4dc264d52459939a', '[\"*\"]', NULL, NULL, '2025-06-25 09:09:52', '2025-06-25 09:09:52'),
(24, 'App\\Models\\User', 1, 'AdminAuthToken', '92a97cf8365ff535a01fe55520a2a88101a971198d706073cb54b6b515466dbe', '[\"*\"]', NULL, NULL, '2025-06-27 07:33:44', '2025-06-27 07:33:44'),
(25, 'App\\Models\\User', 12, 'UserAuthToken', '83933b6e7d49aca47593e56029014c2f71f3028f27e611d0980a2a693013e2f1', '[\"*\"]', NULL, NULL, '2025-06-29 22:22:28', '2025-06-29 22:22:28'),
(26, 'App\\Models\\User', 1, 'UserAuthToken', 'b94a81c69ca3b74c25ebd74d5b12141d8046ac1a3fc4805eab159799301be844', '[\"*\"]', NULL, NULL, '2025-06-29 23:41:37', '2025-06-29 23:41:37'),
(27, 'App\\Models\\User', 1, 'UserAuthToken', '3a72bad8c17614382d781b4e17b2808de5223a6eabbabc1ec3f3052ae2492299', '[\"*\"]', '2025-06-30 02:10:05', NULL, '2025-06-30 02:09:33', '2025-06-30 02:10:05'),
(28, 'App\\Models\\User', 1, 'AdminAuthToken', '5f8d9b7ba25862a3c546ffb274c80696d2f4ca6b3ca67fffb7d9e019500f883c', '[\"*\"]', '2025-07-08 18:08:47', NULL, '2025-06-30 05:50:05', '2025-07-08 18:08:47'),
(29, 'App\\Models\\User', 10, 'UserAuthToken', '992540f4d77a7db49ea6411bddbaea9c087eea6df3bd180469ac0afb8f23defa', '[\"*\"]', '2025-07-06 00:36:56', NULL, '2025-07-05 02:29:19', '2025-07-06 00:36:56'),
(30, 'App\\Models\\User', 1, 'AdminAuthToken', '07ea70645abcff079329538ea1ed6743467aa7f4a0edfed4027303a8798adb81', '[\"*\"]', NULL, NULL, '2025-07-06 02:07:43', '2025-07-06 02:07:43'),
(31, 'App\\Models\\User', 10, 'UserAuthToken', '22b72a5ee49f5482910753bfd6b4157579da9cd781b8244843cef46b62d3ebaa', '[\"*\"]', '2025-07-08 00:42:30', NULL, '2025-07-08 00:40:16', '2025-07-08 00:42:30'),
(32, 'App\\Models\\User', 12, 'UserAuthToken', '0dfdff3b19a95378999f7bf3f3268fd5195f84542b8543697d102d57a36b5971', '[\"*\"]', NULL, NULL, '2025-07-08 08:52:57', '2025-07-08 08:52:57'),
(33, 'App\\Models\\User', 10, 'UserAuthToken', '527b3a48d03bf8e63f97e16e47ab75fb67b5c3bde52540a7da688c24964462d6', '[\"*\"]', '2025-07-08 11:08:15', NULL, '2025-07-08 09:30:35', '2025-07-08 11:08:15'),
(34, 'App\\Models\\User', 10, 'UserAuthToken', '9022652c5ac030748bb06f4345305b4d9830fd788c3864e253230e38b87e50c1', '[\"*\"]', '2025-07-08 18:15:02', NULL, '2025-07-08 18:09:27', '2025-07-08 18:15:02'),
(35, 'App\\Models\\User', 10, 'UserAuthToken', '8c7634248480e41a4812ba7bfefd0c5c626981ee1c69de08b4c036c9dad3902b', '[\"*\"]', '2025-07-08 20:39:54', NULL, '2025-07-08 18:32:34', '2025-07-08 20:39:54'),
(36, 'App\\Models\\User', 1, 'AdminAuthToken', '09dc5c1a62a1ba22670f433e39d8329ff87e3628654b8b5b45194e8b1e0f7e07', '[\"*\"]', '2025-07-08 20:25:31', NULL, '2025-07-08 20:20:42', '2025-07-08 20:25:31'),
(37, 'App\\Models\\User', 10, 'UserAuthToken', 'ab35dfd1a6dca9f683ee48576191424dbfc0924afa8707646bb565b53e35c851', '[\"*\"]', '2025-07-08 22:55:39', NULL, '2025-07-08 22:14:48', '2025-07-08 22:55:39'),
(38, 'App\\Models\\User', 1, 'UserAuthToken', '8a516baef6d00fc8729ad79381abb9ddf2021a889b646a5c04057e64c5166ce2', '[\"*\"]', '2025-07-08 23:02:04', NULL, '2025-07-08 23:01:42', '2025-07-08 23:02:04'),
(39, 'App\\Models\\User', 6, 'UserAuthToken', '471c623dedc6545155f6c93ee4a9a602b4be7a21a0117b18fe21dfa0739c8d35', '[\"*\"]', '2025-07-09 05:51:05', NULL, '2025-07-08 23:04:10', '2025-07-09 05:51:05'),
(40, 'App\\Models\\User', 10, 'UserAuthToken', '65f05ebdda10b970b81d9053448a0439fc65fbb8d40e2df61c352d1e9635ea21', '[\"*\"]', '2025-07-09 06:17:18', NULL, '2025-07-09 05:51:36', '2025-07-09 06:17:18'),
(41, 'App\\Models\\User', 6, 'AdminAuthToken', '4bd19d6b3cab77c4a25a55b03ccec4d8dc6d3708337536b7dea6461573311ba0', '[\"*\"]', NULL, NULL, '2025-07-09 06:25:42', '2025-07-09 06:25:42'),
(42, 'App\\Models\\User', 12, 'UserAuthToken', '47f02ef356d1fe5fe3ec60cf02c0c11ef46c8e0eaf028e9f740a8bead43855fd', '[\"*\"]', NULL, NULL, '2025-07-11 02:38:41', '2025-07-11 02:38:41'),
(43, 'App\\Models\\User', 12, 'UserAuthToken', '00646ddeb3cb2bc04d4f11d24103596598faa71863b6faebdaf6ed5cdb8a1797', '[\"*\"]', NULL, NULL, '2025-07-11 18:39:29', '2025-07-11 18:39:29'),
(44, 'App\\Models\\User', 14, 'AdminAuthToken', 'ce04897c69871cc443d0715a54bfa26d27f0fb3e086bf5ef31164740231cef70', '[\"*\"]', NULL, NULL, '2025-07-11 18:40:06', '2025-07-11 18:40:06'),
(45, 'App\\Models\\User', 14, 'AdminAuthToken', '17733a7a3bd728cb9a839e0e7e05f959fb363c79bb1ab6ccfc1ff851ebcbfc8d', '[\"*\"]', NULL, NULL, '2025-07-11 18:48:20', '2025-07-11 18:48:20'),
(46, 'App\\Models\\User', 15, 'UserAuthToken', 'ef803783548c92f9f94390fdf78e3b0c0c6e4303f4fa59c8202615d0e1da0ac0', '[\"*\"]', NULL, NULL, '2025-07-11 23:02:38', '2025-07-11 23:02:38'),
(47, 'App\\Models\\User', 16, 'UserAuthToken', 'a480b878b3a84b63161a7aa1dfc81a489bbeabecb50536c724ca76ea0211feee', '[\"*\"]', NULL, NULL, '2025-07-12 00:57:50', '2025-07-12 00:57:50'),
(48, 'App\\Models\\User', 16, 'UserAuthToken', 'eb6259dcc82fd15456d6654d6525d3b49468bcb585bf8723ba801a4343bef8cf', '[\"*\"]', NULL, NULL, '2025-07-12 01:08:25', '2025-07-12 01:08:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(10) NOT NULL,
  `nama_user` varchar(50) DEFAULT NULL,
  `jenis_kelamin` varchar(10) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `otp` varchar(255) DEFAULT NULL,
  `otp_expires_at` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `nama_user`, `jenis_kelamin`, `tgl_lahir`, `no_hp`, `email`, `email_verified_at`, `password`, `is_admin`, `otp`, `otp_expires_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', NULL, NULL, NULL, NULL, 'admin@gmail.com', NULL, '$2y$10$pe.i2xplCxK75pXbsKqHB.Oo/Yiz1gq/PUBRQvXLVpfrcL4P9FFje', 1, NULL, NULL, NULL, NULL, '2025-07-10 21:20:58'),
(3, 'titi', NULL, NULL, NULL, NULL, 'titi@gmail.com', NULL, '$2y$12$44ehO3pWrzPRRQQmzqlKEO9Yvm9BLAj5czD38kOuoDD/EePue4qa.', 0, NULL, NULL, NULL, '2025-05-09 22:32:41', '2025-05-09 22:32:41'),
(4, 'tina', NULL, NULL, NULL, NULL, 'tina@gmail.com', NULL, '$2y$12$J9CwBHnJSZ/jhRMiDcyO7uQAP/PIVL2lmS4pu1leLTkD4vKqWSIg6', 0, NULL, NULL, NULL, '2025-05-09 22:55:02', '2025-05-09 22:55:02'),
(6, 'admin2', NULL, NULL, NULL, NULL, 'admin2@gmail.com', NULL, '$2y$10$vU.KtiAxps55U7UeFExRIetdSDQljeTFa9IkPasOYUw6Qq4IpxWzK', 1, NULL, NULL, NULL, NULL, NULL),
(7, 'Luna', NULL, NULL, NULL, NULL, 'luna@gmail.com', NULL, '$2y$12$.0D.4EfEKLmOevl.SPy/K.RKtqAH2cX4KMoKdhgwGn.r.3dyQLayW', 0, NULL, NULL, NULL, '2025-05-11 21:39:15', '2025-05-12 05:54:21'),
(8, 'admin4', NULL, NULL, NULL, NULL, 'admin4@gmail.com', NULL, '$2y$12$Dg/N/Fs3YMkKlVpTPAGF6.w8Jytg4Jd4jwd9iacM3KQG8cQuyov2y', 1, NULL, NULL, NULL, '2025-05-11 21:43:35', '2025-05-11 21:43:35'),
(10, 'riya', 'Tasbi Khatuz Zuhriya', 'Perempuan', '2002-12-29', '085667889726', 'riya@gmail.com', NULL, '$2y$12$.eqRoQy9dNljusVv7/wVT.93D3CiRy6K06GaRuKyNJsKWDloz5GxW', 0, NULL, NULL, NULL, '2025-06-01 01:43:04', '2025-06-01 20:36:57'),
(12, 'tasbi', NULL, NULL, NULL, NULL, 'tasbiriya29@gmail.com', NULL, '$2y$12$X15.dlLo8sSpt4.XhYert.oO6d7Px7pQJFfvGZSyE2o2M85MgPSV6', 0, NULL, NULL, NULL, '2025-06-26 23:13:04', '2025-07-11 18:39:15'),
(13, 'nana', NULL, NULL, NULL, NULL, 'nana@gmail.com', NULL, '$2y$12$4oXFDDfsRCWjRimZ415OBe.jIY2LeZC9gjYGscPQ2EpJaSCm/v/ZK', 0, NULL, NULL, NULL, '2025-07-06 02:04:58', '2025-07-06 02:04:58'),
(16, 'zuhriya29', NULL, 'Perempuan', NULL, NULL, 'ajaria701@gmail.com', NULL, '$2y$12$UOYi.K6h2hXsFFRRzfTU0eaTjmnME94MZNSJbsQTqitepBDorwNiG', 0, NULL, NULL, NULL, '2025-07-12 00:57:36', '2025-07-12 01:25:39');

-- --------------------------------------------------------

--
-- Table structure for table `view_logs`
--

CREATE TABLE `view_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `berita_id` bigint(20) UNSIGNED NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `view_logs`
--

INSERT INTO `view_logs` (`id`, `berita_id`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 3, '127.0.0.1', '2025-06-21 08:48:37', '2025-06-21 08:48:37'),
(2, 1, '127.0.0.1', '2025-06-21 08:52:36', '2025-06-21 08:52:36'),
(3, 5, '127.0.0.1', '2025-06-21 09:03:57', '2025-06-21 09:03:57'),
(4, 13, '127.0.0.1', '2025-06-21 09:04:58', '2025-06-21 09:04:58'),
(5, 16, '127.0.0.1', '2025-06-21 09:07:45', '2025-06-21 09:07:45');

-- --------------------------------------------------------

--
-- Table structure for table `waktu_tayang`
--

CREATE TABLE `waktu_tayang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `waktu_tayang` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `waktu_tayang`
--

INSERT INTO `waktu_tayang` (`id`, `waktu_tayang`, `created_at`, `updated_at`) VALUES
(1, 3, NULL, NULL),
(2, 7, NULL, NULL),
(3, 14, NULL, NULL),
(4, 21, NULL, NULL),
(5, 30, NULL, NULL),
(6, 60, NULL, NULL),
(11, 5, '2025-05-01 09:15:13', '2025-05-12 04:52:16'),
(12, 90, '2025-05-12 04:52:24', '2025-05-12 04:52:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beritas`
--
ALTER TABLE `beritas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `beritas_id_kategori_foreign` (`id_kategori`),
  ADD KEY `beritas_id_user_foreign` (`id_user`);

--
-- Indexes for table `berita_disukai`
--
ALTER TABLE `berita_disukai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `berita_disukai_user_id_foreign` (`user_id`),
  ADD KEY `berita_id` (`berita_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `iklans`
--
ALTER TABLE `iklans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iklans_id_waktu_tayang_foreign` (`id_waktu_tayang`);

--
-- Indexes for table `kategori_beritas`
--
ALTER TABLE `kategori_beritas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `komentars`
--
ALTER TABLE `komentars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `komentars_id_user_foreign` (`id_user`),
  ADD KEY `komentars_id_berita_foreign` (`id_berita`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_forgot`
--
ALTER TABLE `password_forgot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`) USING BTREE;

--
-- Indexes for table `pending_users`
--
ALTER TABLE `pending_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pending_users_email_unique` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `view_logs`
--
ALTER TABLE `view_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `berita_id` (`berita_id`);

--
-- Indexes for table `waktu_tayang`
--
ALTER TABLE `waktu_tayang`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beritas`
--
ALTER TABLE `beritas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `berita_disukai`
--
ALTER TABLE `berita_disukai`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iklans`
--
ALTER TABLE `iklans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kategori_beritas`
--
ALTER TABLE `kategori_beritas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `komentars`
--
ALTER TABLE `komentars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `password_forgot`
--
ALTER TABLE `password_forgot`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pending_users`
--
ALTER TABLE `pending_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `view_logs`
--
ALTER TABLE `view_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `waktu_tayang`
--
ALTER TABLE `waktu_tayang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `beritas`
--
ALTER TABLE `beritas`
  ADD CONSTRAINT `beritas_id_kategori_foreign` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_beritas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beritas_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `berita_disukai`
--
ALTER TABLE `berita_disukai`
  ADD CONSTRAINT `berita_disukai_ibfk_1` FOREIGN KEY (`berita_id`) REFERENCES `beritas` (`id`),
  ADD CONSTRAINT `berita_disukai_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `iklans`
--
ALTER TABLE `iklans`
  ADD CONSTRAINT `iklans_id_waktu_tayang_foreign` FOREIGN KEY (`id_waktu_tayang`) REFERENCES `waktu_tayang` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `komentars`
--
ALTER TABLE `komentars`
  ADD CONSTRAINT `komentars_id_berita_foreign` FOREIGN KEY (`id_berita`) REFERENCES `beritas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `komentars_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `view_logs`
--
ALTER TABLE `view_logs`
  ADD CONSTRAINT `view_logs_ibfk_1` FOREIGN KEY (`berita_id`) REFERENCES `beritas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
