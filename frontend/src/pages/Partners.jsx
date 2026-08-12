import { Handshake, Building2, Wrench } from "lucide-react";
import { PageHero, Reveal, SectionTag, SectionTitle, CTASection } from "../components/kit";
import { SEO } from "../components/SEO";

const TRACKS = [
  { icon: Building2, name: "Solution Partners", desc: "Consultancies and system integrators who implement Sales IQ for enterprise clients — process mapping, configuration, migration and enablement.", points: ["Implementation methodology and tooling", "Solution architect support", "Co-delivery on enterprise engagements"] },
  { icon: Wrench, name: "Technology Partners", desc: "ISVs and platform vendors integrating with Sales IQ — telephony, ERP, marketing automation, data platforms and vertical extensions.", points: ["Authenticated API access", "Integration certification path", "Joint solution positioning"] },
  { icon: Handshake, name: "Referral Partners", desc: "Advisors and consultants who introduce Sales IQ to organizations outgrowing per-seat CRM — with a straightforward referral structure.", points: ["Simple referral terms", "Evaluation support for your clients", "No delivery obligation"] },
];

export default function Partners() {
  return (
    <>
      <SEO title="Partners" description="Partner with Sales IQ: solution partners, technology integrations and referral programs for the enterprise CRM with unlimited users." />
      <PageHero
        overline="Partners · Ecosystem"
        title={<>Grow with a CRM<br /><span className="text-stroke">clients don't outgrow.</span></>}
        sub="Sales IQ partners help enterprises escape per-seat licensing and vendor lock-in. If you implement, integrate or advise — there's a track for you."
      />
      <section className="container-x py-20 md:py-28" data-testid="partner-tracks">
        <div className="grid lg:grid-cols-3 gap-6">
          {TRACKS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="surface-card rounded-md p-10 h-full hover:border-black/20 transition-colors duration-300" data-testid={`partner-${t.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <t.icon className="w-5 h-5 text-[#E04006] mb-8" />
                <h2 className="font-display text-2xl font-bold text-[#1C1917] tracking-[-0.02em]">{t.name}</h2>
                <p className="text-[#57534E] text-sm mt-4 leading-relaxed">{t.desc}</p>
                <ul className="mt-8 pt-6 border-t border-black/[0.07] space-y-3">
                  {t.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-xs text-[#57534E]">
                      <span className="w-1 h-1 bg-[#E04006]/70 rotate-45 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-black/[0.07] bg-[#FFFFFF]">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§02">Why Partner</SectionTag>
            <SectionTitle>Unlimited users changes<br />your deal math too.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[#57534E] text-sm md:text-base leading-[1.85] max-w-lg">
              Partners win when clients expand — and per-seat licensing makes clients shrink their rollouts to control cost.
              With Sales IQ, every expansion of usage is good news for the client, which makes it good news for you.
              Implementation, integration and managed-services practices grow on a platform clients keep.
            </p>
          </Reveal>
        </div>
      </section>
      <CTASection title="Become a partner." sub="Tell us about your practice and the clients you serve. We'll respond with the right partner track and next steps." />
    </>
  );
}
