import { useState } from "react";
import { PageHero, Reveal, SectionTag, SectionTitle, CTASection, FAQ } from "../components/kit";
import { SEO } from "../components/SEO";
import { AI_FEATURES, AI_CATEGORIES } from "../data/features";

const FAQ_ITEMS = [
  { q: "Is AI included in the platform or sold separately?", a: "Built in. Lead scoring, summaries, forecast insights, drafting and automation are platform capabilities — not a premium add-on tier." },
  { q: "Does the AI act autonomously?", a: "AI assists your team by default. Where automation executes actions — task creation, routing, drafting — it runs under rules you define, with human oversight always available." },
  { q: "Where does our data go when AI features run?", a: "AI capabilities are designed to operate within your deployment model. Your governance team defines the boundaries — one of the reasons enterprises choose customer-controlled deployment." },
  { q: "Can we build our own AI workflows?", a: "Yes. Custom AI Workflows let your ops team compose AI steps — qualification gates, enrichment, routing, drafting — into the process you already run." },
];

export default function Features() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? AI_FEATURES : AI_FEATURES.filter((f) => f.category === cat);

  return (
    <>
      <SEO
        title="AI Features — 20 Capabilities Built Into the CRM"
        description="Lead scoring, opportunity insights, meeting summaries, forecast assistance, proposal generation and more — AI integrated across the Sales IQ enterprise CRM."
      />
      <PageHero
        overline="Features · AI Capabilities"
        title={<>AI across the entire<br /><span className="text-stroke">sales lifecycle.</span></>}
        sub="Twenty capabilities that handle the research, the paperwork and the pattern recognition — so your people can handle the relationships and the judgment."
      />

      <section className="border-b border-black/[0.07]" data-testid="features-grid-section">
        <div className="container-x py-20 md:py-28">
          <div className="flex flex-wrap gap-2 mb-14" data-testid="features-filter">
            {AI_CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`filter-${c.toLowerCase()}`}
                onClick={() => setCat(c)}
                className={`font-mono2 text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-[color,border-color,background-color] duration-200 ${
                  cat === c ? "border-[#E04006] bg-[#E04006] text-white" : "border-black/[0.15] text-[#57534E] hover:text-[#1C1917] hover:border-black/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((f, i) => (
              <Reveal key={f.slug} delay={(i % 3) * 0.06}>
                <div className="surface-card rounded-md p-8 h-full flex flex-col hover:border-black/20 transition-colors duration-300" data-testid={`feature-card-${f.slug}`}>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#E04006]">{f.category}</span>
                    <span className="font-mono2 text-[10px] text-[#57534E]/60">{String(AI_FEATURES.indexOf(f) + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1C1917] tracking-[-0.01em]">{f.name}</h3>
                  <p className="text-[#57534E] text-sm mt-3 leading-relaxed">{f.desc}</p>
                  <p className="text-[#57534E]/70 text-xs mt-4 pt-4 border-t border-black/[0.07] leading-relaxed mt-auto">{f.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/[0.07] bg-[#FFFFFF]">
        <div className="container-x py-24 md:py-32 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§02">Principles</SectionTag>
            <SectionTitle>Assistive by default.<br />Autonomous only by choice.</SectionTitle>
            <p className="text-[#57534E] text-sm md:text-base mt-6 max-w-md leading-relaxed">
              Sales IQ's AI supports sales teams rather than replacing them. Automation is always optional,
              always governed, and always transparent about what it did and why.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={FAQ_ITEMS} testid="features-faq" />
          </Reveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
