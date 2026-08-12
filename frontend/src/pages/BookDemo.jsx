import { Check } from "lucide-react";
import { PageHero, Reveal, SectionTag } from "../components/kit";
import { SEO } from "../components/SEO";
import { DemoForm } from "../components/DemoForm";
import { SITE } from "../data/site";

const EXPECT = [
  "A walkthrough shaped around your sales process — not a generic deck",
  "Deployment options mapped to your security and compliance requirements",
  "AI capabilities demonstrated on scenarios from your industry",
  "Straight answers on licensing, implementation and timelines",
];

export default function BookDemo() {
  return (
    <>
      <SEO title="Book a Demo" description="Book a demo of Sales IQ — the enterprise CRM with unlimited users, AI built in, and deployment options you control. A working session, not a sales deck." />
      <section className="container-x pt-36 pb-24 md:pt-44 grid lg:grid-cols-2 gap-16 items-start" data-testid="book-demo-page">
        <div>
          <Reveal>
            <p className="overline-tag mb-6">Book a Demo</p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.0] text-[#F2F2F2]">
              See it on your<br /><span className="text-stroke">own process.</span>
            </h1>
            <p className="text-[#8F8F9D] text-base md:text-lg mt-8 max-w-md leading-relaxed">
              Tell us how your team sells and what your governance requires.
              We'll prepare a working session around your world — pipelines, deployment and AI included.
            </p>
            <div className="mt-12">
              <SectionTag num="§01">What to Expect</SectionTag>
              <ul className="space-y-4">
                {EXPECT.map((e) => (
                  <li key={e} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FF3333] mt-0.5 shrink-0" />
                    <span className="text-[#8F8F9D] text-sm md:text-base leading-relaxed">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 pt-10 border-t border-white/8">
              <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D] mb-4">Prefer to talk first?</p>
              <a href={SITE.phoneHref} data-testid="demo-phone-link" className="font-display text-2xl font-bold text-[#F2F2F2] hover:text-white transition-colors duration-150">{SITE.phone}</a>
              <p className="text-[#8F8F9D] text-sm mt-2">{SITE.address}</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="surface-card rounded-md p-8 md:p-10 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-bold text-[#F2F2F2] mb-8 tracking-[-0.02em]">Request your demo</h2>
            <DemoForm source="book-demo" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
