import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, LogOut, Download, Users, BarChart3, Globe, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { API } from "../lib/api";
import { INDUSTRIES } from "../data/industries";
import { PERSONAS } from "../data/personas";
import { BLOG_POSTS } from "../data/blog";

const TOKEN_KEY = "siq_admin_token";
const getToken = () => localStorage.getItem(TOKEN_KEY);
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const inputCls = "w-full bg-white border border-black/[0.12] rounded-md px-4 py-3 text-sm text-[#1C1917] placeholder:text-stone-400 outline-none focus:border-[#E04006] focus:ring-2 focus:ring-[#E04006]/20 transition-[border-color] duration-150";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/admin/login`, { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data);
      toast.success(`Welcome back, ${data.name}`);
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] grid place-items-center px-6" data-testid="admin-login">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-10 justify-center">
          <span className="w-8 h-8 border-2 border-[#0F172A] rounded-md grid place-items-center">
            <span className="w-2.5 h-2.5 bg-[#E04006] rotate-45" />
          </span>
          <span className="font-display font-bold text-xl text-[#1C1917]">Intelligent<span className="text-[#57534E] font-medium">CRM</span>
            <span className="font-mono2 text-[10px] text-[#57534E] tracking-[0.25em] uppercase block">Admin</span>
          </span>
        </div>
        <form onSubmit={submit} className="bg-white border border-black/[0.06] rounded-xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] p-8 space-y-5" data-testid="admin-login-form">
          <div>
            <label htmlFor="admin-email" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#57534E] mb-2">Email</label>
            <input id="admin-email" data-testid="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="admin@devobyte.com" />
          </div>
          <div>
            <label htmlFor="admin-password" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#57534E] mb-2">Password</label>
            <input id="admin-password" data-testid="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
          </div>
          <button type="submit" data-testid="admin-login-submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-[#E04006] text-white font-semibold text-sm px-6 py-3.5 rounded-md transition-[background-color,transform,opacity] duration-200 hover:bg-[#C83805] active:scale-[0.99] disabled:opacity-60">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }) => {
  const styles = {
    new: "bg-[#E04006]/10 text-[#E04006] border-[#E04006]/25",
    contacted: "bg-amber-50 text-amber-700 border-amber-200",
    closed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return <span className={`font-mono2 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${styles[status] || styles.new}`}>{status || "new"}</span>;
};

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/admin/leads`, { headers: authHeaders() });
      setLeads(data);
    } catch {
      toast.error("Could not load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setStatus = async (lead, status) => {
    try {
      await axios.patch(`${API}/admin/leads/${lead.kind}/${lead.id}`, { status }, { headers: authHeaders() });
      setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, status } : l)));
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Update failed");
    }
  };

  const exportCsv = () => {
    const rows = [["Type", "Status", "Name", "Email", "Company", "Phone", "Team Size", "Deployment", "Subject", "Message", "Date"]];
    leads.forEach((l) => rows.push([l.kind, l.status || "new", l.name, l.email, l.company || "", l.phone || "", l.team_size || "", l.deployment || "", l.subject || "", (l.message || "").replace(/\n/g, " "), l.created_at]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `sales-iq-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    toast.success("CSV downloaded");
  };

  const filtered = filter === "all" ? leads : leads.filter((l) => l.kind === filter);

  return (
    <div data-testid="admin-leads">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {[["all", "All"], ["demo", "Demo Requests"], ["contact", "Contact Messages"]].map(([v, label]) => (
            <button key={v} data-testid={`leads-filter-${v}`} onClick={() => setFilter(v)} className={`font-mono2 text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${filter === v ? "bg-[#0F172A] text-white border-[#0F172A]" : "border-black/[0.12] text-[#57534E] hover:border-black/30"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={load} data-testid="leads-refresh" className="inline-flex items-center gap-2 border border-black/[0.12] text-[#57534E] text-xs font-medium px-4 py-2 rounded-md hover:bg-black/[0.03] transition-colors duration-150"><RefreshCw className="w-3.5 h-3.5" />Refresh</button>
          <button onClick={exportCsv} data-testid="leads-export" className="inline-flex items-center gap-2 bg-[#0F172A] text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-[#1e293b] transition-colors duration-150"><Download className="w-3.5 h-3.5" />Export CSV</button>
        </div>
      </div>
      {loading ? (
        <div className="py-20 grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-[#E04006]" /></div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-[#57534E] text-sm" data-testid="leads-empty">No leads yet. New form submissions will appear here.</div>
      ) : (
        <div className="bg-white border border-black/[0.06] rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-black/[0.06] bg-stone-50">
                {["Type", "Status", "Name", "Email", "Company", "Details", "Date", "Action"].map((h) => (
                  <th key={h} className="text-left font-mono2 text-[10px] tracking-[0.15em] uppercase text-[#57534E] px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-black/[0.04] hover:bg-stone-50/60 transition-colors duration-100" data-testid={`lead-row-${l.id}`}>
                  <td className="px-4 py-3.5"><span className={`font-mono2 text-[10px] uppercase px-2 py-1 rounded ${l.kind === "demo" ? "bg-[#0F172A] text-white" : "bg-stone-200 text-stone-700"}`}>{l.kind}</span></td>
                  <td className="px-4 py-3.5"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3.5 font-medium text-[#1C1917]">{l.name}</td>
                  <td className="px-4 py-3.5 text-[#57534E]"><a href={`mailto:${l.email}`} className="hover:text-[#E04006] transition-colors duration-150">{l.email}</a></td>
                  <td className="px-4 py-3.5 text-[#57534E]">{l.company || "—"}</td>
                  <td className="px-4 py-3.5 text-[#57534E] text-xs max-w-[220px]">
                    {l.kind === "demo" ? [l.team_size, l.deployment, l.message].filter(Boolean).join(" · ") || "—" : [l.subject, l.message].filter(Boolean).join(" · ")}
                  </td>
                  <td className="px-4 py-3.5 font-mono2 text-[11px] text-[#57534E]">{String(l.created_at).slice(0, 10)}</td>
                  <td className="px-4 py-3.5">
                    <select
                      data-testid={`lead-status-${l.id}`}
                      value={l.status || "new"}
                      onChange={(e) => setStatus(l, e.target.value)}
                      className="text-xs border border-black/[0.12] rounded-md px-2 py-1.5 bg-white text-[#1C1917] outline-none focus:border-[#E04006]"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/admin/analytics`, { headers: authHeaders() })
      .then((r) => setData(r.data))
      .catch(() => toast.error("Could not load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-[#E04006]" /></div>;
  if (!data) return null;

  return (
    <div data-testid="admin-analytics" className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-black/[0.06] rounded-xl p-6">
          <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[#57534E]">Total Page Views</p>
          <p className="font-display text-4xl font-bold text-[#1C1917] mt-2" data-testid="analytics-total">{data.total}</p>
        </div>
        <div className="bg-white border border-black/[0.06] rounded-xl p-6">
          <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[#57534E]">Pages Tracked</p>
          <p className="font-display text-4xl font-bold text-[#1C1917] mt-2">{data.top_pages.length}</p>
        </div>
        <div className="bg-white border border-black/[0.06] rounded-xl p-6">
          <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[#57534E]">Views (14 days)</p>
          <p className="font-display text-4xl font-bold text-[#1C1917] mt-2">{data.daily.reduce((s, d) => s + d.views, 0)}</p>
        </div>
      </div>
      <div className="bg-white border border-black/[0.06] rounded-xl p-6" data-testid="analytics-chart">
        <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[#57534E] mb-6">Daily Views — Last 14 Days</p>
        {data.daily.length === 0 ? (
          <p className="text-sm text-[#57534E] py-10 text-center">No traffic recorded yet — views appear here as visitors browse the site.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.daily}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#57534E", fontFamily: "JetBrains Mono" }} tickFormatter={(d) => d.slice(5)} stroke="#E5E5E5" />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#57534E", fontFamily: "JetBrains Mono" }} stroke="#E5E5E5" width={30} />
              <Tooltip cursor={{ fill: "rgba(15,23,42,0.04)" }} contentStyle={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="views" fill="#E04006" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="bg-white border border-black/[0.06] rounded-xl overflow-hidden" data-testid="analytics-pages">
        <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[#57534E] px-6 pt-6 pb-4">Top Pages</p>
        <table className="w-full text-sm">
          <tbody>
            {data.top_pages.length === 0 ? (
              <tr><td className="px-6 pb-6 text-sm text-[#57534E]">No data yet.</td></tr>
            ) : data.top_pages.map((p, i) => (
              <tr key={p.path} className="border-t border-black/[0.04]">
                <td className="px-6 py-3 font-mono2 text-[11px] text-[#57534E] w-10">{String(i + 1).padStart(2, "0")}</td>
                <td className="px-2 py-3 text-[#1C1917] font-medium">{p.path}</td>
                <td className="px-6 py-3 text-right font-mono2 text-[12px] text-[#1C1917]">{p.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const STATIC_PATHS = ["/", "/product", "/features", "/industries", "/solutions", "/pricing", "/resources", "/resources/blog", "/resources/case-studies", "/about", "/contact", "/book-demo", "/partners", "/developers", "/security", "/privacy", "/terms"];

function SeoPanel() {
  const [entries, setEntries] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState({});

  const paths = [
    ...STATIC_PATHS,
    ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
    ...PERSONAS.map((p) => `/solutions/${p.slug}`),
    ...BLOG_POSTS.map((b) => `/resources/blog/${b.slug}`),
  ];

  useEffect(() => {
    axios.get(`${API}/seo`)
      .then((r) => setEntries(r.data))
      .catch(() => toast.error("Could not load SEO data"))
      .finally(() => setLoading(false));
  }, []);

  const update = (path, field, value) => {
    setEntries((e) => ({ ...e, [path]: { ...(e[path] || {}), [field]: value } }));
    setDirty((d) => ({ ...d, [path]: true }));
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = Object.keys(dirty).map((path) => ({ path, title: entries[path]?.title || "", description: entries[path]?.description || "" }));
      await axios.put(`${API}/admin/seo`, { entries: payload }, { headers: authHeaders() });
      setDirty({});
      toast.success(`SEO saved for ${payload.length} page${payload.length === 1 ? "" : "s"}`);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-[#E04006]" /></div>;

  return (
    <div data-testid="admin-seo">
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-[#57534E] max-w-lg">Edit the search title and meta description for any page. Overrides apply site-wide within a minute of saving.</p>
        <button onClick={save} disabled={saving || Object.keys(dirty).length === 0} data-testid="seo-save" className="inline-flex items-center gap-2 bg-[#E04006] text-white text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-[#C83805] transition-[background-color,opacity] duration-150 disabled:opacity-50">
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Save Changes{Object.keys(dirty).length > 0 ? ` (${Object.keys(dirty).length})` : ""}
        </button>
      </div>
      <div className="space-y-3">
        {paths.map((path) => (
          <div key={path} className="bg-white border border-black/[0.06] rounded-xl p-5" data-testid={`seo-row-${path.replace(/\//g, "-") || "-home"}`}>
            <p className="font-mono2 text-[11px] text-[#E04006] mb-3">{path}</p>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                data-testid={`seo-title-${path.replace(/\//g, "-") || "-home"}`}
                value={entries[path]?.title || ""}
                onChange={(e) => update(path, "title", e.target.value)}
                placeholder="Meta title (leave blank to keep default)"
                className="bg-white border border-black/[0.1] rounded-md px-3 py-2.5 text-sm text-[#1C1917] placeholder:text-stone-400 outline-none focus:border-[#E04006]"
              />
              <input
                data-testid={`seo-desc-${path.replace(/\//g, "-") || "-home"}`}
                value={entries[path]?.description || ""}
                onChange={(e) => update(path, "description", e.target.value)}
                placeholder="Meta description (leave blank to keep default)"
                className="bg-white border border-black/[0.1] rounded-md px-3 py-2.5 text-sm text-[#1C1917] placeholder:text-stone-400 outline-none focus:border-[#E04006]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(!!getToken());
  const [tab, setTab] = useState("leads");

  useEffect(() => { document.title = "Admin | Intelligent CRM"; }, []);

  useEffect(() => {
    if (!getToken()) return;
    axios.get(`${API}/admin/leads`, { headers: authHeaders() })
      .then(() => setUser({ email: "admin@devobyte.com" }))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return <div className="min-h-screen bg-[#FAFAF9] grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-[#E04006]" /></div>;
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const tabs = [["leads", "Leads", Users], ["analytics", "Analytics", BarChart3], ["seo", "SEO", Globe]];

  return (
    <div className="min-h-screen bg-[#FAFAF9]" data-testid="admin-dashboard">
      <header className="bg-white/80 backdrop-blur-xl border-b border-black/[0.06] sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 border-2 border-[#0F172A] rounded-md grid place-items-center"><span className="w-2 h-2 bg-[#E04006] rotate-45" /></span>
            <span className="font-display font-bold text-lg text-[#1C1917]">Intelligent<span className="text-[#57534E] font-medium">CRM</span></span>
            <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#57534E] ml-2 hidden sm:inline">Admin Console</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" data-testid="admin-view-site" className="text-xs font-medium text-[#57534E] hover:text-[#1C1917] transition-colors duration-150">View Site</a>
            <span className="font-mono2 text-[11px] text-[#57534E] hidden sm:inline">{user.email}</span>
            <button
              onClick={() => { localStorage.removeItem(TOKEN_KEY); setUser(null); }}
              data-testid="admin-logout"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] hover:text-[#E04006] transition-colors duration-150"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 flex gap-1 pb-3">
          {tabs.map(([key, label, Icon]) => (
            <button
              key={key}
              data-testid={`admin-tab-${key}`}
              onClick={() => setTab(key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${tab === key ? "bg-[#0F172A] text-white" : "text-[#57534E] hover:bg-black/[0.04]"}`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </header>
      <main className="max-w-[1400px] mx-auto px-6 py-10">
        {tab === "leads" && <Leads />}
        {tab === "analytics" && <Analytics />}
        {tab === "seo" && <SeoPanel />}
      </main>
    </div>
  );
}
