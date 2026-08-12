import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, Reveal, CTASection } from "../components/kit";
import { SEO } from "../components/SEO";
import { INDUSTRIES } from "../data/industries";

export default function Industries() {
  return (
    <>
      <SEO
        title="Industries — CRM Tailored to How Your Sector Sells"
        description="Sales IQ adapts to 20 industries — manufacturing, distribution, healthcare, financial services, GovCon and more — with tailored pipelines, objects and AI use cases."
      />
      <PageHero
        overline="Industries · 20 Sectors"
        title={<>Every industry sells<br /><span className="text-stroke">differently.</span></>}
        sub="Sales IQ adapts to your sales processes, business objects and compliance reality. Explore how the platform fits your sector — problems, AI use cases and outcomes included."
      />
      <section className="container-x py-20 md:py-28" data-testid="industries-grid">
        <div className="grid md:grid-cols-2 gap-px bg-black/[0.07] border border-black/[0.07]">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 2) * 0.06} className="bg-[#FAFAF9]">
              <Link
                to={`/industries/${ind.slug}`}
                data-testid={`industry-card-${ind.slug}`}
                className="group flex items-start justify-between gap-6 p-8 md:p-10 h-full hover:bg-[#FFFFFF] transition-colors duration-300"
              >
                <div>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono2 text-[11px] text-[#E04006] tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-[#1C1917] tracking-[-0.02em] group-hover:text-[#1C1917]">
                      {ind.name}
                    </h2>
                  </div>
                  <p className="text-[#57534E] text-sm leading-relaxed pl-9">{ind.headline}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#57534E] shrink-0 mt-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#1C1917]" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
