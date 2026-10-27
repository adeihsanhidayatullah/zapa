# ZAPA - Zaenul Padli Official Web Service
### Calon Kepala Desa Tetebatu Selatan (Periode 2027–2035)

Portal web profil, visi-misi, 5 pilar program prioritas (Panca Krida ZAPA), dan kanal interaktif aspirasi warga untuk pencalonan Bapak Zaenul Padli (ZAPA) pada Pemilihan Kepala Desa (Pilkades) Tetebatu Selatan, Kecamatan Sikur, Kabupaten Lombok Timur.

---

## 🛠️ Tech Stack & Fitur
* **Framework**: Next.js 16 (App Router + React 19 + TypeScript)
* **Styling**: Tailwind CSS (Desain bersahaja, emerald-gold palette, mobile-first)
* **Komponen Interaktif**: 
  * Formulir Suara & Aspirasi Warga dengan integrasi WhatsApp langsung
  * Efek perayaan dukungan (Canvas Confetti)
  * Kartu Bagikan Cepat ke WhatsApp Keluarga/Tetangga
  * Tab 5 Pilar Program Nyata & Rekam Jejak Lapangan (BBTF, Pokdarwis, Dusun Lekong Pituk)
* **Infrastruktur**: Docker Container (Standalone multi-stage build) + Traefik Reverse Proxy (SSL Otomatis Let's Encrypt)

---

## 🚀 Menjalankan Secara Lokal

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan dev server**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

3. **Uji Coba dengan Docker (Port 1919)**:
   ```bash
   docker compose up --build
   ```
   Buka [http://localhost:1919](http://localhost:1919) di browser.

---

## 🌐 Panduan Deployment di VM Produksi (Bersama tetebatu.com)

Service ini dikonfigurasi untuk berjalan di VM yang sama dengan `tetebatu.com` dan `pilkades.tetebatu.com` menggunakan reverse proxy Traefik pada port **1919**.

### 1. Masuk ke VM dan Clone/Pull Repositori
```bash
cd /path/to/deployments
git clone https://github.com/adeihsanhidayatullah/zapa.git
# atau jika sudah ada:
cd zapa && git pull origin main
```

### 2. Konfigurasi Environment (Opsional)
Salin `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Default konfigurasi:
* Domain: `zapa.tetebatu.com`
* Port internal: `1919`
* Traefik Network: `n8n-docker_default`
* Cert Resolver: `mytlschallenge`

### 3. Jalankan Kontainer Produksi
```bash
docker compose -f docker-compose-prod.yml up -d --build
```

### 4. Verifikasi Status
```bash
docker logs -f zapa-candidate-web
```
Akses di browser: **`https://zapa.tetebatu.com`**
Traefik akan otomatis menerbitkan sertifikat SSL Let's Encrypt dan mengarahkan lalu lintas HTTPS ke port 1919 kontainer Next.js.
