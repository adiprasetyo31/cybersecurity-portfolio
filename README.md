# Adi Prasetyo · Cybersecurity Portfolio

Portofolio web berbasis **Astro 6**, dengan globe 3D **Three.js**, smooth scroll **Lenis**, dan animasi scroll **GSAP**. Desainnya sama dengan canvas yang sudah difinalkan.

---

## Daftar isi

1. [Persiapan alat](#1-persiapan-alat)
2. [Buka project di VS Code](#2-buka-project-di-vs-code)
3. [Install dan jalankan](#3-install-dan-jalankan)
4. [Kenali struktur folder](#4-kenali-struktur-folder)
5. [Lengkapi yang masih kosong](#5-lengkapi-yang-masih-kosong)
6. [Cara update konten tiap bulan](#6-cara-update-konten-tiap-bulan)
7. [Kustomisasi tampilan](#7-kustomisasi-tampilan)
8. [Upload ke GitHub](#8-upload-ke-github)
9. [Deploy ke Vercel (gratis)](#9-deploy-ke-vercel-gratis)
10. [Checklist sebelum dibagikan](#10-checklist-sebelum-dibagikan)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Persiapan alat

Install tiga hal ini kalau belum ada:

| Alat | Kegunaan | Cek di terminal |
|---|---|---|
| **Node.js 22 LTS** atau lebih baru | Menjalankan Astro | `node -v` (harus v22 ke atas) |
| **Git** | Versioning dan upload ke GitHub | `git --version` |
| **VS Code** | Editor | - |

Extension VS Code yang disarankan:
- **Astro** (astro-build.astro-vscode): syntax highlight dan autocomplete file `.astro`
- **Prettier**: merapikan kode otomatis

> Kalau `node -v` masih v18 atau v20, download versi LTS terbaru di nodejs.org. Astro 6 butuh Node 22.

---

## 2. Buka project di VS Code

1. Extract `cyber-portfolio.zip` ke folder kerja kamu, misal `D:\Projects\cyber-portfolio`.
2. Buka VS Code, pilih **File > Open Folder**, lalu pilih folder `cyber-portfolio`.
3. Buka terminal di VS Code: **Terminal > New Terminal** (atau `` Ctrl + ` ``).

---

## 3. Install dan jalankan

Jalankan di terminal VS Code:

```bash
npm install
npm run dev
```

Buka **http://localhost:4321** di browser. Setiap kali kamu menyimpan file, halaman otomatis refresh.

Perintah lain yang berguna:

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server lokal untuk development |
| `npm run build` | Build versi final ke folder `dist/` |
| `npm run preview` | Lihat hasil build sebelum deploy |

Untuk menghentikan server, tekan `Ctrl + C` di terminal.

---

## 4. Kenali struktur folder

```
cyber-portfolio/
├── public/                     File statis, disajikan apa adanya
│   ├── favicon.svg
│   ├── reports/                4 lab report PDF
│   └── resume/                 (buat folder ini) taruh CV PDF di sini
├── src/
│   ├── content/work/           Case study, 1 file Markdown per project
│   ├── data/                   Data section lain dalam JSON
│   │   ├── reports.json        Daftar lab report
│   │   ├── credentials.json    Sertifikat dan learning path
│   │   ├── rooms.json          Room TryHackMe per topik
│   │   ├── log.json            Learning log bulanan
│   │   ├── toolkit.json        Tools dan framework
│   │   └── roles.json          Kartu "Skills to roles"
│   ├── components/             Satu file per section halaman
│   ├── layouts/Base.astro      <head>, font, SEO
│   ├── scripts/
│   │   ├── globe.ts            Scene Three.js
│   │   └── motion.ts           Smooth scroll dan animasi reveal
│   ├── styles/global.css       Design token (warna, spacing, font)
│   ├── content.config.ts       Skema data (validasi otomatis)
│   └── pages/index.astro       Halaman utama, merangkai semua section
└── astro.config.mjs
```

**Prinsipnya:** konten ada di `src/content` dan `src/data`, tampilan ada di `src/components`. Untuk update isi, kamu hampir tidak perlu menyentuh komponen.

---

## 5. Lengkapi yang masih kosong

### 5a. CV / resume
1. Buat folder `public/resume/`.
2. Simpan CV dengan nama persis `Adi_Prasetyo_CV.pdf`.

Tombol **Download resume** di hero sudah mengarah ke `/resume/Adi_Prasetyo_CV.pdf`.

### 5b. Baca ulang lab report
Empat PDF di `public/reports/` disusun dari pekerjaan di room TryHackMe. Baca sekali, pastikan setiap langkah di bagian **Method** memang kamu kerjakan. Kalau ada yang perlu diubah, ganti file PDF-nya dengan nama yang sama.

---

## 6. Cara update konten tiap bulan

Artikel TryHackMe menyarankan portofolio diperbarui rutin. Ini cara melakukannya.

### Tambah case study baru
Buat file baru di `src/content/work/`, misal `06-nama-project.md`:

```md
---
order: 6
title: "Judul case study"
tags: ["SOC Analyst", "TryHackMe"]
meta: "Nama Room · Dec 2026"
problem: "Masalah yang dihadapi."
action: "Apa yang kamu lakukan, tools apa yang dipakai."
outcome: "Hasilnya. Jangan tulis flag atau jawaban room."
tools: ["Splunk", "Sysmon"]
links:
  - { label: "Read report (PDF)", href: "/reports/Nama_Report_AdiPrasetyo.pdf" }
---
```

- `order` menentukan urutan tampil.
- Field opsional `metrics` untuk strip angka (lihat contoh di `01-password-classifier.md`).
- Untuk kartu "Up next", pakai `status: upnext` plus `summary` dan `phase` (lihat `05-soc-home-lab.md`).

Kalau ada field yang salah ketik atau hilang, terminal akan menampilkan error yang jelas. Itu fungsi skema di `content.config.ts`.

### Tambah lab report
1. Taruh PDF di `public/reports/`.
2. Tambah satu baris di `src/data/reports.json`:
   ```json
   { "id": "unik", "file": "Nama_File.pdf", "role": "SOC Analyst", "date": "Dec 2026", "href": "/reports/Nama_File.pdf" }
   ```

### Update progres
- **Persentase SOC L1:** `src/data/credentials.json` dan teks "Now" di `src/components/StatusStrip.astro`.
- **Room baru selesai:** `src/data/rooms.json`. Hapus "(in progress)" dari Phishing Prevention setelah selesai.
- **Learning log:** tambah entri paling atas di `src/data/log.json`.
- **Tanggal update:** `src/components/Footer.astro`.

Setiap selesai update, cukup `git push` (langkah 8) dan Vercel akan deploy otomatis.

---

## 7. Kustomisasi tampilan

Semua warna, spacing, dan font ada di `src/styles/global.css`, bagian `:root`.

- **Ganti warna aksen:** ubah `--accent`. Pilihan dari canvas: `#c2f25e` (lime), `#8fb8ff` (biru), `#ffb547` (amber). Globe ikut berubah otomatis. Kalau ganti, sesuaikan juga warna rgba di animasi pulse pada `Hero.astro`.
- **Spacing** memakai grid 8px (`--s-1` sampai `--s-10`). Pakai token ini supaya jarak tetap konsisten.
- **Globe:** atur titik kota dan garis di `NODES` dan `ARC_TARGETS` pada `src/scripts/globe.ts`.
- **Kecepatan smooth scroll:** nilai `lerp` di `src/scripts/motion.ts` (lebih kecil = lebih halus dan lambat).

Pengguna yang mengaktifkan "reduce motion" di sistemnya otomatis mendapat versi tanpa animasi.

---

## 8. Upload ke GitHub

1. Buat repo baru di github.com, misal `cyber-portfolio` (public). Jangan centang "Add README".
2. Di terminal VS Code:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/adiprasetyo31/cyber-portfolio.git
git push -u origin main
```

Update berikutnya cukup:

```bash
git add .
git commit -m "Update: SOC L1 50%, new report"
git push
```

---

## 9. Deploy ke Vercel (gratis)

1. Buka vercel.com, login dengan akun GitHub.
2. Klik **Add New > Project**, pilih repo `cyber-portfolio`, klik **Import**.
3. Vercel mendeteksi Astro otomatis. Biarkan pengaturan default, klik **Deploy**.
4. Setelah 1 sampai 2 menit, situs live di alamat seperti `cyber-portfolio-xxx.vercel.app`.
5. Ganti nama domain di **Settings > Domains**, misal `adiprasetyo.vercel.app`.
6. Buka `astro.config.mjs`, ganti `site: 'https://example.com'` dengan domain final kamu, lalu push lagi. Ini dipakai untuk canonical URL dan SEO.

Mulai sekarang, setiap `git push` ke `main` otomatis memicu deploy baru.

> Alternatif: Netlify atau Cloudflare Pages juga bisa dengan langkah yang hampir sama. Build command `npm run build`, output folder `dist`.

---

## 10. Checklist sebelum dibagikan

- [ ] CV sudah ada di `public/resume/Adi_Prasetyo_CV.pdf`
- [ ] Empat lab report sudah dibaca ulang dan akurat
- [ ] Semua link di Contact bisa dibuka (email, LinkedIn, GitHub, TryHackMe)
- [ ] Repo skripsi di GitHub sudah public dan punya README
- [ ] Dicek di HP: semua section terbaca, tidak ada scroll ke samping
- [ ] `site` di `astro.config.mjs` sudah diganti domain asli
- [ ] Link portofolio sudah ditaruh di LinkedIn (Featured) dan CV

---

## 11. Troubleshooting

| Masalah | Solusi |
|---|---|
| `npm install` error soal versi Node | Upgrade ke Node 22 LTS, tutup dan buka ulang VS Code |
| Halaman blank setelah edit Markdown | Lihat terminal. Biasanya field wajib hilang atau format YAML salah (cek tanda kutip) |
| Globe tidak muncul | Browser memblokir WebGL. Coba browser lain atau aktifkan hardware acceleration |
| Port 4321 sudah dipakai | Jalankan `npm run dev -- --port 3000` |
| Perubahan tidak muncul di Vercel | Pastikan sudah `git push`, cek tab **Deployments** di Vercel |
