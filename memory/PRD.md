# Sales IQ — Intelligent CRM · Product Requirements Document

## Original Problem Statement
Build a premium enterprise website for Sales IQ ("Intelligent CRM", powered by Devobyte OPC Private Limited) — an AI-enabled Enterprise CRM that customers own and control. Position as the modern alternative to Salesforce, Dynamics, HubSpot Enterprise, Zoho. Communicate trust, security, flexibility, scalability, intelligence — not hype. Office: A-522, Tower T3, NX One, Noida Extension · +91 95821 18311.

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui, React Router 7, framer-motion (scroll reveals, kinetic hero), Lenis smooth scrolling, React Three Fiber 3D data-network hero
- Backend: FastAPI + MongoDB (motor). Endpoints: GET /api/, POST+GET /api/demo-requests, POST+GET /api/contact-messages
- Email: Resend integration code complete (async, non-blocking); awaits RESEND_API_KEY
- Design: dark "intelligence dossier" aesthetic — #050505 void black, Cabinet Grotesk display, JetBrains Mono accents, #FF3333 signal red, grid borders, noise overlay, editorial marquee, numbered manifesto chapters

## User Personas (site content targets)
17 buyer personas (CEO → Procurement) and 20 industries (Manufacturing → Professional Services), each with fully written dedicated pages.

## Core Requirements (static)
- Full page structure: Home, Product, Features, Solutions, Industries, Pricing, Resources, Blog, Case Studies, About, Contact, Book Demo, Partners, Developers, Security, Privacy, Terms, 404
- Book Demo (primary CTA) + Talk to an Expert (secondary CTA), forms save + email
- No fabricated logos/testimonials/stats/certifications
- data-testid on all interactive elements; SEO titles/descriptions; FAQ schema on industry pages

