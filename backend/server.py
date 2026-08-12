from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import resend
import bcrypt
import jwt
from fastapi import Request, Depends

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'hello@devobyte.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")


class DemoRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: str
    phone: Optional[str] = None
    team_size: Optional[str] = None
    deployment: Optional[str] = None
    message: Optional[str] = None
    source: str = "book-demo"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class DemoRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    phone: Optional[str] = None
    team_size: Optional[str] = None
    deployment: Optional[str] = None
    message: Optional[str] = None
    source: str = "book-demo"


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    subject: str
    message: str


def email_html(title: str, rows: dict) -> str:
    body = "".join(
        f'<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600;color:#111;">{k}</td>'
        f'<td style="padding:8px 12px;border:1px solid #e5e5e5;color:#333;">{v or "-"}</td></tr>'
        for k, v in rows.items()
    )
    return (
        f'<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">'
        f'<h2 style="color:#050505;border-bottom:2px solid #FF3333;padding-bottom:8px;">{title}</h2>'
        f'<table style="border-collapse:collapse;width:100%;font-size:14px;">{body}</table>'
        f'<p style="color:#777;font-size:12px;margin-top:16px;">Submitted via the Intelligent CRM website (Sales IQ by Devobyte OPC Private Limited).</p>'
        f'</div>'
    )


async def send_notification(subject: str, html: str):
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not set; skipping email notification")
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": subject,
        "html": html,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
    except Exception as e:
        logger.error(f"Resend notification failed: {e}")


@api_router.get("/")
async def root():
    return {"message": "Sales IQ API online"}


@api_router.post("/demo-requests", response_model=DemoRequest)
async def create_demo_request(input: DemoRequestCreate):
    obj = DemoRequest(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.demo_requests.insert_one(doc)
    await send_notification(
        f"New Demo Request — {obj.company}",
        email_html("New Demo Request", {
            "Name": obj.name, "Email": obj.email, "Company": obj.company,
            "Phone": obj.phone, "Team Size": obj.team_size,
            "Deployment Interest": obj.deployment, "Message": obj.message,
            "Source": obj.source,
        }),
    )
    return obj


@api_router.get("/demo-requests", response_model=List[DemoRequest])
async def list_demo_requests():
    docs = await db.demo_requests.find({}, {"_id": 0}).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.post("/contact-messages", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    obj = ContactMessage(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    await send_notification(
        f"New Contact Message — {obj.subject}",
        email_html("New Contact Message", {
            "Name": obj.name, "Email": obj.email, "Company": obj.company,
            "Subject": obj.subject, "Message": obj.message,
        }),
    )
    return obj


@api_router.get("/contact-messages", response_model=List[ContactMessage])
async def list_contact_messages():
    docs = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_admin_token(email: str) -> str:
    payload = {"sub": email, "role": "admin", "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, get_jwt_secret(), algorithm="HS256")


async def require_admin(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return payload["sub"]


@app.on_event("startup")
async def seed_admin():
    email = os.environ["ADMIN_EMAIL"].lower()
    password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({
            "email": email, "password_hash": hash_password(password),
            "name": "Admin", "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    elif not verify_password(password, existing["password_hash"]):
        await db.users.update_one({"email": email}, {"$set": {"password_hash": hash_password(password)}})


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


@api_router.post("/admin/login")
async def admin_login(input: AdminLogin):
    user = await db.users.find_one({"email": input.email.lower(), "role": "admin"})
    if not user or not verify_password(input.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"token": create_admin_token(user["email"]), "email": user["email"], "name": user.get("name", "Admin")}


@api_router.get("/admin/leads")
async def admin_leads(admin=Depends(require_admin)):
    demos = await db.demo_requests.find({}, {"_id": 0}).to_list(1000)
    contacts = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for d in demos:
        d["kind"] = "demo"
        d.setdefault("status", "new")
    for c in contacts:
        c["kind"] = "contact"
        c.setdefault("status", "new")
    leads = demos + contacts
    leads.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return leads


class LeadStatusUpdate(BaseModel):
    status: str


@api_router.patch("/admin/leads/{kind}/{lead_id}")
async def admin_update_lead(kind: str, lead_id: str, input: LeadStatusUpdate, admin=Depends(require_admin)):
    if input.status not in ("new", "contacted", "closed"):
        raise HTTPException(status_code=400, detail="Invalid status")
    coll = db.demo_requests if kind == "demo" else db.contact_messages
    result = await coll.update_one({"id": lead_id}, {"$set": {"status": input.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"ok": True}


class TrackEvent(BaseModel):
    path: str


@api_router.post("/track")
async def track_pageview(input: TrackEvent):
    path = (input.path or "/")[:200]
    if path.startswith("/admin"):
        return {"ok": True}
    await db.pageviews.insert_one({"path": path, "ts": datetime.now(timezone.utc).isoformat()})
    return {"ok": True}


@api_router.get("/admin/analytics")
async def admin_analytics(admin=Depends(require_admin)):
    total = await db.pageviews.count_documents({})
    by_path = await db.pageviews.aggregate([
        {"$group": {"_id": "$path", "views": {"$sum": 1}}},
        {"$sort": {"views": -1}},
        {"$limit": 15},
    ]).to_list(15)
    since = (datetime.now(timezone.utc) - timedelta(days=13)).replace(hour=0, minute=0, second=0).isoformat()
    by_day = await db.pageviews.aggregate([
        {"$match": {"ts": {"$gte": since}}},
        {"$group": {"_id": {"$substr": ["$ts", 0, 10]}, "views": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
    ]).to_list(30)
    return {
        "total": total,
        "top_pages": [{"path": r["_id"], "views": r["views"]} for r in by_path],
        "daily": [{"date": r["_id"], "views": r["views"]} for r in by_day],
    }


class SeoEntry(BaseModel):
    path: str
    title: str = ""
    description: str = ""


class SeoBulkUpdate(BaseModel):
    entries: List[SeoEntry]


@api_router.get("/seo")
async def public_seo():
    docs = await db.seo_meta.find({}, {"_id": 0}).to_list(500)
    return {d["path"]: {"title": d.get("title", ""), "description": d.get("description", "")} for d in docs}


@api_router.put("/admin/seo")
async def admin_save_seo(input: SeoBulkUpdate, admin=Depends(require_admin)):
    for e in input.entries:
        await db.seo_meta.update_one(
            {"path": e.path},
            {"$set": {"title": e.title, "description": e.description}},
            upsert=True,
        )
    return {"ok": True, "count": len(input.entries)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
