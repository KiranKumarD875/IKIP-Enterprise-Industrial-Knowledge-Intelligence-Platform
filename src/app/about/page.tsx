import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AboutHero from "@/components/sections/about-hero";
import AboutMission from "@/components/sections/about-mission";
import AboutTeam from "@/components/sections/about-team";
import AboutValues from "@/components/sections/about-values";
import CTA from "@/components/sections/cta";

export const metadata = {
  title: "About",
  description: "The story and team behind IKIP — built by industrial engineers who lived the problem.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutTeam />
        <CTA />
      </main>
      <Footer />
    </>
  );
}