import { ShieldCheck } from "lucide-react";
import { PageHero, Reveal, SectionTag, SectionTitle, CTASection, FAQ } from "../components/kit";
import { SEO } from "../components/SEO";
import { SECURITY_CAPABILITIES, DEPLOYMENT_MODELS } from "../data/site";

const FAQ_ITEMS = [
  { q: "Do you hold compliance certifications?", a: "We don't claim certifications we haven't published. Instead, Sales IQ's architecture — deployment control, audit logs, encryption, RBAC — is designed to fit within your compliance framework. Bring your requirements to an evaluation session and we'll walk through them concretely." },
  { q: "Can our security team review the architecture?", a: "Yes. Security architecture reviews are a standard part of enterprise evaluation — deployment topology, data flows, access control and audit capability, with our engineering team in the room." },
  { q: "Where does AI processing happen?", a: "AI capabilities are designed to operate within your chosen deployment model. Your governance team defines the boundaries — this is a core reason enterprises choose customer-controlled deployment." },
  { q: "How do backups and recovery work?", a: "Scheduled backups with documented recovery procedures, configured to your RPO/RTO targets and deployment model." },
];

export default function Security() {
  return (
    <>
      <SEO title="Security & Data Governance" description="Sales IQ enterprise security: role-based permissions, audit logs, encryption, SSO, backup and recovery, and deployment models that keep data under your governance." />
      <PageHero
        overline="Security · Trust"
        title={<>Security you govern,<br /><span className="text-stroke">not security you rent.</span></>}
        sub="Enterprise security is a deployment question before it's a feature list. Sales IQ gives you both: the controls, and the infrastructure choice that makes them meaningful."
      />
      <section className="border-b border-black/[0.07]" data-testid="security-capabilities">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§01">Capabilities</SectionTag>
          <Reveal><SectionTitle className="mb-14">The controls enterprise<br />teams ask for first.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {SECURITY_CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 0.06}>
                <div className="surface-card rounded-md p-7 h-full hover:border-black/20 transition-colors duration-300" data-testid={`security-cap-${c.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                  <ShieldCheck className="w-4 h-4 text-[#FF4D00] mb-5" />
                  <h3 className="font-display text-base font-bold text-[#1C1917]">{c.title}</h3>
                  <p className="text-[#57534E] text-xs mt-3 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/[0.07] bg-[#FFFFFF]" data-testid="security-deployment">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§02">Deployment Boundary</SectionTag>
          <Reveal><SectionTitle className="mb-14">Put the data where<br />your policy says it goes.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-black/[0.07] border border-black/[0.07]">
            {DEPLOYMENT_MODELS.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 0.06} className="bg-[#FFFFFF]">
                <div className="p-8 h-full" data-testid={`security-deploy-${m.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="font-mono2 text-[11px] text-[#FF4D00] tracking-widest">MODEL {m.num}</span>
                  <h3 className="font-display text-lg font-bold text-[#1C1917] mt-3">{m.name}</h3>
                  <p className="text-[#57534E] text-sm mt-3 leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/[0.07]">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§03">Straight Answers</SectionTag>
            <SectionTitle>What security teams<br />ask us.</SectionTitle>
            <p className="text-[#57534E] text-sm md:text-base mt-6 max-w-md leading-relaxed">
              We don't claim certifications we haven't published. What we offer is architecture designed
              for governance — and direct access to our engineering team for your review.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={FAQ_ITEMS} testid="security-faq" />
          </Reveal>
        </div>
      </section>
      <CTASection title="Bring your security requirements." sub="Schedule a security architecture review with our engineering team — deployment topology, data flows, access control and audit, end to end." />
    </>
  );
}
