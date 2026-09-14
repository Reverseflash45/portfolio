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
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Loader />
      <Starfield />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Stats />
      <About />
      <PortfolioTabs />
      <EduExp />
      <Contact />
    </main>
  );
}
