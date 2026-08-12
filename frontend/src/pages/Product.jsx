import { Link } from "react-router-dom";
import { ArrowUpRight, LayoutGrid, GitBranch, Users2, Workflow, BarChart3, Plug } from "lucide-react";
import { Reveal, SectionTag, SectionTitle, PageHero, CTASection, PrimaryButton, GhostButton, FAQ } from "../components/kit";
import { MockupGallery } from "../components/mockups";
import { SEO } from "../components/SEO";

const MODULES = [
  { icon: Users2, name: "Accounts & Contacts", desc: "Complete relationship records — hierarchies, stakeholders, interactions and history — shared across every team with unlimited access." },
  { icon: GitBranch, name: "Leads & Opportunities", desc: "Configurable pipelines for every sales motion you run — direct, channel, renewal, RFP — with AI scoring at every stage." },
  { icon: Workflow, name: "Workflow & Approvals", desc: "Automate assignment, approvals, escalations and handovers. Your process, encoded once, executed consistently." },
  { icon: LayoutGrid, name: "Custom Objects", desc: "Model what makes your business yours — assets, policies, properties, contracts, programs — as first-class records." },
  { icon: BarChart3, name: "Reports & Dashboards", desc: "Live dashboards, natural language reporting and executive views. One version of the truth, drillable to any record." },
  { icon: Plug, name: "Integrations & API", desc: "Authenticated APIs and integration tooling for ERP, telephony, marketing automation and your data platform." },
];

const LIFECYCLE = [
  ["Capture", "Leads scored and routed the moment they arrive, with duplicates flagged automatically."],
  ["Qualify", "AI account research and fit scoring before your reps invest a single hour."],
  ["Engage", "Email assistance, meeting summaries and relationship intelligence inside every deal."],
  ["Propose", "Proposal generation from your templates and pricing, under governed approvals."],
  ["Close", "Approval workflows, document tracking and audit trails through signature."],
  ["Renew", "Predictive risk signals and structured renewal pipelines protect the revenue you won."],
];

const FAQ_ITEMS = [
  { q: "Is Sales IQ a full CRM or an AI assistant?", a: "A full CRM. Accounts, contacts, leads, opportunities, pipelines, quotes, activities, reporting, automation and administration — with AI integrated throughout, not bolted on." },
  { q: "Can Sales IQ replace Salesforce, Dynamics or HubSpot Enterprise?", a: "Yes. Sales IQ covers the same enterprise CRM territory — sales process management, customization, integration and reporting — with unlimited users and deployment control that per-seat SaaS platforms don't offer." },
  { q: "How customizable is it really?", a: "Pipelines, stages, business objects, fields, approval workflows, dashboards, reports, roles, permissions and integrations are all configurable — including industry-specific data models." },
  { q: "What does implementation look like?", a: "A structured implementation: process mapping, configuration, data migration, integration and team enablement — scoped around your deployment model and timeline. Talk to us for a plan specific to your organization." },
];

export default function Product() {
  return (
    <>
      <SEO
        title="Product — The Complete Enterprise CRM"
        description="Accounts, pipelines, workflows, custom objects, reporting and integrations — a complete enterprise CRM with AI built in and unlimited users."
      />
      <PageHero
        overline="Product · Sales IQ"
        title={<>A complete CRM.<br /><span className="text-stroke">Not a chatbot.</span></>}
        sub="Sales IQ is the system of record for your entire commercial engine — accounts, pipelines, quotes, workflows and reporting — with AI woven through every module, and deployment options that put you in control."
      >
        <div className="flex flex-wrap gap-4 mt-10">
          <PrimaryButton to="/book-demo" testid="product-book-demo">Book a Demo</PrimaryButton>
          <GhostButton to="/pricing" testid="product-see-pricing">See Pricing Model</GhostButton>
        </div>
      </PageHero>

      <section className="border-b border-black/[0.07]" data-testid="product-modules">
        <div className="container-x py-24 md:py-32">
          <SectionTag num="§01">Core Platform</SectionTag>
          <Reveal><SectionTitle className="mb-16">Everything an enterprise CRM<br />is supposed to do.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MODULES.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.08}>
                <div className="surface-card rounded-md p-8 h-full hover:border-black/20 transition-colors duration-300" data-testid={`module-${m.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}>
                  <m.icon className="w-5 h-5 text-[#E04006] mb-6" />
                  <h3 className="font-display text-xl font-bold text-[#1C1917] tracking-[-0.01em]">{m.name}</h3>
                  <p className="text-[#57534E] text-sm mt-3 leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/[0.07]" data-testid="product-gallery">
        <div className="container-x py-24 md:py-32">
          <SectionTag num="§02">The Interface</SectionTag>
          <Reveal><SectionTitle className="mb-6">See the platform.</SectionTitle></Reveal>
          <Reveal delay={0.05}>
            <p className="text-[#57534E] text-sm md:text-base max-w-xl leading-relaxed mb-16">
              Purpose-built screens for pipeline management, executive visibility and account intelligence.
              Shown here as illustrative product concepts — the real thing is configured to your process.
            </p>
          </Reveal>
          <MockupGallery />
        </div>
      </section>

      <section className="border-b border-black/[0.07] bg-[#F5F5F4]" data-testid="product-lifecycle">
        <div className="container-x py-24 md:py-32">
          <SectionTag num="§03">Sales Lifecycle</SectionTag>
          <Reveal><SectionTitle className="mb-16">AI at every stage<br />of the deal.</SectionTitle></Reveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-black/[0.07] border border-black/[0.07]">
            {LIFECYCLE.map(([stage, desc], i) => (
              <Reveal key={stage} delay={(i % 3) * 0.06} className="bg-[#FFFFFF]">
                <div className="p-8" data-testid={`lifecycle-${stage.toLowerCase()}`}>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-mono2 text-[11px] text-[#E04006] tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-lg font-bold text-[#1C1917]">{stage}</h3>
                  </div>
                  <p className="text-[#57534E] text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/[0.07]" data-testid="product-faq-section">
        <div className="container-x py-24 md:py-32 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionTag num="§04">Questions</SectionTag>
            <SectionTitle>Asked before<br />every evaluation.</SectionTitle>
            <p className="text-[#57534E] text-sm md:text-base mt-6 max-w-md leading-relaxed">
              Deeper questions about architecture or fit? Our team answers directly — no chatbots.
            </p>
            <div className="mt-8">
              <GhostButton to="/contact" testid="product-faq-contact">Talk to an Expert</GhostButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={FAQ_ITEMS} testid="product-faq" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/[0.07] bg-[#FFFFFF]">
        <div className="container-x py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] tracking-[-0.02em]">See the AI capabilities in depth.</h3>
            <p className="text-[#57534E] text-sm mt-2">Twenty integrated AI features across qualification, research, productivity and insight.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/features" data-testid="product-to-features" className="group inline-flex items-center gap-2 text-sm font-medium text-[#1C1917] border-b border-[#E04006] pb-1">
              Explore Features <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
