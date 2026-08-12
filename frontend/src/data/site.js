export const SITE = {
  name: "Intelligent CRM",
  product: "Sales IQ",
  company: "Devobyte OPC Private Limited",
  address: "A-522, Tower T3, NX One, Noida Extension",
  phone: "+91 95821 18311",
  phoneHref: "tel:+919582118311",
  email: "hello@devobyte.com",
};

export const PILLARS = [
  { id: "enterprise-first", num: "01", title: "Enterprise CRM First", short: "A complete CRM platform — not an AI assistant, not a chatbot, not another sales tool.", body: "Sales IQ is a full customer relationship management platform designed for enterprise organizations. Accounts, contacts, leads, opportunities, pipelines, quotes, activities, reporting, automation — the entire commercial engine lives in one system your teams actually run on." },
  { id: "ai-enabled", num: "02", title: "AI Built In", short: "AI integrated across the entire sales lifecycle, assisting your team at every step.", body: "Lead qualification, opportunity summaries, account research, email drafting, sales coaching, pipeline insights, forecast assistance, meeting summaries and follow-up recommendations — AI works inside the CRM your team already uses, supporting sellers rather than replacing them." },
  { id: "unlimited-users", num: "03", title: "Unlimited Users", short: "No seat-based licensing. No per-user pricing. Ever.", body: "Scale from a small team to thousands of employees without license costs rising simply because more people need access. Sales, support, operations, marketing, finance and leadership all work in the same system — without a procurement negotiation every time headcount grows." },
  { id: "flexible-deployment", num: "04", title: "Flexible Deployment", short: "On-premises, private cloud, dedicated hosted, or managed cloud — your choice.", body: "Choose the deployment model that fits your security, compliance and operational requirements. Run Sales IQ in your own data center, your private cloud, a dedicated hosted environment, or let us manage it for you. The software is the same; the control is yours." },
  { id: "data-ownership", num: "05", title: "Customer Data Ownership", short: "Your CRM data belongs to you — governed by your policies, not ours.", body: "Sales IQ is designed to fit enterprise governance requirements and avoid unnecessary vendor lock-in. Your data stays where you decide it stays, under access controls you define, with export freedom built into the architecture." },
  { id: "customizable", num: "06", title: "Highly Customizable", short: "Every business sells differently. Sales IQ adapts to yours.", body: "Sales processes, pipelines, approval workflows, business objects, dashboards, reports, roles, permissions, integrations and industry-specific requirements — Sales IQ is configured around how your organization actually sells, not the other way around." },
  { id: "security", num: "07", title: "Enterprise Security", short: "Role-based permissions, audit logs, encryption and SSO, by design.", body: "Role-based access control, comprehensive audit logs, encryption in transit and at rest, Single Sign-On, backup and recovery, API integrations and a compliance-friendly architecture — the controls enterprise IT and security teams expect." },
];

export const DEPLOYMENT_MODELS = [
  { num: "A", name: "On-Premises", desc: "Customer-managed deployment inside your own data center. Maximum control for the strictest security and sovereignty requirements.", points: ["Your infrastructure, your keys", "Air-gap friendly architecture", "Internal compliance boundary"] },
  { num: "B", name: "Private Cloud", desc: "Customer-managed deployment in your own cloud tenancy — AWS, Azure, or GCP — under your cloud governance.", points: ["Your VPC, your policies", "Uses your cloud commitments", "Regional data residency"] },
  { num: "C", name: "Dedicated Hosted", desc: "A single-tenant environment operated for you — isolated infrastructure without the operational burden.", points: ["Single-tenant isolation", "Managed upgrades on your schedule", "Enterprise SLAs"] },
  { num: "D", name: "Managed Cloud", desc: "Fully managed by Devobyte — the fastest path to value with enterprise-grade operations included.", points: ["Fastest time to launch", "Backups and monitoring included", "Managed security patching"] },
];

export const SECURITY_CAPABILITIES = [
  { title: "Role-Based Permissions", desc: "Granular roles and field-level permissions mapped to your org structure, territories and teams." },
  { title: "Audit Logs", desc: "Comprehensive, queryable audit trails for record access, changes, logins and administrative actions." },
  { title: "Encryption", desc: "Encryption in transit and at rest, aligned to the deployment model you operate." },
  { title: "Single Sign-On", desc: "SSO via your identity provider so access follows your existing joiner-mover-leaver process." },
  { title: "Backup & Recovery", desc: "Scheduled backups and documented recovery procedures matched to your RPO/RTO targets." },
  { title: "API Integrations", desc: "Authenticated APIs for integration with ERP, telephony, marketing and data platforms." },
  { title: "Compliance-Friendly Architecture", desc: "Deployment flexibility and data controls designed to fit enterprise governance frameworks." },
  { title: "Data Residency", desc: "Keep CRM data in the region and infrastructure your policies require." },
];

export const COMPARISON = [
  { aspect: "Licensing", them: "Per-user, per-month fees that grow with every hire", us: "Unlimited users — cost doesn't scale with headcount" },
  { aspect: "Deployment", them: "Vendor's cloud, vendor's terms", us: "On-prem, private cloud, dedicated, or managed — your choice" },
  { aspect: "Data", them: "Stored in vendor-managed infrastructure", us: "Your data, your infrastructure options, your governance" },
  { aspect: "AI", them: "Sold as expensive add-on tiers", us: "Integrated across the platform from day one" },
  { aspect: "Customization", them: "Expensive consultants, platform limits", us: "Deep configuration of objects, workflows and pipelines" },
  { aspect: "Lock-in", them: "Proprietary formats, painful exits", us: "Export freedom and open APIs by design" },
];

export const NAV = [
  { label: "Product", to: "/product" },
  { label: "Features", to: "/features" },
  { label: "Industries", to: "/industries" },
  { label: "Solutions", to: "/solutions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources" },
  { label: "Company", to: "/about" },
];
