import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Instagram, ChevronDown } from "lucide-react";
import Monogram from "@/components/Monogram";
import FeatureIcon from "@/components/FeatureIcon";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HERO_IMG =
  "https://customer-assets.emergentagent.com/job_landing-preview-68/artifacts/fy1ku9f5_56007AC2-9D3C-4C49-8328-3B17B58F4F50.png";
const STORY_IMG =
  "https://images.unsplash.com/photo-1645389775672-93c014334be4?fm=jpg&q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0";
const SWATCH_IMG =
  "https://static.prod-images.emergentagent.com/jobs/90bc8e32-be42-4d94-861f-79ef9887f921/images/7c91ba6b29bcfee1c7d2e1c0472e400176c0fe2f72238faf069fb6b004e26d1a.png";

const SHADE_OPTIONS = [
  "Platinum Blonde",
  "Light Blonde",
  "Honey Blonde",
  "Dark Blonde",
  "Light Brown",
  "Medium Brown",
  "Dark Brown",
  "Black",
  "Auburn / Red",
  "Grey / Silver",
  "Colour-treated",
  "Other",
];

/* ---------------- Sections ---------------- */

function HeroSection({ onScrollToWaitlist }) {
  return (
    <section
      id="hero"
      className="relative w-full mh-fade"
      style={{ background: "var(--mh-bg)" }}
      data-testid="hero-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] lg:min-h-[92vh]">
        {/* Left copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-0 mh-fade mh-delay-1">
          <Monogram size={56} className="mb-12" />

          <h1
            className="font-serif-display"
            style={{
              fontSize: "clamp(40px, 6vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "0.02em",
              color: "var(--mh-ink)",
              fontWeight: 500,
            }}
            data-testid="hero-title"
          >
            MAISON HUE
          </h1>

          <p
            className="font-serif-display italic mt-4"
            style={{
              fontSize: "clamp(20px, 2.2vw, 26px)",
              color: "var(--mh-gold-deep)",
              letterSpacing: "0.01em",
            }}
            data-testid="hero-tagline"
          >
            Your Colour. Our Artistry.
          </p>

          <p
            className="mt-10 max-w-md font-sans-body"
            style={{ color: "var(--mh-ink-soft)", fontSize: 16, lineHeight: 1.75 }}
            data-testid="hero-description"
          >
            A softer, more personal way to blend
            <br />
            regrowth between salon visits.
          </p>

          <div className="mt-12">
            <button
              onClick={onScrollToWaitlist}
              className="mh-btn-primary"
              data-testid="hero-cta-button"
            >
              Join the Founding Shade List
            </button>
          </div>

          <div className="mt-14 font-sans-body" style={{ color: "var(--mh-muted)", fontSize: 13, lineHeight: 2 }}>
            <div data-testid="hero-status-line-1">Currently in development.</div>
            <div data-testid="hero-status-line-2">Early access opening soon.</div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative overflow-hidden mh-fade mh-delay-2" data-testid="hero-image-wrapper">
          <img
            src={HERO_IMG}
            alt="Maison Hue product trio — The Veil, The Hue, The Finish"
            className="w-full h-full object-cover"
            style={{ minHeight: 360 }}
            data-testid="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section
      className="w-full border-t"
      style={{ background: "var(--mh-bg-warm)", borderColor: "var(--mh-border)" }}
      data-testid="story-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 md:px-16 py-20 lg:py-24 mh-fade">
          <div>
            <div className="mh-eyebrow mb-8" data-testid="story-eyebrow">
              The Maison Hue Story
            </div>
            <h2
              className="font-serif-display"
              style={{ fontSize: "clamp(36px, 4.2vw, 56px)", lineHeight: 1.05, fontWeight: 500 }}
              data-testid="story-heading"
            >
              Rooted in
              <br />
              <em className="italic" style={{ fontWeight: 400 }}>you.</em>
            </h2>

            <div
              className="mt-8 space-y-5 font-sans-body"
              style={{ color: "var(--mh-ink-soft)", fontSize: 15, lineHeight: 1.8, maxWidth: 360 }}
              data-testid="story-copy"
            >
              <p>We created Maison Hue for the moments between salon visits.</p>
              <p>To bring ease, confidence, and care back to your routine.</p>
              <p>
                Our three-step system is designed to seamlessly blend regrowth, protect your colour, and let your
                tone shine — beautifully, naturally, you.
              </p>
            </div>
          </div>

          {/* Portrait */}
          <div className="flex items-start justify-center md:justify-end">
            <div
              className="w-full max-w-[320px] aspect-[3/4] overflow-hidden shadow-sm"
              style={{ borderRadius: 2 }}
              data-testid="story-portrait-wrapper"
            >
              <img
                src={STORY_IMG}
                alt="Woman with long luscious brown hair"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 20%" }}
                data-testid="story-portrait"
              />
            </div>
          </div>
        </div>

        {/* Right: feature card */}
        <div className="px-8 md:px-16 py-20 lg:py-24 flex items-center mh-fade mh-delay-1">
          <div
            className="w-full"
            style={{
              background: "#E8DECD",
              padding: "56px 40px",
              borderRadius: 4,
            }}
            data-testid="features-card"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
              <FeatureItem
                icon="leaf"
                title="Gentle & Effective"
                body={<>Kind to hair and scalp.<br />Blends beautifully.</>}
                testid="feature-gentle"
              />
              <FeatureItem
                icon="wave"
                title="Personalised"
                body={<>Custom colour solutions<br />for a seamless match.</>}
                testid="feature-personalised"
              />
              <FeatureItem
                icon="sparkle"
                title="Elevated Care"
                body={<>Thoughtful formulas.<br />Refined experience.</>}
                testid="feature-elevated"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, body, testid }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left" data-testid={testid}>
      <FeatureIcon name={icon} />
      <div
        className="mt-5 font-sans-body"
        style={{
          fontSize: 11,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "var(--mh-ink)",
          fontWeight: 500,
        }}
      >
        {title}
      </div>
      <p
        className="mt-3 font-sans-body"
        style={{ fontSize: 13, lineHeight: 1.7, color: "var(--mh-ink-soft)" }}
      >
        {body}
      </p>
    </div>
  );
}

