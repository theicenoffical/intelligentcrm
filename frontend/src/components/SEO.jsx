import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE = "Intelligent CRM — Sales IQ";

export const SEO = ({ title, description }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} by Devobyte`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}${pathname}`);
  }, [title, description, pathname]);
  return null;
};

export const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
