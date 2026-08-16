import Marquee from "@/components/ui/Marquee";

const TERMS = [
  "KYC integrity",
  "Hedging abuse",
  "Payout screening",
  "Document forensics",
  "Latency arbitrage",
  "Policy precedent",
];

export default function MarqueeStrip() {
  return (
    <section className="border-y border-white/8 bg-white/[0.02] py-8 backdrop-blur-sm">
      <Marquee items={TERMS} />
    </section>
  );
}
