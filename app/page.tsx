"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Briefcase,
  Calculator,
  Cpu,
  HeartHandshake,
  LayoutDashboard,
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
    Visual: LivePacingVisual,
  },
  {
    icon: Briefcase,
    role: "Office Managers & Operations",
    title: "Pipeline clarity without the chase.",
    body: "Clear workflow visibility across quotes, apps, and binds. Spot bottlenecks early and keep the floor moving—without hovering over every desk.",
    Visual: RollingMetricsVisual,
  },
  {
    icon: Users,
    role: "Agency Owners",
    title: "Move from boss to mentor.",
    body: "Intuitive performance insights that power coaching conversations—not interrogation. Lead with data, develop people, grow production.",
    Visual: TeamVisibilityVisual,
  },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Hero: high-fidelity, desensitized "Centravity View" of the Agent Dashboard */
function DashboardMockupGraphic() {
  const kpis = [
    { label: "MTD Pacing", value: "104%" },
    { label: "Quotes MTD", value: "212" },
    { label: "Bound YTD", value: "1,340" },
  ];
  const producers = [
    { name: "Producer A", pace: 118 },
    { name: "Agent B", pace: 97 },
    { name: "Producer C", pace: 84 },
  ];
  const navIcons = [LayoutDashboard, Activity, Users, Target];
  const pacingPct = 104;
  const circumference = 2 * Math.PI * 15;

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-amber-500/10 blur-3xl" aria-hidden />
      <div
        className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
        aria-hidden
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/15 ring-1 ring-amber-500/30">
              <BarChart3 size={11} className="text-amber-400" />
            </span>
            <span className="text-[11px] font-bold tracking-wide text-zinc-300">Agent Dashboard</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 ring-1 ring-amber-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
            Demo Data
          </span>
        </div>

        <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr]">
          {/* Mock sidebar with generic nav icons */}
          <div className="flex flex-col items-center gap-4 border-r border-zinc-800 bg-zinc-900/50 py-4">
            {navIcons.map((Icon, i) => (
              <span
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  i === 0
                    ? "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.35)]"
                    : "text-zinc-600"
                }`}
              >
                <Icon size={14} aria-hidden />
              </span>
            ))}
          </div>

          {/* Main content */}
          <div className="space-y-3 p-4 sm:p-5">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-zinc-800 bg-zinc-900 px-2.5 py-2.5 text-center">
                  <p className="text-[8px] font-semibold uppercase tracking-wide text-zinc-500">{kpi.label}</p>
                  <p className="mt-0.5 text-sm font-bold tabular-nums text-white">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Pacing ring + production trend */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <div className="relative flex flex-col items-center">
                <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#27272a" strokeWidth="4" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${(Math.min(pacingPct, 100) / 100) * circumference} 999`}
                    style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.9))" }}
                  />
                </svg>
                <span className="absolute top-[15px] text-[9px] font-bold tabular-nums text-amber-400">
                  {pacingPct}%
                </span>
                <span className="mt-1 text-[8px] font-semibold uppercase tracking-wide text-zinc-500">Pacing</span>
              </div>
              <svg viewBox="0 0 100 32" className="h-8 w-full" preserveAspectRatio="none">
                <polyline
                  points="0,28 15,24 30,26 45,16 60,18 75,8 100,10"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.7))" }}
                />
              </svg>
            </div>

            {/* Generic producer leaderboard */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Producer Pace</p>
              <div className="space-y-1.5">
                {producers.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[8px] font-bold text-zinc-400">
                      {p.name.slice(-1)}
                    </span>
                    <span className="w-16 shrink-0 truncate text-[10px] font-medium text-zinc-300">{p.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{
                          width: `${Math.min(p.pace, 100)}%`,
                          boxShadow: p.pace >= 100 ? "0 0 8px rgba(245,158,11,0.7)" : undefined,
                        }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[10px] font-bold tabular-nums text-amber-400">
                      {p.pace}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Micro-visual: abstract live pacing bar with amber glow */
function LivePacingVisual() {
  return (
    <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        <span>Today&apos;s Pace</span>
        <span className="text-amber-400">92%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full w-[92%] rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.7)]" />
      </div>
    </div>
  );
}

/** Micro-visual: stylized rolling trend line */
function RollingMetricsVisual() {
  return (
    <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        <span>30-Day Trend</span>
        <span className="text-amber-400">+18%</span>
      </div>
      <svg viewBox="0 0 96 32" className="h-8 w-full" preserveAspectRatio="none" aria-hidden>
        <polyline
          points="0,28 12,24 24,26 36,18 48,20 60,12 72,14 84,6 96,8"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.7))" }}
        />
        <circle cx="96" cy="8" r="2.5" fill="#f59e0b" style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.9))" }} />
      </svg>
    </div>
  );
}

