import Navbar from "@/components/Navbar";
import GlowBackground from "@/components/ui/GlowBackground";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Methodology from "@/components/Methodology";
import About from "@/components/About";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-deep-black overflow-hidden font-sans">
      {/* Premium ambient glows & grid lines */}
      <GlowBackground />

      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Tech Stack Marquee */}
      <TechStack />

      {/* Services Cards */}
      <Services />

      {/* Case Studies & Github Projects */}
      <Projects />

      {/* Methodology timeline */}
      <Methodology />

      {/* About Developer profile */}
      <About />

      {/* GitHub detailed stats */}
      <GitHubStats />

      {/* Contact & WhatsApp Floating button */}
      <Contact />
    </main>
  );
}
