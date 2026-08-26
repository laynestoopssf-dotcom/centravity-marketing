"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Crown,
  Eye,
  Gauge,
  Menu,
  ShieldCheck,
  Star,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

const APP_URL = "https://app.centravityhq.com/";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Compliance", href: "#compliance" },
  { label: "Product", href: "#product" },
  { label: "Testimonials", href: "#testimonials" },
] as const;

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Strict OBA Compliance",
    body: "Built-in guardrails keep every producer's outside business activity documented and audit-ready—so compliance stops being a fire drill and starts being automatic.",
  },
  {
    icon: Zap,
    title: "Real-Time Activity Pacing",
    body: "Live tracking of calls, quotes, and binds against daily targets. Producers and managers always know—right now—if they're ahead or behind pace.",
  },
  {
    icon: TrendingUp,
    title: "30-Day Rolling Conversion Metrics",
    body: "No more static month-end snapshots. Centravity continuously recalculates quote-to-bind conversion over a rolling 30-day window so trends surface the moment they start.",
  },
  {
    icon: Crown,
    title: "God-Mode Agent Dashboard",
    body: "A single command view across every office, line of business, and producer—owners get full visibility without digging through five different reports.",
  },
  {
    icon: Gauge,
    title: "Automated Multi-Line Math",
    body: "Auto, Fire, Commercial, Life, and Health commission math—calculated automatically, correctly, and in real time. No more side-spreadsheets.",
  },
  {
    icon: Eye,
    title: "Role-Gated Visibility",
    body: "Producers see their pace. Managers see their office. Owners see everything. Everyone gets exactly the view they need to do their job well.",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "We used to find out we missed a compliance flag weeks later. Now Centravity catches it same-day, before it becomes a real problem.",
    name: "J. Whitfield",
    title: "Agency Owner, Multi-Line Captive Agency",
  },
  {
    quote:
      "The 30-day rolling conversion view changed how we coach. We stopped reacting to month-end numbers and started coaching to trends in real time.",
    name: "M. Alvarez",
    title: "Office Manager, 12-Producer Agency",
  },
  {
    quote:
      "God-Mode is the right name for it. I can see every office, every line, every producer's pace from one screen. It's the dashboard I always wished existed.",
    name: "R. Chen",
    title: "Multi-Office Agency Principal",
  },
] as const;

