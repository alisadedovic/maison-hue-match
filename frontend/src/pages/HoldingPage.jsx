import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Instagram, Gift, FlaskConical, Gem, Heart } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HERO_IMG = "https://customer-assets.emergentagent.com/job_landing-preview-68/artifacts/fy1ku9f5_56007AC2-9D3C-4C49-8328-3B17B58F4F50.png";
const STORY_IMG = "https://customer-assets.emergentagent.com/job_landing-preview-68/artifacts/kya45fan_A073E9E4-F669-44DA-81EA-9C0AFE166765.png";
const VISION_IMG = "https://customer-assets.emergentagent.com/job_landing-preview-68/artifacts/zwscuoix_IMG_0182.jpeg";

const NAV = [
  { label: "The Story", id: "story" },
  { label: "The Ritual", id: "ritual" },
  { label: "Our Vision", id: "vision" },
  { label: "Join", id: "join" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ===== Wordmark ===== */
const Wordmark = ({ size = 1, className = "" }) => (
  <div className={`inline-flex flex-col items-center ${className}`} data-testid="brand-wordmark">
    <div className="font-serif-display flex items-baseline" style={{ fontSize: 36 * size, lineHeight: 1, fontWeight: 500 }}>
      <span>M</span><span style={{ marginLeft: -8 * size }}>H</span>
    </div>
    <div className="font-sans-body mt-1" style={{ fontSize: 9 * size, letterSpacing: "0.42em", fontWeight: 500 }}>MAISON HUE</div>
  </div>
);

/* ===== Top Nav ===== */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b" style={{ background: "rgba(245,239,230,0.85)", borderColor: "var(--mh-border)" }} data-testid="top-nav">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="cursor-pointer" data-testid="nav-logo">
          <Wordmark size={0.75} />
        </button>
        <div className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="font-sans-body hover:opacity-60 transition-opacity"
              style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--mh-ink)" }}
              data-testid={`nav-${n.id}`}>{n.label}</button>
          ))}
          <a href="https://instagram.com/maison.hue" target="_blank" rel="noreferrer" data-testid="nav-instagram"
             className="hover:opacity-60 transition-opacity" style={{ color: "var(--mh-ink)" }}>
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ===== Hero ===== */
function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const parallax = Math.min(y * 0.15, 100);

  return (
    <section id="hero" className="relative" style={{ background: "var(--mh-bg)" }} data-testid="hero-section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] min-h-[90vh]">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 mh-fade">
          <h1 className="font-serif-display" style={{ fontSize: "clamp(44px,6.5vw,84px)", lineHeight: 1, letterSpacing: "0.015em", fontWeight: 500 }} data-testid="hero-title">MAISON HUE</h1>
          <p className="font-serif-display italic mt-5" style={{ fontSize: "clamp(22px,2.4vw,30px)", color: "var(--mh-gold-deep)" }} data-testid="hero-tagline">Your Colour. Our Artistry.</p>
          <p className="mt-10 font-sans-body max-w-md" style={{ color: "var(--mh-ink-soft)", fontSize: 16, lineHeight: 1.75 }} data-testid="hero-description">
            A softer, more personal way to blend<br />regrowth between salon visits.
          </p>
          <button onClick={() => scrollTo("join")} className="mh-btn-primary mt-12 self-start" data-testid="hero-cta-button">Join the Founding Shade List</button>
          <div className="mt-14 font-sans-body" style={{ color: "var(--mh-muted)", fontSize: 13, lineHeight: 2 }}>
            <div data-testid="hero-status-1">Currently in development.</div>
            <div data-testid="hero-status-2">Early access opening soon.</div>
          </div>
        </div>
        <div className="relative overflow-hidden mh-fade mh-delay-2" data-testid="hero-image-wrapper">
          <img src={HERO_IMG} alt="Maison Hue product trio" className="w-full h-full object-cover"
               style={{ minHeight: 420, transform: `translate3d(0,${parallax}px,0)`, willChange: "transform" }} data-testid="hero-image" />
        </div>
      </div>
    </section>
  );
}

/* ===== Section title (eyebrow + rule) ===== */
const Eyebrow = ({ children, testid }) => (
  <div className="flex items-center gap-4 mb-8" data-testid={testid}>
    <span style={{ width: 28, height: 1, background: "var(--mh-ink)" }} />
    <span className="font-sans-body" style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--mh-ink)", fontWeight: 500 }}>{children}</span>
  </div>
);

