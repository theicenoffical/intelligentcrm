"""Seed blog_posts collection from src/data/blog.js + new SEO posts. Idempotent (upsert by slug)."""
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, os.path.dirname(__file__))
from pymongo import MongoClient

mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
db_name = os.environ.get("DB_NAME", "test_database")
db = MongoClient(mongo_url)[db_name]

# Parse existing posts from the frontend data file
js = Path("/app/frontend/src/data/blog.js").read_text()
posts = []
for block in re.findall(r"\{\s*slug:.*?\n  \}", js, re.S):
    def s(key):
        m = re.search(rf'{key}: "((?:[^"\\]|\\.)*)"', block)
        return m.group(1).replace('\\"', '"') if m else ""
    body = re.findall(r'^\s+"(.+)",?$', block, re.M)
    body_start = block.find("body: [")
    body_txt = block[body_start:]
    paras = re.findall(r'^\s+"(.+)",?$', body_txt, re.M)
    posts.append({
        "slug": s("slug"), "title": s("title"), "category": s("category"),
        "date": s("date"), "readTime": s("readTime"), "excerpt": s("excerpt"),
        "body": paras,
    })

NEW_POSTS = [
    {
        "slug": "why-crm-implementations-fail",
        "title": "47% of CRM Implementations Fail. The Reason Isn't Software.",
        "category": "Implementation",
        "date": "2026-07-02",
        "readTime": "6 min",
        "excerpt": "Nearly half of CRM rollouts miss their goals. The cause is rarely the platform — it's that the tool was never shaped around how the team actually sells.",
        "body": [
            "Industry research consistently puts CRM implementation failure rates close to half. Companies spend months selecting a platform, more months configuring it, and within a year the system is a quiet embarrassment: reps keep their real pipeline in spreadsheets, managers export CSVs before every meeting, and leadership quietly stops asking for reports from a system nobody trusts.",
            "The post-mortems usually blame adoption, as if thousands of sales professionals across thousands of companies all share the same character flaw. They don't. Adoption failure is a design failure. When the pipeline stages don't match the way deals actually move, when logging an activity takes forty seconds of a rep's selling hour, when the fields demand information the process never produces — the tool loses, every single day, to the spreadsheet that asks nothing.",
            "The fix is unglamorous and absolute: start from the process, not the platform. Map how your team genuinely sells — the real stages, the real approvals, the real handoffs — and configure the system around that map. Then track adoption as a first-class metric from day one, because a CRM at 30% adoption is not a system of record; it's an expensive address book.",
            "This is why Sales IQ implementations begin with process mapping before configuration, and why we treat adoption as our responsibility rather than yours. A CRM your team actually uses beats a theoretically superior one they avoid — and it isn't close.",
        ],
    },
    {
        "slug": "true-cost-of-low-crm-adoption",
        "title": "The Real Cost of Low CRM Adoption (It's Not the License Fee)",
        "category": "RevOps",
        "date": "2026-06-25",
        "readTime": "5 min",
        "excerpt": "When only a third of your team logs in, the damage isn't the wasted subscription — it's the decisions being made on a third of the truth.",
        "body": [
            "On generic platforms, typical CRM adoption hovers around 30% of the intended users. Most organizations process this as a training problem or a license-waste problem. It's neither. It's a decision-quality problem — and it's far more expensive than the subscription.",
            "Follow the chain. At 30% adoption, most customer conversations never reach the record. The pipeline you're forecasting from is a sample, not a population. Coaching happens on the deals managers happen to see. Marketing attributes revenue to the campaigns they can trace. Every downstream decision — hiring, territory design, budget allocation — inherits the distortion.",
            "Then there's the compounding cost: partial data makes the CRM less useful, which lowers adoption further, which makes the data worse. Organizations describe this as 'our CRM is a mess' and respond by shopping for a new one, carrying the same behavior into the next platform.",
            "Two levers break the cycle. First, remove the access tax: when every seat costs money, access gets rationed and the picture stays partial — unlimited users makes completeness affordable. Second, remove the admin tax: AI that captures activities, drafts follow-ups and completes records means the system serves the rep instead of the rep serving the system. Sales IQ is built on both.",
        ],
    },
    {
        "slug": "build-vs-buy-crm-framework",
        "title": "Build vs. Buy vs. Configure: A CRM Decision Framework for Enterprises",
        "category": "Strategy",
        "date": "2026-06-11",
        "readTime": "7 min",
        "excerpt": "Generic SaaS forces you to adapt to it. Building from scratch takes a year and a small fortune. The third path — a platform configured to your process — is where the math gets interesting.",
        "body": [
            "Every enterprise CRM decision is really three decisions in a trench coat. Buy generic SaaS and you get speed, at the price of forcing your process into someone else's idea of selling — plus a per-seat meter that runs for as long as you employ people. Build from scratch and you get a perfect fit, at the price of a year of development, a permanent maintenance burden, and the quiet risk that the team that built it moves on.",
            "The third path is the one most evaluations skip: a platform that arrives complete — accounts, pipelines, automation, reporting, AI — and is then configured deeply around your process. Not customized in the 'six months of consultants' sense, but shaped in weeks: your stages, your objects, your approval chains, your vocabulary.",
            "A practical framework: if your sales process is genuinely generic, generic SaaS is fine. If your process is your competitive advantage — and in manufacturing, distribution, financial services or government contracting it almost always is — then either build or configure. Between those, ask three questions: who maintains it, who owns the data, and what happens to the price when headcount doubles.",
            "Sales IQ exists for the configure path: enterprise depth out of the box, 8–12 week implementations shaped around your process, deployment under your governance, and licensing that ignores your org chart. Fit without the build.",
        ],
    },
    {
        "slug": "salesforce-alternative-unlimited-users",
        "title": "Looking for a Salesforce Alternative? Start With the Pricing Model",
        "category": "Comparisons",
        "date": "2026-05-28",
        "readTime": "6 min",
        "excerpt": "Most Salesforce alternative lists compare feature grids. The bigger difference is structural: who owns the data, where it runs, and what happens to the price as you grow.",
        "body": [
            "Search for Salesforce alternatives and you'll find a dozen feature grids that all look roughly identical — every serious platform has pipelines, automation, reporting and an app marketplace. Feature parity is not the decision. The decision is structural: licensing, deployment and ownership.",
            "Licensing first. Per-seat pricing means your CRM cost is a function of your headcount, forever. At enterprise scale this produces absurd outcomes: finance rationing access to the system of record, service teams locked out of customer context, and AI features priced as premium tiers on top of seats you already pay for.",
            "Deployment second. For regulated industries, government contractors and anyone with real data-governance requirements, 'our cloud or nothing' ends the conversation before features matter. An alternative worth evaluating offers on-premises, private cloud, dedicated hosted and managed cloud — same product, your choice.",
            "Ownership third. Ask any vendor two questions: where does my data live, and what exactly do I take with me if I leave? The answers tell you whether you're buying infrastructure or renting a room in someone else's building. Sales IQ was built as the answer to all three: unlimited users, deploy anywhere, and data ownership as architecture rather than policy.",
        ],
    },
    {
        "slug": "hubspot-vs-enterprise-crm",
        "title": "When HubSpot Stops Fitting: Signs You've Outgrown Starter CRMs",
        "category": "Comparisons",
        "date": "2026-05-14",
        "readTime": "5 min",
        "excerpt": "HubSpot is excellent — until enterprise pricing tiers, complex approvals and governance requirements enter the picture. Here's how to tell it's time to move.",
        "body": [
            "HubSpot earned its reputation honestly: fast to start, pleasant to use, genuinely useful free tier. For companies under a few dozen sellers with a straightforward process, it's often the right answer. The trouble is the success scenario — you grow, and the platform's shape stops matching yours.",
            "The signs arrive in a predictable order. First, the pricing cliff: the features you now need — custom objects, advanced permissions, real automation — live behind enterprise tiers priced per seat, and the renewal quote lands differently than the first one did. Second, the process gap: multi-stage approvals, complex account hierarchies, parallel pipelines for different business units — workarounds accumulate.",
            "Third, governance. The moment a security review asks where your customer data lives, or a compliance framework requires audit trails beyond the standard offering, vendor-cloud-only stops being a convenience and starts being a blocker.",
            "Moving doesn't mean losing what made the starter CRM good. Sales IQ keeps the usability bar — clean interface, fast onboarding, AI that removes admin work — while adding what growth demands: enterprise depth, deployment choice, unlimited users and full data ownership. The best time to evaluate is before the renewal quote forces the question.",
        ],
    },
    {
        "slug": "crm-tco-three-year-analysis",
        "title": "CRM Total Cost of Ownership: The 3-Year Math Nobody Shows You",
        "category": "Strategy",
        "date": "2026-04-30",
        "readTime": "7 min",
        "excerpt": "A per-seat CRM at 30 users compounds to roughly ₹1.08 crore over three years — before AI tiers and growth. Here's how to run honest TCO math on any CRM decision.",
        "body": [
            "CRM pricing pages show you a monthly number. CRM economics live in a three-year number. Run the illustration: a mainstream per-seat platform at roughly $100 per user per month, across 30 users, compounds to approximately ₹1.08 crore over three years — and that's before premium AI tiers, before the integration add-ons, and before you hire anyone.",
            "Now add the growth clause hiding in every per-seat contract: success reprices your software. Double the team, double the line item. Finance learns to ask whether the service team really needs access — and just like that, the system of record becomes the system of partial record, not by design but by arithmetic.",
            "Honest TCO analysis counts four things: license cost at year-three headcount (not today's), implementation and ongoing administration, the cost of the features locked behind higher tiers, and exit cost — what it would take, in money and months, to leave. That last one is the number vendors least want on the spreadsheet, and the one that most determines your negotiating position at every renewal.",
            "Sales IQ's model was designed around this math: a flat platform license that ignores headcount, AI included rather than tiered, deployment options that fit your governance, and export freedom that keeps exit cost near zero. Per-seat platforms typically break even against this model within two to three years — after which every year is margin.",
        ],
    },
]

