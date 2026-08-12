import { PageHero, Reveal, SectionTag } from "../components/kit";
import { SEO } from "../components/SEO";
import { SITE } from "../data/site";

const LegalSection = ({ num, title, children }) => (
  <Reveal>
    <div className="border-t border-black/[0.07] py-10 grid md:grid-cols-[auto_1fr] gap-6 md:gap-12">
      <span className="font-mono2 text-xs text-[#E04006] tracking-widest pt-1">{num}</span>
      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-[#1C1917] tracking-[-0.02em]">{title}</h2>
        <div className="text-[#57534E] text-sm md:text-base mt-4 leading-[1.85] space-y-4 max-w-3xl">{children}</div>
      </div>
    </div>
  </Reveal>
);

export function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description={`Privacy policy for Intelligent CRM (Sales IQ), operated by ${SITE.company}. How we collect, use and protect information on this website.`} />
      <PageHero overline="Legal · Privacy" title="Privacy Policy" sub={`Effective July 2026 · ${SITE.company} · ${SITE.address}`} />
      <section className="container-x py-16 md:py-24" data-testid="privacy-content">
        <LegalSection num="01" title="What we collect">
          <p>When you submit a demo request or contact form on this website, we collect the information you provide: name, work email, company, phone number, and the content of your message. We also collect standard technical data (browser, device, pages visited) to operate and improve the site.</p>
        </LegalSection>
        <LegalSection num="02" title="How we use it">
          <p>We use submitted information solely to respond to your enquiry, prepare for requested demonstrations, and communicate about Sales IQ where you have asked us to. We do not sell personal information, and we do not add you to marketing sequences without your consent.</p>
        </LegalSection>
        <LegalSection num="03" title="Where it's stored">
          <p>Website enquiries are stored in our secured systems and retained only as long as needed to handle your request and any resulting business relationship. Access is limited to team members who need it to respond to you.</p>
        </LegalSection>
        <LegalSection num="04" title="Your choices">
          <p>You may request access, correction or deletion of your personal information at any time by emailing <a className="text-[#1C1917] underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a> or calling {SITE.phone}. We will respond to verified requests promptly.</p>
        </LegalSection>
        <LegalSection num="05" title="Customer CRM data">
          <p>This policy covers this website. Data stored by customers in their Sales IQ deployments is governed by the customer's own policies and deployment model — a core principle of the platform: customers own and control their CRM data.</p>
        </LegalSection>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <SEO title="Terms of Service" description={`Terms of service for the Intelligent CRM (Sales IQ) website, operated by ${SITE.company}.`} />
      <PageHero overline="Legal · Terms" title="Terms of Service" sub={`Effective July 2026 · ${SITE.company} · ${SITE.address}`} />
      <section className="container-x py-16 md:py-24" data-testid="terms-content">
        <LegalSection num="01" title="Scope">
          <p>These terms govern your use of this website. Use of the Sales IQ platform itself is governed by a separate customer agreement executed between your organization and {SITE.company}.</p>
        </LegalSection>
        <LegalSection num="02" title="Content">
          <p>Content on this site describes the Sales IQ platform and our views on enterprise software. Illustrative scenarios are labeled as such. Nothing on this site constitutes a binding offer, warranty, or certification claim.</p>
        </LegalSection>
        <LegalSection num="03" title="Intellectual property">
          <p>The Sales IQ name, site design, and content are the property of {SITE.company}. You may reference public pages with attribution; reproduction of site content for commercial purposes requires written permission.</p>
        </LegalSection>
        <LegalSection num="04" title="Acceptable use">
          <p>You agree not to misuse this website — including attempting to disrupt service, scrape at disruptive volumes, or submit unlawful content through our forms.</p>
        </LegalSection>
        <LegalSection num="05" title="Liability & changes">
          <p>The website is provided as-is. To the maximum extent permitted by law, {SITE.company} is not liable for indirect damages arising from use of this site. We may update these terms; the current version is always posted here. Questions: <a className="text-[#1C1917] underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        </LegalSection>
      </section>
    </>
  );
}