/* ===== Story ===== */
function Story() {
  return (
    <section id="story" className="border-t" style={{ background: "var(--mh-bg-warm)", borderColor: "var(--mh-border)" }} data-testid="story-section">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.4fr]">
        <div className="overflow-hidden" data-testid="story-image-wrapper">
          <img src={STORY_IMG} alt="Maison Hue colour artistry" className="w-full h-full object-cover" style={{ minHeight: 520, objectPosition: "center center" }} data-testid="story-image" />
        </div>
        <div className="px-8 md:px-16 lg:px-24 py-20 lg:py-28">
          <Eyebrow testid="story-eyebrow">The Story</Eyebrow>
          <h2 className="font-serif-display max-w-2xl" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2, fontWeight: 500 }} data-testid="story-heading">
            It started with a frustration<br />so many women know.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 font-sans-body" style={{ color: "var(--mh-ink-soft)", fontSize: 15, lineHeight: 1.85 }}>
            <div data-testid="story-left">
              <p>You colour your hair beautifully.</p>
              <p>Then the roots appear.</p>
              <p>You reach for a temporary root product.</p>
              <p>And somehow it looks worse,</p>
              <p>because the colour still doesn't match.</p>
            </div>
            <div data-testid="story-right">
              <p>Maison Hue is being created for<br />that in-between moment.</p>
              <p className="mt-5"><strong style={{ color: "var(--mh-ink)" }}>Not harsh.<br />Not flat.<br />Not obvious.</strong></p>
              <p className="mt-5">Just softer, more seamless root blending designed around your colour.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Ritual ===== */
const RITUAL = [
  { n: "01", title: "The Veil", body: "Softens the appearance of regrowth and prepares the roots for blending." },
  { n: "02", title: "The Hue", body: "A personalised colour layer designed to blend into your existing shade." },
  { n: "03", title: "The Finish", body: "A setting mist created to add shine, freshness and hold." },
];

