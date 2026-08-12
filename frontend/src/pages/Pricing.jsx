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

      <section className="border-b border-black/[0.07]" data-testid="pricing-plans">
        <div className="container-x py-20 md:py-28">
          <div className="grid lg:grid-cols-3 gap-6">
            {MODELS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div
                  className={`relative rounded-md p-8 md:p-10 h-full flex flex-col ${
                    m.highlight ? "bg-[#0F172A] shadow-2xl" : "surface-card"
                  }`}
                  data-testid={`plan-${m.name.toLowerCase()}`}
                >
                  {m.highlight && (
                    <span className="absolute -top-3 left-8 font-mono2 text-[10px] tracking-[0.25em] uppercase bg-[#E04006] text-white px-3 py-1 rounded-sm">
                      Most Deployed
                    </span>
                  )}
                  <p className={`font-mono2 text-[11px] tracking-[0.25em] uppercase ${m.highlight ? "text-[#A8A29E]" : "text-[#57534E]"}`}>{m.tag}</p>
                  <h3 className={`font-display text-3xl font-bold mt-3 tracking-[-0.02em] ${m.highlight ? "text-white" : "text-[#1C1917]"}`}>{m.name}</h3>
                  <p className={`text-sm mt-4 leading-relaxed ${m.highlight ? "text-[#A8A29E]" : "text-[#57534E]"}`}>{m.desc}</p>
                  <p className={`font-mono2 text-xs mt-6 pb-6 border-b ${m.highlight ? "text-white border-white/15" : "text-[#1C1917] border-black/[0.07]"}`}>PLATFORM LICENSE · CUSTOM QUOTED</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {m.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-sm ${m.highlight ? "text-[#D6D3D1]" : "text-[#57534E]"}`}>
                        <Check className="w-4 h-4 text-[#E04006] mt-0.5 shrink-0" />
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
            <p className="font-mono2 text-[11px] tracking-[0.2em] uppercase text-[#57534E]/60 text-center mt-12" data-testid="pricing-note">
              Every plan includes unlimited users · Your data remains yours · No per-seat renewals
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/[0.07] bg-[#FFFFFF]" data-testid="pricing-math">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionTag num="§02">The Math</SectionTag>
            <SectionTitle>Run the seat math<br />on your own org.</SectionTitle>
            <p className="text-[#57534E] text-sm md:text-base mt-6 max-w-md leading-relaxed">
              Take a typical enterprise CRM at a published list price, multiply by everyone who should have access —
              sales, service, ops, finance, leadership — then multiply by the years you'll run it.
              That number is the problem Sales IQ's model eliminates.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="surface-card rounded-md p-10">
              <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#57534E] mb-8">Illustrative Example</p>
              <div className="space-y-5 font-mono2 text-sm">
                <div className="flex justify-between border-b border-black/[0.07] pb-4">
                  <span className="text-[#57534E]">600 staff needing access</span>
                  <span className="text-[#1C1917]">× per-seat fee</span>
                </div>
                <div className="flex justify-between border-b border-black/[0.07] pb-4">
                  <span className="text-[#57534E]">Traditional SaaS CRM</span>
                  <span className="text-[#E04006]">Cost grows with headcount</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57534E]">Sales IQ platform license</span>
                  <span className="text-[#1C1917]">Flat — 6 or 6,000 users</span>
                </div>
              </div>
              <p className="text-[#57534E]/60 text-xs mt-8 leading-relaxed">
                Illustrative only — your quote depends on deployment and scope. The structure doesn't: headcount never changes it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/[0.07]" data-testid="pricing-faq-section">
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
