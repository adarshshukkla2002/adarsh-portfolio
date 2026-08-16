/**
 * CASEWORK
 * -----------------------------------------------------------
 * Illustrative composites built from real violation categories.
 * No client, trader or account details are represented.
 * Each entry renders twice: as a card in the interactive desk,
 * and as a full case study page at /work/:slug
 */

export const verdictMeta = {
  breach: { label: "Breach", accent: "plasma", hex: "#FF2E88" },
  hold: { label: "Hold", accent: "ember", hex: "#FF7A29" },
  release: { label: "Release", accent: "volt", hex: "#C6F53C" },
};

export const RULING_OPTIONS = [
  { id: "release", label: "Release payout" },
  { id: "hold", label: "Hold & investigate" },
  { id: "breach", label: "Breach the account" },
];

export const cases = [
  {
    slug: "paired-accounts",
    ref: "CASE-01",
    category: "Hedging abuse",
    title: "Two names, one trader",
    severity: 92,
    verdict: "breach",
    tags: ["Identity linkage", "Hedging", "Payout screening"],
    summary:
      "Opposing positions across two registered identities, one device, one bank account — and a withdrawal filed against the winning half.",
    situation:
      "Two funded accounts under different registered names open opposing positions on the same currency pair within four seconds of one another, and close together. One side finishes up. A withdrawal request is filed against it.",
    signals: [
      "Device fingerprint identical across both accounts",
      "Payout destination resolves to the same bank account",
      "Entry timestamps cluster within a four-second window",
      "Position sizes inverse to within 2%",
    ],
    ruling: "breach",
    reasoning:
      "Matching device and payout destination across two identities makes this one trader running a hedge, not two traders taking opposite views. The profitable side is not a win — it is the surviving half of a structure built so the firm pays out either way. Both accounts breach, and the identity mismatch becomes a separate KYC finding rather than a footnote to this one.",
    precedent:
      "Account linkage is established on payout destination and device, not on name. Where linkage holds, both legs breach — including the losing leg, which would otherwise be quietly abandoned and re-opened.",
  },
  {
    slug: "mrz-checksum",
    ref: "CASE-02",
    category: "Document integrity",
    title: "The passport that almost passed",
    severity: 54,
    verdict: "hold",
    tags: ["Re-KYC", "Document forensics", "Trader retention"],
    summary:
      "Liveness passes, the photo matches, the name matches — and the machine-readable zone doesn't add up.",
    situation:
      "A passport submitted at Re-KYC carries a name and photo consistent with the original file, and liveness checks pass cleanly. But the machine-readable zone check digits fail to compute. The trader has eighteen months of clean activity and no prior flags.",
    signals: [
      "MRZ check digit mismatch on the document number line",
      "Liveness and face match both pass",
      "Eighteen months of activity with zero prior flags",
      "Document issued in a jurisdiction with a recent reissue programme",
    ],
    ruling: "hold",
    reasoning:
      "A failed MRZ checksum is evidence of a bad document, not a bad person. It also happens with poor scans, damaged pages and legitimate reissues. Breaching here burns a clean eighteen-month trader on an inference. The payout is held, an alternate government ID is requested through a second channel, and the response to that request decides the case — not the checksum on its own.",
    precedent:
      "A single document anomaly is a request for more evidence, never a finding in itself. Findings need either a second independent anomaly or a failure to produce an alternate document.",
  },
  {
    slug: "latency-arbitrage",
    ref: "CASE-03",
    category: "Arbitrage exploitation",
    title: "Ahead of the feed",
    severity: 97,
    verdict: "breach",
    tags: ["Latency arbitrage", "Execution analysis", "Pattern evidence"],
    summary:
      "Every trade inside risk limits. Ninety-one percent of profit earned in four minutes of total exposure.",
    situation:
      "Across thirty days, a trader's entries land 200–400ms ahead of the firm's price feed on high-impact news releases. Ninety-one percent of the account's profit is earned inside four minutes of cumulative market exposure. No individual trade breaches a risk limit.",
    signals: [
      "Consistent 200–400ms entry lead against the firm's feed",
      "Profit concentrated entirely in high-impact news windows",
      "Thirty-day consistency removes variance as an explanation",
      "Zero drawdown outside the news windows",
    ],
    ruling: "breach",
    reasoning:
      "Staying inside risk limits is not the test. The profit is not coming from a market view — it is coming from a gap between the firm's feed and the real one, which is the firm's infrastructure being harvested rather than traded against. This is the cleanest category of prohibited arbitrage there is, and thirty days of consistency removes luck as a competing explanation.",
    precedent:
      "Rule compliance at the trade level does not settle a method question. Where profit concentrates into infrastructure latency windows, the pattern is the evidence and no single trade needs to be defective.",
  },
  {
    slug: "single-event-pass",
    ref: "CASE-04",
    category: "Gambling-style trading",
    title: "The coin flip that landed",
    severity: 41,
    verdict: "hold",
    tags: ["Evaluation integrity", "Policy gap", "Risk profile"],
    summary:
      "No rule broken. No prior violation. And nothing here the firm can responsibly fund.",
    situation:
      "An account clears its evaluation target on a single position risking 8% of capital held through a non-farm payrolls release. No written rule was broken and there are no prior violations. The trader is now requesting funding.",
    signals: [
      "Target cleared on one position, one event",
      "8% single-trade risk, held through the release",
      "No written rule breached at any point",
      "No demonstrated strategy outside the event window",
    ],
    ruling: "hold",
    reasoning:
      "Nothing here is fraud, and treating it as fraud would be indefensible on appeal. But a target cleared on one binary event is not evidence of a strategy the firm can safely fund — it is a coin flip that landed. The account is held and restricted pending a demonstrated risk profile, and the case goes upward as a policy gap: the rulebook should address this and currently doesn't.",
    precedent:
      "Where an account exposes a gap rather than breaking a rule, the case produces a policy amendment as well as a ruling. Restriction is not punishment, and the file says so explicitly so the trader can be told the same.",
  },
];

export const getCaseBySlug = (slug) => cases.find((c) => c.slug === slug);
