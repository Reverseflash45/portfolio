import Kepala from "@/components/atlas/Kepala";
import Atlas from "@/components/atlas/Atlas";
import Karya from "@/components/atlas/Karya";
import Tentang from "@/components/atlas/Tentang";
import Kontak from "@/components/atlas/Kontak";

export default function Home() {
  return (
    <>
      <Kepala />
      <main>
        {/* Peta lebih dulu: karyanya sendiri yang memperkenalkan, bukan kalimat tentang karya. */}
        <Atlas />
        <Karya />
        <Tentang />
        <Kontak />
      </main>
    </>
  );
}
