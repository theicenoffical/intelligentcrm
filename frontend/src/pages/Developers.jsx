import { PageHero, Reveal, SectionTag, SectionTitle, CTASection } from "../components/kit";
import { SEO } from "../components/SEO";

const CODE = `curl -X POST https://your-instance/api/v1/opportunities \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Acme Expansion — Phase 2",
    "account_id": "acc_9f27d1",
    "stage": "qualification",
    "amount": 240000,
    "currency": "INR"
  }'`;

const CAPABILITIES = [
  { title: "REST APIs", desc: "Full CRUD across accounts, contacts, leads, opportunities, activities and custom objects — documented, versioned, authenticated." },
  { title: "Webhooks", desc: "Subscribe to record events and workflow transitions to drive your integration layer in near real time." },
  { title: "SSO & Identity", desc: "Integrate with your identity provider for authentication and role-based provisioning." },
  { title: "Data Portability", desc: "Structured export of records, attachments and audit history. Your data, in usable formats, on demand." },
  { title: "Custom Objects", desc: "Extend the data model with your own business objects and expose them over the same API surface." },
  { title: "AI Endpoints", desc: "Invoke scoring, summarization and search capabilities programmatically inside your own workflows." },
];

export default function Developers() {
  return (
    <>
      <SEO title="Developers — APIs, Webhooks & Integration" description="Sales IQ developer platform: authenticated REST APIs, webhooks, SSO integration, custom objects and full data portability." />
      <PageHero
        overline="Developers · API Platform"
        title={<>Built API-first,<br /><span className="text-stroke">because integration is the job.</span></>}
        sub="An enterprise CRM lives or dies by how well it connects. Sales IQ exposes the platform — records, workflows, AI — over authenticated, documented APIs."
      />
      <section className="border-b border-black/[0.07]" data-testid="developers-capabilities">
        <div className="container-x py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionTag num="§01">Surface Area</SectionTag>
              <Reveal><SectionTitle className="mb-12">Everything the UI does,<br />the API does.</SectionTitle></Reveal>
              <div className="grid sm:grid-cols-2 gap-6">
                {CAPABILITIES.map((c, i) => (
                  <Reveal key={c.title} delay={(i % 2) * 0.06}>
                    <div className="border border-black/[0.07] rounded-md p-6 hover:border-black/20 transition-colors duration-300" data-testid={`dev-cap-${i}`}>
                      <h3 className="font-display text-base font-bold text-[#1C1917]">{c.title}</h3>
                      <p className="text-[#57534E] text-xs mt-2 leading-relaxed">{c.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={0.15}>
              <div className="lg:sticky lg:top-28">
                <div className="rounded-md border border-black/10 bg-[#FFFFFF] overflow-hidden" data-testid="dev-code-sample">
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-black/[0.07]">
                    <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E04006]/60" />
                    <span className="font-mono2 text-[10px] tracking-[0.2em] text-[#57534E] ml-2">CREATE OPPORTUNITY</span>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="font-mono2 text-xs leading-relaxed text-[#44403C]">{CODE}</code>
                  </pre>
                </div>
                <p className="font-mono2 text-[10px] tracking-[0.2em] text-[#57534E]/60 mt-4 uppercase">
                  Illustrative API shape · Full docs provided during evaluation
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="border-b border-black/[0.07] bg-[#FFFFFF]">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§02">Portability</SectionTag>
            <SectionTitle>Exit-proof<br />by architecture.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[#57534E] text-sm md:text-base leading-[1.85] max-w-lg">
              The strongest integration guarantee is the freedom to leave. Sales IQ provides structured export
              of your complete dataset — records, relationships, attachments, audit history — in documented formats.
              We compete on being worth keeping, not on being hard to leave.
            </p>
          </Reveal>
        </div>
      </section>
      <CTASection title="Evaluate the platform properly." sub="Request a technical evaluation session — architecture, APIs, deployment and security review with our engineering team." />
    </>
  );
}
