export const SITE = {
  name: "Design My CRM",
  product: "Sales IQ",
  company: "Devobyte OPC Private Limited",
  address: "A-522, Tower T3, NX One, Noida Extension",
  phone: "+91 95821 18311",
  phoneHref: "tel:+919582118311",
  email: "hello@devobyte.com",
};

export const PILLARS = [
  { id: "enterprise-first", num: "01", title: "Enterprise CRM First", short: "The whole commercial engine — accounts, pipelines, quotes, reporting — in one system of record. Not a chatbot bolted onto someone else's CRM.", body: "Sales IQ is a full customer relationship management platform designed for enterprise organizations. Accounts, contacts, leads, opportunities, pipelines, quotes, activities, reporting, automation — the entire commercial engine lives in one system your teams actually run on." },
  { id: "ai-enabled", num: "02", title: "AI Built In", short: "Research before the meeting. The summary after it. The signals in between. Intelligence woven through every stage of the deal.", body: "Lead qualification, opportunity summaries, account research, email drafting, sales coaching, pipeline insights, forecast assistance, meeting summaries and follow-up recommendations — AI works inside the CRM your team already uses, supporting sellers rather than replacing them." },
  { id: "unlimited-users", num: "03", title: "Unlimited Users", short: "Everyone who touches the customer gets access — sales, service, finance, leadership. The price never moves.", body: "Scale from a small team to thousands of employees without license costs rising simply because more people need access. Sales, support, operations, marketing, finance and leadership all work in the same system — without a procurement negotiation every time headcount grows." },
  { id: "flexible-deployment", num: "04", title: "Flexible Deployment", short: "Your data center, your cloud, or ours. The product doesn't change; the control stays with you.", body: "Choose the deployment model that fits your security, compliance and operational requirements. Run Sales IQ in your own data center, your private cloud, a dedicated hosted environment, or let us manage it for you. The software is the same; the control is yours." },
  { id: "data-ownership", num: "05", title: "Customer Data Ownership", short: "Your CRM data lives where your governance says it lives — exportable in full, at any time, in formats you can actually use.", body: "Sales IQ is designed to fit enterprise governance requirements and avoid unnecessary vendor lock-in. Your data stays where you decide it stays, under access controls you define, with export freedom built into the architecture." },
  { id: "customizable", num: "06", title: "Highly Customizable", short: "Your pipelines, your objects, your approvals, your vocabulary. The CRM bends to the business — never the reverse.", body: "Sales processes, pipelines, approval workflows, business objects, dashboards, reports, roles, permissions, integrations and industry-specific requirements — Sales IQ is configured around how your organization actually sells, not the other way around." },
  { id: "security", num: "07", title: "Enterprise Security", short: "Roles, audit trails, encryption, SSO — the controls your security team asks about first, built in from the start.", body: "Role-based access control, comprehensive audit logs, encryption in transit and at rest, Single Sign-On, backup and recovery, API integrations and a compliance-friendly architecture — the controls enterprise IT and security teams expect." },
];

export const DEPLOYMENT_MODELS = [
  { num: "A", name: "On-Premises", desc: "Your data center, your keys, your boundary — for the strictest security and sovereignty requirements.", points: ["Your infrastructure, your keys", "Air-gap friendly architecture", "Internal compliance boundary"] },
  { num: "B", name: "Private Cloud", desc: "Your own cloud tenancy — AWS, Azure or GCP — under your policies and your cloud commitments.", points: ["Your VPC, your policies", "Uses your cloud commitments", "Regional data residency"] },
  { num: "C", name: "Dedicated Hosted", desc: "Single-tenant infrastructure operated for you — isolation without the operational weight.", points: ["Single-tenant isolation", "Managed upgrades on your schedule", "Enterprise SLAs"] },
  { num: "D", name: "Managed Cloud", desc: "Operated end-to-end by Devobyte — the fastest route from signature to first login.", points: ["Fastest time to launch", "Backups and monitoring included", "Managed security patching"] },
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
  { aspect: "Licensing", them: "A meter running on every hire — costs compound with your success", us: "One platform license. Add your thousandth user; the price doesn't blink" },
  { aspect: "Deployment", them: "Their cloud, their terms, their roadmap", us: "Your data center, your cloud, or managed for you — your call" },
  { aspect: "Data", them: "Resident in vendor infrastructure, exportable in theory", us: "Yours — governed by your policies, exportable in practice" },
  { aspect: "AI", them: "A premium tier sold back to you, per seat", us: "Woven into every stage of the deal, included from day one" },
  { aspect: "Customization", them: "Consultants, quarters of waiting, and platform ceilings", us: "Configured to your process in weeks — objects, workflows, approvals" },
  { aspect: "Lock-in", them: "Exit costs designed to make leaving irrational", us: "Full export freedom. We compete on being worth keeping" },
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

export const OFFICE_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1706689656095-168768dc20a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxicmlnaHQlMjBtb2Rlcm4lMjBvZmZpY2V8ZW58MHx8fHwxNzg2NTYyMjk4fDA&ixlib=rb-4.1.0&q=85&w=1200", alt: "Bright modern workspace", caption: "The Workspace" },
  { url: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDB8fHx8MTc4NjU2MjI5OHww&ixlib=rb-4.1.0&q=85&w=1200", alt: "Team collaborating over product plans", caption: "The Team" },
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDB8fHx8MTc4NjU2MjI5OHww&ixlib=rb-4.1.0&q=85&w=1200", alt: "Team building product together around a laptop", caption: "The Craft" },
];
