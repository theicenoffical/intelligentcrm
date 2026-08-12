import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, X, Quote, Target } from "lucide-react";
import { PageHero, Reveal, SectionTag, SectionTitle, CTASection } from "../components/kit";
import { SEO } from "../components/SEO";
import { getPersona, PERSONAS } from "../data/personas";
import NotFound from "./NotFound";

export default function PersonaDetail() {
  const { slug } = useParams();
  const persona = getPersona(slug);
  if (!persona) return <NotFound />;

  const related = PERSONAS.filter((p) => p.group === persona.group && p.slug !== slug).slice(0, 2);
  const rel = related.length ? related : PERSONAS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <SEO title={`For ${persona.name} — Sales IQ`} description={persona.intro} />
      <div className="container-x pt-28">
        <Link to="/solutions" data-testid="back-to-solutions" className="inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D] hover:text-white transition-colors duration-150">
          <ArrowLeft className="w-3.5 h-3.5" /> All Roles
        </Link>
      </div>
      <PageHero overline={`Role · ${persona.group}`} title={persona.headline} sub={persona.intro} />

      <section className="border-b border-white/8" data-testid="persona-pains">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§01">Today</SectionTag>
            <SectionTitle className="mb-10">What slows<br />you down.</SectionTitle>
            <ul className="space-y-4">
              {persona.pains.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-0.5 text-[#FF3333] shrink-0" />
                  <span className="text-[#8F8F9D] text-sm md:text-base leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTag num="§02">With Sales IQ</SectionTag>
            <SectionTitle className="mb-10">What changes.</SectionTitle>
            <ul className="space-y-4">
              {persona.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 text-[#FF3333] shrink-0" />
                  <span className="text-[#F2F2F2] text-sm md:text-base leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="persona-perspective">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div className="surface-card rounded-md p-10 relative">
              <Quote className="w-6 h-6 text-[#FF3333] mb-6" />
              <p className="font-display text-xl md:text-2xl font-medium text-[#F2F2F2] leading-snug tracking-[-0.01em]" data-testid="persona-quote">
                {persona.quote}
              </p>
              <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D] mt-8">The {persona.name} Perspective</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTag num="§03">Your Metrics</SectionTag>
            <SectionTitle className="mb-10">The numbers<br />you're judged on.</SectionTitle>
            <div className="space-y-px bg-white/8 border border-white/8">
              {persona.kpis.map((k, i) => (
                <div key={k} className="bg-[#0C0C0F] p-6 flex items-center gap-4" data-testid={`persona-kpi-${i}`}>
                  <Target className="w-4 h-4 text-[#FF3333] shrink-0" />
                  <span className="text-[#F2F2F2] text-sm md:text-base">{k}</span>
                </div>
              ))}
            </div>
            <p className="text-[#8F8F9D] text-sm mt-6 leading-relaxed max-w-md">
              Sales IQ's executive dashboards and natural language reporting put these metrics one question away — live, drillable, and shared across your team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="container-x py-16">
          <p className="overline-tag mb-8">Related Roles</p>
          <div className="grid md:grid-cols-2 gap-6">
            {rel.map((r) => (
              <Link
                key={r.slug}
                to={`/solutions/${r.slug}`}
                data-testid={`related-persona-${r.slug}`}
                className="group surface-card rounded-md p-8 flex items-center justify-between hover:border-white/20 transition-colors duration-300"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F2F2F2]">{r.name}</h3>
                  <p className="text-[#8F8F9D] text-sm mt-2">{r.headline}</p>
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
