import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* === Imagery === */
const HERO_IMG = "https://customer-assets.emergentagent.com/job_landing-preview-68/artifacts/fy1ku9f5_56007AC2-9D3C-4C49-8328-3B17B58F4F50.png";
const STORY_IMG = "https://customer-assets.emergentagent.com/job_landing-preview-68/artifacts/zwscuoix_IMG_0182.jpeg";

const HAIR_COLOURS = [
  "Platinum Blonde",
  "Ash Blonde",
  "Honey Blonde",
  "Light Brown",
  "Caramel Brunette",
  "Chestnut Brown",
  "Dark Brunette",
  "Soft Black",
  "Auburn",
  "Copper Red",
  "Grey / Silver",
  "Other",
];

/* === Wordmark === */
const Wordmark = ({ size = 1, className = "" }) => (
  <div className={`inline-flex flex-col items-center ${className}`} data-testid="brand-wordmark">
    <div className="font-serif-display flex items-baseline" style={{ fontSize: 38 * size, lineHeight: 1, fontWeight: 500 }}>
      <span>M</span><span style={{ marginLeft: -9 * size }}>H</span>
    </div>
    <div className="font-sans-body mt-1.5" style={{ fontSize: 9 * size, letterSpacing: "0.42em", fontWeight: 500 }}>MAISON HUE</div>
  </div>
);

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ===== Hero ===== */
function Hero() {
  return (
    <section id="hero" className="relative" style={{ background: "var(--mh-bg)" }} data-testid="hero-section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] min-h-[92vh]">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 mh-fade">
          <div className="mb-12" data-testid="hero-monogram">
            <Wordmark size={0.85} className="!items-start" />
          </div>
          <h1
            className="font-serif-display"
            style={{ fontSize: "clamp(46px,6.5vw,86px)", lineHeight: 1, letterSpacing: "0.012em", fontWeight: 500 }}
            data-testid="hero-title"
          >
            MAISON HUE
          </h1>
          <p
            className="font-serif-display italic mt-6"
            style={{ fontSize: "clamp(22px,2.4vw,30px)", color: "var(--mh-gold-deep)" }}
            data-testid="hero-tagline"
          >
            Your Colour. Our Artistry.
          </p>
          <p
            className="mt-10 font-sans-body max-w-md"
            style={{ color: "var(--mh-ink-soft)", fontSize: 16, lineHeight: 1.85 }}
            data-testid="hero-description"
          >
            A softer, more personal way to blend<br />regrowth between salon visits.
          </p>
          <button onClick={() => scrollTo("join")} className="mh-btn-primary mt-12 self-start" data-testid="hero-cta-button">
            Join the Founding Shade List
          </button>
          <div className="mt-14 font-sans-body" style={{ color: "var(--mh-muted)", fontSize: 13, lineHeight: 2 }}>
            <div data-testid="hero-status-1">Currently in development.</div>
            <div data-testid="hero-status-2">Early access opening soon.</div>
          </div>
        </div>
        <div className="relative overflow-hidden mh-fade mh-delay-2" data-testid="hero-image-wrapper">
          <img
            src={HERO_IMG}
            alt="Maison Hue product trio — The Veil, The Hue, The Finish"
            className="w-full h-full object-cover"
            style={{ minHeight: 420 }}
            data-testid="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

/* ===== Story ===== */
const FEATURES = [
  {
    title: "Gentle & Effective",
    body: "Kind to hair and scalp.\nBlends beautifully.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="30" />
        <path d="M22 38 C22 28, 30 22, 40 22 C40 32, 34 40, 22 38 Z" />
        <path d="M22 38 L30 30" />
      </svg>
    ),
  },
  {
    title: "Personalised",
    body: "Custom colour solutions\nfor a seamless match.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="30" />
        <path d="M16 32 Q22 26, 28 32 T40 32 T52 32" />
        <path d="M16 40 Q22 34, 28 40 T40 40 T52 40" />
      </svg>
    ),
  },
  {
    title: "Elevated Care",
    body: "Thoughtful formulas.\nRefined experience.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="30" />
        <path d="M32 18 L34 28 L44 30 L34 32 L32 42 L30 32 L20 30 L30 28 Z" />
        <path d="M44 20 L45 24 L49 25 L45 26 L44 30 L43 26 L39 25 L43 24 Z" />
      </svg>
    ),
  },
];

