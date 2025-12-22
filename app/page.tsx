import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import Configurator from "@/components/Configurator";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductCategories />
      <Configurator />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

