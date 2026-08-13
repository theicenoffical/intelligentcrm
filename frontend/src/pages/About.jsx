import { PageHero, Reveal, SectionTag, SectionTitle, CTASection } from "../components/kit";
import { SEO } from "../components/SEO";
import { SITE, OFFICE_PHOTOS } from "../data/site";

const VALUES = [
  { num: "01", title: "Ownership over rental", desc: "Enterprise software should be an asset customers control — their data, their deployment, their timeline. We build for ownership, not dependency." },
  { num: "02", title: "Adoption over extraction", desc: "Per-seat pricing taxes the adoption that makes CRM valuable. We removed the seat, because software earns its keep by being used by everyone who needs it." },
  { num: "03", title: "Assistance over autonomy theater", desc: "AI should prepare the research, draft the follow-up and flag the risk — then let people decide. We build intelligence that respects judgment." },
  { num: "04", title: "Credibility over hype", desc: "No invented logos, no borrowed analyst quotes, no fabricated statistics. We publish what we can stand behind, and label the rest as illustrative." },
];

export default function About() {
  return (
    <>
      <SEO title="About" description={`Sales IQ — Design My CRM — is built by ${SITE.company} in Noida, India. Enterprise CRM you own: unlimited users, AI built in, deploy anywhere.`} />
      <PageHero
        overline="About · The Company"
        title={<>Built by people who think<br /><span className="text-stroke">CRM should be owned.</span></>}
        sub={`Sales IQ — Design My CRM — is designed and engineered by ${SITE.company}, headquartered in Noida, India. We build enterprise software for organizations that intend to run on it for decades.`}
      />

      <section className="border-b border-black/[0.07]" data-testid="about-story">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§01">Why We Exist</SectionTag>
            <SectionTitle>The CRM market<br />forgot who it serves.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-[#57534E] text-sm md:text-base leading-[1.85]">
              <p>
                Enterprise software drifted into a rental market. Per-user fees that punish growth.
                Customer data held in vendor clouds. Intelligence sold back as a premium tier.
                Exit costs engineered to make leaving feel irrational.
              </p>
              <p>
                We started from a different premise: a CRM is core business infrastructure, and
                infrastructure should be owned. That conviction becomes concrete choices — deployment
                you control, licensing that ignores headcount, data ownership written into the
                architecture, and AI included as a platform capability rather than a toll booth.
              </p>
              <p>
                We work with organizations across manufacturing, distribution, financial services,
                government contracting and beyond — anywhere relationships run long, processes run
                specific, and governance actually matters.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/[0.07] bg-[#FFFFFF]" data-testid="about-values">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§02">Convictions</SectionTag>
          <Reveal><SectionTitle className="mb-14">What we believe.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.num} delay={(i % 2) * 0.08}>
                <div className="surface-card rounded-md p-10 h-full" data-testid={`value-${v.num}`}>
                  <span className="font-mono2 text-sm text-[#FF4D00] tracking-widest">{v.num}</span>
                  <h3 className="font-display text-2xl font-bold text-[#1C1917] mt-4 tracking-[-0.02em]">{v.title}</h3>
                  <p className="text-[#57534E] text-sm mt-4 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/[0.07]" data-testid="about-office">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionTag num="§03">Headquarters</SectionTag>
            <SectionTitle>Noida, India.</SectionTitle>
            <p className="text-[#57534E] text-sm md:text-base mt-6 max-w-md leading-relaxed">
              Our engineering and solution teams are based in the NCR technology corridor,
              serving enterprise customers across India and internationally.
            </p>
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)]" data-testid="about-office-image">
                <img
                  src={OFFICE_PHOTOS[0].url}
                  alt={OFFICE_PHOTOS[0].alt}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="surface-card rounded-md p-10">
              <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#57534E] mb-6">Office</p>
              <p className="font-display text-xl font-bold text-[#1C1917] leading-snug" data-testid="about-address">{SITE.address}</p>
              <div className="mt-8 pt-8 border-t border-black/[0.07] space-y-3">
                <a href={SITE.phoneHref} data-testid="about-phone" className="block text-[#57534E] hover:text-[#1C1917] text-sm transition-colors duration-150">{SITE.phone}</a>
                <a href={`mailto:${SITE.email}`} data-testid="about-email" className="block text-[#57534E] hover:text-[#1C1917] text-sm transition-colors duration-150">{SITE.email}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="border-b border-black/[0.07] bg-[#F5F5F4]" data-testid="about-gallery">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§04">Inside Devobyte</SectionTag>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <Reveal>
              <SectionTitle>The people behind<br />the platform.</SectionTitle>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[#57534E] text-sm md:text-base max-w-sm leading-relaxed">
                Engineers, solution architects and customer teams working out of our Noida headquarters.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {OFFICE_PHOTOS.map((p, i) => (
              <Reveal key={p.url} delay={i * 0.08}>
                <div className="group relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)]" data-testid={`gallery-photo-${i}`}>
                  <img
                    src={p.url}
                    alt={p.alt}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${i === 1 ? "h-80 md:h-[26rem]" : "h-80"}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF4D00] rotate-45" />
                    <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-white">{p.caption}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
