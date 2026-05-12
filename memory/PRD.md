# Maison Hue — Holding Page PRD

## Original Problem Statement
Build a holding page that looks exactly like the reference (luxury hair colour brand — Maison Hue, "Your Colour. Our Artistry.").

## Stack
- Backend: FastAPI + MongoDB (motor)
- Frontend: React (CRA + Tailwind + shadcn/ui + sonner)
- Email: Resend (sandbox sender onboarding@resend.dev)

## Implemented (Dec 2025)
- Hero section: MH monogram, brand wordmark, italic tagline, description, black pill CTA, dev status, product trio image
- Story section: "Rooted in you." copy, portrait, features card (Gentle & Effective / Personalised / Elevated Care) with custom SVG icons
- Waitlist form: name + email → POST /api/waitlist → MongoDB + Resend confirmation + admin notification
- Reserve Your Shade form: name + email + hair-colour select → POST /api/reserve-shade → MongoDB + Resend confirmation + admin notification + swatch image
- Footer: MH monogram, tagline, copyright, Instagram link (@maison.hue)
- Toaster (sonner) for form feedback
- Playfair Display + Outfit fonts (Google Fonts)
- data-testid on every interactive element

## Backend Endpoints
- GET  /api/                — health
- POST /api/waitlist        — {name, email}
- POST /api/reserve-shade   — {name, email, hair_colour}
- GET  /api/waitlist/count  — totals

## Env
- RESEND_API_KEY, SENDER_EMAIL=onboarding@resend.dev, ADMIN_EMAIL=alisa_dedovic@msn.com

## Notes
- Resend sandbox: emails only deliver to alisa_dedovic@msn.com until a custom domain is verified at resend.com/domains. Code already returns email_sent/admin_notified flags so the UX works regardless.

## Updates (Feb 2026)
- Page restructured into narrative flow: Hero → Story → Ritual → Vision → Join → Footer
- All section imagery now uses the founder's own brand photos (no stock imagery):
  - Hero: product trio mirror still-life
  - Story: vanity mirror application moment
  - Vision: lustrous brown wavy hair editorial shot
- Join section reformatted to a centered, full-width waitlist with perks grid (image removed per founder)
- Reserve Your Shade form temporarily not surfaced on the new layout — kept on backend, will return with AI Shade-Match prototype

## Backlog (P1)
- AI Shade-Match prototype (capture/upload photo → return closest custom shade). Founder confirmed: ship + revisit later.
- Viral referral mechanic on waitlist ("share to jump the queue")
- Custom domain verification on Resend → enable user-facing confirmations
- Domain mapping to maisonhue.co.uk on production deploy
- Admin dashboard route to view signups
- Honeypot / rate limiting on forms
- Componentise HoldingPage.jsx (Story/Ritual/Vision/Join into separate files)
