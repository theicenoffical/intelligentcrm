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
from datetime import datetime, timezone
import resend

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
