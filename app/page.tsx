"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calculator,
  Cpu,
  HeartHandshake,
  LineChart,
  Shield,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const APP_URL = "https://app.centravityhq.com";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Coaching", href: "#coaching" },
  { label: "Roles", href: "#roles" },
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

const ROLE_TILES = [
  {
    icon: Target,
    role: "Sales Producers",
    title: "Know exactly where you stand—today.",
    body: "Real-time tracking for outbound calls, quoting KPIs, and pace to goal. No end-of-week surprises. No guessing if you're winning the day.",
  },
  {
    icon: Briefcase,
    role: "Office Managers & Operations",
    title: "Pipeline clarity without the chase.",
    body: "Clear workflow visibility across quotes, apps, and binds. Spot bottlenecks early and keep the floor moving—without hovering over every desk.",
  },
  {
    icon: Users,
    role: "Agency Owners",
    title: "Move from boss to mentor.",
    body: "Intuitive performance insights that power coaching conversations—not interrogation. Lead with data, develop people, grow production.",
  },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ImagePlaceholder({
  label,
  className = "",
  aspect = "aspect-[16/10]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-100 text-center text-sm font-medium tracking-wide text-gray-400 ${aspect} ${className}`}
      aria-hidden
    >
      [{label}]
    </div>
  );
}

export default function LandingPage() {
  const [betaFull, setBetaFull] = useState(false);
  const [name, setName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkBetaCapacity = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      );

      const { data: count, error } = await supabase.rpc("get_beta_count");

      if (!error && count !== null && count >= 10) {
        setBetaFull(true);
      }
    };

    checkBetaCapacity();
  }, []);

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    if (!betaFull) {
      if (!name.trim() || !agencyName.trim()) return;
    }

    setIsSubmitting(true);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

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
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50">
              <BarChart3 size={16} className="text-purple-600" aria-hidden />
            </span>
            <span className="text-sm font-bold tracking-[0.16em] text-gray-900">CENTRAVITY</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
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
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Coaching-first agency scoreboard
                </p>
                <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.15rem]">
                  Stop Micromanaging. Start Mentoring. The Scoreboard Built for Modern Agencies.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                  Legacy tools treat your team like script-readers. Centravity turns production data into
                  real-time, role-gated leaderboards that fuel coaching—not control—across Auto, Fire,
                  Commercial, Life, and Health.
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
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Sign In
                  </a>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Built for captive agency owners tired of spreadsheet chaos and surveillance-style dashboards.
                </p>
              </div>

              <div id="scoreboard">
                <ImagePlaceholder label="Dashboard Mockup Screen" aspect="aspect-[4/3]" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-gray-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">The Scoreboard Engine</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Everything your agency needs to pace, compete, and close.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Centravity turns production data into a living scoreboard—built for producers, managers, and owners
                  who refuse to run their agency on yesterday&apos;s tools.
                </p>
              </div>
              <ImagePlaceholder label="Dashboard Preview" className="hidden lg:block" aspect="aspect-[5/3]" />
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-Micromanagement Hook */}
        <section id="coaching" className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                  <HeartHandshake size={14} aria-hidden />
                  The Anti-Micromanagement Hook
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Your team isn&apos;t a call center. Stop managing them like one.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Older agency platforms were built for surveillance—scripts, quotas, and pressure. Centravity is
                  built on a human-centered coaching framework: authentic connection, clear expectations, and
                  mentorship that develops producers instead of burning them out.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Accountability without the awkward desk-side check-ins",
                    "Performance visibility that invites coaching, not confrontation",
                    "A culture of ownership—not robotic script compliance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <ImagePlaceholder label="Coaching Moment" aspect="aspect-[4/3]" />
            </div>
          </div>
        </section>

        {/* Candid Coaching / Mentorship Shot */}
        <section id="mentorship" className="border-t border-gray-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Mentorship in Action</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Real coaching. Real agencies. Real results.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Centravity is designed for the moments that matter—one-on-one mentorship, floor huddles, and
                performance conversations that grow people instead of policing them.
              </p>
            </div>
            <ImagePlaceholder
              label="Candid Coaching / Mentorship Shot"
              className="mt-12"
              aspect="aspect-[21/9] min-h-[280px] md:min-h-[360px]"
            />
          </div>
        </section>

        {/* Role-Specific Clarity */}
        <section id="roles" className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Role-Specific Clarity</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                One platform. Three vantage points. Zero noise.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Everyone sees what they need to win their role—nothing more. That&apos;s how you scale an agency without
                drowning in dashboards.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {ROLE_TILES.map(({ icon: Icon, role, title, body }) => (
                <article
                  key={role}
                  className="rounded-2xl border border-gray-200 bg-slate-50 p-6 transition hover:border-purple-200 hover:bg-white hover:shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-600 ring-1 ring-gray-200">
                    <Icon size={20} aria-hidden />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-purple-600">{role}</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ImagePlaceholder label="Producer View" aspect="aspect-[16/9]" />
              <ImagePlaceholder label="Owner Insights" aspect="aspect-[16/9]" />
            </div>
          </div>
        </section>

        {/* Built by an Agent */}
        <section id="founder" className="border-t border-gray-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="mx-auto w-full max-w-sm lg:mx-0">
                <ImagePlaceholder label="Founder Shot" aspect="aspect-[4/5]" />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
                  <Shield size={14} aria-hidden />
                  Built by an Agent, for Agents
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Not another SaaS tool from people who&apos;ve never sat a desk.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Centravity was forged in the trenches of a real, active insurance agency—where missed binds, messy
                  multi-line math, and end-of-day scoreboard scramble are daily reality. We built what we needed when
                  legacy platforms fell short.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Every feature maps to friction you already feel: pacing producers without hovering, seeing true
                  pipeline health, and coaching with confidence instead of gut feel.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId("beta")}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition hover:text-purple-700"
                >
                  Join the founding agency cohort
                  <ArrowRight size={16} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tallybound Engine */}
        <section id="engine" className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="rounded-2xl border border-gray-200 bg-slate-50 px-6 py-10 md:px-12 md:py-14">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                    <Cpu size={14} aria-hidden />
                    The Tallybound Engine
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Proprietary data-tracking architecture. Real-time accuracy. Zero spreadsheet chaos.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    Under the scoreboard sits Tallybound—our proprietary engine that captures production activity as
                    it happens, calculates multi-line math cleanly, and keeps every role synced to the same source of
                    truth. No export gymnastics. No &ldquo;whose sheet is right?&rdquo; debates.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Live pacing across lines of business",
                      "Commission-ready calculations",
                      "Role-gated visibility by design",
                      "Built for captive agency workflows",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <ImagePlaceholder label="Tallybound Architecture" aspect="aspect-[4/3]" />
              </div>
            </div>
          </div>
        </section>

        {/* Beta Application / Waitlist */}
        <section id="beta" className="border-t border-gray-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 shadow-sm md:px-12 md:py-14">
              <div className="mx-auto max-w-lg text-center">
                {!betaFull ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
                      Limited Access
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Centravity Private Beta
                    </h2>
                    <p className="mt-3 text-base text-gray-600">
                      Apply for early access and help shape the coaching-first scoreboard built for insurance agencies.
                    </p>

                    {formStatus === "success" ? (
                      <p className="mt-8 text-sm font-semibold text-teal-600">
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
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
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
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
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
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
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
                          <p className="text-center text-sm text-red-500">{errorMessage}</p>
                        ) : null}
                        <p className="text-center text-xs text-gray-500">
                          Currently accepting 10 founding agencies.
                        </p>
                      </form>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                      Waitlist Open
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Beta is currently at capacity
                    </h2>
                    <p className="mt-3 text-base text-gray-600">
                      Join the waitlist and we&apos;ll notify you as soon as launch spots open.
                    </p>

                    {formStatus === "success" ? (
                      <p className="mt-8 text-sm font-semibold text-teal-600">
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
                          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? "Submitting..." : "Join Waitlist"}
                        </button>
                        {errorMessage ? (
                          <p className="w-full text-center text-sm text-red-500">{errorMessage}</p>
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
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-gray-700">CENTRAVITY</span>
            <span className="text-gray-300">·</span>
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
