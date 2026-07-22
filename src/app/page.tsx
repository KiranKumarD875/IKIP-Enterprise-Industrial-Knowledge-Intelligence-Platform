import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import LogoTicker from "@/components/sections/logo-ticker";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import CTA from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}