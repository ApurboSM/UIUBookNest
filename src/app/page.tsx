import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedBooks } from "@/components/home/featured-books";
import { BopisBanner } from "@/components/home/bopis-banner";
import { CoursesPreview } from "@/components/home/courses-preview";
import { HowItWorks } from "@/components/home/how-it-works";
import { TrustBadges } from "@/components/home/trust-badges";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedBooks />
      <BopisBanner />
      <CoursesPreview />
      <HowItWorks />
      <TrustBadges />
      <Newsletter />
    </>
  );
}