function Story() {
  return (
    <section id="story" style={{ background: "var(--mh-bg)" }} data-testid="story-section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr_1.1fr] gap-0">
        {/* Left column: copy */}
        <div className="px-8 md:px-16 lg:px-24 py-20 lg:py-28 mh-fade">
          <div className="font-sans-body mb-10" style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--mh-gold-deep)", fontWeight: 500 }} data-testid="story-eyebrow">
            The Maison Hue Story
          </div>
          <h2
            className="font-serif-display"
            style={{ fontSize: "clamp(48px,5.5vw,76px)", lineHeight: 1.02, fontWeight: 500, letterSpacing: "-0.01em" }}
            data-testid="story-heading"
          >
            Rooted in<br /><em className="italic" style={{ fontWeight: 400 }}>you.</em>
          </h2>
          <div className="mt-12 space-y-6 font-sans-body max-w-md" style={{ color: "var(--mh-ink-soft)", fontSize: 15, lineHeight: 1.85 }} data-testid="story-copy">
            <p>We created Maison Hue for the moments between salon visits.</p>
            <p>To bring ease, confidence, and care back to your routine.</p>
            <p>Our three-step system is designed to seamlessly blend regrowth, protect your colour, and let your tone shine — beautifully, naturally, you.</p>
          </div>
        </div>

        {/* Center: tall portrait */}
        <div className="flex items-center justify-center px-4 lg:px-0 py-10 lg:py-20 mh-fade mh-delay-1" data-testid="story-image-wrapper">
          <div className="w-full max-w-[340px] h-full overflow-hidden rounded-sm" style={{ minHeight: 560, boxShadow: "0 30px 60px -30px rgba(60,40,20,0.18)" }}>
            <img
              src={STORY_IMG}
              alt="Maison Hue editorial portrait"
              className="w-full h-full object-cover"
              style={{ minHeight: 560, objectPosition: "30% center" }}
              data-testid="story-image"
            />
          </div>
        </div>

        {/* Right column: features card */}
        <div className="flex items-center justify-center px-8 md:px-12 lg:px-16 py-10 lg:py-28 mh-fade mh-delay-2">
          <div
            className="w-full max-w-xl rounded-sm px-10 py-16 lg:py-20"
            style={{ background: "var(--mh-bg-warm)" }}
            data-testid="story-features-card"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex flex-col items-center text-center" data-testid={`feature-${f.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div style={{ color: "var(--mh-gold-deep)" }}>{f.icon}</div>
                  <div
                    className="font-sans-body mt-6"
                    style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500, color: "var(--mh-ink)" }}
                  >
                    {f.title}
                  </div>
                  <p
                    className="font-sans-body mt-4 whitespace-pre-line"
                    style={{ fontSize: 13, lineHeight: 1.75, color: "var(--mh-ink-soft)" }}
                  >
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Join (Waitlist + Reserve Your Shade) ===== */
function Join() {
  const [wlName, setWlName] = useState("");
  const [wlEmail, setWlEmail] = useState("");
  const [wlLoading, setWlLoading] = useState(false);

  const [rsName, setRsName] = useState("");
  const [rsEmail, setRsEmail] = useState("");
  const [rsColour, setRsColour] = useState("");
  const [rsLoading, setRsLoading] = useState(false);

  const submitWaitlist = async (e) => {
    e.preventDefault();
    if (!wlName.trim() || !wlEmail.trim()) {
      toast.error("Please add your name and email.");
      return;
    }
    setWlLoading(true);
    try {
      await axios.post(`${API}/waitlist`, { name: wlName, email: wlEmail });
      toast.success("Welcome to the Founding Shade List.");
      setWlName("");
      setWlEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Something went wrong.");
    } finally {
      setWlLoading(false);
    }
  };

  const submitReserve = async (e) => {
    e.preventDefault();
    if (!rsName.trim() || !rsEmail.trim() || !rsColour) {
      toast.error("Please complete every field to reserve your shade.");
      return;
    }
    setRsLoading(true);
    try {
      await axios.post(`${API}/reserve-shade`, { name: rsName, email: rsEmail, hair_colour: rsColour });
      toast.success("Your shade is reserved. We'll be in touch.");
      setRsName("");
      setRsEmail("");
      setRsColour("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Something went wrong.");
    } finally {
      setRsLoading(false);
    }
  };

  return (
    <section id="join" style={{ background: "var(--mh-bg)" }} data-testid="join-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Join the Waitlist */}
        <div className="px-8 md:px-12 lg:px-16 py-20 lg:py-28 mh-fade mh-delay-1 lg:border-r" style={{ borderColor: "var(--mh-border)" }}>
          <div className="font-sans-body mb-8" style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--mh-gold-deep)", fontWeight: 500 }} data-testid="waitlist-eyebrow">
            Join the Waitlist
          </div>
          <h3
            className="font-serif-display"
            style={{ fontSize: "clamp(34px,3.6vw,52px)", lineHeight: 1.05, fontWeight: 500 }}
            data-testid="waitlist-heading"
          >
            Be the first<br />to experience<br />Maison Hue.
          </h3>
          <p className="mt-10 font-sans-body max-w-sm" style={{ fontSize: 14, color: "var(--mh-ink-soft)", lineHeight: 1.85 }} data-testid="waitlist-copy">
            Join our Founding Shade List and be the first to access early updates, exclusive offers, and launch details.
          </p>
          <form onSubmit={submitWaitlist} className="mt-10 space-y-4 max-w-sm" data-testid="waitlist-form">
            <input
              type="text"
              required
              placeholder="Your name"
              value={wlName}
              onChange={(e) => setWlName(e.target.value)}
              className="mh-input"
              data-testid="waitlist-name-input"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={wlEmail}
              onChange={(e) => setWlEmail(e.target.value)}
              className="mh-input"
              data-testid="waitlist-email-input"
            />
            <button type="submit" disabled={wlLoading} className="mh-btn-primary w-full mt-2" data-testid="waitlist-submit-button">
              {wlLoading ? "Joining…" : "Join the Waitlist"}
            </button>
          </form>
        </div>

        {/* Reserve Your Shade */}
        <div className="px-8 md:px-12 lg:px-16 py-20 lg:py-28 mh-fade mh-delay-2">
          <div className="font-sans-body mb-8" style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--mh-gold-deep)", fontWeight: 500 }} data-testid="reserve-eyebrow">
            Reserve Your Shade
          </div>
          <h3
            className="font-serif-display"
            style={{ fontSize: "clamp(34px,3.6vw,52px)", lineHeight: 1.05, fontWeight: 500 }}
            data-testid="reserve-heading"
          >
            Reserve<br /><em className="italic" style={{ fontWeight: 400 }}>your shade.</em>
          </h3>
          <p className="mt-10 font-sans-body max-w-sm" style={{ fontSize: 14, color: "var(--mh-ink-soft)", lineHeight: 1.85 }} data-testid="reserve-copy">
            Tell us a little about your colour and we'll let you know when your custom match is ready.
          </p>
          <form onSubmit={submitReserve} className="mt-10 space-y-4 max-w-sm" data-testid="reserve-form">
            <input
              type="text"
              required
              placeholder="Your name"
              value={rsName}
              onChange={(e) => setRsName(e.target.value)}
              className="mh-input"
              data-testid="reserve-name-input"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={rsEmail}
              onChange={(e) => setRsEmail(e.target.value)}
              className="mh-input"
              data-testid="reserve-email-input"
            />
            <div className="relative">
              <select
                required
                value={rsColour}
                onChange={(e) => setRsColour(e.target.value)}
                className="mh-input appearance-none pr-10 cursor-pointer"
                data-testid="reserve-colour-select"
                style={{ color: rsColour ? "var(--mh-ink)" : "#B5A78F" }}
              >
                <option value="" disabled>Your current hair colour</option>
                {HAIR_COLOURS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <button type="submit" disabled={rsLoading} className="mh-btn-gold w-full mt-2" data-testid="reserve-submit-button">
              {rsLoading ? "Reserving…" : "Reserve My Shade"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--mh-bg)", borderColor: "var(--mh-border)" }} data-testid="footer-section">
      <div className="px-8 md:px-16 py-14 flex flex-col items-center gap-5">
        <Wordmark size={0.9} />
        <div
          className="font-sans-body mt-1"
          style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--mh-ink)" }}
        >
          Your Colour. Our Artistry.
        </div>
        <div
          className="mt-6 w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 font-sans-body"
          style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--mh-muted)" }}
        >
          <span data-testid="footer-copyright">© Maison Hue. All Rights Reserved.</span>
          <span className="hidden md:inline" style={{ color: "var(--mh-border)" }}>|</span>
          <a
            href="https://instagram.com/maison.hue"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-60 transition-opacity"
            data-testid="footer-instagram"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HoldingPage() {
  return (
    <main style={{ background: "var(--mh-bg)" }} data-testid="holding-page">
      <Hero />
      <Story />
      <Join />
      <Footer />
    </main>
  );
}
