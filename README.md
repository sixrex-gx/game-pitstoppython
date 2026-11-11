# Pit Stop Python

Game balap kuis Python. Jawab soal dengan benar, mobilmu maju 13 persen. Mobil AI maju 10 persen setiap soal, benar atau salah. Butuh 8 jawaban benar dari 10 soal untuk finis duluan.

Dibuat untuk tugas mata kuliah Digital Kreatif.

## Menjalankan

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Build statis

```bash
npm run build
npm run preview
```

Hasil build ada di folder `out/` dan bisa diunggah ke hosting statis mana pun. `npm run preview` memakai paket `serve` untuk membuka hasil build di http://localhost:4173.

## Struktur

| File | Isi |
| --- | --- |
| `app/page.tsx` | Layar utama, top bar, dan kontrol keyboard |
| `components/Track.tsx` | Lintasan dan dua mobil |
| `components/StartCard.tsx` | Layar aturan |
| `components/QuestionCard.tsx` | Soal, opsi, dan umpan balik |
| `components/ResultCard.tsx` | Hasil akhir dan daftar soal yang salah |
| `hooks/useGame.ts` | State game dan alur soal |
| `lib/questions.ts` | Bank 30 soal Python |
| `lib/game.ts` | Aturan main, pengacakan, dan posisi mobil |
| `lib/sfx.ts` | Efek suara WebAudio |

## Catatan

- 10 soal diambil acak tiap sesi: 5 mudah, 4 sedang, 1 sulit. Opsi jawaban juga diacak.
- Tombol suara bisa dimatikan. Preferensi tidak disimpan antar sesi.