## Implemented (2026-08-13, update 8 — blog management + SEO content)
- Blog is now database-driven: public GET /api/blog-posts, admin CRUD (POST/PUT/DELETE /api/admin/blog-posts, JWT-protected)
- Admin panel: new Blog tab — list, create (auto-slug, category, date, excerpt, paragraphs), edit, delete, view-live
- 6 NEW SEO-optimized posts seeded (12 total): why-crm-implementations-fail, true-cost-of-low-crm-adoption, build-vs-buy-crm-framework (from user's playbook), salesforce-alternative-unlimited-users, hubspot-vs-enterprise-crm, crm-tco-three-year-analysis
- Seeder: backend/seed_blog_posts.py (idempotent upsert, migrates static posts into DB)
- Sitemap regenerated: 66 URLs. SEO panel now lists DB blog posts
- Verified E2E: admin login → Blog tab → created post → live publicly → deleted; blog index + post pages render

## Implemented (2026-08-13, update 7 — rebrand + copy elevation)
- REBRAND: website name "Intelligent CRM" → "Design My CRM" everywhere (logo, nav, footer, admin, page titles, OG tags, mockup browser chrome app.designmycrm.com, legal pages, DEPLOY.md, backend email footer). Product name "Sales IQ" unchanged.
- og-image.png regenerated with new brand
- Copy elevation pass: rewrote pillar descriptions, deployment model copy, comparison table rows, hero subheads (Home/Product/Pricing/Features), About story, CTA copy — sharper editorial voice

## Implemented (2026-08-12, update 6 — sales playbook content infusion)
- Read user's 3 R&D documents (LinkedIn Navigator tactics, Executive Summary, CRM Sales Playbook) and infused their research into the site
- Home: new "By the numbers" band — 47% CRM failure rate, 30% typical adoption, 8–12 week implementation (framed as industry research from Devobyte's sales research)
- Pricing: concrete 3-year TCO math card (per-seat SaaS ≈ ₹1.08 Cr @ 30 users vs flat platform, break-even Year 2, labeled illustrative); FAQ now handles playbook objections ("We already use Zoho", "hire a Salesforce consultant", adoption commitment, 8–12 week implementation)
- Product: FAQ upgraded with adoption-failure framing and 8–12 week implementation timeline
- Verified visually: stats band + pricing FAQ render correctly

## Implemented (2026-08-12, update 5 — self-hosting package)
- DEPLOY.md: complete self-hosting guide (Docker install, env setup, launch, DNS/SSL, post-launch domain swap, backups, troubleshooting)
- docker-compose.yml (mongo + backend + frontend/nginx), backend/Dockerfile, frontend/Dockerfile (multi-stage yarn build → nginx), frontend/nginx.conf (SPA + /api proxy)
- Env templates: backend/.env.production.example + root .env.production.example (REACT_APP_BACKEND_URL baked at build)
- NOTE: compose YAML validated syntactically; full docker build NOT tested (no docker in this environment)

## Implemented (2026-08-12, update 4 — admin console)
- /admin: JWT-secured admin console (admin@devobyte.com, seeded from env, 12h tokens, session persists on reload)
- Leads tab: combined demo + contact inbox, status management (new/contacted/closed), filters, CSV export
- Analytics tab: self-hosted pageview tracking (POST /api/track beacon on route change, admin excluded), totals, 14-day chart (recharts), top pages
- SEO tab: edit meta title/description overrides for all 60+ pages, saved to DB, applied site-wide via public /api/seo
- Verified: login, leads list, status update, analytics aggregation, SEO save+override, 401 on unauthenticated access, reload persistence

## Implemented (2026-08-12, update 3 — gallery expansion + About photography)
- Product mockup gallery expanded to 6 crafted views: Pipeline Kanban, Executive Dashboard, Account 360, Workflow Automation (visual flow builder + run log), Natural Language Reporting (ask bar + results table + distribution bars), Mobile CRM (phone frame with agenda + AI scores)
- About page: "Inside Devobyte" editorial photo section (3 images with captions + hover zoom). NOTE: photos are curated stock — replace URLs in OFFICE_PHOTOS in src/data/site.js with real Devobyte office/team photos when available

## Implemented (2026-08-12, update 2 — light redesign + mockups + SEO)
- FULL LIGHT-THEME REDESIGN per user feedback ("dark is not looking good"): warm paper editorial system (#FAFAF9 paper, #FFFFFF surfaces, #1C1917 ink, #E04006 vermilion accent, #0F172A indigo), Satoshi body + Cabinet Grotesk display + JetBrains Mono
- Product Mockup Gallery on /product + preview on Home: 3 CSS-crafted CRM UI mockups (Pipeline Kanban with AI scores, Executive Dashboard with chart + AI forecast panel, Account 360 with AI brief) in spotlight frames with 3D tilt on hover, labeled "Illustrative product concept"
- Manifesto chapters now have massive background numerals; pricing Business card inverted (indigo); CTA sections inverted indigo
- SEO: sitemap.xml (60 URLs, generated from data files), robots.txt, OG/Twitter meta per page, og-image.png (1200x630 designed share card), favicon.svg, real page <title>
- About page: office photography added
- Verified: light theme across home/product/pricing/book-demo, mockups render, sitemap+robots+og-image served (200)

## Implemented (2026-08-12)
- All 18 routes live and verified
- Home: kinetic masked hero over 3D R3F network, pillars marquee, manifesto chapters, deployment models, AI preview, comparison table, industries grid, security strip, CTA
- 20 full industry pages (problems, challenges, why-traditional-falls-short, how Sales IQ helps, AI use cases, benefits, FAQ, SEO)
- 17 persona pages (pains, outcomes, KPIs, perspective quotes)
- Features: 20 AI capabilities with category filtering
- Pricing: 3 platform tiers, no-per-seat positioning, FAQ
- Blog: 6 full original articles; Case Studies: honest placeholder with labeled illustrative scenarios
- Book Demo + Contact forms → MongoDB + (Resend-ready) email
- Verified: demo form E2E submission via UI, API curls, 404 page, zero console errors

## Backlog / Next
- P0: Add real RESEND_API_KEY + set NOTIFICATION_EMAIL to activate lead email notifications
- P1: Real case studies once customers exist; swap sitemap/OG base URL to the production domain at launch
- P2: Product screenshot/mockup gallery, interactive deployment-model 3D explorer, localized content