function Ritual() {
  return (
    <section id="ritual" className="border-t" style={{ background: "var(--mh-bg)", borderColor: "var(--mh-border)" }} data-testid="ritual-section">
      <div className="px-8 md:px-16 lg:px-24 py-20 lg:py-28 text-center">
        <Eyebrow testid="ritual-eyebrow">The Ritual</Eyebrow>
        <h2 className="font-serif-display mx-auto" style={{ fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.2, fontWeight: 500 }} data-testid="ritual-heading">
          Three steps. <em className="italic" style={{ fontWeight: 400 }}>Seamless results.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-16 max-w-6xl mx-auto">
          {RITUAL.map((r, i) => (
            <div key={r.n} className="flex flex-col items-center text-center mh-fade" style={{ animationDelay: `${0.15 * i}s` }} data-testid={`ritual-${r.n}`}>
              <div className="w-32 h-44 mb-6 rounded-sm flex items-end justify-center" style={{ background: "linear-gradient(180deg,#EFE6D9 0%,#E5DCCF 100%)" }}>
                <div className="font-serif-display" style={{ fontSize: 28, color: "var(--mh-gold-deep)", marginBottom: 24, fontWeight: 500 }}>MH</div>
              </div>
              <div className="font-serif-display" style={{ fontSize: 30, fontWeight: 500 }}>{r.n}</div>
              <div className="font-sans-body mt-2" style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500 }}>{r.title}</div>
              <p className="font-sans-body mt-5 max-w-[220px]" style={{ fontSize: 14, lineHeight: 1.7, color: "var(--mh-ink-soft)" }}>{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Vision ===== */
function Vision() {
  return (
    <section id="vision" className="border-t" style={{ background: "var(--mh-bg-warm)", borderColor: "var(--mh-border)" }} data-testid="vision-section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr]">
        <div className="px-8 md:px-16 lg:px-24 py-20 lg:py-28">
          <Eyebrow testid="vision-eyebrow">Our Vision</Eyebrow>
          <h2 className="font-serif-display" style={{ fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.15, fontWeight: 500 }} data-testid="vision-heading">
            More than roots.<br /><em className="italic" style={{ fontWeight: 400 }}>A future of beautiful hair.</em>
          </h2>
          <div className="mt-8 space-y-5 font-sans-body max-w-md" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--mh-ink-soft)" }} data-testid="vision-copy">
            <p>Maison Hue is currently in development as a personalised hair beauty brand.</p>
            <p>The first focus is seamless root blending. The bigger vision is colour care that feels personal, beautiful and effortless.</p>
          </div>
        </div>
        <div className="overflow-hidden" data-testid="vision-image-wrapper">
          <img src={VISION_IMG} alt="Maison Hue beauty reference" className="w-full h-full object-cover" style={{ minHeight: 480 }} data-testid="vision-image" />
        </div>
      </div>
    </section>
  );
}

/* ===== Join ===== */
const PERKS = [
  { icon: Gift, title: "Early Access", body: "Be the first to know" },
  { icon: FlaskConical, title: "Shade Testing", body: "Help shape our shades" },
  { icon: Gem, title: "Exclusive Updates", body: "Behind the scenes & launches" },
  { icon: Heart, title: "Founder Community", body: "For real conversations and feedback" },
];

function Join() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please add your email."); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, { name: email.split("@")[0], email });
      toast.success("Welcome to the Founding Shade List.");
      setEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Something went wrong.");
    } finally { setLoading(false); }
  };

  return (
    <section id="join" className="border-t" style={{ background: "var(--mh-bg)", borderColor: "var(--mh-border)" }} data-testid="join-section">
      <div className="px-8 md:px-16 lg:px-24 py-20 lg:py-24 max-w-5xl mx-auto text-center">
        <h3 className="font-sans-body" style={{ fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 500 }} data-testid="join-heading">Join the Founding Shade List</h3>
        <p className="font-sans-body mt-4 mx-auto max-w-md" style={{ fontSize: 14, color: "var(--mh-ink-soft)", lineHeight: 1.7 }} data-testid="join-subtitle">
          Be first to receive updates, early access<br />and future shade testing invitations.
        </p>
        <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" data-testid="join-form">
          <input type="email" required placeholder="Enter your email address" value={email}
                 onChange={(e) => setEmail(e.target.value)} className="mh-input flex-1" data-testid="join-email-input" />
          <button type="submit" disabled={loading} className="mh-btn-primary whitespace-nowrap" data-testid="join-submit-button">
            {loading ? "Joining…" : "Join the List"}
          </button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14 max-w-3xl mx-auto" data-testid="join-perks">
          {PERKS.map((p) => (
            <div key={p.title} className="flex flex-col items-center text-center">
              <p.icon size={22} style={{ color: "var(--mh-gold-deep)" }} strokeWidth={1.2} />
              <div className="font-sans-body mt-4" style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 500 }}>{p.title}</div>
              <p className="font-sans-body mt-2" style={{ fontSize: 12, color: "var(--mh-ink-soft)", lineHeight: 1.6 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--mh-bg-warm)", borderColor: "var(--mh-border)" }} data-testid="footer-section">
      <div className="px-8 md:px-16 py-12 flex flex-col items-center gap-8">
        <Wordmark size={1} />
        <p className="font-serif-display italic" style={{ fontSize: 13, color: "var(--mh-gold-deep)" }}>Your Colour. Our Artistry.</p>
        <div className="flex flex-wrap items-center justify-center gap-8 font-sans-body" style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--mh-ink-soft)" }}>
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="hover:opacity-60 transition-opacity" data-testid={`footer-${n.id}`}>{n.label}</button>
          ))}
          <a href="https://instagram.com/maison.hue" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-60 transition-opacity" data-testid="footer-instagram">
            <span>Follow Us</span><Instagram size={13} />
          </a>
        </div>
        <div className="w-full max-w-5xl border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-sans-body"
             style={{ borderColor: "var(--mh-border)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mh-muted)" }}>
          <span data-testid="footer-copyright">© 2026 Maison Hue. All Rights Reserved. · maisonhue.co.uk</span>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-60 transition-opacity" data-testid="footer-privacy">Privacy Policy</a>
            <a href="#" className="hover:opacity-60 transition-opacity" data-testid="footer-terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HoldingPage() {
  return (
    <main style={{ background: "var(--mh-bg)" }} data-testid="holding-page">
      <Nav />
      <Hero />
      <Story />
      <Ritual />
      <Vision />
      <Join />
      <Footer />
    </main>
  );
}
