"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Send,
  Share2,
  PhoneCall,
  MapPin,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Compass,
  HeartHandshake,
  Sprout,
  ShieldCheck,
  Building2,
  Stethoscope,
  MessageSquareQuote,
  Menu,
  X,
  Clock,
  ArrowRight,
} from "lucide-react";

interface Aspirasi {
  id: string;
  nama: string;
  dusun: string;
  kategori: string;
  pesan: string;
  tanggal: string;
}

const INITIAL_ASPIRASI: Aspirasi[] = [
  {
    id: "1",
    nama: "Ahmad Baihaqi",
    dusun: "Dusun Lekong Pituk",
    kategori: "Pertanian & Irigasi",
    pesan:
      "Semoga saluran irigasi ke sawah bagian bawah bisa diperbaiki permanen saat Pak ZAPA terpilih. Kami petani siap mendukung penuh!",
    tanggal: "Hari ini",
  },
  {
    id: "2",
    nama: "Siti Maryam",
    dusun: "Dusun Orong Gerisak",
    kategori: "Pelayanan Publik",
    pesan:
      "Harapan kami pengurusan surat izin usaha dan bantuan bansos benar-benar adil dan transparan tanpa pandang bulu.",
    tanggal: "Kemarin",
  },
  {
    id: "3",
    nama: "Irwan Jayadi",
    dusun: "Dusun Tetebatu Selatan",
    kategori: "Pemuda & Pariwisata",
    pesan:
      "Pak ZAPA sudah terbukti memajukan Pokdarwis dan tetebatu.com. Kami generasi muda butuh wadah pelatihan dan lapangan kerja lokal.",
    tanggal: "2 hari lalu",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aspirasiList, setAspirasiList] = useState<Aspirasi[]>(INITIAL_ASPIRASI);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Form states
  const [nama, setNama] = useState("");
  const [dusun, setDusun] = useState("Dusun Lekong Pituk");
  const [kategori, setKategori] = useState("Pertanian & Irigasi");
  const [pesan, setPesan] = useState("");
  const [noWa, setNoWa] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load local saved aspirations on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zapa_aspirasi_data");
      if (saved) {
        setAspirasiList(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#f59e0b", "#064e3b", "#34d399"],
    });
  };

  const handleSubmitAspirasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) return;

    const newAspirasi: Aspirasi = {
      id: Date.now().toString(),
      nama: nama.trim(),
      dusun,
      kategori,
      pesan: pesan.trim(),
      tanggal: "Baru saja",
    };

    const updated = [newAspirasi, ...aspirasiList];
    setAspirasiList(updated);
    try {
      localStorage.setItem("zapa_aspirasi_data", JSON.stringify(updated));
    } catch {
      // ignore
    }

    triggerConfetti();
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const targetPhone = "6283846342361";
    const textMsg = encodeURIComponent(
      `*Aspirasi & Dukungan Pilkades Tetebatu Selatan 2027-2035*\n\n` +
        `*Nama Warga:* ${nama || "Warga Tetebatu Selatan"}\n` +
        `*Dusun:* ${dusun}\n` +
        `*Kategori:* ${kategori}\n` +
        (noWa ? `*Kontak WA:* ${noWa}\n` : "") +
        `*Isi Pesan / Aspirasi:*\n"${pesan || "Saya mendukung penuh Bapak Zaenul Padli untuk memimpin Desa Tetebatu Selatan!"}"\n\n` +
        `_Dikirim melalui portal resmi zapa.tetebatu.com_`
    );
    window.open(`https://wa.me/${targetPhone}?text=${textMsg}`, "_blank");
  };

  const handleShareApp = () => {
    const shareText = encodeURIComponent(
      `Yuk kenali Profil, Visi, Misi & 5 Program Nyata Calon Kepala Desa Tetebatu Selatan 2027–2035: *Bapak Zaenul Padli (ZAPA)*.\n\n` +
        `Mari sampaikan aspirasi dan satukan niat untuk kemajuan desa kita:\n👉 https://zapa.tetebatu.com`
    );
    window.open(`https://wa.me/?text=${shareText}`, "_blank");
  };

  const PROGRAM_PILAR = [
    {
      icon: ShieldCheck,
      nomor: "01",
      judul: "Birokrasi Bersih, Melayani & Transparansi APBDes",
      ringkasan:
        "Layanan administrasi cepat tanpa berbelit, jemput bola untuk lansia & disabilitas, serta papan transparansi anggaran desa di tiap dusun.",
      poin: [
        "Pelayanan surat menyurat gratis & kilat (bisa request via WhatsApp Desa).",
        "Pemberitahuan terbuka pengelolaan dana desa (APBDes) di setiap dusun dan digital.",
        "Aparatur desa yang ramah, profesional, dan siap hadir langsung membantu warga.",
      ],
    },
    {
      icon: Sprout,
      nomor: "02",
      judul: "Kedaulatan Pertanian & Ketahanan Pangan Desa",
      ringkasan:
        "Memperjuangkan pupuk tepat waktu, bantuan bibit unggul, normalisasi irigasi sawah, dan pendampingan kelompok tani.",
      poin: [
        "Normalisasi dan perbaikan permanen saluran irigasi tersier persawahan dusun.",
        "Advokasi kuota dan distribusi pupuk subsidi yang tepat waktu dan bebas penimbunan.",
        "Pendampingan kemitraan pasar bagi hasil tani tembakau, hortikultura, dan palawija.",
      ],
    },
    {
      icon: Users,
      nomor: "03",
      judul: "Pemberdayaan Pemuda, Olahraga & Pariwisata Berdaya",
      ringkasan:
        "Memaksimalkan potensi kepemudaan lewat pelatihan wirausaha, pembinaan olahraga desa, serta integrasi ekosistem wisata desa Tetebatu.",
      poin: [
        "Program inkubasi wirausaha dan pelatihan sertifikasi pemandu wisata untuk pemuda dusun.",
        "Turnamen olahraga antar-dusun tahunan (Sepak Bola & Voli) dan perbaikan sarana olahraga.",
        "Membuka lapangan kerja lokal berbasis homestay, kuliner, dan kearifan lokal dusun.",
      ],
    },
    {
      icon: Building2,
      nomor: "04",
      judul: "Pemerataan Infrastruktur Dusun & Akses Air Bersih",
      ringkasan:
        "Memastikan tidak ada dusun yang tertinggal dalam pengaspalan/rabat beton jalan usaha tani, penerangan jalan umum, dan sanitasi.",
      poin: [
        "Rabat beton dan pengerasan jalan usaha tani untuk memudahkan mobilisasi panen petani.",
        "Pemasangan lampu penerangan jalan dusun pada titik-titik rawan dan minim cahaya.",
        "Penguatan instalasi pipa air bersih dan sumur resapan warga di dusun yang kekurangan air.",
      ],
    },
    {
      icon: Stethoscope,
      nomor: "05",
      judul: "Jaminan Kesehatan Warga & Perlindungan Sosial",
      ringkasan:
        "Ambulans desa siaga 24 jam, pendampingan BPJS kesehatan bagi keluarga pra-sejahtera, serta santunan warga lansia dan duka.",
      poin: [
        "Layanan kendaraan operasional/ambulans siaga untuk warga rujukan sakit dan melahirkan.",
        "Pendampingan berkala agar warga tidak mampu terdaftar dalam bantuan jaminan kesehatan (BPJS).",
        "Santunan duka cita dan penguatan posyandu balita serta lansia terpadu di setiap dusun.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-emerald-950 text-emerald-100 text-xs sm:text-sm py-2 px-4 border-b border-emerald-900/60 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Pilkades Tetebatu Selatan Periode 2027–2035</span>
            <span className="hidden md:inline text-emerald-400">|</span>
            <span className="hidden md:inline text-emerald-300">
              Bersama Zaenul Padli (ZAPA) Bangun Desa Berkelanjutan
            </span>
          </div>
          <button
            onClick={handleShareApp}
            className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-50 px-3 py-1 rounded-full text-xs font-semibold transition shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan Web</span>
          </button>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <header className="bg-white/95 backdrop-blur-md sticky top-[37px] z-40 border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#beranda" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
                ZAPA
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-emerald-950 tracking-tight leading-tight">
                  ZAENUL PADLI
                </span>
                <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                  Calon Kades Tetebatu Selatan
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
              <a
                href="#beranda"
                className="hover:text-emerald-700 transition-colors"
              >
                Beranda
              </a>
              <a
                href="#profil"
                className="hover:text-emerald-700 transition-colors"
              >
                Tentang ZAPA
              </a>
              <a
                href="#visi-misi"
                className="hover:text-emerald-700 transition-colors"
              >
                Visi & Misi
              </a>
              <a
                href="#program"
                className="hover:text-emerald-700 transition-colors"
              >
                5 Pilar Program
              </a>
              <a
                href="#aspirasi"
                className="hover:text-emerald-700 transition-colors"
              >
                Suara Warga
              </a>
              <a
                href="#galeri"
                className="hover:text-emerald-700 transition-colors"
              >
                Dokumentasi
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#aspirasi"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Aspirasi</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <a
              href="#beranda"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
            >
              Beranda
            </a>
            <a
              href="#profil"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
            >
              Tentang Zaenul Padli
            </a>
            <a
              href="#visi-misi"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
            >
              Visi & Misi
            </a>
            <a
              href="#program"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
            >
              5 Pilar Program Kerja
            </a>
            <a
              href="#aspirasi"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
            >
              Suara & Aspirasi Warga
            </a>
            <a
              href="#galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
            >
              Galeri Kegiatan
            </a>
            <div className="pt-2">
              <a
                href="#aspirasi"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center flex items-center justify-center gap-2 bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow"
              >
                <Send className="w-4 h-4" />
                <span>Sampaikan Harapan ke ZAPA</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-12 pb-20 sm:pt-16 sm:pb-28"
      >
        {/* Subtle background landscape blend */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <Image
            src="/images/tetebatu-landscape.webp"
            alt="Pemandangan Desa Tetebatu"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-600/60 rounded-full px-4 py-1.5 shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-semibold text-emerald-100">
                  Pencalonan Kepala Desa Tetebatu Selatan 2027–2035
                </span>
              </div>

              {/* Tagline Utama */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                Mengabdi dengan Hati,{" "}
                <span className="text-amber-400 underline decoration-amber-500/40 underline-offset-8">
                  Membangun
                </span>{" "}
                dengan Bukti.
              </h1>

              {/* Deskripsi */}
              <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
                Bersama <strong className="text-white">Bapak Zaenul Padli (ZAPA)</strong>, 
                mantan Kepala Dusun Lekong Pituk & Ketua Pokdarwis Tetebatu. 
                Pemimpin berakar rumput yang siap memperjuangkan kedaulatan petani, 
                pemerataan fasilitas antar-dusun, dan kemakmuran seluruh warga Tetebatu Selatan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <a
                  href="#aspirasi"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-full shadow-lg shadow-amber-500/20 hover:scale-102 transition transform text-base"
                >
                  <Send className="w-5 h-5 text-slate-950" />
                  <span>Sampaikan Aspirasi Warga</span>
                </a>

                <a
                  href="#program"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800/80 hover:bg-emerald-700/80 text-white font-semibold px-6 py-3.5 rounded-full border border-emerald-600/50 transition text-base"
                >
                  <span>Lihat 5 Pilar Program</span>
                  <ChevronRight className="w-4 h-4 text-emerald-300" />
                </a>
              </div>

              {/* Key Trust Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-800/80 max-w-xl mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                    10+ Thn
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-200">
                    Pengabdian Desa
                  </div>
                </div>
                <div className="text-center lg:text-left border-x border-emerald-800/80 px-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                    Semua
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-200">
                    Dusun Diperhatikan
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-200">
                    Dedikasi Warga
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Candidate Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Background decorative glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />

                <div className="relative bg-emerald-950 rounded-3xl p-3 border border-emerald-700/60 shadow-2xl overflow-hidden">
                  <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-emerald-900">
                    <Image
                      src="/images/zaenul-padli.jpg"
                      alt="Bapak Zaenul Padli - Calon Kepala Desa Tetebatu Selatan"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    {/* Inner subtle gradient on portrait bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />

                    {/* Bottom floating badge */}
                    <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-emerald-900/90 backdrop-blur-md border border-emerald-600/50 shadow-lg text-center">
                      <p className="font-extrabold text-white text-lg tracking-wide uppercase">
                        ZAENUL PADLI (ZAPA)
                      </p>
                      <p className="text-xs font-medium text-amber-300 mt-0.5">
                        Calon Kepala Desa Tetebatu Selatan 2027–2035
                      </p>
                      <div className="flex items-center justify-center gap-4 mt-2 text-[11px] text-emerald-200">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          Amanah
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          Transparan
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          Berpengalaman
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROFIL & REKAM JEJAK NYATA */}
      <section id="profil" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Mengenal Lebih Dekat
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sosok Pemimpin yang Tumbuh Bersama Warga
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Zaenul Padli bukan sosok yang datang menjelang pemilihan. 
              Beliau telah membuktikan dedikasinya memimpin dari tingkat dusun 
              hingga mengangkat potensi desa ke kancah nasional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Real Action Images */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src="/images/zaenul-padli-bbtf.jpg"
                  alt="Zaenul Padli mewakili Desa di Bali Beyond Travel Fair"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                  <div className="text-white text-xs sm:text-sm">
                    <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[11px] mr-2">
                      Aksi Nyata
                    </span>
                    Mempromosikan potensi desa di Bali Beyond Travel Fair (BBTF)
                  </div>
                </div>
              </div>

              <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <Image
                  src="/images/tetebatu-landscape.webp"
                  alt="Hamparan sawah dan keindahan Tetebatu"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <p className="text-white text-xs font-medium">
                    Kearifan lokal dan sawah bertingkat: modal besar Tetebatu Selatan mandiri pangan dan pariwisata.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Timeline & Experience */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                {/* Timeline Item 1 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-50 transition">
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                        2010 – 2015
                      </span>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                        Kepala Dusun Lekong Pituk
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Memimpin pelayanan masyarakat dusun secara langsung, menyelesaikan persoalan warga secara kekeluargaan, mengawal gotong royong, dan pemerataan bantuan warga.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-50 transition">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                        2023 – Sekarang
                      </span>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                        Ketua Pokdarwis (Kelompok Sadar Wisata) Tetebatu
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Menggerakkan pemuda dan masyarakat sadar wisata, membuka jejaring pariwisata internasional, dan memperkuat ekonomi UMKM desa tanpa merusak alam maupun norma budaya lokal.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-50 transition">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                        Inisiator
                      </span>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                        Platform Digital tetebatu.com
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Mempelopori digitalisasi promosi desa agar wisatawan dapat memesan layanan langsung dari masyarakat lokal tanpa terpotong calo luar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote box */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white border-l-4 border-amber-400 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                  <MessageSquareQuote className="w-4 h-4" />
                  Komitmen Pribadi
                </div>
                <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed">
                  &ldquo;Bagi saya, jabatan kepala desa adalah amanah pengabdian untuk melayani, bukan untuk dilayani. Kemajuan desa lahir saat pemimpin hadir langsung mendengar warga di gubuk sawah dan sudut-sudut dusun.&rdquo;
                </p>
                <div className="text-right text-xs text-amber-300 font-bold">
                  — Zaenul Padli (ZAPA)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISI & MISI */}
      <section
        id="visi-misi"
        className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-emerald-50/40 border-y border-slate-200/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">
              Arah & Tujuan Bersama
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Visi & Misi Pembangunan Tetebatu Selatan
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Fondasi kebijakan terukur untuk membawa kemajuan nyata, keadilan sosial, dan kemakmuran warga periode 2027–2035.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visi Besar (Full Card) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <Compass className="w-64 h-64 text-white" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Visi Utama
                </div>

                <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed text-emerald-50">
                  &ldquo;Mewujudkan Desa Tetebatu Selatan yang Mandiri, Religius, Sejahtera, dan Berdaya Saing melalui Penguatan Pertanian Rakyat, Pariwisata Berkelanjutan, dan Pelayanan Publik yang Transparan.&rdquo;
                </blockquote>
              </div>

              <div className="pt-8 border-t border-emerald-700/60 relative z-10 space-y-2">
                <div className="text-xs text-emerald-300 uppercase tracking-widest font-semibold">
                  Tiga Nilai Penggerak
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold">
                  <span className="bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-600/40">
                    🌾 Kedaulatan Warga
                  </span>
                  <span className="bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-600/40">
                    ⚖️ Keadilan Antar Dusun
                  </span>
                  <span className="bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-600/40">
                    📱 Keterbukaan Anggaran
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Misi Strategis */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Reformasi Birokrasi Melayani
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Menghadirkan pelayanan kantor desa yang ramah, cepat, bebas pungutan liar, dan menerapkan sistem pelayanan jemput bola untuk lansia.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Kemakmuran Petani & Irigasi
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Menjamin pasokan pupuk bersubsidi, revitalisasi jaringan air irigasi, dan membuka akses pemasaran hasil bumi pertanian desa.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Pemberdayaan Pemuda & Wisata
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Mendorong pemuda dusun menjadi motor penggerak ekonomi wisata ramah lingkungan dan pelaku ekonomi kreatif digital.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Pemerataan Fasilitas Antar-Dusun
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pembangunan jalan usaha tani, penerangan lingkungan, dan air bersih merata tanpa ada dusun yang dianak-tirikan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 5 PILAR PROGRAM UNGGULAN (PANCA KRIDA ZAPA) */}
      <section id="program" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Panca Krida ZAPA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              5 Pilar Program Kerja Prioritas
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Program konkret yang langsung menjawab kebutuhan harian warga di setiap dusun Tetebatu Selatan.
            </p>
          </div>

          {/* Interactive Tab Selector on Mobile/Desktop */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {PROGRAM_PILAR.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    activeTab === idx
                      ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-102"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>Pilar {item.nomor}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pilar Detail Showcase */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800/40 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-3xl shadow-lg">
                  {PROGRAM_PILAR[activeTab].nomor}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  Pilar Unggulan ZAPA
                </div>
                <h3 className="text-2xl font-black text-white leading-snug">
                  {PROGRAM_PILAR[activeTab].judul}
                </h3>
              </div>

              <div className="md:col-span-8 space-y-6 md:border-l md:border-emerald-800/60 md:pl-8">
                <p className="text-base sm:text-lg text-emerald-100 leading-relaxed font-normal">
                  {PROGRAM_PILAR[activeTab].ringkasan}
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Rencana Implementasi Nyata:
                  </div>
                  {PROGRAM_PILAR[activeTab].poin.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm text-slate-200">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href="#aspirasi"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm transition shadow"
                  >
                    <span>Beri Masukan untuk Pilar Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FORM INTERAKTIF: SUARA & ASPIRASI WARGA */}
      <section
        id="aspirasi"
        className="py-20 sm:py-24 bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white border-t border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">
              Kanal Terbuka Warga
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sampaikan Aspirasi & Doa Restu Anda
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Setiap saran, keluhan, dan harapan warga Tetebatu Selatan sangat berharga untuk diselaraskan ke dalam rancangan kerja Bapak Zaenul Padli.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Terima Kasih, Aspirasi Anda Telah Tercatat!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm">
                    Pesan dan harapan Anda telah masuk ke papan suara warga dan akan kami sampaikan langsung ke Bapak Zaenul Padli.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-full text-sm shadow transition"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Kirimkan Juga ke WhatsApp Tim</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setPesan("");
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-full text-slate-600 hover:text-slate-900 font-semibold text-sm transition"
                    >
                      Tulis Aspirasi Lainnya
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitAspirasi} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Nama Lengkap / Inisial *
                      </label>
                      <input
                        type="text"
                        required
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Contoh: Amaq Sukri"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm transition"
                      />
                    </div>

                    {/* Dusun */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Asal Dusun *
                      </label>
                      <select
                        value={dusun}
                        onChange={(e) => setDusun(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white transition"
                      >
                        <option value="Dusun Lekong Pituk">Dusun Lekong Pituk</option>
                        <option value="Dusun Orong Gerisak">Dusun Orong Gerisak</option>
                        <option value="Dusun Tetebatu Selatan">Dusun Tetebatu Selatan</option>
                        <option value="Dusun Lainnya (Tetebatu Selatan)">Dusun Lainnya</option>
                        <option value="Warga Perantauan Tetebatu Selatan">Warga Perantauan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Kategori Aspirasi */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Kategori Program
                      </label>
                      <select
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white transition"
                      >
                        <option value="Pertanian & Irigasi">Pertanian & Irigasi Sawah</option>
                        <option value="Jalan & Air Bersih">Jalan Dusun & Air Bersih</option>
                        <option value="Pelayanan & KTP Desa">Pelayanan Kantor & Transparansi</option>
                        <option value="Pemuda & Lapangan Kerja">Pemuda & Lapangan Kerja</option>
                        <option value="Kesehatan & Bansos">Kesehatan & Bantuan Sosial</option>
                        <option value="Doa Restu & Dukungan">Doa Restu & Dukungan</option>
                      </select>
                    </div>

                    {/* Nomor WA (Opsional) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Nomor WhatsApp (Opsional)
                      </label>
                      <input
                        type="tel"
                        value={noWa}
                        onChange={(e) => setNoWa(e.target.value)}
                        placeholder="0812xxxx (Untuk info tindak lanjut)"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm transition"
                      />
                    </div>
                  </div>

                  {/* Isi Pesan */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Aspirasi, Masukan, atau Harapan Anda *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      placeholder="Tuliskan harapan atau persoalan di dusun Anda yang perlu diperbaiki..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm transition"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim ke Papan Aspirasi</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-3.5 px-6 rounded-xl border border-emerald-300 transition"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Kirim Langsung via WA</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Aspirations Feed Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <span>Suara Warga Masuk ({aspirasiList.length})</span>
                </h3>
                <span className="text-xs text-slate-500">Live Update</span>
              </div>

              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {aspirasiList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 hover:border-emerald-300 transition"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900">
                        {item.nama}
                      </span>
                      <span className="text-slate-500">{item.tanggal}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                        {item.dusun}
                      </span>
                      <span className="text-slate-500 font-medium">
                        • {item.kategori}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      &ldquo;{item.pesan}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AJAK KELUARGA & KERABAT (VIRAL SHARE SECTION) */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            Mari Satukan Niat & Langkah
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Ajak Keluarga & Tetangga Bersama ZAPA
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto">
            Satu suara dan satu ikhtiar Anda sangat menentukan masa depan arah pembangunan dan kesejahteraan anak cucu di Desa Tetebatu Selatan.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleShareApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 py-4 rounded-full shadow-xl transition transform hover:scale-102 text-base"
            >
              <Share2 className="w-5 h-5" />
              <span>Bagikan Portal Ini ke Grup WhatsApp</span>
            </button>
            <a
              href="https://wa.me/6283846342361?text=Halo%20Tim%20ZAPA,%20saya%20ingin%20bergabung%20sebagai%20relawan%20pendukung%20Pilkades%20Tetebatu%20Selatan"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-7 py-4 rounded-full border border-emerald-600/60 transition text-base"
            >
              <Users className="w-5 h-5 text-amber-300" />
              <span>Gabung Relawan Sahabat ZAPA</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. GALERI DOKUMENTASI KEGIATAN */}
      <section id="galeri" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Dokumentasi & Kiprah
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Aktivitas Nyata di Tengah Masyarakat
            </h2>
            <p className="text-base text-slate-600">
              Jejak dedikasi dalam memajukan potensi desa wisata, kebersamaan dengan warga, serta mempromosikan Tetebatu ke kancah luar daerah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition group">
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/images/zaenul-padli-bbtf.jpg"
                  alt="Bali Beyond Travel Fair ZAPA"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2 bg-white">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  Pariwisata & Jaringan Luar
                </span>
                <h4 className="font-bold text-slate-900 text-base">
                  Membawa Tetebatu ke Tingkat Nasional & Dunia
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Aktif menjalin kemitraan dengan asosiasi travel dan buyer luar negeri untuk memastikan homestay dan pemandu lokal mendapat kunjungan wisatawan berkelanjutan.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition group">
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/images/tetebatu-landscape.webp"
                  alt="Lanskap Tetebatu Selatan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2 bg-white">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  Pertanian & Alam
                </span>
                <h4 className="font-bold text-slate-900 text-base">
                  Pelestarian Mata Air & Jalur Irigasi
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Komitmen menjaga kelestarian hulu air pegunungan agar debit air sawah petani Tetebatu Selatan tetap melimpah sepanjang musim.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition group">
              <div className="relative h-60 w-full overflow-hidden bg-emerald-950 flex items-center justify-center p-6 text-center">
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto font-black text-xl shadow-lg">
                    ZAPA
                  </div>
                  <h4 className="font-black text-white text-lg">
                    Bersih • Amanah • Merakyat
                  </h4>
                  <p className="text-xs text-emerald-200">
                    Mewakafkan tenaga dan pikiran seutuhnya untuk kemaslahatan masyarakat Desa Tetebatu Selatan periode 2027–2035.
                  </p>
                </div>
              </div>
              <div className="p-5 space-y-2 bg-white">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Gerakan Perubahan
                </span>
                <h4 className="font-bold text-slate-900 text-base">
                  Gotong Royong Seluruh Elemen Dusun
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menyatukan tokoh agama, sesepuh adat, pemuda, dan kelompok tani demi desa yang adil dan rukun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER & POSKO PEMENANGAN */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Brand column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
                  ZAPA
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    ZAENUL PADLI
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold">
                    Calon Kepala Desa Tetebatu Selatan 2027–2035
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Portal resmi sosialisasi, visi-misi, serta penerimaan aspirasi masyarakat menuju Pemilihan Kepala Desa Tetebatu Selatan yang damai, bermartabat, dan demokratis.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Navigasi Cepat
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#profil" className="hover:text-amber-400 transition">
                    Tentang Zaenul Padli
                  </a>
                </li>
                <li>
                  <a href="#visi-misi" className="hover:text-amber-400 transition">
                    Visi & 4 Misi Strategis
                  </a>
                </li>
                <li>
                  <a href="#program" className="hover:text-amber-400 transition">
                    Panca Krida 5 Pilar
                  </a>
                </li>
                <li>
                  <a href="#aspirasi" className="hover:text-amber-400 transition">
                    Sampaikan Suara Warga
                  </a>
                </li>
                <li>
                  <a href="#galeri" className="hover:text-amber-400 transition">
                    Dokumentasi Lapangan
                  </a>
                </li>
              </ul>
            </div>

            {/* Posko & Kontak */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Posko Sahabat ZAPA
              </h4>
              <div className="space-y-2.5 text-sm text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                  <span>
                    Dusun Orong Gerisak / Lekong Pituk, Desa Tetebatu Selatan, Kec. Sikur, Kab. Lombok Timur, NTB.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp: +62 838-4634-2361</span>
                </div>
                <div className="pt-2">
                  <a
                    href="https://wa.me/6283846342361?text=Halo%20Bapak%20Zaenul%20Padli%20(ZAPA),%20saya%20ingin%20bersilaturahmi%20dan%20menyampaikan%20aspirasi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg text-xs transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Hubungi Posko via WA</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Tim Sahabat ZAPA (Zaenul Padli). Semua Hak Dilindungi.</p>
            <p>Terhubung ke ekosistem terpadu tetebatu.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
