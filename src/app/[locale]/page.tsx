import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
