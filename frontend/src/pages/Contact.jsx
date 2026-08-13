import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { PageHero, Reveal } from "../components/kit";
import { SEO } from "../components/SEO";
import { Field } from "../components/DemoForm";
import { submitContactMessage } from "../lib/api";
import { SITE } from "../data/site";

const inputCls = "w-full bg-[#FFFFFF] border border-black/[0.12] rounded-md px-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#57534E]/50 outline-none focus:border-[#E04006] focus:ring-2 focus:ring-[#E04006]/20 transition-[border-color] duration-150";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContactMessage(form);
      setStatus("done");
      toast.success("Message sent. We'll get back to you shortly.");
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <>
      <SEO title="Contact — Talk to an Expert" description={`Talk to the Sales IQ team about enterprise CRM, deployment options and pricing. ${SITE.address} · ${SITE.phone}`} />
      <PageHero
        overline="Contact · Talk to an Expert"
        title={<>A real conversation,<br /><span className="text-stroke">not a nurture sequence.</span></>}
        sub="Questions about fit, deployment, security or pricing — you'll reach people who build and implement the platform, not a ticket queue. We respond within one business day."
      />
      <section className="container-x py-20 md:py-28 grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start" data-testid="contact-page">
        <Reveal>
          <div className="space-y-6">
            {[
              [Phone, "Call Us", SITE.phone, SITE.phoneHref, "contact-phone"],
              [Mail, "Email", SITE.email, `mailto:${SITE.email}`, "contact-email"],
              [MapPin, "Office", SITE.address, null, "contact-address"],
            ].map(([Icon, label, value, href, testid]) => (
              <div key={label} className="surface-card rounded-md p-7 flex items-start gap-5">
                <span className="w-10 h-10 border border-black/10 grid place-items-center rounded-sm shrink-0">
                  <Icon className="w-4 h-4 text-[#E04006]" />
                </span>
                <div>
                  <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#57534E]">{label}</p>
                  {href ? (
                    <a href={href} data-testid={testid} className="text-[#1C1917] text-sm md:text-base mt-2 block hover:text-[#1C1917] transition-colors duration-150">{value}</a>
                  ) : (
                    <p className="text-[#1C1917] text-sm md:text-base mt-2" data-testid={testid}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="surface-card rounded-md p-8 md:p-10">
            {status === "done" ? (
              <div className="text-center py-10" data-testid="contact-success">
                <CheckCircle2 className="w-10 h-10 text-[#E04006] mx-auto mb-6" />
                <h3 className="font-display text-2xl font-bold text-[#1C1917]">Message received.</h3>
                <p className="text-[#57534E] text-sm mt-3 max-w-sm mx-auto">Thank you, {form.name.split(" ")[0]}. We'll reply within one business day.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name *" htmlFor="contact-name">
                    <input id="contact-name" data-testid="contact-name" required value={form.name} onChange={set("name")} placeholder="Asha Verma" className={inputCls} />
                  </Field>
                  <Field label="Work Email *" htmlFor="contact-email-input">
                    <input id="contact-email-input" data-testid="contact-email-input" type="email" required value={form.email} onChange={set("email")} placeholder="asha@company.com" className={inputCls} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Company" htmlFor="contact-company">
                    <input id="contact-company" data-testid="contact-company" value={form.company} onChange={set("company")} placeholder="Company Ltd." className={inputCls} />
                  </Field>
                  <Field label="Subject *" htmlFor="contact-subject">
                    <select id="contact-subject" data-testid="contact-subject" required value={form.subject} onChange={set("subject")} className={inputCls}>
                      <option value="">Select…</option>
                      {["Product evaluation", "Deployment & security", "Pricing", "Partnership", "Support", "Other"].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Message *" htmlFor="contact-message">
                  <textarea id="contact-message" data-testid="contact-message" rows={5} required value={form.message} onChange={set("message")} placeholder="Tell us what you're working on…" className={inputCls} />
                </Field>
                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E04006] text-white font-semibold text-sm px-6 py-4 rounded-md transition-[transform,background-color,opacity] duration-200 hover:bg-[#C83805] active:scale-[0.99] disabled:opacity-60"
                >
                  {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