for p in NEW_POSTS:
    posts.append(p)

IMAGES = {
    "why-crm-implementations-fail": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=85&w=1600&auto=format&fit=crop",
    "true-cost-of-low-crm-adoption": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=85&w=1600&auto=format&fit=crop",
    "end-of-per-seat-crm": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=85&w=1600&auto=format&fit=crop",
    "build-vs-buy-crm-framework": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=1600&auto=format&fit=crop",
    "own-your-crm-data": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=85&w=1600&auto=format&fit=crop",
    "salesforce-alternative-unlimited-users": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=85&w=1600&auto=format&fit=crop",
    "ai-in-crm-without-hype": "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=85&w=1600&auto=format&fit=crop",
    "hubspot-vs-enterprise-crm": "https://images.unsplash.com/photo-1551434678-e076c223a692?q=85&w=1600&auto=format&fit=crop",
    "crm-deployment-models-explained": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=85&w=1600&auto=format&fit=crop",
    "crm-tco-three-year-analysis": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=85&w=1600&auto=format&fit=crop",
    "forecast-accuracy-is-a-data-problem": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=85&w=1600&auto=format&fit=crop",
    "crm-implementation-that-sticks": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=85&w=1600&auto=format&fit=crop",
}

n = 0
for p in posts:
    if not p.get("slug") or not p.get("title"):
        continue
    p["image"] = IMAGES.get(p["slug"], "")
    db.blog_posts.update_one({"slug": p["slug"]}, {"$set": p}, upsert=True)
    n += 1

print(f"Seeded {n} blog posts. Total in DB: {db.blog_posts.count_documents({})}")
