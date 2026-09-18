import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import Starfield from "@/components/Starfield";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import PortfolioTabs from "@/components/PortfolioTabs";
import EduExp from "@/components/EduExp";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Loader />
      <Starfield />
      <Cursor />
      <ScrollProgress />
      <Nav />
      {/* Urutan bagian harus sama dengan urutan tautan di Nav.tsx.
          Karya ditaruh sebelum pendidikan: itu yang paling ingin dilihat
          pengunjung, dan pendidikan menjadi pendukungnya. */}
      <Hero />
      <About />
      <Stats />
      <PortfolioTabs />
      <EduExp />
      <Gallery />
      <Contact />
    </main>
  );
}
