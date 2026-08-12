import { Check } from "lucide-react";
import { PageHero, Reveal, SectionTag, SectionTitle, CTASection, PrimaryButton, FAQ } from "../components/kit";
import { SEO } from "../components/SEO";

const MODELS = [
  {
    name: "Team",
    tag: "For focused sales organizations",
    desc: "The complete CRM for a single sales organization getting off per-seat tools.",
    features: ["Full CRM: accounts, leads, opportunities, pipelines", "Unlimited users — every role included", "Core AI: lead scoring, summaries, email assistance", "Standard dashboards and reporting", "Managed cloud deployment", "Email support"],
  },
  {
    name: "Business",
    tag: "For multi-team revenue organizations",
    desc: "Cross-team processes, deeper customization and full AI for growing enterprises.",
    features: ["Everything in Team", "All 20 AI capabilities included", "Custom objects and approval workflows", "Multiple pipelines and business units", "SSO and advanced role permissions", "Managed cloud or dedicated hosted", "Priority support and success reviews"],
    highlight: true,
  },
  {
    name: "Enterprise",
    tag: "For governed, large-scale deployment",
    desc: "Maximum control: deployment choice, governance depth and partnership-level engagement.",
    features: ["Everything in Business", "On-premises or private-cloud deployment", "Advanced audit logs and compliance tooling", "Custom AI workflows", "Dedicated environment options", "Solution architecture partnership", "Enterprise SLAs"],
  },
];

const FAQ_ITEMS = [
  { q: "Is there really no per-user pricing?", a: "Correct. Sales IQ is licensed on a platform basis, not per seat. Adding users — whether 10 or 10,000 — does not change your license cost." },
  { q: "Why don't you publish prices?", a: "Because platform pricing depends on deployment model, environment scope and implementation needs. A 30-minute conversation produces a real number — without the per-seat multiplier." },
  { q: "What does implementation cost?", a: "Implementation is scoped to your process complexity, data migration and integrations. We provide a fixed scope before you commit to anything." },
  { q: "Can we start in the cloud and move on-prem later?", a: "Yes. The product is identical across deployment models, so you can migrate between managed cloud, dedicated hosted, private cloud and on-premises as your requirements evolve." },
  { q: "Is AI an add-on tier?", a: "No. Core AI is included from the Team plan, and all 20 AI capabilities are included from Business upward. Intelligence is not a paywall." },
];

export default function Pricing() {
  return (
    <>
      <SEO
        title="Pricing — No Per-User Licensing"
        description="Sales IQ pricing is platform-based, not per-seat. Unlimited users, AI included, deployment flexibility. Talk to us for a quote scoped to your organization."
      />
      <PageHero
        overline="Pricing · The Model"
        title={<>No per-user licensing.<br /><span className="text-stroke">No growth tax.</span></>}
        sub="Sales IQ is licensed as a platform — scoped to your deployment model and scale, never to your headcount. Add your whole company. The price doesn't move."
      />

      <section className="border-b border-white/8" data-testid="pricing-plans">
        <div className="container-x py-20 md:py-28">
          <div className="grid lg:grid-cols-3 gap-6">
            {MODELS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div
                  className={`relative rounded-md p-8 md:p-10 h-full flex flex-col ${
                    m.highlight ? "bg-[#141418] border border-white/20" : "surface-card"
                  }`}
                  data-testid={`plan-${m.name.toLowerCase()}`}
                >
                  {m.highlight && (
                    <span className="absolute -top-3 left-8 font-mono2 text-[10px] tracking-[0.25em] uppercase bg-[#FF3333] text-white px-3 py-1 rounded-sm">
                      Most Deployed
                    </span>
                  )}
                  <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D]">{m.tag}</p>
                  <h3 className="font-display text-3xl font-bold text-[#F2F2F2] mt-3 tracking-[-0.02em]">{m.name}</h3>
                  <p className="text-[#8F8F9D] text-sm mt-4 leading-relaxed">{m.desc}</p>
                  <p className="font-mono2 text-xs text-[#F2F2F2] mt-6 pb-6 border-b border-white/8">PLATFORM LICENSE · CUSTOM QUOTED</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-[#8F8F9D]">
                        <Check className="w-4 h-4 text-[#FF3333] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <PrimaryButton to="/book-demo" testid={`plan-cta-${m.name.toLowerCase()}`}>Get a Quote</PrimaryButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="font-mono2 text-[11px] tracking-[0.2em] uppercase text-[#8F8F9D]/60 text-center mt-12" data-testid="pricing-note">
              Every plan includes unlimited users · Your data remains yours · No per-seat renewals
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0C0C0F]" data-testid="pricing-math">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionTag num="§02">The Math</SectionTag>
            <SectionTitle>Run the seat math<br />on your own org.</SectionTitle>
            <p className="text-[#8F8F9D] text-sm md:text-base mt-6 max-w-md leading-relaxed">
              Take a typical enterprise CRM at a published list price, multiply by everyone who should have access —
              sales, service, ops, finance, leadership — then multiply by the years you'll run it.
              That number is the problem Sales IQ's model eliminates.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="surface-card rounded-md p-10">
              <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#8F8F9D] mb-8">Illustrative Example</p>
              <div className="space-y-5 font-mono2 text-sm">
                <div className="flex justify-between border-b border-white/8 pb-4">
                  <span className="text-[#8F8F9D]">600 staff needing access</span>
                  <span className="text-[#F2F2F2]">× per-seat fee</span>
                </div>
                <div className="flex justify-between border-b border-white/8 pb-4">
                  <span className="text-[#8F8F9D]">Traditional SaaS CRM</span>
                  <span className="text-[#FF3333]">Cost grows with headcount</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8F8F9D]">Sales IQ platform license</span>
                  <span className="text-[#F2F2F2]">Flat — 6 or 6,000 users</span>
                </div>
              </div>
              <p className="text-[#8F8F9D]/60 text-xs mt-8 leading-relaxed">
                Illustrative only — your quote depends on deployment and scope. The structure doesn't: headcount never changes it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/8" data-testid="pricing-faq-section">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§03">FAQ</SectionTag>
            <SectionTitle>Pricing questions,<br />answered straight.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={FAQ_ITEMS} testid="pricing-faq" />
          </Reveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
