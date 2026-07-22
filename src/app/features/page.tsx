import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FeaturesHero from "@/components/sections/features-hero";
import FeaturesDeep from "@/components/sections/features-deep";
import FeaturesCopilot from "@/components/sections/features-copilot";
import FeaturesCompliance from "@/components/sections/features-compliance";
import FeaturesPredictive from "@/components/sections/features-predictive";
import FeaturesIntegrations from "@/components/sections/features-integrations";
import CTA from "@/components/sections/cta";

export const metadata = {
  title: "Features",
  description:
    "Explore every capability of IKIP — from AI Copilot and Knowledge Graph to Predictive Maintenance and Compliance Intelligence.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeaturesHero />
        <FeaturesDeep />
        <FeaturesCopilot />
        <FeaturesCompliance />
        <FeaturesPredictive />
        <FeaturesIntegrations />
        <CTA />
      </main>
      <Footer />
    </>
  );
}