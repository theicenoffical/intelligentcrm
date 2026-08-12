import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export const Reveal = ({ children, delay = 0, className = "", ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const SectionTag = ({ children, num }) => (
  <div className="flex items-center gap-3 mb-6" data-testid="section-tag">
    {num && <span className="font-mono2 text-[11px] tracking-[0.25em] text-[#FF3333]">{num}</span>}
    <span className="overline-tag">{children}</span>
    <span className="h-px flex-1 bg-white/10" />
  </div>
);

export const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] leading-[1.05] text-[#F2F2F2] ${className}`}>
    {children}
  </h2>
);

export const PrimaryButton = ({ to, children, testid, onClick }) => {
  const cls = "group inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-6 py-3.5 rounded-md transition-[transform,background-color] duration-200 hover:bg-[#e5e5e5] active:scale-[0.98]";
  const inner = (
    <>
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </>
  );
  if (onClick) return <button data-testid={testid} onClick={onClick} className={cls}>{inner}</button>;
  return <Link data-testid={testid} to={to} className={cls}>{inner}</Link>;
};

export const GhostButton = ({ to, children, testid }) => (
  <Link
    data-testid={testid}
    to={to}
    className="inline-flex items-center gap-2 border border-white/15 text-[#F2F2F2] font-medium text-sm px-6 py-3.5 rounded-md transition-[background-color,border-color,transform] duration-200 hover:bg-white/5 hover:border-white/25 active:scale-[0.98]"
  >
    {children}
  </Link>
);

export const Marquee = ({ items }) => (
  <div className="relative overflow-hidden border-y border-white/8 py-6 select-none" data-testid="editorial-marquee">
    <div className="flex whitespace-nowrap animate-marquee-slow w-max">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
          {items.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-2xl md:text-4xl font-medium text-[#F2F2F2]/80 px-8 tracking-[-0.02em]">{item}</span>
              <span className="w-2 h-2 rotate-45 bg-[#FF3333]/70 shrink-0" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const FAQ = ({ items, testid = "faq" }) => (
  <Accordion type="single" collapsible className="w-full" data-testid={testid}>
    {items.map((item, i) => (
      <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/8">
        <AccordionTrigger
          data-testid={`${testid}-trigger-${i}`}
          className="text-left font-display text-base md:text-lg font-medium text-[#F2F2F2] hover:no-underline py-6 gap-4"
        >
          <span className="flex items-baseline gap-4">
            <span className="font-mono2 text-[11px] text-[#FF3333] tracking-widest shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <span>{item.q}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-[#8F8F9D] text-sm md:text-base leading-relaxed pl-10 pb-6">
          {item.a}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export const CTASection = ({ title = "See Sales IQ in action.", sub = "Book a demo and we'll walk through your sales process, your deployment requirements, and how AI fits your team." }) => (
  <section className="border-t border-white/8 relative overflow-hidden" data-testid="cta-section">
    <div className="absolute inset-0 grid-lines opacity-60" />
    <div className="container-x py-24 md:py-32 relative">
      <Reveal>
        <p className="overline-tag mb-6">Next Step</p>
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.03em] leading-[1.02] max-w-3xl text-[#F2F2F2]">{title}</h2>
        <p className="text-[#8F8F9D] text-base md:text-lg mt-6 max-w-xl leading-relaxed">{sub}</p>
        <div className="flex flex-wrap gap-4 mt-10">
          <PrimaryButton to="/book-demo" testid="cta-book-demo">Book a Demo</PrimaryButton>
          <GhostButton to="/contact" testid="cta-talk-expert">Talk to an Expert</GhostButton>
        </div>
      </Reveal>
    </div>
  </section>
);

export const PageHero = ({ overline, title, sub, children }) => (
  <section className="relative border-b border-white/8 overflow-hidden" data-testid="page-hero">
    <div className="absolute inset-0 grid-lines opacity-50" />
    <div className="container-x pt-36 pb-20 md:pt-44 md:pb-28 relative">
      <Reveal>
        {overline && <p className="overline-tag mb-6">{overline}</p>}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.0] max-w-4xl text-[#F2F2F2]">{title}</h1>
        {sub && <p className="text-[#8F8F9D] text-base md:text-lg mt-8 max-w-2xl leading-relaxed">{sub}</p>}
        {children}
      </Reveal>
    </div>
  </section>
);
