import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import { PageHero, Reveal, SectionTag, SectionTitle, CTASection, FAQ } from "../components/kit";
import { SEO, JsonLd } from "../components/SEO";
import { getIndustry, INDUSTRIES } from "../data/industries";
import NotFound from "./NotFound";

const List = ({ items, icon: Icon, iconCls }) => (
  <ul className="space-y-4">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconCls}`} />
        <span className="text-[#8F8F9D] text-sm md:text-base leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

export default function IndustryDetail() {
  const { slug } = useParams();
  const ind = getIndustry(slug);
  if (!ind) return <NotFound />;

  const idx = INDUSTRIES.findIndex((i) => i.slug === slug);
  const related = [INDUSTRIES[(idx + 1) % INDUSTRIES.length], INDUSTRIES[(idx + 7) % INDUSTRIES.length]];

  return (
    <>
      <SEO title={ind.seo.title} description={ind.seo.desc} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: ind.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} />
      <div className="container-x pt-28">
        <Link to="/industries" data-testid="back-to-industries" className="inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D] hover:text-white transition-colors duration-150">
          <ArrowLeft className="w-3.5 h-3.5" /> All Industries
        </Link>
      </div>
      <PageHero
        overline={`Industry · ${ind.name}`}
        title={ind.headline}
        sub={ind.overview}
      />

      <section className="border-b border-white/8" data-testid="industry-problems">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§01">The Reality</SectionTag>
            <SectionTitle className="mb-10">The problems you<br />already know.</SectionTitle>
            <List items={ind.problems} icon={X} iconCls="text-[#FF3333]" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTag num="§02">The Constraints</SectionTag>
            <SectionTitle className="mb-10">Why it stays<br />unsolved.</SectionTitle>
            <List items={ind.challenges} icon={X} iconCls="text-[#8F8F9D]" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="industry-why-traditional">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§03">The Gap</SectionTag>
          <Reveal><SectionTitle className="mb-12">Where traditional CRM<br />falls short here.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {ind.whyTraditional.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <div className="surface-card rounded-md p-8 h-full" data-testid={`traditional-gap-${i}`}>
                  <span className="font-mono2 text-[11px] text-[#FF3333] tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[#F2F2F2] text-sm md:text-base mt-4 leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8" data-testid="industry-how-helps">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <Reveal>
            <SectionTag num="§04">The Fit</SectionTag>
            <SectionTitle>How Sales IQ helps<br />{ind.name.toLowerCase()} teams.</SectionTitle>
            <p className="text-[#8F8F9D] text-sm md:text-base mt-6 max-w-sm leading-relaxed">
              Configured pipelines, objects and workflows for your sector — plus AI tuned to the way your teams actually sell.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <List items={ind.howHelps} icon={Check} iconCls="text-[#FF3333]" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="industry-ai">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§05">AI In Practice</SectionTag>
          <Reveal><SectionTitle className="mb-12">AI use cases for<br />{ind.name.toLowerCase()}.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/8 border border-white/8">
            {ind.aiUseCases.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 0.06} className="bg-[#0C0C0F]">
                <div className="p-7 h-full" data-testid={`ai-usecase-${i}`}>
                  <span className="font-mono2 text-[10px] text-[#FF3333] tracking-widest">USE CASE {String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[#F2F2F2] text-sm mt-3 leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8" data-testid="industry-benefits">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§06">Outcomes</SectionTag>
          <Reveal><SectionTitle className="mb-12">What changes<br />on the ground.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {ind.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.06}>
                <div className="flex items-start gap-4 border border-white/8 rounded-md p-7 hover:border-white/20 transition-colors duration-300" data-testid={`benefit-${i}`}>
                  <Check className="w-4 h-4 text-[#FF3333] mt-1 shrink-0" />
                  <p className="text-[#F2F2F2] text-sm md:text-base leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="industry-faq-section">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§07">FAQ</SectionTag>
            <SectionTitle>{ind.name} teams<br />usually ask.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={ind.faq} testid="industry-faq" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="container-x py-16">
          <p className="overline-tag mb-8">Related Industries</p>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/industries/${r.slug}`}
                data-testid={`related-${r.slug}`}
                className="group surface-card rounded-md p-8 flex items-center justify-between hover:border-white/20 transition-colors duration-300"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F2F2F2]">{r.name}</h3>
                  <p className="text-[#8F8F9D] text-sm mt-2 max-w-sm">{r.headline}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#8F8F9D] group-hover:text-white transition-colors duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
