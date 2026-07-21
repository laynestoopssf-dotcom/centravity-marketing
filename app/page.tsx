"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  LineChart,
  Trophy,
  Zap,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Scoreboard", href: "#scoreboard" },
  { label: "Pricing", href: "#pricing" },
] as const;

const FEATURES = [
  {
    icon: Zap,
    title: "Real-Time Production Pacing",
    body: "Instant insight into daily outbound calls, quotes, bound policies, and multi-line placement ratios—so your team always knows if they're ahead or behind.",
  },
  {
    icon: Calculator,
    title: "Automated Multi-Line Math",
    body: "Eradicate spreadsheets. Seamless calculation support for Auto, Fire, Commercial, Life, and Health—commission-ready without the manual grind.",
  },
  {
    icon: Trophy,
    title: "Gamified Team Leaderboards",
    body: "Role-gated visibility that fuels healthy competition and accountability without micromanagement. Everyone sees what they need—nothing more.",
  },
  {
    icon: LineChart,
    title: "Executive Insights",
    body: "One-click cash flow, commission forecasting, and team performance breakdowns built for agency owners who need clarity, not clutter.",
  },
] as const;

const LEADERBOARD_ROWS = [
  { name: "Alex M.", role: "Producer", apps: 6, quotes: 14, pace: 112, line: "Auto" },
  { name: "Jordan K.", role: "Producer", apps: 5, quotes: 11, pace: 98, line: "Fire" },
  { name: "Sam R.", role: "Manager", apps: 4, quotes: 9, pace: 91, line: "Life" },
  { name: "Casey T.", role: "Producer", apps: 3, quotes: 8, pace: 74, line: "Commercial" },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "submitted">("idle");

  const handleWaitlist = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setWaitlistStatus("submitted");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50">
              <BarChart3 size={16} className="text-blue-600" aria-hidden />
            </span>
            <span className="text-sm font-bold tracking-[0.16em] text-gray-900">CENTRAVITY</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Live agency scoreboard
              </p>
              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.15rem]">
                Stop Guessing. Start Pacing. The Ultimate Scoreboard for Insurance Agencies.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
                Centravity automates complex commission calculations across Auto, Fire, Commercial, Life, and Health.
                Turn your agency&apos;s data into real-time, role-gated leaderboards that drive revenue.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  View Live Demo
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToId("waitlist")}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Light leaderboard mockup */}
            <div id="scoreboard" className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Agency Leaderboard · Today
                  </p>
                  <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-b border-gray-100 px-4 py-3">
                  {[
                    { label: "Outbound", value: "142" },
                    { label: "Quotes", value: "38" },
                    { label: "Bound", value: "18" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{kpi.label}</p>
                      <p className="mt-0.5 text-lg font-bold tabular-nums text-gray-900">{kpi.value}</p>
                    </div>
                  ))}
                </div>

                <div className="px-2 py-2">
                  <div className="grid grid-cols-[1.4fr_0.7fr_0.6fr_0.6fr_0.9fr] gap-2 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    <span>Producer</span>
                    <span>Line</span>
                    <span className="text-right">Quotes</span>
                    <span className="text-right">Apps</span>
                    <span className="text-right">Pace</span>
                  </div>
                  {LEADERBOARD_ROWS.map((row, i) => (
                    <div
                      key={row.name}
                      className={`grid grid-cols-[1.4fr_0.7fr_0.6fr_0.6fr_0.9fr] items-center gap-2 rounded-xl px-2 py-2.5 ${
                        i === 0 ? "bg-blue-50 ring-1 ring-blue-100" : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{row.name}</p>
                        <p className="text-[10px] text-gray-400">{row.role}</p>
                      </div>
                      <span className="text-xs text-gray-500">{row.line}</span>
                      <span className="text-right text-sm tabular-nums text-gray-600">{row.quotes}</span>
                      <span className="text-right text-sm font-semibold tabular-nums text-gray-900">{row.apps}</span>
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full ${
                              row.pace >= 100 ? "bg-emerald-500" : row.pace >= 85 ? "bg-blue-600" : "bg-indigo-400"
                            }`}
                            style={{ width: `${Math.min(row.pace, 100)}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            row.pace >= 100 ? "text-emerald-600" : row.pace >= 85 ? "text-blue-600" : "text-indigo-600"
                          }`}
                        >
                          {row.pace}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3">
                  <p className="text-[11px] text-gray-400">
                    Multi-line goals · Auto · Fire · Commercial · Life · Health
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">The Scoreboard Engine</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything your agency needs to pace, compete, and close.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                Centravity turns production data into a living scoreboard—built for producers, managers, and owners.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist / Pricing anchor */}
        <section id="pricing" className="border-t border-gray-100 bg-white">
          <div id="waitlist" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-10 shadow-sm md:px-12 md:py-14">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Ready to put your agency on the board?
                </h2>
                <p className="mt-3 text-base text-gray-500">
                  Join the Centravity waitlist. We&apos;ll reach out when onboarding opens for your market.
                </p>

                {waitlistStatus === "submitted" ? (
                  <p className="mt-8 text-sm font-semibold text-emerald-600">
                    You&apos;re on the list. We&apos;ll be in touch soon.
                  </p>
                ) : (
                  <form onSubmit={handleWaitlist} className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="waitlist-email" className="sr-only">
                      Work email
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@agency.com"
                      className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                      Join Waitlist
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-gray-400 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-gray-700">CENTRAVITY</span>
            <span className="text-gray-300">·</span>
            <span>© {new Date().getFullYear()} Centravity</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="transition hover:text-blue-600">
              Privacy
            </a>
            <a href="#" className="transition hover:text-blue-600">
              Terms
            </a>
            <Link href="/dashboard" className="font-medium text-blue-600 transition hover:text-blue-700">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
