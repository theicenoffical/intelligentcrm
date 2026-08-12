import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Reveal, CTASection } from "../components/kit";
import { SEO } from "../components/SEO";
import { PERSONAS, PERSONA_GROUPS } from "../data/personas";

export default function Solutions() {
  const [group, setGroup] = useState("All");
  const filtered = group === "All" ? PERSONAS : PERSONAS.filter((p) => p.group === group);

  return (
    <>
      <SEO
        title="Solutions by Role — CRM Value for Every Seat at the Table"
        description="From CEO to SDR, IT to Compliance — see what Sales IQ delivers for every role in your revenue organization, with unlimited users for all of them."
      />
      <PageHero
        overline="Solutions · By Role"
        title={<>Built for every seat<br /><span className="text-stroke">at the revenue table.</span></>}
        sub="Seventeen roles, one shared system of record. Because Sales IQ has no per-user pricing, every persona below actually gets access — not just the ones finance approved."
      />
      <section className="container-x py-20 md:py-28" data-testid="personas-section">
        <div className="flex flex-wrap gap-2 mb-14" data-testid="persona-filter">
          {PERSONA_GROUPS.map((g) => (
            <button
              key={g}
              data-testid={`persona-filter-${g.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setGroup(g)}
              className={`font-mono2 text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-[color,border-color,background-color] duration-200 ${
                group === g ? "border-white bg-white text-black" : "border-white/15 text-[#8F8F9D] hover:text-white hover:border-white/30"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link
                to={`/solutions/${p.slug}`}
                data-testid={`persona-card-${p.slug}`}
                className="group surface-card rounded-md p-8 block h-full hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#FF3333]">{p.group}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8F8F9D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#F2F2F2] tracking-[-0.02em]">{p.name}</h2>
                <p className="text-[#8F8F9D] text-sm mt-3 leading-relaxed">{p.headline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