/** Micro-visual: overlapping team avatars with a glowing active state */
function TeamVisibilityVisual() {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex -space-x-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-8 w-8 rounded-full border-2 border-zinc-950 ${
              i === 1
                ? "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.7)] ring-2 ring-amber-400/50"
                : "bg-zinc-700"
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] font-semibold text-zinc-500">4 producers online</span>
    </div>
  );
}

/** "Your Team Isn't a Call Center": high-fidelity variable commission math breakdown, desensitized */
function CommissionComplexityVisual() {
  const lines = [
    { label: "Auto", mtd: 62, ytd: 84 },
    { label: "Fire", mtd: 48, ytd: 71 },
    { label: "Commercial", mtd: 55, ytd: 68 },
    { label: "Life", mtd: 40, ytd: 59 },
    { label: "Health", mtd: 33, ytd: 52 },
  ];

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
      aria-hidden
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Variable Commission Breakdown</p>
        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-zinc-500">
          Demo Data
        </span>
      </div>

      <div className="relative mt-3 space-y-1.5">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-1 text-[8px] font-semibold uppercase tracking-wide text-zinc-600">
          <span>Line</span>
          <span className="w-12 text-right">MTD</span>
          <span className="w-12 text-right">YTD</span>
        </div>
        {lines.map((line) => (
          <div
            key={line.label}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5"
          >
            <span className="text-[11px] font-semibold text-zinc-300">{line.label}</span>
            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full rounded-full bg-amber-500/60" style={{ width: `${line.mtd}%` }} />
            </div>
            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${line.ytd}%`, boxShadow: "0 0 6px rgba(245,158,11,0.6)" }}
              />
            </div>
          </div>
        ))}

        {/* Complex Res. override highlight */}
        <div className="flex items-center justify-between rounded-lg border border-amber-500/40 bg-amber-500/5 px-3 py-2 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
          <div>
            <p className="text-[11px] font-bold text-amber-300">Complex Res. Override</p>
            <p className="text-[9px] text-zinc-500">Multi-line tier adjustment</p>
          </div>
          <span className="text-xs font-bold tabular-nums text-amber-400">×1.18</span>
        </div>
      </div>

      {/* Formula strip */}
      <div className="relative mt-3 truncate rounded-lg border border-zinc-800 bg-black px-3 py-2 font-mono text-[9px] text-zinc-500">
        <span className="text-zinc-400">Base Comp</span>
        <span className="mx-1 text-amber-500">×</span>
        <span className="text-zinc-400">Tier Multiplier</span>
        <span className="mx-1 text-amber-500">+</span>
        <span className="text-amber-400">CR Override</span>
        <span className="mx-1 text-zinc-600">=</span>
        <span className="text-white">Final Payout</span>
      </div>
    </div>
  );
}

/** "Real Coaching": high-fidelity Cockpit trendline, Current Pacing vs. 30-Day Goal, desensitized */
function CoachingTrendlineVisual() {
  const currentPoints = "0,120 40,110 80,116 120,95 160,100 200,80 240,86 280,60 320,66 360,45 400,50 440,30 480,36";
  const goalPoints = "0,100 40,96 80,92 120,88 160,84 200,80 240,76 280,72 320,68 360,64 400,60 440,56 480,52";

  return (
    <div
      className="relative aspect-[21/9] min-h-[280px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] md:min-h-[340px]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_60%)]" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Cockpit — Pacing Trend</p>
          <p className="mt-0.5 text-sm font-semibold text-white">Current Pacing vs. 30-Day Goal</p>
        </div>
        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-zinc-500">
          Demo Data
        </span>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-6 text-[10px] font-semibold uppercase tracking-wide">
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
          Current Pacing
        </span>
        <span className="flex items-center gap-1.5 text-zinc-400">
          <span className="h-0.5 w-4 rounded-full border-t border-dashed border-zinc-500" />
          30-Day Goal
        </span>
      </div>

      <svg viewBox="0 0 480 140" className="relative mt-4 h-32 w-full sm:h-40" preserveAspectRatio="none">
        <polyline points={goalPoints} fill="none" stroke="#71717a" strokeWidth="2" strokeDasharray="6 5" />
        <polyline
          points={goalPoints}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="6 5"
          opacity="0.5"
          style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.5))" }}
        />
        <polyline
          points={currentPoints}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.85))" }}
        />
        <circle cx="480" cy="36" r="4" fill="#f59e0b" style={{ filter: "drop-shadow(0 0 8px rgba(245,158,11,1))" }} />
      </svg>
    </div>
  );
}

/** Origin section: abstract blueprint geometry overlapping a stylized insurance application form */
function OriginBlueprintVisual() {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(245,158,11,0.12),transparent_60%)]" />

      <svg viewBox="0 0 320 400" className="absolute inset-0 h-full w-full" fill="none">
        {/* Blueprint grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="320" y2={i * 50} stroke="#f59e0b" strokeWidth="0.5" opacity="0.12" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#f59e0b" strokeWidth="0.5" opacity="0.12" />
        ))}

        {/* Construction geometry */}
        <circle cx="160" cy="180" r="120" fill="none" stroke="#f59e0b" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.35" />
        <circle cx="160" cy="180" r="80" fill="none" stroke="#f59e0b" strokeWidth="0.75" strokeDasharray="2 5" opacity="0.3" />
        <line x1="40" y1="180" x2="280" y2="180" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.25" />
        <line x1="160" y1="60" x2="160" y2="300" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.25" />
        <path d="M60 90 L100 90 L100 60" stroke="#f59e0b" strokeWidth="0.75" opacity="0.3" fill="none" />
        <path d="M260 270 L220 270 L220 300" stroke="#f59e0b" strokeWidth="0.75" opacity="0.3" fill="none" />
        <circle cx="60" cy="90" r="2.5" fill="#f59e0b" opacity="0.5" />
        <circle cx="260" cy="270" r="2.5" fill="#f59e0b" opacity="0.5" />

        {/* Stylized insurance application form, overlapping the blueprint */}
        <g style={{ filter: "drop-shadow(0 0 10px rgba(245,158,11,0.25))" }}>
          <rect x="105" y="110" width="110" height="150" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="119" y="126" width="60" height="8" rx="4" fill="#f59e0b" opacity="0.8" />
          <rect x="119" y="150" width="82" height="5" rx="2.5" fill="#3f3f46" />
          <rect x="119" y="164" width="70" height="5" rx="2.5" fill="#3f3f46" />
          <rect x="119" y="178" width="82" height="5" rx="2.5" fill="#3f3f46" />
          <rect x="119" y="192" width="55" height="5" rx="2.5" fill="#3f3f46" />
          <rect x="119" y="210" width="12" height="12" rx="3" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M121.5 216 L125 219.5 L130.5 212" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="138" y="213" width="63" height="5" rx="2.5" fill="#3f3f46" />
          <line x1="119" y1="240" x2="201" y2="240" stroke="#52525b" strokeWidth="1" strokeDasharray="2 3" />
          <path
            d="M122 236 Q130 228 136 236 Q142 244 148 236 Q154 228 160 236"
            stroke="#f59e0b"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent px-5 pb-5 pt-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">Engineered from the Trenches</p>
        <p className="mt-1 text-sm font-semibold text-white">Blueprint meets bind sheet</p>
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
              <CommissionComplexityVisual />
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
              <CoachingTrendlineVisual />
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
              {ROLE_TILES.map(({ icon: Icon, role, title, body, Visual }) => (
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
                  <Visual />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Origin / About */}
        <section id="founder" className="border-t border-gray-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="mx-auto w-full max-w-sm lg:mx-0">
                <OriginBlueprintVisual />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
                  <Shield size={14} aria-hidden />
                  Born on the Sales Floor
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Not another SaaS tool from people who&apos;ve never sat a desk.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Centravity was born on the sales floor of a high-performing, multi-line agency—not in a boardroom.
                  It exists because legacy CRMs and generic SaaS dashboards flat-out ignore the blind spots that eat
                  into production every day: missed binds, messy multi-line math, and an end-of-day scoreboard
                  scramble nobody has time for.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  To fix it right, the agency partnered with a team of specialized enterprise software consultants
                  to engineer the platform from the ground up—built specifically to bridge the gap between what
                  producers actually do at their desks and the revenue pacing ownership needs to see.
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
