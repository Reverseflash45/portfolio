// Setiap gambar proyek di data.ts butuh versi 800px di public/projects/800/ (dipakai srcset kartu proyek).
// Buat dengan: python -c "from PIL import Image; ..." atau alat apa pun, lebar 800px, format webp.
import { existsSync, readFileSync } from "node:fs";

const data = readFileSync(new URL("../src/content/data.ts", import.meta.url), "utf8");
const gambar = [...data.matchAll(/image:\s*"\/projects\/([^"]+)"/g)].map((m) => m[1]);
const hilang = gambar.filter((g) => !existsSync(new URL(`../public/projects/800/${g}`, import.meta.url)));
if (hilang.length) {
  console.error(`Gambar proyek tanpa versi 800px di public/projects/800/: ${hilang.join(", ")}`);
  process.exit(1);
}
console.log(`cek-gambar: ${gambar.length} gambar proyek punya versi 800px`);
