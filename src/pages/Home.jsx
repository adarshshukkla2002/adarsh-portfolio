import PageTransition from "@/components/effects/PageTransition";
import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import AdjudicationDesk from "@/components/sections/AdjudicationDesk";
import CasesPreview from "@/components/sections/CasesPreview";
import SkillsGrid from "@/components/sections/SkillsGrid";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Metrics />
      <MarqueeStrip />
      <AdjudicationDesk />
      <CasesPreview />
      <SkillsGrid />
      <ContactCTA />
    </PageTransition>
  );
}