/* --------------- Forms --------------- */

function WaitlistSection() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please add your name and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, form);
      toast.success("You're on the Founding Shade List.");
      setForm({ name: "", email: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="w-full border-t"
      style={{ background: "var(--mh-bg)", borderColor: "var(--mh-border)" }}
      data-testid="waitlist-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: vase ornament + copy */}
        <div className="relative px-8 md:px-16 py-20 lg:py-28 mh-fade">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 items-start">
            {/* Ornamental SVG vase + branches */}
            <div className="hidden md:block" aria-hidden="true">
              <svg viewBox="0 0 160 280" width="100%" height="280">
                {/* branches */}
                <g stroke="#C4A47C" strokeWidth="1" fill="none">
                  <path d="M80 200 C 80 150, 60 110, 50 70" />
                  <path d="M80 200 C 80 160, 95 120, 100 80" />
                  <path d="M80 200 C 80 170, 70 130, 65 95" />
                </g>
                {/* tiny dried buds */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={50 + (i % 4) * 16}
                    cy={70 + Math.floor(i / 4) * 22}
                    r={2.4}
                    fill="#C4A47C"
                    opacity={0.75}
                  />
                ))}
                {/* vase */}
                <path
                  d="M60 200 Q 50 230 60 260 L 100 260 Q 110 230 100 200 Z"
                  fill="#E8DECD"
                  stroke="#C4A47C"
                  strokeWidth="0.8"
                />
                <ellipse cx="80" cy="200" rx="20" ry="4" fill="#D9C9AE" />
              </svg>
            </div>

            <div>
              <div className="mh-eyebrow mb-8" data-testid="waitlist-eyebrow">
                Join the Waitlist
              </div>
              <h3
                className="font-serif-display"
                style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.1, fontWeight: 500 }}
                data-testid="waitlist-heading"
              >
                Be the first
                <br />
                to experience
                <br />
                <em className="italic" style={{ fontWeight: 400 }}>Maison Hue.</em>
              </h3>

              <p
                className="mt-6 font-sans-body"
                style={{ color: "var(--mh-ink-soft)", fontSize: 13, lineHeight: 1.8, maxWidth: 340 }}
                data-testid="waitlist-subtitle"
              >
                Join our Founding Shade List and be the first to access early updates, exclusive offers, and
                launch details.
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="px-8 md:px-16 py-20 lg:py-28 flex items-center mh-fade mh-delay-1">
          <form className="w-full max-w-md space-y-5" onSubmit={submit} data-testid="waitlist-form">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mh-input"
              data-testid="waitlist-name-input"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mh-input"
              data-testid="waitlist-email-input"
              required
            />
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="mh-btn-primary w-full md:w-auto"
                data-testid="waitlist-submit-button"
              >
                {loading ? "Submitting…" : "Join the Waitlist"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ReserveSection() {
  const [form, setForm] = useState({ name: "", email: "", hair_colour: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.hair_colour) {
      toast.error("Please complete all fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/reserve-shade`, form);
      toast.success("Your shade has been reserved.");
      setForm({ name: "", email: "", hair_colour: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Reservation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full border-t"
      style={{ background: "var(--mh-bg-warm)", borderColor: "var(--mh-border)" }}
      data-testid="reserve-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: form */}
        <div className="px-8 md:px-16 py-20 lg:py-28 mh-fade">
          <div className="mh-eyebrow mb-8" data-testid="reserve-eyebrow">
            Reserve Your Shade
          </div>
          <h3
            className="font-serif-display"
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.1, fontWeight: 500 }}
            data-testid="reserve-heading"
          >
            Reserve
            <br />
            <em className="italic" style={{ fontWeight: 400 }}>your shade.</em>
          </h3>
          <p
            className="mt-6 font-sans-body"
            style={{ color: "var(--mh-ink-soft)", fontSize: 13, lineHeight: 1.8, maxWidth: 380 }}
            data-testid="reserve-subtitle"
          >
            Tell us a little about your colour and we'll let you know when your custom match is ready.
          </p>
        </div>

        {/* Right: form fields + swatch image */}
        <div className="px-8 md:px-16 py-20 lg:py-28 mh-fade mh-delay-1">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-10 items-start">
            <form className="space-y-5 w-full max-w-md" onSubmit={submit} data-testid="reserve-form">
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mh-input"
                data-testid="reserve-name-input"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mh-input"
                data-testid="reserve-email-input"
                required
              />
              <div className="relative">
                <select
                  value={form.hair_colour}
                  onChange={(e) => setForm({ ...form, hair_colour: e.target.value })}
                  className="mh-input appearance-none pr-10"
                  data-testid="reserve-haircolour-select"
                  required
                >
                  <option value="" disabled>
                    Your current hair colour
                  </option>
                  {SHADE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--mh-muted)" }}
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="mh-btn-gold w-full md:w-auto"
                  data-testid="reserve-submit-button"
                >
                  {loading ? "Reserving…" : "Reserve My Shade"}
                </button>
              </div>
            </form>

            <div className="hidden md:flex justify-center" data-testid="reserve-swatch-wrapper">
              <img
                src={SWATCH_IMG}
                alt="Hair colour swatches"
                className="w-full max-w-[140px] object-contain"
                data-testid="reserve-swatch-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer
      className="w-full border-t"
      style={{ background: "var(--mh-bg)", borderColor: "var(--mh-border)" }}
      data-testid="footer-section"
    >
      <div className="flex flex-col items-center text-center px-8 py-16 md:py-20">
        <Monogram size={44} />
        <div
          className="mt-6 font-sans-body"
          style={{ fontSize: 11, letterSpacing: "0.36em", textTransform: "uppercase", color: "var(--mh-ink)" }}
          data-testid="footer-tagline"
        >
          Your Colour. Our Artistry.
        </div>

        <div
          className="mt-10 flex flex-col md:flex-row items-center gap-4 md:gap-12 font-sans-body"
          style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--mh-muted)" }}
        >
          <span data-testid="footer-copyright">© Maison Hue. All Rights Reserved.</span>
          <span className="hidden md:inline-block" style={{ width: 1, height: 14, background: "var(--mh-border)" }} />
          <a
            href="https://instagram.com/maison.hue"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
            data-testid="footer-instagram-link"
            style={{ color: "var(--mh-muted)" }}
          >
            <Instagram size={14} />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* --------------- Page --------------- */

export default function HoldingPage() {
  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--mh-bg)" }} data-testid="holding-page">
      <HeroSection onScrollToWaitlist={scrollToWaitlist} />
      <StorySection />
      <WaitlistSection />
      <ReserveSection />
      <FooterSection />
    </main>
  );
}
