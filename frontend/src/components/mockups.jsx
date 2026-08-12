import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Phone, Mail, Calendar, ArrowRight } from "lucide-react";

const Frame = ({ url, children, testid }) => (
  <motion.div
    initial={{ rotateX: 4, rotateY: -3, scale: 0.97, opacity: 0, y: 30 }}
    whileInView={{ rotateX: 4, rotateY: -3, scale: 0.97, opacity: 1, y: 0 }}
    whileHover={{ rotateX: 0, rotateY: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    className="rounded-2xl border border-black/[0.06] bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] overflow-hidden"
    data-testid={testid}
  >
    <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.05] bg-stone-50">
      <span className="w-2.5 h-2.5 rounded-full bg-[#E04006]/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
      <span className="ml-3 font-mono2 text-[10px] tracking-wider text-stone-400 bg-white border border-black/[0.05] rounded px-2.5 py-1">
        app.intelligentcrm.io{url}
      </span>
    </div>
    {children}
  </motion.div>
);

const Spotlight = ({ children, className = "" }) => (
  <div
    className={`relative rounded-3xl p-6 md:p-12 ${className}`}
    style={{ background: "radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F5F5F4 55%, #E7E5E4 100%)" }}
  >
    {children}
  </div>
);

const Avatar = ({ initials, tone = "bg-[#0F172A]" }) => (
  <span className={`w-6 h-6 rounded-full ${tone} text-white text-[9px] font-semibold grid place-items-center shrink-0`}>{initials}</span>
);

const ScoreBadge = ({ score }) => {
  const tone = score >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : score >= 60 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-600 border-red-200";
  return <span className={`font-mono2 text-[9px] px-1.5 py-0.5 rounded border ${tone}`}>AI {score}</span>;
};

const DealCard = ({ company, value, rep, score, days, tone }) => (
  <div className="bg-white border border-black/[0.06] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start justify-between gap-2">
      <p className="text-[11px] font-semibold text-stone-900 leading-tight">{company}</p>
      <ScoreBadge score={score} />
    </div>
    <p className="font-mono2 text-[11px] text-stone-500 mt-1.5">{value}</p>
    <div className="flex items-center justify-between mt-2.5">
      <Avatar initials={rep} tone={tone} />
      <span className="font-mono2 text-[9px] text-stone-400">{days}d</span>
    </div>
  </div>
);

export const PipelineMockup = () => {
  const cols = [
    { name: "Qualification", count: 4, total: "₹1.9 Cr", deals: [
      { company: "Bharat Forge Components", value: "₹58 L", rep: "AV", score: 72, days: 6, tone: "bg-[#E04006]" },
      { company: "Meridian Logistics", value: "₹34 L", rep: "RK", score: 64, days: 3, tone: "bg-[#0F172A]" },
      { company: "NuvoCare Health", value: "₹46 L", rep: "SM", score: 81, days: 2, tone: "bg-emerald-700" },
      { company: "Arka Energy", value: "₹52 L", rep: "AV", score: 58, days: 9, tone: "bg-[#E04006]" },
    ]},
    { name: "Discovery", count: 3, total: "₹2.4 Cr", deals: [
      { company: "Trident Insurance", value: "₹96 L", rep: "JP", score: 77, days: 12, tone: "bg-indigo-800" },
      { company: "Orbit Telecom", value: "₹88 L", rep: "SM", score: 69, days: 5, tone: "bg-emerald-700" },
      { company: "Halcyon Realty", value: "₹56 L", rep: "RK", score: 84, days: 4, tone: "bg-[#0F172A]" },
    ]},
    { name: "Proposal", count: 3, total: "₹3.1 Cr", deals: [
      { company: "Skyline Construction", value: "₹1.2 Cr", rep: "AV", score: 88, days: 8, tone: "bg-[#E04006]" },
      { company: "Veda Distribution", value: "₹74 L", rep: "JP", score: 79, days: 6, tone: "bg-indigo-800" },
      { company: "NorthPeak SaaS", value: "₹1.15 Cr", rep: "SM", score: 91, days: 3, tone: "bg-emerald-700" },
    ]},
    { name: "Negotiation", count: 2, total: "₹2.8 Cr", deals: [
      { company: "GovGrid Systems", value: "₹1.6 Cr", rep: "RK", score: 93, days: 14, tone: "bg-[#0F172A]" },
      { company: "Apex Manufacturing", value: "₹1.2 Cr", rep: "AV", score: 86, days: 11, tone: "bg-[#E04006]" },
    ]},
  ];
  return (
    <div className="p-4 bg-[#FAFAF9]">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold text-stone-900 font-display">Enterprise Pipeline</p>
          <span className="font-mono2 text-[9px] text-stone-400">Q3 FY27</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#E04006]/10 border border-[#E04006]/20 rounded-full px-2.5 py-1">
          <Sparkles className="w-3 h-3 text-[#E04006]" />
          <span className="text-[9px] font-medium text-[#E04006]">Pipeline Health: Strong</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cols.map((c) => (
          <div key={c.name} className="bg-stone-100/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between px-1 mb-2.5">
              <p className="text-[10px] font-semibold text-stone-700">{c.name}</p>
              <span className="font-mono2 text-[9px] text-stone-400">{c.count}</span>
            </div>
            <p className="font-mono2 text-[10px] text-stone-500 px-1 mb-2.5">{c.total}</p>
            <div className="space-y-2">
              {c.deals.map((d) => <DealCard key={d.company} {...d} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Chart = () => {
  const bars = [42, 55, 48, 66, 58, 74, 70, 86, 80, 95, 90, 104];
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-1.5 h-24">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${(b / max) * 100}%`, background: i === bars.length - 1 ? "#E04006" : i >= bars.length - 3 ? "#0F172A" : "#D6D3D1" }} />
      ))}
    </div>
  );
};

export const DashboardMockup = () => {
  const kpis = [
    { label: "Open Pipeline", value: "₹10.2 Cr", delta: "+18%", up: true },
    { label: "Win Rate", value: "34%", delta: "+4 pts", up: true },
    { label: "Forecast (Q3)", value: "₹6.8 Cr", delta: "96% conf.", up: true },
    { label: "Avg. Cycle", value: "47 days", delta: "-6 days", up: true },
  ];
  return (
    <div className="p-5 bg-[#FAFAF9]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-stone-900 font-display">Executive Dashboard</p>
        <span className="font-mono2 text-[9px] text-stone-400">LIVE · ALL REGIONS</span>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white border border-black/[0.06] rounded-lg p-3">
            <p className="font-mono2 text-[9px] uppercase tracking-wider text-stone-400">{k.label}</p>
            <p className="font-display text-lg font-bold text-stone-900 mt-1">{k.value}</p>
            <p className={`flex items-center gap-1 text-[9px] font-medium mt-1 ${k.up ? "text-emerald-600" : "text-red-500"}`}>
              {k.up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {k.delta}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.6fr_1fr] gap-3">
        <div className="bg-white border border-black/[0.06] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold text-stone-700">Revenue by Month</p>
            <span className="font-mono2 text-[9px] text-stone-400">FY27</span>
          </div>
          <Chart />
          <div className="flex justify-between mt-2">
            {["A", "S", "O", "N", "D", "J", "F", "M", "A", "M", "J", "J"].map((m, i) => (
              <span key={i} className="font-mono2 text-[8px] text-stone-300 flex-1 text-center">{m}</span>
            ))}
          </div>
        </div>
        <div className="bg-[#0F172A] rounded-lg p-4 text-white">
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3 h-3 text-[#E04006]" />
            <p className="text-[10px] font-semibold">AI Forecast Insight</p>
          </div>
          <p className="text-[10px] leading-relaxed text-stone-300">
            Q3 tracking 6% above target. Two negotiation-stage deals show strong engagement; one proposal-stage deal (Veda Distribution) has had no activity in 6 days.
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[9px] text-[#E04006] font-medium">
            View recommended actions <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccountMockup = () => (
  <div className="p-5 bg-[#FAFAF9]">
    <div className="grid grid-cols-[1.5fr_1fr] gap-3">
      <div className="space-y-3">
        <div className="bg-white border border-black/[0.06] rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-[#0F172A] text-white grid place-items-center font-display font-bold text-sm">AF</span>
              <div>
                <p className="text-xs font-bold text-stone-900">Apex Forging Ltd.</p>
                <p className="font-mono2 text-[9px] text-stone-400 mt-0.5">MANUFACTURING · PUNE · 1,400 EMPLOYEES</p>
              </div>
            </div>
            <span className="font-mono2 text-[9px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">ACTIVE</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[["Open Deals", "3"], ["Lifetime Value", "₹2.1 Cr"], ["Since", "2023"]].map(([l, v]) => (
              <div key={l} className="bg-stone-50 rounded-md p-2.5">
                <p className="font-mono2 text-[8px] uppercase tracking-wider text-stone-400">{l}</p>
                <p className="text-[11px] font-bold text-stone-900 mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-black/[0.06] rounded-lg p-4">
          <p className="text-[10px] font-semibold text-stone-700 mb-3">Recent Activity</p>
          <div className="space-y-3">
            {[
              [Phone, "Call with Procurement Head — pricing review", "2h ago", "bg-indigo-800"],
              [Mail, "Proposal v2 sent — ₹1.2 Cr expansion", "Yesterday", "bg-[#E04006]"],
              [Calendar, "On-site demo scheduled — plant visit", "Jul 14", "bg-emerald-700"],
            ].map(([Icon, text, when, tone]) => (
              <div key={text} className="flex items-center gap-2.5">
                <span className={`w-5 h-5 rounded-md ${tone} text-white grid place-items-center shrink-0`}><Icon className="w-2.5 h-2.5" /></span>
                <p className="text-[10px] text-stone-600 flex-1 leading-tight">{text}</p>
                <span className="font-mono2 text-[8px] text-stone-400 shrink-0">{when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#0F172A] rounded-lg p-4 text-white flex flex-col">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3 h-3 text-[#E04006]" />
          <p className="text-[10px] font-semibold">Sales IQ AI — Account Brief</p>
        </div>
        <p className="text-[10px] leading-relaxed text-stone-300">
          Apex is evaluating a 3-year platform consolidation. Procurement engaged twice this month — strongest signal since 2024. Expansion deal momentum is high; legal review is the likely bottleneck.
        </p>
        <div className="mt-3 space-y-2">
          {["Share TCO comparison before Friday review", "Loop in IT lead — security questionnaire pending", "Reference: similar 2024 manufacturing rollout"].map((a) => (
            <div key={a} className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-md p-2">
              <AlertTriangle className="w-2.5 h-2.5 text-[#E04006] mt-0.5 shrink-0" />
              <p className="text-[9px] text-stone-300 leading-tight">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-1.5 text-[9px] text-[#E04006] font-medium">
            Draft follow-up email <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const MockupGallery = () => (
  <div className="space-y-16 md:space-y-24" data-testid="mockup-gallery">
    {[
      { tag: "01 · Pipeline", title: "Every deal, scored and staged.", caption: "Kanban pipelines with live AI health scores, stage totals and aging — configured to your exact sales process.", el: <PipelineMockup />, testid: "mockup-pipeline" },
      { tag: "02 · Executive", title: "The number, with evidence attached.", caption: "Board-ready dashboards and AI forecast insights that flag risk weeks before the quarter ends.", el: <DashboardMockup />, testid: "mockup-dashboard" },
      { tag: "03 · Account 360", title: "Full context, one record.", caption: "Relationship history, activity timelines and an AI account brief with next-best actions on every account.", el: <AccountMockup />, testid: "mockup-account" },
    ].map((m, i) => (
      <div key={m.tag} className={`grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-14 items-center`}>
        <div className={i % 2 === 1 ? "lg:order-2" : ""}>
          <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#E04006] mb-4">{m.tag}</p>
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#1C1917]">{m.title}</h3>
          <p className="text-[#57534E] text-sm md:text-base mt-4 leading-relaxed max-w-sm">{m.caption}</p>
          <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-6">Illustrative product concept</p>
        </div>
        <Spotlight className={i % 2 === 1 ? "lg:order-1" : ""}>
          <Frame url={["/pipeline", "/dashboards/executive", "/accounts/apex"][i]} testid={m.testid}>
            {m.el}
          </Frame>
        </Spotlight>
      </div>
    ))}
  </div>
);
