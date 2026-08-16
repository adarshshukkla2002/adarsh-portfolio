import { cases } from "@/data/cases";
import PageTransition from "@/components/effects/PageTransition";
import AdjudicationDesk from "@/components/sections/AdjudicationDesk";
import { CaseCard } from "@/components/sections/CasesPreview";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import GradientText from "@/components/ui/GradientText";

export default function Work() {
  return (
    <PageTransition>
      <section className="section pt-40 pb-0">
        <div className="shell">
          <Reveal>
            <span className="label">Casework</span>
            <h1 className="mt-6 max-w-4xl text-display">
              Four files, and the <GradientText>reasoning behind each</GradientText>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed">
              These are the categories the desk sees most: hedging abuse, document
              integrity, arbitrage exploitation, and gambling-style trading. Each
              file records what happened, what was ruled, and what the ruling set
              as precedent.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {cases.map((item, i) => (
              <CaseCard key={item.slug} item={item} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <AdjudicationDesk />
      <ContactCTA />
    </PageTransition>
  );
}
