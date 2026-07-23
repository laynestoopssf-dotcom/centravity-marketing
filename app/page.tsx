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
    icon: Trophy,
    title: "Data-Driven Motivation",
    body: "While the dashboard gives you the 10,000-foot view, the gamified leaderboards translate those big revenue goals into clear, bite-sized daily targets for your producers.",
  },
  {
    icon: Calculator,
    title: "Built from the Desk, Not Silicon Valley",
    body: "Engineered specifically to handle the unique math of an independent insurance agency. We decouple Life and Health from P&C Variable Comp, completely eliminating the need for messy side-spreadsheets.",
  },
  {
    icon: LineChart,
    title: "Active Course-Correction",
    body: "Stop waiting for month-end reports to realize you missed a tier. Centravity constantly recalculates your trajectory based on today's bound policies.",
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

/** Hero: illustrative Centravity dashboard mockup */
function DashboardMockupGraphic() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)]"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-gray-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600">
            <BarChart3 size={12} className="text-white" />
          </span>
          <span className="text-xs font-bold tracking-wide text-gray-900">Centravity</span>
        </div>
        <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 ring-1 ring-teal-100">
          LIVE
        </span>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Pipeline</p>
          {[
            { label: "Quotes", count: 38, width: "w-[85%]", color: "bg-purple-500" },
            { label: "Apps", count: 22, width: "w-[62%]", color: "bg-blue-500" },
            { label: "Bound", count: 18, width: "w-[48%]", color: "bg-teal-500" },
          ].map((stage) => (
            <div key={stage.label} className="rounded-xl border border-gray-100 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">{stage.label}</span>
                <span className="text-xs font-bold tabular-nums text-gray-900">{stage.count}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                <div className={`h-full rounded-full ${stage.color} ${stage.width}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Outbound", value: "142" },
              { label: "Pace", value: "104%" },
              { label: "Bound", value: "18" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-gray-100 bg-slate-50 px-2.5 py-2.5 text-center">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">{kpi.label}</p>
                <p className="mt-0.5 text-base font-bold tabular-nums text-gray-900">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-100 bg-slate-50 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Leaderboard</p>
            <div className="space-y-2">
              {[
                { name: "Alex M.", pace: "112%", highlight: true },
                { name: "Jordan K.", pace: "98%", highlight: false },
                { name: "Sam R.", pace: "91%", highlight: false },
              ].map((row) => (
                <div
                  key={row.name}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 ${
                    row.highlight ? "bg-purple-50 ring-1 ring-purple-100" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${
                        row.highlight ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {row.name.charAt(0)}
                    </span>
                    <span className="text-xs font-semibold text-gray-800">{row.name}</span>
                  </div>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      row.highlight ? "text-purple-600" : "text-gray-500"
                    }`}
                  >
                    {row.pace}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Coaching: abstract mentorship / collaboration graphic */
function CoachingConceptGraphic({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50 via-white to-purple-50 ${
        wide ? "aspect-[21/9] min-h-[280px] md:min-h-[340px]" : "aspect-[4/3]"
      }`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(147,51,234,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.08),transparent_40%)]" />

      <svg viewBox="0 0 480 360" className="absolute inset-0 h-full w-full" fill="none">
        {/* Growth arrows */}
        <path d="M60 280 L140 200 L200 230 L280 140" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <path d="M260 155 L280 140 L295 160" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <path d="M320 260 L380 180 L420 200" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
        <path d="M365 190 L380 180 L390 195" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />

        {/* Connection arcs */}
        <path d="M160 160 Q240 100 320 160" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="6 6" opacity="0.7" />

        {/* People nodes */}
        <circle cx="160" cy="170" r="28" fill="#f5f3ff" stroke="#a855f7" strokeWidth="2" />
        <circle cx="160" cy="162" r="9" fill="#a855f7" />
        <path d="M142 190 Q160 178 178 190" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" fill="none" />

        <circle cx="320" cy="170" r="28" fill="#f0fdfa" stroke="#14b8a6" strokeWidth="2" />
        <circle cx="320" cy="162" r="9" fill="#14b8a6" />
        <path d="M302 190 Q320 178 338 190" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" fill="none" />

        <circle cx="240" cy="240" r="24" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="240" cy="233" r="8" fill="#3b82f6" />
        <path d="M224 258 Q240 248 256 258" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Handshake symbol between mentors */}
        <rect x="214" y="148" width="52" height="22" rx="11" fill="#fff" stroke="#e5e7eb" strokeWidth="1.5" />
        <path d="M224 159 H256" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
        <path d="M230 154 L236 160 L230 164" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M250 154 L244 160 L250 164" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {["Mentorship", "Collaboration", "Growth"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-600 shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Founder: Bearded Agent silhouette concept */
function FounderConceptGraphic() {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-slate-50 to-gray-100"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(147,51,234,0.1),transparent_55%)]" />

      <svg viewBox="0 0 320 400" className="absolute inset-0 h-full w-full" fill="none">
        {/* Soft backdrop circle */}
        <circle cx="160" cy="175" r="110" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1" />

        {/* Shoulders / blazer */}
        <path
          d="M70 360 Q90 250 160 245 Q230 250 250 360 Z"
          fill="#1e293b"
        />
        <path
          d="M118 270 Q160 290 202 270 L210 360 L110 360 Z"
          fill="#334155"
        />
        {/* Collar / tie accent */}
        <path d="M145 255 L160 290 L175 255" fill="#7c3aed" />

        {/* Neck */}
        <rect x="145" y="195" width="30" height="55" rx="10" fill="#cbd5e1" />

        {/* Head */}
        <ellipse cx="160" cy="155" rx="48" ry="55" fill="#cbd5e1" />

        {/* Hair */}
        <path
          d="M112 145 Q112 95 160 88 Q208 95 208 145 Q200 110 160 108 Q120 110 112 145 Z"
          fill="#334155"
        />

        {/* Beard (The Bearded Agent) */}
        <path
          d="M120 170 Q125 220 160 235 Q195 220 200 170 Q190 195 160 200 Q130 195 120 170 Z"
          fill="#475569"
        />
        <path
          d="M128 168 Q135 198 160 205 Q185 198 192 168"
          stroke="#64748b"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />

        {/* Mustache */}
        <path
          d="M138 175 Q160 185 182 175"
          stroke="#475569"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-5 pb-5 pt-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">The Bearded Agent</p>
        <p className="mt-1 text-sm font-semibold text-gray-900">Built in the agency trenches</p>
      </div>
    </div>
  );
}

/** Compact engine architecture concept */
function EngineConceptGraphic() {
  return (
    <div className="flex aspect-[4/3] flex-col justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-5" aria-hidden>
      <div className="rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-600">Activity Capture</p>
        <p className="mt-1 text-sm font-bold text-gray-900">Calls · Quotes · Apps · Binds</p>
      </div>
      <div className="flex justify-center">
        <div className="h-6 w-px bg-gradient-to-b from-purple-300 to-teal-300" />
      </div>
      <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700">Centravity Engine</p>
        <p className="mt-1 text-sm font-bold text-gray-900">Real-time multi-line math</p>
      </div>
      <div className="flex justify-center">
        <div className="h-6 w-px bg-gradient-to-b from-teal-300 to-blue-300" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Producers", "Ops", "Owners"].map((role) => (
          <div key={role} className="rounded-lg border border-gray-200 bg-slate-50 px-2 py-2.5 text-center">
            <p className="text-[10px] font-semibold text-gray-700">{role}</p>
          </div>
        ))}
      </div>
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
                  Stop Guessing Where Your Agency Will Finish the Year.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                  The first predictive growth engine built exclusively for insurance agents. Plug in your revenue
                  targets, and Centravity&apos;s What-If engine maps the exact daily production your team needs to
                  get there.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => scrollToId("beta")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
                  >
                    Secure Your Beta Access
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
                <DashboardMockupGraphic />
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
              <div className="hidden lg:block">
                <DashboardMockupGraphic />
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <CoachingConceptGraphic />
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
            <div className="mt-12">
              <CoachingConceptGraphic wide />
            </div>
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
          </div>
        </section>

        {/* Built by an Agent */}
        <section id="founder" className="border-t border-gray-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="mx-auto w-full max-w-sm lg:mx-0">
                <FounderConceptGraphic />
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

        {/* Centravity Engine */}
        <section id="engine" className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="rounded-2xl border border-gray-200 bg-slate-50 px-6 py-10 md:px-12 md:py-14">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                    <Cpu size={14} aria-hidden />
                    The Centravity Engine
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Proprietary data-tracking architecture. Real-time accuracy. Zero spreadsheet chaos.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    Under the scoreboard sits the Centravity Engine—our proprietary system that captures production
                    activity as it happens, calculates multi-line math cleanly, and keeps every role synced to the
                    same source of truth. No export gymnastics. No &ldquo;whose sheet is right?&rdquo; debates.
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
                <EngineConceptGraphic />
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
