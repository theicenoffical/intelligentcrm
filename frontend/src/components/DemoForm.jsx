import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { submitDemoRequest } from "../lib/api";

export const TEAM_SIZES = ["1–25", "26–100", "101–500", "501–2,000", "2,000+"];
export const DEPLOYMENTS = ["Managed Cloud", "Dedicated Hosted", "Private Cloud", "On-Premises", "Not sure yet"];

const inputCls = "w-full bg-[#FFFFFF] border border-black/[0.12] rounded-md px-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#57534E]/50 outline-none focus:border-[#E04006] focus:ring-2 focus:ring-[#E04006]/20 transition-[border-color] duration-150";

export const Field = ({ label, children, htmlFor }) => (
  <div>
    <label htmlFor={htmlFor} className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#57534E] mb-2.5">{label}</label>
    {children}
  </div>
);

export function DemoForm({ source = "book-demo", compact = false }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", team_size: "", deployment: "", message: "" });
  const [status, setStatus] = useState("idle");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitDemoRequest({ ...form, source });
      setStatus("done");
      toast.success("Request received. Our team will reach out shortly.");
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  };

  if (status === "done") {
    return (
      <div className="surface-card rounded-md p-10 text-center" data-testid="demo-success">
        <CheckCircle2 className="w-10 h-10 text-[#E04006] mx-auto mb-6" />
        <h3 className="font-display text-2xl font-bold text-[#1C1917]">Request received.</h3>
        <p className="text-[#57534E] text-sm mt-3 max-w-sm mx-auto leading-relaxed">
          Thank you, {form.name.split(" ")[0]}. A member of our team will contact you within one business day to schedule your demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" data-testid="demo-form">
      <div className={`grid ${compact ? "grid-cols-1" : "sm:grid-cols-2"} gap-5`}>
        <Field label="Full Name *" htmlFor="demo-name">
          <input id="demo-name" data-testid="demo-name" required value={form.name} onChange={set("name")} placeholder="Asha Verma" className={inputCls} />
        </Field>
        <Field label="Work Email *" htmlFor="demo-email">
          <input id="demo-email" data-testid="demo-email" type="email" required value={form.email} onChange={set("email")} placeholder="asha@company.com" className={inputCls} />
        </Field>
        <Field label="Company *" htmlFor="demo-company">
          <input id="demo-company" data-testid="demo-company" required value={form.company} onChange={set("company")} placeholder="Company Ltd." className={inputCls} />
        </Field>
        <Field label="Phone" htmlFor="demo-phone">
          <input id="demo-phone" data-testid="demo-phone" value={form.phone} onChange={set("phone")} placeholder="+91 ..." className={inputCls} />
        </Field>
        <Field label="Team Size" htmlFor="demo-team">
          <select id="demo-team" data-testid="demo-team-size" value={form.team_size} onChange={set("team_size")} className={inputCls}>
            <option value="">Select…</option>
            {TEAM_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Deployment Interest" htmlFor="demo-deploy">
          <select id="demo-deploy" data-testid="demo-deployment" value={form.deployment} onChange={set("deployment")} className={inputCls}>
            <option value="">Select…</option>
            {DEPLOYMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
      </div>
      <Field label="What should we prepare for?" htmlFor="demo-message">
        <textarea id="demo-message" data-testid="demo-message" rows={4} value={form.message} onChange={set("message")} placeholder="Your sales process, current CRM, deployment requirements…" className={inputCls} />
      </Field>
      <button
        type="submit"
        data-testid="demo-submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#E04006] text-white font-semibold text-sm px-6 py-4 rounded-md transition-[transform,background-color,opacity] duration-200 hover:bg-[#C83805] active:scale-[0.99] disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === "loading" ? "Submitting…" : "Request Demo"}
      </button>
      <p className="font-mono2 text-[10px] tracking-[0.15em] text-[#57534E]/50 text-center">
        No per-seat quotes. No nurture spam. A real conversation.
      </p>
    </form>
  );
}
