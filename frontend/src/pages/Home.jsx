import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Database, Users, Server, Sparkles, ArrowUpRight } from "lucide-react";
import Hero3D from "../components/Hero3D";
import { Reveal, SectionTag, SectionTitle, PrimaryButton, GhostButton, Marquee, CTASection } from "../components/kit";
import { SEO, JsonLd } from "../components/SEO";
import { PILLARS, DEPLOYMENT_MODELS, COMPARISON, SITE } from "../data/site";
import { AI_FEATURES } from "../data/features";
import { INDUSTRIES } from "../data/industries";

const HERO_LINES = ["Enterprise CRM.", "Unlimited Users.", "AI Built In."];

const KineticHeadline = () => (
  <h1 className="font-display font-extrabold text-[13vw] sm:text-7xl lg:text-[6.5rem] leading-[0.98] tracking-[-0.04em] text-[#F2F2F2]">
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
  <section className="relative min-h-screen flex items-center overflow-hidden border-b border-white/8" data-testid="home-hero">
    <div className="absolute inset-0 grid-lines opacity-40" />
    <Hero3D />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_78%)]" />
    <div className="container-x relative pt-32 pb-20 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="w-1.5 h-1.5 bg-[#FF3333] animate-signal rounded-full" />
        <span className="font-mono2 text-[11px] tracking-[0.3em] uppercase text-[#8F8F9D]" data-testid="hero-overline">
          Sales IQ · Intelligent CRM · {SITE.company}
        </span>
      </motion.div>
      <KineticHeadline />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="text-[#8F8F9D] text-base md:text-lg max-w-xl mt-8 leading-relaxed"
        data-testid="hero-subhead"
      >
        The enterprise CRM you own and control. Deploy anywhere, scale to unlimited users,
        and put practical AI to work across your entire sales lifecycle — without per-seat licensing or vendor lock-in.
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
        className="mt-16 pt-8 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-6"
        data-testid="hero-meta-strip"
      >
        {[
          [Server, "Deploy Anywhere", "On-prem · Private cloud · Hosted"],
          [Users, "Unlimited Users", "No seat-based licensing"],
          [Sparkles, "AI Integrated", "Across the sales lifecycle"],
          [Database, "Your Data", "Owned and governed by you"],
        ].map(([Icon, label, sub]) => (
          <div key={label} className="flex items-start gap-3">
            <Icon className="w-4 h-4 text-[#FF3333] mt-0.5 shrink-0" />
            <div>
              <p className="font-mono2 text-[11px] tracking-[0.2em] uppercase text-[#F2F2F2]">{label}</p>
              <p className="text-xs text-[#8F8F9D] mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Manifesto = () => (
  <section className="border-b border-white/8" data-testid="manifesto-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§01">The Manifesto</SectionTag>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal>
            <SectionTitle>Not another AI CRM.<br />An enterprise CRM<br />you actually own.</SectionTitle>
            <p className="text-[#8F8F9D] text-base md:text-lg mt-8 max-w-md leading-relaxed">
              Traditional SaaS CRMs charge per user, hold your data in vendor infrastructure, and sell AI back to you as a premium tier.
              Sales IQ was built on seven convictions about how enterprise software should work.
            </p>
            <div className="mt-10">
              <PrimaryButton to="/product" testid="manifesto-explore">Explore the Platform</PrimaryButton>
            </div>
          </Reveal>
        </div>
        <div className="space-y-0">
          {PILLARS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <div className="group border-t border-white/8 py-8 grid grid-cols-[auto_1fr] gap-6 md:gap-10" data-testid={`pillar-${p.id}`}>
                <span className="font-mono2 text-sm text-[#FF3333] tracking-widest pt-1">{p.num}</span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold tracking-[-0.02em] text-[#F2F2F2] transition-colors duration-200 group-hover:text-white">
                    {p.title}
                  </h3>
                  <p className="text-[#8F8F9D] text-sm md:text-base mt-3 leading-relaxed max-w-lg">{p.short}</p>
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
  <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="deployment-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§02">Deployment</SectionTag>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <Reveal>
          <SectionTitle>Deploy anywhere.<br />Scale everywhere.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[#8F8F9D] text-sm md:text-base max-w-sm leading-relaxed">
            The same product across four deployment models. Your security and compliance requirements make the choice — not our business model.
          </p>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {DEPLOYMENT_MODELS.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08}>
            <div className="surface-card rounded-md p-8 h-full group hover:border-white/20 transition-colors duration-300" data-testid={`deploy-${m.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono2 text-xs text-[#FF3333] tracking-widest">MODEL {m.num}</span>
                <span className="w-8 h-8 border border-white/10 grid place-items-center rounded-sm">
                  <Server className="w-3.5 h-3.5 text-[#8F8F9D]" />
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#F2F2F2] tracking-[-0.01em]">{m.name}</h3>
              <p className="text-[#8F8F9D] text-sm mt-3 leading-relaxed">{m.desc}</p>
              <ul className="mt-6 space-y-2">
                {m.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-xs text-[#8F8F9D]">
                    <span className="w-1 h-1 bg-[#FF3333]/70 rotate-45 shrink-0" />
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

const AIPreview = () => (
  <section className="border-b border-white/8" data-testid="ai-preview-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§03">Intelligence</SectionTag>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <Reveal>
          <SectionTitle>AI that assists.<br />People who decide.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/features" data-testid="ai-view-all" className="group inline-flex items-center gap-2 text-sm text-[#F2F2F2] font-medium border-b border-[#FF3333] pb-1 hover:text-white transition-colors duration-150">
            All 20 AI capabilities
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/8 border border-white/8">
        {AI_FEATURES.slice(0, 8).map((f, i) => (
          <Reveal key={f.slug} delay={(i % 4) * 0.06} className="bg-[#050505]">
            <div className="p-8 h-full hover:bg-[#0C0C0F] transition-colors duration-300" data-testid={`ai-feature-${f.slug}`}>
              <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#FF3333] mb-4">{f.category}</p>
              <h3 className="font-display text-lg font-bold text-[#F2F2F2] tracking-[-0.01em]">{f.name}</h3>
              <p className="text-[#8F8F9D] text-sm mt-3 leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Comparison = () => (
  <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="comparison-section">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§04">The Difference</SectionTag>
      <Reveal>
        <SectionTitle className="mb-16">Legacy SaaS CRM vs.<br />a CRM you own.</SectionTitle>
      </Reveal>
      <div className="surface-card rounded-md overflow-hidden">
        <div className="hidden md:grid grid-cols-3 border-b border-white/8">
          <div className="p-6 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D]">Dimension</div>
          <div className="p-6 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D] border-l border-white/8">Traditional SaaS CRM</div>
          <div className="p-6 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#F2F2F2] border-l border-white/8">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF3333] rotate-45" />Sales IQ</span>
          </div>
        </div>
        {COMPARISON.map((row, i) => (
          <Reveal key={row.aspect} delay={i * 0.04}>
            <div className="grid md:grid-cols-3 border-b border-white/8 last:border-0" data-testid={`compare-${row.aspect.toLowerCase()}`}>
              <div className="p-6 font-display font-bold text-[#F2F2F2] text-sm md:text-base">{row.aspect}</div>
              <div className="p-6 text-sm text-[#8F8F9D] md:border-l border-white/8 leading-relaxed">{row.them}</div>
              <div className="p-6 text-sm text-[#F2F2F2] md:border-l border-white/8 bg-white/[0.02] leading-relaxed">{row.us}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const IndustriesPreview = () => (
  <section className="border-b border-white/8" data-testid="industries-preview">
    <div className="container-x py-24 md:py-32">
      <SectionTag num="§05">Coverage</SectionTag>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <Reveal>
          <SectionTitle>Built for the industries<br />that run on relationships.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[#8F8F9D] text-sm md:text-base max-w-sm leading-relaxed">
            Twenty industries. Tailored pipelines, objects and AI use cases for each — configured around how your sector actually sells.
          </p>
        </Reveal>
      </div>
      <div className="flex flex-wrap gap-3">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.slug} delay={Math.min(i * 0.03, 0.4)}>
            <Link
              to={`/industries/${ind.slug}`}
              data-testid={`industry-chip-${ind.slug}`}
              className="inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-2.5 text-sm text-[#8F8F9D] hover:text-white hover:border-white/30 hover:bg-white/5 transition-[color,border-color,background-color] duration-200"
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
  <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="security-strip">
    <div className="container-x py-20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 border border-white/10 grid place-items-center rounded-md">
              <Shield className="w-5 h-5 text-[#FF3333]" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F2F2F2] tracking-[-0.02em]">Enterprise security, by design.</h3>
              <p className="text-[#8F8F9D] text-sm mt-1">RBAC · Audit logs · Encryption · SSO · Backup & recovery · Compliance-friendly architecture</p>
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
      <AIPreview />
      <Comparison />
      <IndustriesPreview />
      <SecurityStrip />
      <CTASection />
    </>
  );
}
