
import AboutSection from "@/components/about";
import BusinessListPage from "@/components/BusinessListPage";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
//import ServicesSection from "@/components/ServicesSection";
import TestimonialsCarousel from "@/components/testimonials";


export default function Home() {
 
  return (
    <div className="mt-20">
      <div className="grid-background md:grid-background">

      </div>
      <Header />
      <Hero />
      <CategorySection />
      <BusinessListPage />
      <AboutSection />
      <TestimonialsCarousel />
      <Footer />
    </div>
  );
}
