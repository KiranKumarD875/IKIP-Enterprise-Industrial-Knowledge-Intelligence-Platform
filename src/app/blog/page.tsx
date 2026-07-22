import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BlogList from "@/components/sections/blog-list";

export const metadata = {
  title: "Blog",
  description: "Industrial AI insights, product updates, and engineering deep-dives from the IKIP team.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogList />
      </main>
      <Footer />
    </>
  );
}