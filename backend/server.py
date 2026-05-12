from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import uuid
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', '')
BRAND_NAME = os.environ.get('BRAND_NAME', 'Maison Hue')

app = FastAPI(title="Maison Hue API")
api_router = APIRouter(prefix="/api")


# ============ Models ============
class WaitlistCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr


class ReserveShadeCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    hair_colour: str = Field(..., min_length=1, max_length=80)


class SignupResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    created_at: datetime
    email_sent: bool
    admin_notified: bool


# ============ Email helpers ============
def _waitlist_user_html(name: str) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:48px 16px;font-family:Georgia,'Times New Roman',serif;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FDFBF7;border:1px solid #E5DCCF;padding:48px;">
          <tr><td align="center" style="font-family:Georgia,serif;font-size:36px;letter-spacing:6px;color:#1A1A1A;padding-bottom:8px;">MH</td></tr>
          <tr><td align="center" style="font-family:Georgia,serif;font-size:28px;letter-spacing:4px;color:#1A1A1A;padding-bottom:24px;">MAISON HUE</td></tr>
          <tr><td align="center" style="font-family:Georgia,serif;font-style:italic;color:#C4A47C;font-size:16px;padding-bottom:32px;">Your Colour. Our Artistry.</td></tr>
          <tr><td style="font-family:Arial,sans-serif;font-size:15px;color:#4A4A4A;line-height:1.7;">
            <p>Dear {name},</p>
            <p>Thank you for joining the Founding Shade List.</p>
            <p>You are now amongst the first to experience Maison Hue — a softer, more personal way to blend regrowth between salon visits.</p>
            <p>We'll be in touch soon with early access updates, exclusive offers, and launch details.</p>
            <p style="margin-top:32px;">With care,<br/>The Maison Hue Atelier</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


def _reserve_user_html(name: str, hair_colour: str) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:48px 16px;font-family:Georgia,'Times New Roman',serif;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FDFBF7;border:1px solid #E5DCCF;padding:48px;">
          <tr><td align="center" style="font-family:Georgia,serif;font-size:36px;letter-spacing:6px;color:#1A1A1A;padding-bottom:8px;">MH</td></tr>
          <tr><td align="center" style="font-family:Georgia,serif;font-size:28px;letter-spacing:4px;color:#1A1A1A;padding-bottom:24px;">MAISON HUE</td></tr>
          <tr><td align="center" style="font-family:Georgia,serif;font-style:italic;color:#C4A47C;font-size:16px;padding-bottom:32px;">Your Colour. Our Artistry.</td></tr>
          <tr><td style="font-family:Arial,sans-serif;font-size:15px;color:#4A4A4A;line-height:1.7;">
            <p>Dear {name},</p>
            <p>Your shade reservation has been received.</p>
            <p style="background:#F5EFE6;padding:16px 20px;border-left:3px solid #C4A47C;">
              <strong style="color:#1A1A1A;">Current Hair Colour:</strong> {hair_colour}
            </p>
            <p>Our colourists will craft a custom match for you. We'll let you know the moment your bespoke shade is ready.</p>
            <p style="margin-top:32px;">With care,<br/>The Maison Hue Atelier</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


def _admin_html(kind: str, payload: dict) -> str:
    rows = "".join(
        f'<tr><td style="padding:8px 12px;color:#7A7A7A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">{k}</td>'
        f'<td style="padding:8px 12px;color:#1A1A1A;font-size:15px;">{v}</td></tr>'
        for k, v in payload.items()
    )
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:32px 16px;font-family:Arial,sans-serif;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FDFBF7;border:1px solid #E5DCCF;padding:32px;">
          <tr><td style="font-family:Georgia,serif;font-size:20px;color:#1A1A1A;padding-bottom:16px;border-bottom:1px solid #E5DCCF;">
            New {kind} — Maison Hue
          </td></tr>
          <tr><td style="padding-top:16px;">
            <table width="100%" cellpadding="0" cellspacing="0">{rows}</table>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_email(to_email: str, subject: str, html: str) -> bool:
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not configured; skipping email send.")
        return False
    try:
        params = {"from": SENDER_EMAIL, "to": [to_email], "subject": subject, "html": html}
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent to {to_email}: {result.get('id') if isinstance(result, dict) else result}")
        return True
    except Exception as e:
        logger.error(f"Email to {to_email} failed: {e}")
        return False


# ============ Routes ============
@api_router.get("/")
async def root():
    return {"message": "Maison Hue API", "status": "ok"}


@api_router.post("/waitlist", response_model=SignupResponse)
async def join_waitlist(payload: WaitlistCreate):
    now = datetime.now(timezone.utc)
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "created_at": now.isoformat(),
        "source": "waitlist",
    }
    try:
        await db.waitlist.insert_one({**doc})
    except Exception as e:
        logger.error(f"Mongo insert failed (waitlist): {e}")
        raise HTTPException(status_code=500, detail="Could not save your submission.")

    # Fire emails (best-effort, parallel)
    user_task = _send_email(
        doc["email"],
        "Welcome to the Maison Hue Founding Shade List",
        _waitlist_user_html(doc["name"]),
    )
    admin_task = _send_email(
        ADMIN_EMAIL,
        f"[Maison Hue] New waitlist signup — {doc['name']}",
        _admin_html("Waitlist Signup", {"Name": doc["name"], "Email": doc["email"], "Time": doc["created_at"]}),
    ) if ADMIN_EMAIL else asyncio.sleep(0, result=False)

    email_sent, admin_notified = await asyncio.gather(user_task, admin_task)

    return SignupResponse(
        id=doc["id"], name=doc["name"], email=doc["email"],
        created_at=now, email_sent=bool(email_sent), admin_notified=bool(admin_notified),
    )


@api_router.post("/reserve-shade", response_model=SignupResponse)
async def reserve_shade(payload: ReserveShadeCreate):
    now = datetime.now(timezone.utc)
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "hair_colour": payload.hair_colour.strip(),
        "created_at": now.isoformat(),
        "source": "reserve_shade",
    }
    try:
        await db.shade_reservations.insert_one({**doc})
    except Exception as e:
        logger.error(f"Mongo insert failed (reserve): {e}")
        raise HTTPException(status_code=500, detail="Could not save your reservation.")

    user_task = _send_email(
        doc["email"],
        "Your Maison Hue shade reservation",
        _reserve_user_html(doc["name"], doc["hair_colour"]),
    )
    admin_task = _send_email(
        ADMIN_EMAIL,
        f"[Maison Hue] New shade reservation — {doc['name']}",
        _admin_html("Shade Reservation", {
            "Name": doc["name"], "Email": doc["email"],
            "Hair Colour": doc["hair_colour"], "Time": doc["created_at"],
        }),
    ) if ADMIN_EMAIL else asyncio.sleep(0, result=False)

    email_sent, admin_notified = await asyncio.gather(user_task, admin_task)

    return SignupResponse(
        id=doc["id"], name=doc["name"], email=doc["email"],
        created_at=now, email_sent=bool(email_sent), admin_notified=bool(admin_notified),
    )


@api_router.get("/waitlist/count")
async def waitlist_count():
    return {
        "waitlist": await db.waitlist.count_documents({}),
        "shade_reservations": await db.shade_reservations.count_documents({}),
    }


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
