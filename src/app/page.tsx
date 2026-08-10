import { HeroSection } from "@/components/home/HeroSection";
import { QualityPromiseStrip } from "@/components/home/QualityPromiseStrip";
import { OccasionGrid } from "@/components/home/OccasionGrid";
import { KidsHero } from "@/components/home/KidsHero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PersonalizationHero } from "@/components/home/PersonalizationHero";
import { GermanteesStandard } from "@/components/home/GermanteesStandard";
import { QualityProof } from "@/components/home/QualityProof";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QualityPromiseStrip />
      <OccasionGrid />
      <KidsHero />
      <FeaturedProducts />
      <PersonalizationHero />
      <GermanteesStandard />
      <QualityProof />
      <ReviewsSection />
      <FinalCTA />
    </>
  );
}
