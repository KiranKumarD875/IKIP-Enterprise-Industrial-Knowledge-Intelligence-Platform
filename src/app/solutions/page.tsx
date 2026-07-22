import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SolutionsHero from "@/components/sections/solutions-hero";
import SolutionsPersonas from "@/components/sections/solutions-personas";
import SolutionsUseCases from "@/components/sections/solutions-use-cases";
import CTA from "@/components/sections/cta";

export const metadata = {
  title: "Solutions",
  description: "IKIP solutions for every industrial role — from Reliability Engineers to Compliance Auditors.",
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SolutionsHero />
        <SolutionsPersonas />
        <SolutionsUseCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}