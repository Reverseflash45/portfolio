import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import Starfield from "@/components/Starfield";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
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
      <About />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}
