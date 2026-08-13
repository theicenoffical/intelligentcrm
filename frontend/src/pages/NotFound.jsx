import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "../components/SEO";
import { PrimaryButton, GhostButton } from "../components/kit";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="not-found-page">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="container-x relative py-40">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="overline-tag mb-6">Error · 404</p>
            <h1 className="font-display font-extrabold text-[18vw] sm:text-8xl lg:text-[10rem] leading-[0.9] tracking-[-0.04em]">
              <span className="text-stroke">Page</span> <span className="text-[#1C1917]">not found.</span>
            </h1>
            <p className="text-[#57534E] text-base md:text-lg mt-8 max-w-md leading-relaxed">
              This record doesn't exist in our system. Let's get you back to known territory.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <PrimaryButton to="/" testid="404-home">Back to Home</PrimaryButton>
              <GhostButton to="/contact" testid="404-contact">Contact Us</GhostButton>
            </div>
            <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
              {[["Product", "/product"], ["Industries", "/industries"], ["Pricing", "/pricing"], ["Book a Demo", "/book-demo"]].map(([label, to]) => (
                <Link key={to} to={to} data-testid={`404-link-${label.toLowerCase().replace(/\s+/g, "-")}`} className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#57534E] hover:text-[#1C1917] transition-colors duration-150 border-b border-transparent hover:border-[#FF4D00] pb-1">
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
