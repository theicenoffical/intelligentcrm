import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, SITE } from "../data/site";

const DROPDOWNS = {
  Industries: { to: "/industries", links: [["All Industries", "/industries"], ["Manufacturing", "/industries/manufacturing"], ["Financial Services", "/industries/financial-services"], ["Healthcare", "/industries/healthcare"], ["Government Contractors", "/industries/government-contractors"], ["Logistics", "/industries/logistics"]] },
  Solutions: { to: "/solutions", links: [["By Role", "/solutions"], ["CEO", "/solutions/ceo"], ["CRO", "/solutions/cro"], ["VP Sales", "/solutions/vp-sales"], ["RevOps", "/solutions/revops"], ["IT Administrator", "/solutions/it-administrator"]] },
  Resources: { to: "/resources", links: [["Resources Hub", "/resources"], ["Blog", "/resources/blog"], ["Case Studies", "/resources/case-studies"], ["Developers", "/developers"], ["Partners", "/partners"], ["Security", "/security"]] },
  Company: { to: "/about", links: [["About", "/about"], ["Contact", "/contact"], ["Partners", "/partners"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
};

const Logo = () => (
  <Link to="/" data-testid="nav-logo" className="flex items-center gap-2.5 shrink-0">
    <span className="w-7 h-7 border border-black/30 rounded-sm grid place-items-center">
      <span className="w-2 h-2 bg-[#E04006] rotate-45 animate-signal" />
    </span>
    <span className="font-display font-bold text-lg tracking-[-0.02em] text-[#1C1917]">
      Intelligent<span className="text-[#57534E] font-medium">CRM</span>
    </span>
  </Link>
);

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); setDrop(null); }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-black/10" data-testid="navbar">
      <div className="container-x flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
          {NAV.map((item) => {
            const dd = DROPDOWNS[item.label];
            if (!dd) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-[13px] font-medium rounded-md transition-colors duration-150 ${isActive ? "text-[#1C1917]" : "text-[#57534E] hover:text-[#1C1917]"}`
                  }
                >
                  {item.label}
                </NavLink>
              );
            }
            return (
              <div key={item.label} className="relative" onMouseEnter={() => setDrop(item.label)} onMouseLeave={() => setDrop(null)}>
                <button
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-md transition-colors duration-150 ${drop === item.label || pathname.startsWith(dd.to) ? "text-[#1C1917]" : "text-[#57534E] hover:text-[#1C1917]"}`}
                >
                  {item.label}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
                <AnimatePresence>
                  {drop === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="w-64 surface-card rounded-md p-2 backdrop-blur-2xl bg-[#FFFFFF]/95">
                        {dd.links.map(([label, to]) => (
                          <Link
                            key={to + label}
                            to={to}
                            data-testid={`nav-dd-${label.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block px-3 py-2 text-[13px] text-[#57534E] hover:text-[#1C1917] hover:bg-black/[0.04] rounded transition-colors duration-150"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" data-testid="nav-talk-expert" className="text-[13px] font-medium text-[#57534E] hover:text-[#1C1917] transition-colors duration-150 px-3 py-2">
            Talk to an Expert
          </Link>
          <Link
            to="/book-demo"
            data-testid="nav-book-demo"
            className="bg-[#E04006] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md transition-[transform,background-color] duration-200 hover:bg-[#C83805] active:scale-[0.98]"
          >
            Book a Demo
          </Link>
        </div>
        <button
          className="lg:hidden text-[#1C1917] p-2"
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-black/10 bg-[#FAFAF9]/95 backdrop-blur-2xl overflow-hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="container-x py-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link key={item.label} to={item.to} data-testid={`nav-mobile-${item.label.toLowerCase()}`} className="py-2.5 text-sm text-[#57534E] hover:text-[#1C1917] font-medium">
                  {item.label}
                </Link>
              ))}
              <Link to="/book-demo" data-testid="nav-mobile-book-demo" className="mt-4 bg-[#E04006] text-white text-sm font-semibold px-5 py-3 rounded-md text-center">
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => (
  <footer className="border-t border-black/[0.07] bg-[#FAFAF9]" data-testid="footer">
    <div className="container-x py-16 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <Logo />
          <p className="text-[#57534E] text-sm mt-5 leading-relaxed max-w-xs">
            Enterprise CRM. Unlimited Users. AI Built In. Powered by {SITE.company}.
          </p>
          <p className="font-mono2 text-[11px] text-[#57534E]/70 mt-6 leading-relaxed tracking-wider">
            {SITE.address}
            <br />
            <a href={SITE.phoneHref} data-testid="footer-phone" className="hover:text-[#1C1917] transition-colors duration-150">{SITE.phone}</a>
          </p>
        </div>
        {[
          ["Platform", [["Product", "/product"], ["Features", "/features"], ["Pricing", "/pricing"], ["Security", "/security"], ["Developers", "/developers"]]],
          ["Solutions", [["Industries", "/industries"], ["By Role", "/solutions"], ["Partners", "/partners"], ["Case Studies", "/resources/case-studies"]]],
          ["Resources", [["Blog", "/resources/blog"], ["Resources Hub", "/resources"], ["About", "/about"], ["Contact", "/contact"]]],
          ["Legal", [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Book a Demo", "/book-demo"]]],
        ].map(([title, links]) => (
          <div key={title}>
            <p className="overline-tag mb-5">{title}</p>
            <ul className="space-y-3">
              {links.map(([label, to]) => (
                <li key={to + label}>
                  <Link to={to} data-testid={`footer-${label.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-[#57534E] hover:text-[#1C1917] transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-16 pt-8 border-t border-black/[0.07] flex flex-col md:flex-row justify-between gap-4">
        <p className="font-mono2 text-[11px] text-[#57534E]/60 tracking-wider">
          © {new Date().getFullYear()} {SITE.company}. All rights reserved.
        </p>
        <p className="font-mono2 text-[11px] text-[#57534E]/60 tracking-wider">
          INTELLIGENT CRM · SALES IQ · ENTERPRISE OWNED
        </p>
      </div>
    </div>
  </footer>
);
