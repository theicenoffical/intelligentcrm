import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, FileText, FlaskConical, Newspaper, BookOpen, Loader2 } from "lucide-react";
import { PageHero, Reveal, SectionTag, SectionTitle, CTASection, GhostButton } from "../components/kit";
import { SEO } from "../components/SEO";
import { useBlogPosts } from "../hooks/useBlogPosts";
import NotFound from "./NotFound";

export default function Resources() {
  const { posts } = useBlogPosts();
  const cards = [
    { icon: Newspaper, title: "Blog", desc: "Essays on CRM economics, data ownership, AI in sales and implementation craft.", to: "/resources/blog", testid: "res-blog" },
    { icon: FlaskConical, title: "Case Studies", desc: "Customer stories — coming as our first deployments complete their first year.", to: "/resources/case-studies", testid: "res-cases" },
    { icon: BookOpen, title: "Product Overview", desc: "The guided tour: platform modules, AI capabilities and deployment models.", to: "/product", testid: "res-product" },
    { icon: FileText, title: "Security & Architecture", desc: "Deployment models, access control, audit and data governance for evaluators.", to: "/security", testid: "res-security" },
  ];
  return (
    <>
      <SEO title="Resources" description="Essays, guides and evaluation material on enterprise CRM, data ownership, AI in sales and deployment strategy from the Sales IQ team." />
      <PageHero
        overline="Resources"
        title={<>Learn before<br /><span className="text-stroke">you evaluate.</span></>}
        sub="No gated PDFs, no nurture sequences. Substantive writing on CRM economics and enterprise software — plus the material you need to evaluate Sales IQ properly."
      />
      <section className="container-x py-20 md:py-28" data-testid="resources-grid">
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <Link to={c.to} data-testid={c.testid} className="group surface-card rounded-md p-10 block h-full hover:border-black/20 transition-colors duration-300">
                <c.icon className="w-5 h-5 text-[#E04006] mb-6" />
                <h2 className="font-display text-2xl font-bold text-[#1C1917] tracking-[-0.02em]">{c.title}</h2>
                <p className="text-[#57534E] text-sm mt-3 leading-relaxed">{c.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm text-[#1C1917] mt-6 font-medium">
                  Explore <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-black/[0.07] bg-[#FFFFFF]">
        <div className="container-x py-20 md:py-28">
          <SectionTag num="§02">Latest Writing</SectionTag>
          <div className="space-y-px bg-black/[0.07] border border-black/[0.07]">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/resources/blog/${p.slug}`} data-testid={`res-post-${p.slug}`} className="group bg-[#FFFFFF] flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 hover:bg-[#F5F5F4] transition-colors duration-200">
                <div>
                  <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#E04006] mb-2">{p.category} · {p.readTime}</p>
                  <h3 className="font-display text-xl font-bold text-[#1C1917] tracking-[-0.01em]">{p.title}</h3>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#57534E] group-hover:text-[#1C1917] transition-colors duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

export function Blog() {
  const [cat, setCat] = useState("All");
  const { posts, loading } = useBlogPosts();
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filtered = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <SEO title="Blog" description="Essays on CRM economics, data ownership, practical AI in sales and enterprise implementation from the Sales IQ team." />
      <PageHero
        overline="Blog · The Sales IQ Journal"
        title={<>Writing on CRM,<br /><span className="text-stroke">ownership & AI.</span></>}
        sub="Long-form thinking for revenue and technology leaders — no listicles, no gated content."
      />
      <section className="container-x py-20 md:py-28" data-testid="blog-list">
        <div className="flex flex-wrap gap-2 mb-14" data-testid="blog-filter">
          {categories.map((c) => (
            <button
              key={c}
              data-testid={`blog-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setCat(c)}
              className={`font-mono2 text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-[color,border-color,background-color] duration-200 ${
                cat === c ? "border-[#E04006] bg-[#E04006] text-white" : "border-black/[0.15] text-[#57534E] hover:text-[#1C1917] hover:border-black/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 py-20 grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-[#E04006]" /></div>
          ) : filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.06}>
              <Link to={`/resources/blog/${p.slug}`} data-testid={`blog-card-${p.slug}`} className="group surface-card rounded-md p-10 block h-full hover:border-black/20 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#E04006]">{p.category}</span>
                  <span className="font-mono2 text-[10px] text-[#57534E]/60">{p.date} · {p.readTime}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-[#1C1917] tracking-[-0.02em] leading-snug">{p.title}</h2>
                <p className="text-[#57534E] text-sm mt-4 leading-relaxed">{p.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm text-[#1C1917] mt-8 font-medium">
                  Read <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const { posts, loading } = useBlogPosts();
  if (loading) {
    return <div className="min-h-screen grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-[#E04006]" /></div>;
  }
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;
  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <article className="container-x pt-36 pb-20 md:pt-44" data-testid="blog-post">
        <div className="max-w-3xl mx-auto">
          <Link to="/resources/blog" data-testid="back-to-blog" className="inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#57534E] hover:text-[#1C1917] transition-colors duration-150">
            <ArrowLeft className="w-3.5 h-3.5" /> Journal
          </Link>
          <Reveal>
            <div className="flex items-center gap-4 mt-10 mb-8">
              <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#E04006]">{post.category}</span>
              <span className="font-mono2 text-[10px] text-[#57534E]/60">{post.date} · {post.readTime} read</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-[-0.03em] leading-[1.05] text-[#1C1917]">{post.title}</h1>
            <p className="text-[#57534E] text-base md:text-lg mt-6 leading-relaxed">{post.excerpt}</p>
          </Reveal>
          <div className="mt-12 pt-12 border-t border-black/[0.07] space-y-8">
            {post.body.map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                <p className="text-[#44403C] text-base md:text-lg leading-[1.85]">{para}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 pt-10 border-t border-black/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-[#57534E] text-sm max-w-sm">Evaluating CRM platforms? We'll walk through your requirements directly.</p>
            <GhostButton to="/book-demo" testid="post-book-demo">Book a Demo</GhostButton>
          </div>
        </div>
      </article>
    </>
  );
}

export function CaseStudies() {
  const scenarios = [
    { industry: "Distribution", title: "From 3 tools and 40 seats to one platform with 400 users", desc: "How a regional distributor could consolidate sales, service and ops onto one governed system — eliminating per-seat rationing across four branches." },
    { industry: "Manufacturing", title: "Quote approvals from days to hours with governed workflows", desc: "How a manufacturer could route CPQ approvals automatically while keeping margin control and a complete audit trail." },
    { industry: "Government Contracting", title: "A capture pipeline inside the security boundary", desc: "How a GovCon firm could run opportunity management on-premises, satisfying contract data requirements without giving up modern AI assistance." },
  ];
  return (
    <>
      <SEO title="Case Studies" description="Sales IQ customer stories are coming as our first deployments complete their first year. Meanwhile, explore illustrative deployment scenarios." />
      <PageHero
        overline="Case Studies"
        title={<>Real stories,<br /><span className="text-stroke">when they're earned.</span></>}
        sub="We don't publish invented logos or borrowed testimonials. Customer stories will appear here as our first deployments complete their first year. Until then, these illustrative scenarios show how organizations use Sales IQ."
      />
      <section className="container-x py-20 md:py-28" data-testid="case-studies-list">
        <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#E04006] mb-10" data-testid="illustrative-label">
          Illustrative scenarios — not customer claims
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="surface-card rounded-md p-8 h-full" data-testid={`scenario-${i}`}>
                <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#57534E] mb-4">{s.industry}</p>
                <h3 className="font-display text-xl font-bold text-[#1C1917] tracking-[-0.01em] leading-snug">{s.title}</h3>
                <p className="text-[#57534E] text-sm mt-4 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-16 border border-black/[0.07] rounded-md p-10 text-center" data-testid="case-study-cta">
            <h3 className="font-display text-2xl font-bold text-[#1C1917]">Running an evaluation?</h3>
            <p className="text-[#57534E] text-sm mt-3 max-w-md mx-auto">We'll share reference architectures and walk through deployment scenarios relevant to your industry.</p>
            <div className="mt-8">
              <GhostButton to="/contact" testid="cases-contact">Talk to an Expert</GhostButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
