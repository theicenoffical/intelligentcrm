import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE = "Intelligent CRM — Sales IQ";
const SITE_URL = "https://enterprise-ownership.preview.emergentagent.com";

let seoOverridesPromise = null;
const getSeoOverrides = () => {
  if (!seoOverridesPromise) {
    seoOverridesPromise = fetch(`${process.env.REACT_APP_BACKEND_URL}/api/seo`)
      .then((r) => r.json())
      .catch(() => ({}));
  }
  return seoOverridesPromise;
};

const setMeta = (attr, key, content) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const SEO = ({ title, description }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    getSeoOverrides().then((overrides) => {
      const o = overrides[pathname];
      const effTitle = o && o.title ? o.title : title;
      const effDesc = o && o.description ? o.description : description;
      const fullTitle = effTitle ? `${effTitle} | ${BASE}` : `${BASE} by Devobyte`;
      document.title = fullTitle;
      const desc = effDesc || "Enterprise CRM. Unlimited Users. AI Built In. Sales IQ is the CRM you own and control.";
      setMeta("name", "description", desc);
      setMeta("property", "og:title", fullTitle);
      setMeta("property", "og:description", desc);
      setMeta("property", "og:type", "website");
      setMeta("property", "og:url", `${SITE_URL}${pathname}`);
      setMeta("property", "og:image", `${SITE_URL}/og-image.png`);
      setMeta("property", "og:site_name", "Intelligent CRM — Sales IQ");
      setMeta("name", "twitter:card", "summary_large_image");
      setMeta("name", "twitter:title", fullTitle);
      setMeta("name", "twitter:description", desc);
      setMeta("name", "twitter:image", `${SITE_URL}/og-image.png`);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `${SITE_URL}${pathname}`);
    });
  }, [title, description, pathname]);
  return null;
};

export const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
