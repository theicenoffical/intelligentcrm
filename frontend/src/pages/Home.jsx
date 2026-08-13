import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Database, Users, Server, Sparkles, ArrowUpRight } from "lucide-react";
import Hero3D from "../components/Hero3D";
import { DashboardMockup } from "../components/mockups";
import { Reveal, SectionTag, SectionTitle, PrimaryButton, GhostButton, Marquee, CTASection } from "../components/kit";
import { SEO, JsonLd } from "../components/SEO";
import { PILLARS, DEPLOYMENT_MODELS, COMPARISON, SITE } from "../data/site";
import { AI_FEATURES } from "../data/features";
import { INDUSTRIES } from "../data/industries";

const HERO_LINES = ["Enterprise CRM.", "Unlimited Users.", "AI Built In."];

const KineticHeadline = () => (
  <h1 className="font-display font-extrabold text-[13vw] sm:text-7xl lg:text-[6.5rem] leading-[0.98] tracking-[-0.04em] text-[#1C1917]">
    {HERO_LINES.map((line, i) => (
      <span key={line} className="mask-line">
        <motion.span
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          {i === 1 ? <span className="text-stroke">{line}</span> : line}
        </motion.span>
      </span>
    ))}
  </h1>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden border-b border-black/[0.07]" data-testid="home-hero">
    <div className="absolute inset-0 grid-lines opacity-40" />
    <Hero3D />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#FAFAF9_78%)]" />
    <div className="container-x relative pt-32 pb-20 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="w-1.5 h-1.5 bg-[#E04006] animate-signal rounded-full" />
        <span className="font-mono2 text-[11px] tracking-[0.3em] uppercase text-[#57534E]" data-testid="hero-overline">
          Sales IQ · Intelligent CRM · {SITE.company}
        </span>
      </motion.div>
      <KineticHeadline />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="text-[#57534E] text-base md:text-lg max-w-xl mt-8 leading-relaxed"
        data-testid="hero-subhead"
      >
        Sales IQ is enterprise CRM built for companies that intend to keep it.
        Unlimited users, AI at every stage of the deal, and deployment that answers
        to your governance — not our business model.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.05 }}
        className="flex flex-wrap gap-4 mt-10"
      >
        <PrimaryButton to="/book-demo" testid="hero-book-demo">Book a Demo</PrimaryButton>
        <GhostButton to="/contact" testid="hero-talk-expert">Talk to an Expert</GhostButton>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="mt-16 pt-8 border-t border-black/[0.07] grid grid-cols-2 md:grid-cols-4 gap-6"
        data-testid="hero-meta-strip"
      >
        {[
          [Server, "Deploy Anywhere", "On-prem · Private cloud · Hosted"],
          [Users, "Unlimited Users", "No seat-based licensing"],
          [Sparkles, "AI Integrated", "Across the sales lifecycle"],
          [Database, "Your Data", "Owned and governed by you"],
        ].map(([Icon, label, sub]) => (
          <div key={label} className="flex items-start gap-3">
            <Icon className="w-4 h-4 text-[#E04006] mt-0.5 shrink-0" />
            <div>
              <p className="font-mono2 text-[11px] tracking-[0.2em] uppercase text-[#1C1917]">{label}</p>
              <p className="text-xs text-[#57534E] mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Manifesto = () => (
  <section className="border-b border-black/[0.07]" data-testid="manifesto-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§01">The Manifesto</SectionTag>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal>
            <SectionTitle>Not another AI CRM.<br />An enterprise CRM<br />you actually own.</SectionTitle>
            <p className="text-[#57534E] text-base md:text-lg mt-8 max-w-md leading-relaxed">
              Somewhere along the way, enterprise CRM became a rental. Per-seat fees that tax every hire.
              Data in someone else's cloud. AI sold back to you as a premium tier.
              Sales IQ is built on seven convictions about what ownership should mean.
            </p>
            <div className="mt-10">
              <PrimaryButton to="/product" testid="manifesto-explore">Explore the Platform</PrimaryButton>
            </div>
          </Reveal>
        </div>
        <div className="space-y-0">
          {PILLARS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <div className="group relative border-t border-black/[0.07] py-10 md:py-12" data-testid={`pillar-${p.id}`}>
                <span className="pointer-events-none select-none absolute -top-3 right-0 font-display font-extrabold text-[7rem] md:text-[10rem] leading-none text-stone-200/80 transition-colors duration-300 group-hover:text-[#E04006]/15" aria-hidden="true">
                  {p.num}
                </span>
                <div className="relative grid grid-cols-[auto_1fr] gap-6 md:gap-10">
                  <span className="font-mono2 text-sm text-[#E04006] tracking-widest pt-1.5">{p.num}</span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#1C1917]">
                      {p.title}
                    </h3>
                    <p className="text-[#57534E] text-sm md:text-base mt-3 leading-relaxed max-w-lg">{p.short}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Deployment = () => (
  <section className="border-b border-black/[0.07] bg-[#FFFFFF]" data-testid="deployment-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§02">Deployment</SectionTag>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <Reveal>
          <SectionTitle>Deploy anywhere.<br />Scale everywhere.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[#57534E] text-sm md:text-base max-w-sm leading-relaxed">
            Four ways to run it. One product. The choice belongs to your security policy — not our pricing page.
          </p>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {DEPLOYMENT_MODELS.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08}>
            <div className="surface-card rounded-md p-8 h-full group hover:border-black/20 transition-colors duration-300" data-testid={`deploy-${m.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono2 text-xs text-[#E04006] tracking-widest">MODEL {m.num}</span>
                <span className="w-8 h-8 border border-black/10 grid place-items-center rounded-sm">
                  <Server className="w-3.5 h-3.5 text-[#57534E]" />
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#1C1917] tracking-[-0.01em]">{m.name}</h3>
              <p className="text-[#57534E] text-sm mt-3 leading-relaxed">{m.desc}</p>
              <ul className="mt-6 space-y-2">
                {m.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-xs text-[#57534E]">
                    <span className="w-1 h-1 bg-[#E04006]/70 rotate-45 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ProductPreview = () => (
  <section className="border-b border-black/[0.07]" data-testid="product-preview">
    <div className="container-x py-24 md:py-32">
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-center">
        <Reveal>
          <SectionTag num="§03">The Interface</SectionTag>
          <SectionTitle>Software your team<br />will actually open.</SectionTitle>
          <p className="text-[#57534E] text-sm md:text-base mt-6 max-w-md leading-relaxed">
            Live dashboards, AI-scored pipelines and account intelligence — designed to be used
            every day by everyone, not tolerated by a few. Unlimited users means the whole
            organization works from the same truth.
          </p>
          <div className="mt-8">
            <GhostButton to="/product" testid="preview-see-product">See the Platform</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-3xl p-4 md:p-8" style={{ background: "radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F5F5F4 55%, #E7E5E4 100%)" }}>
            <div className="rounded-2xl border border-black/[0.06] bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.05] bg-stone-50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E04006]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 font-mono2 text-[10px] tracking-wider text-stone-400 bg-white border border-black/[0.05] rounded px-2.5 py-1">app.intelligentcrm.io/dashboards</span>
              </div>
              <DashboardMockup />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const AIPreview = () => (
  <section className="border-b border-black/[0.07]" data-testid="ai-preview-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§04">Intelligence</SectionTag>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <Reveal>
          <SectionTitle>AI that assists.<br />People who decide.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/features" data-testid="ai-view-all" className="group inline-flex items-center gap-2 text-sm text-[#1C1917] font-medium border-b border-[#E04006] pb-1 hover:text-[#1C1917] transition-colors duration-150">
            All 20 AI capabilities
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-black/[0.07] border border-black/[0.07]">
        {AI_FEATURES.slice(0, 8).map((f, i) => (
          <Reveal key={f.slug} delay={(i % 4) * 0.06} className="bg-[#FAFAF9]">
            <div className="p-8 h-full hover:bg-[#FFFFFF] transition-colors duration-300" data-testid={`ai-feature-${f.slug}`}>
              <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#E04006] mb-4">{f.category}</p>
              <h3 className="font-display text-lg font-bold text-[#1C1917] tracking-[-0.01em]">{f.name}</h3>
              <p className="text-[#57534E] text-sm mt-3 leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Comparison = () => (
  <section className="border-b border-black/[0.07] bg-[#FFFFFF]" data-testid="comparison-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§05">The Difference</SectionTag>
      <Reveal>
        <SectionTitle className="mb-16">Legacy SaaS CRM vs.<br />a CRM you own.</SectionTitle>
      </Reveal>
      <div className="surface-card rounded-md overflow-hidden">
        <div className="hidden md:grid grid-cols-3 border-b border-black/[0.07]">
          <div className="p-6 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#57534E]">Dimension</div>
          <div className="p-6 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#57534E] border-l border-black/[0.07]">Traditional SaaS CRM</div>
          <div className="p-6 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#1C1917] border-l border-black/[0.07]">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#E04006] rotate-45" />Sales IQ</span>
          </div>
        </div>
        {COMPARISON.map((row, i) => (
          <Reveal key={row.aspect} delay={i * 0.04}>
            <div className="grid md:grid-cols-3 border-b border-black/[0.07] last:border-0" data-testid={`compare-${row.aspect.toLowerCase()}`}>
              <div className="p-6 font-display font-bold text-[#1C1917] text-sm md:text-base">{row.aspect}</div>
              <div className="p-6 text-sm text-[#57534E] md:border-l border-black/[0.07] leading-relaxed">{row.them}</div>
              <div className="p-6 text-sm text-[#1C1917] md:border-l border-black/[0.07] bg-black/[0.02] leading-relaxed">{row.us}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const StatsBand = () => (
  <section className="border-b border-black/[0.07]" data-testid="stats-band">
    <div className="container-x py-20 md:py-24">
      <div className="grid md:grid-cols-3 gap-px bg-black/[0.07] border border-black/[0.07]">
        {[
          ["47%", "of CRM implementations fail because the tool doesn't match how the team actually sells.", "Industry research on CRM rollouts"],
          ["30%", "typical CRM adoption on generic platforms — most of the team never logs in.", "The problem unlimited access solves"],
          ["8–12 wks", "typical Sales IQ implementation — configured around your process, not the other way around.", "From kickoff to team-wide adoption"],
        ].map(([num, text, src], i) => (
          <Reveal key={num} delay={i * 0.08} className="bg-[#FAFAF9]">
            <div className="p-10 md:p-12" data-testid={`stat-${i}`}>
              <p className="font-display font-extrabold text-5xl md:text-6xl tracking-[-0.03em] text-[#0F172A]">{num}</p>
              <p className="text-[#57534E] text-sm md:text-base mt-4 leading-relaxed max-w-xs">{text}</p>
              <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-6">{src}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-6 text-center">
          Statistics reflect published industry research on CRM adoption, cited in Devobyte's sales research
        </p>
      </Reveal>
    </div>
  </section>
);

const IndustriesPreview = () => (
  <section className="border-b border-black/[0.07]" data-testid="industries-preview">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§06">Coverage</SectionTag>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <Reveal>
          <SectionTitle>Built for the industries<br />that run on relationships.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[#57534E] text-sm md:text-base max-w-sm leading-relaxed">
            Twenty industries, each with its own motion. Sales IQ arrives shaped for yours — pipelines, objects and AI use cases matched to how your sector actually sells.
          </p>
        </Reveal>
      </div>
      <div className="flex flex-wrap gap-3">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.slug} delay={Math.min(i * 0.03, 0.4)}>
            <Link
              to={`/industries/${ind.slug}`}
              data-testid={`industry-chip-${ind.slug}`}
              className="inline-flex items-center gap-2 border border-black/10 rounded-full px-5 py-2.5 text-sm text-[#57534E] hover:text-[#1C1917] hover:border-black/30 hover:bg-black/[0.04] transition-[color,border-color,background-color] duration-200"
            >
              {ind.name}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const SecurityStrip = () => (
  <section className="border-b border-black/[0.07] bg-[#FFFFFF]" data-testid="security-strip">
    <div className="container-x py-20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 border border-black/10 grid place-items-center rounded-md">
              <Shield className="w-5 h-5 text-[#E04006]" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#1C1917] tracking-[-0.02em]">Enterprise security, by design.</h3>
              <p className="text-[#57534E] text-sm mt-1">RBAC · Audit logs · Encryption · SSO · Backup & recovery · Compliance-friendly architecture</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <GhostButton to="/security" testid="security-explore">Explore Security</GhostButton>
        </Reveal>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <SEO
        title="Enterprise CRM. Unlimited Users. AI Built In."
        description="Sales IQ is the enterprise CRM you own and control — unlimited users, AI built in, flexible deployment on-prem or cloud. The modern alternative to per-seat SaaS CRM."
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Sales IQ — Intelligent CRM",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, On-Premises, Private Cloud",
        provider: { "@type": "Organization", name: SITE.company, address: SITE.address, telephone: "+919582118311" },
        description: "Enterprise CRM with unlimited users, AI built in, and flexible deployment. Customers own and control their CRM and data.",
      }} />
      <Hero />
      <Marquee items={PILLARS.map((p) => p.title)} />
      <Manifesto />
      <Deployment />
      <ProductPreview />
      <AIPreview />
      <Comparison />
      <StatsBand />
      <IndustriesPreview />
      <SecurityStrip />
      <CTASection />
    </>
  );
}
