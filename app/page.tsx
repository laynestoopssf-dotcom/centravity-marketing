"use client";

import React, { useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  LineChart,
  Trophy,
  Zap,
} from "lucide-react";

const APP_URL = "https://app.centravityhq.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Scoreboard", href: "#scoreboard" },
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
  const [betaFull, setBetaFull] = useState(false);
  const [name, setName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    if (!betaFull) {
      if (!name.trim() || !agencyName.trim()) return;
    }

    setIsSubmitting(true);

    const payload = {
      email: trimmedEmail,
      name: betaFull ? null : name.trim(),
      agency_name: betaFull ? null : agencyName.trim(),
      lead_type: betaFull ? "waitlist" : "beta",
    };

    const { error } = await supabase.from("agency_leads").insert(payload);

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    setFormStatus("success");
    setName("");
    setAgencyName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100">
              <BarChart3 size={16} className="text-purple-600" aria-hidden />
            </span>
            <span className="text-sm font-bold tracking-[0.16em] text-slate-900">CENTRAVITY</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-purple-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={APP_URL}
            className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
          >
            Sign In
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-700">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                Live agency scoreboard
              </p>
              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.15rem]">
                Stop Guessing. Start Pacing. The Ultimate Scoreboard for Insurance Agencies.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
                Centravity automates complex commission calculations across Auto, Fire, Commercial, Life, and Health.
                Turn your agency&apos;s data into real-time, role-gated leaderboards that drive revenue.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => scrollToId("beta")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
                >
                  Apply for Private Beta
                  <ArrowRight size={16} aria-hidden />
                </button>
                <a
                  href={APP_URL}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                >
                  Sign In
                </a>
              </div>
            </div>

            {/* Leaderboard mockup */}
            <div id="scoreboard" className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Agency Leaderboard · Today
                  </p>
                  <span className="rounded-lg bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 ring-1 ring-teal-100">
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-b border-slate-100 px-4 py-3">
                  {[
                    { label: "Outbound", value: "142" },
                    { label: "Quotes", value: "38" },
                    { label: "Bound", value: "18" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{kpi.label}</p>
                      <p className="mt-0.5 text-lg font-bold tabular-nums text-slate-900">{kpi.value}</p>
                    </div>
                  ))}
                </div>

                <div className="px-2 py-2">
                  <div className="grid grid-cols-[1.4fr_0.7fr_0.6fr_0.6fr_0.9fr] gap-2 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
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
                        i === 0 ? "bg-purple-50 ring-1 ring-purple-100" : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{row.name}</p>
                        <p className="text-[10px] text-slate-400">{row.role}</p>
                      </div>
                      <span className="text-xs text-slate-500">{row.line}</span>
                      <span className="text-right text-sm tabular-nums text-slate-600">{row.quotes}</span>
                      <span className="text-right text-sm font-semibold tabular-nums text-slate-900">{row.apps}</span>
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              row.pace >= 100 ? "bg-teal-500" : row.pace >= 85 ? "bg-purple-600" : "bg-slate-400"
                            }`}
                            style={{ width: `${Math.min(row.pace, 100)}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            row.pace >= 100 ? "text-teal-600" : row.pace >= 85 ? "text-purple-600" : "text-slate-500"
                          }`}
                        >
                          {row.pace}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3">
                  <p className="text-[11px] text-slate-400">
                    Multi-line goals · Auto · Fire · Commercial · Life · Health
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-slate-200/80">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">The Scoreboard Engine</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything your agency needs to pace, compete, and close.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-500">
                Centravity turns production data into a living scoreboard—built for producers, managers, and owners.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, body }, index) => {
                const isHighlight = index === 0;
                return (
                  <article
                    key={title}
                    className={`group rounded-2xl p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      isHighlight
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200/80 bg-white"
                    }`}
                  >
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition ${
                        isHighlight
                          ? "bg-purple-600 text-white"
                          : "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
                      }`}
                    >
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className={`mt-4 text-lg font-bold ${isHighlight ? "text-white" : "text-slate-900"}`}>
                      {title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed ${isHighlight ? "text-slate-400" : "text-slate-500"}`}>
                      {body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beta Application / Waitlist */}
        <section id="beta" className="border-t border-slate-200/80">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="rounded-2xl bg-slate-900 px-6 py-10 shadow-lg md:px-12 md:py-14">
              <div className="mx-auto max-w-lg text-center">
                {!betaFull ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-400">
                      Limited Access
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Centravity Private Beta
                    </h2>
                    <p className="mt-3 text-base text-slate-400">
                      Apply for early access and help shape the scoreboard built for insurance agencies.
                    </p>

                    {formStatus === "success" ? (
                      <p className="mt-8 text-sm font-semibold text-teal-400">
                        Application received. We&apos;ll be in touch.
                      </p>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="mt-8 space-y-3 text-left">
                        <div>
                          <label htmlFor="beta-name" className="sr-only">
                            Name
                          </label>
                          <input
                            id="beta-name"
                            type="text"
                            required
                            disabled={isSubmitting}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                          />
                        </div>
                        <div>
                          <label htmlFor="beta-agency" className="sr-only">
                            Agency name
                          </label>
                          <input
                            id="beta-agency"
                            type="text"
                            required
                            disabled={isSubmitting}
                            value={agencyName}
                            onChange={(e) => setAgencyName(e.target.value)}
                            placeholder="Agency name"
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                          />
                        </div>
                        <div>
                          <label htmlFor="beta-email" className="sr-only">
                            Email
                          </label>
                          <input
                            id="beta-email"
                            type="email"
                            required
                            disabled={isSubmitting}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@agency.com"
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? "Submitting..." : "Apply for Beta (Limited Spots)"}
                        </button>
                        {errorMessage ? (
                          <p className="text-center text-sm text-red-400">{errorMessage}</p>
                        ) : null}
                        <p className="text-center text-xs text-slate-500">
                          Currently accepting 10 founding agencies.
                        </p>
                      </form>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-400">
                      Waitlist Open
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Beta is currently at capacity
                    </h2>
                    <p className="mt-3 text-base text-slate-400">
                      Join the waitlist and we&apos;ll notify you as soon as launch spots open.
                    </p>

                    {formStatus === "success" ? (
                      <p className="mt-8 text-sm font-semibold text-teal-400">
                        Application received. We&apos;ll be in touch.
                      </p>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <label htmlFor="waitlist-email" className="sr-only">
                          Work email
                        </label>
                        <input
                          id="waitlist-email"
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@agency.com"
                          className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? "Submitting..." : "Join Waitlist"}
                        </button>
                        {errorMessage ? (
                          <p className="w-full text-center text-sm text-red-400">{errorMessage}</p>
                        ) : null}
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-slate-700">CENTRAVITY</span>
            <span className="text-slate-300">·</span>
            <span>© {new Date().getFullYear()} Centravity</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="transition hover:text-purple-600">
              Privacy
            </a>
            <a href="#" className="transition hover:text-purple-600">
              Terms
            </a>
            <a href={APP_URL} className="font-medium text-purple-600 transition hover:text-purple-700">
              Sign In
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