function ScreenshotPlaceholder({
  label,
  dimensions,
  aspect = "aspect-[16/10]",
  className = "",
}: {
  label: string;
  dimensions: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 text-center ${aspect} ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-500/30">
        <BarChart3 size={18} className="text-amber-400" aria-hidden />
      </span>
      <p className="text-sm font-semibold text-zinc-300">{label}</p>
      <p className="text-xs text-zinc-500">Recommended: {dimensions}</p>
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LandingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-500/30">
              <BarChart3 size={16} className="text-amber-400" aria-hidden />
            </span>
            <span className="text-sm font-bold tracking-[0.16em] text-white">CENTRAVITY</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-amber-400">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={APP_URL}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amber-500/40 hover:text-white"
            >
              Sign In
            </a>
            <a
              href={APP_URL}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_0_20px_-4px_rgba(245,158,11,0.5)] transition hover:bg-amber-400"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileNavOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileNavOpen ? (
          <div className="border-t border-zinc-800 bg-zinc-950 px-5 py-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-zinc-300">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="py-1 transition-colors hover:text-amber-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={APP_URL}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-center text-sm font-semibold text-zinc-200"
              >
                Sign In
              </a>
              <a
                href={APP_URL}
                className="rounded-xl bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-zinc-950"
              >
                Get Started
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.14),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  Now Live for Agency Owners
                </p>
                <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.15rem]">
                  The Compliant Growth Engine for Modern Insurance Agencies.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                  Centravity pairs strict OBA compliance with real-time activity pacing and 30-day rolling
                  conversion metrics—so agency owners get a God-Mode view of the entire operation without
                  the spreadsheet chaos.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={APP_URL}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-6px_rgba(245,158,11,0.55)] transition hover:bg-amber-400"
                  >
                    Start Free Trial
                    <ArrowRight size={16} aria-hidden />
                  </a>
                  <button
                    type="button"
                    onClick={() => scrollToId("product")}
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-amber-500/40 hover:bg-zinc-800 hover:text-white"
                  >
                    See It In Action
                  </button>
                </div>
                <p className="mt-4 text-xs text-zinc-500">
                  Built for captive and independent agencies that need compliance and performance in one system.
                </p>
              </div>

              <ScreenshotPlaceholder
                label="Hero Dashboard Screenshot"
                dimensions="1600 × 1000px (16:10)"
                aspect="aspect-[16/10]"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-zinc-800/80 bg-black">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Why Agencies Switch</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Compliance and performance, finally in one place.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Everything your agency needs to stay compliant, pace production, and see the whole business
                clearly—built specifically for insurance agencies, not adapted from generic CRM software.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-[0_0_30px_-12px_rgba(245,158,11,0.35)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30 transition group-hover:bg-amber-500 group-hover:text-zinc-950">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance callout */}
        <section id="compliance" className="border-t border-zinc-800/80 bg-zinc-950">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-10 md:px-12 md:py-14">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                    <ShieldCheck size={14} aria-hidden />
                    Compliance-First by Design
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    OBA compliance shouldn&apos;t be a once-a-quarter scramble.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-zinc-400">
                    Centravity tracks outside business activity disclosures alongside daily production, so
                    compliance gaps surface in real time—not during an audit. Owners get an always-current,
                    exportable record without chasing paperwork.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Real-time OBA disclosure tracking",
                      "Audit-ready activity logs",
                      "Automatic compliance flagging",
                      "Owner-level oversight across offices",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm font-medium text-zinc-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <ScreenshotPlaceholder
                  label="Compliance Tracker Screenshot"
                  dimensions="1200 × 800px (3:2)"
                  aspect="aspect-[3/2]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product / visual preview */}
        <section id="product" className="border-t border-zinc-800/80 bg-black">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">See It In Action</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                One dashboard. Every office. Zero blind spots.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                A first look at the God-Mode Agent Dashboard, real-time pacing view, and rolling conversion
                analytics that agency owners and producers use every day.
              </p>
            </div>

            <div className="mt-12">
              <ScreenshotPlaceholder
                label="God-Mode Agent Dashboard — Full Product Screenshot"
                dimensions="2400 × 1350px (16:9)"
                aspect="aspect-[16/9] min-h-[280px] md:min-h-[420px]"
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ScreenshotPlaceholder
                label="Real-Time Activity Pacing View"
                dimensions="1200 × 800px (3:2)"
                aspect="aspect-[3/2]"
              />
              <ScreenshotPlaceholder
                label="30-Day Rolling Conversion Metrics"
                dimensions="1200 × 800px (3:2)"
                aspect="aspect-[3/2]"
              />
            </div>
          </div>
        </section>

        {/* Social proof / testimonials */}
        <section id="testimonials" className="border-t border-zinc-800/80 bg-zinc-950">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Trusted by Agency Owners</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built for agencies like yours.
              </h2>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <article key={t.name} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-400 ring-1 ring-amber-500/30">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.title}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-800/80 bg-black">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-12 text-center md:px-12 md:py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.14),transparent_60%)]" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Run a compliant, high-performing agency—starting today.
                </h2>
                <p className="mt-3 text-base text-zinc-400">
                  Get the God-Mode view of your agency without the compliance risk or the spreadsheet chaos.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={APP_URL}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-6px_rgba(245,158,11,0.5)] transition hover:bg-amber-400"
                  >
                    Start Free Trial
                    <ArrowRight size={16} aria-hidden />
                  </a>
                  <a
                    href={APP_URL}
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-amber-500/40 hover:text-white"
                  >
                    Book a Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-zinc-300">CENTRAVITY</span>
            <span className="text-zinc-700">·</span>
            <span>© {new Date().getFullYear()} Centravity</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="transition hover:text-amber-400">
              Privacy
            </a>
            <a href="#" className="transition hover:text-amber-400">
              Terms
            </a>
            <a href={APP_URL} className="font-medium text-amber-400 transition hover:text-amber-300">
              Sign In
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
