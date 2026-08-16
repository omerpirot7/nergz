import { BackToTop } from "@/components/back-to-top";
import { DocumentMeta } from "@/components/document-meta";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Partners } from "@/components/partners";
import { Showcase } from "@/components/showcase";
import { Stats } from "@/components/stats";

export default function HomePage() {
  return (
    <>
      <DocumentMeta />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Showcase />
        <Partners />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
