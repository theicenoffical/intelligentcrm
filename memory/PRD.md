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
- P1: Real case studies once customers exist; sitemap.xml + robots.txt; OG images
- P2: Product screenshot/mockup gallery, interactive deployment-model 3D explorer, localized content
