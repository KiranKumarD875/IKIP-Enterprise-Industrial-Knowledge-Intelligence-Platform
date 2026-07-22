import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactSection from "@/components/sections/contact-section";

export const metadata = {
  title: "Contact",
  description: "Book a demo or talk to our team about how IKIP can transform your plant's knowledge operations.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}