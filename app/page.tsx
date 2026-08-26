"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calculator,
  Compass,
  Cpu,
  FileText,
  HeartHandshake,
  LineChart,
  PhoneCall,
  Shield,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
    iconClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    icon: Calculator,
    title: "Built from the Desk, Not Silicon Valley",
    body: "Engineered specifically to handle the unique math of an independent insurance agency. We decouple Life and Health from P&C Variable Comp, completely eliminating the need for messy side-spreadsheets.",
    iconClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  },
  {
    icon: LineChart,
    title: "Active Course-Correction",
    body: "Stop waiting for month-end reports to realize you missed a tier. Centravity constantly recalculates your trajectory based on today's bound policies.",
    iconClass: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  },
] as const;

const ROLE_TILES = [
  {
    icon: Target,
    role: "Sales Producers",
    title: "Know exactly where you stand—today.",
    body: "Real-time tracking for outbound calls, quoting KPIs, and pace to goal. No end-of-week surprises. No guessing if you're winning the day.",
    Visual: LivePacingVisual,
    iconClass: "bg-blue-50 text-blue-600",
    hoverBorder: "hover:border-blue-200",
  },
  {
    icon: Briefcase,
    role: "Office Managers & Operations",
    title: "Pipeline clarity without the chase.",
    body: "Clear workflow visibility across quotes, apps, and binds. Spot bottlenecks early and keep the floor moving—without hovering over every desk.",
    Visual: RollingMetricsVisual,
    iconClass: "bg-purple-50 text-purple-600",
    hoverBorder: "hover:border-purple-200",
  },
  {
    icon: Users,
    role: "Agency Owners",
    title: "Move from boss to mentor.",
    body: "Intuitive performance insights that power coaching conversations—not interrogation. Lead with data, develop people, grow production.",
    Visual: TeamVisibilityVisual,
    iconClass: "bg-emerald-50 text-emerald-600",
    hoverBorder: "hover:border-emerald-200",
  },
] as const;

const TREND_DATA = [
  { name: "Wk 1", Pacing: 58, Goal: 65 },
  { name: "Wk 2", Pacing: 64, Goal: 68 },
  { name: "Wk 3", Pacing: 70, Goal: 72 },
  { name: "Wk 4", Pacing: 79, Goal: 76 },
  { name: "Wk 5", Pacing: 88, Goal: 80 },
  { name: "Wk 6", Pacing: 96, Goal: 84 },
  { name: "Wk 7", Pacing: 104, Goal: 88 },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Hero: literal clone of the Agent Dashboard's metric tiles + production roster, desensitized */
function DashboardMockupGraphic() {
  const producers = [
    { name: "Producer A", apps: 6, premium: 4200 },
    { name: "Agent B", apps: 4, premium: 2850 },
    { name: "Producer C", apps: 3, premium: 1975 },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
        </div>
        <span className="text-[11px] font-bold text-gray-500">Agent Dashboard</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Demo Data
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="rounded-lg bg-blue-50 p-1 text-blue-500">
                <PhoneCall size={12} aria-hidden />
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wide text-gray-400">Outbound</span>
            </div>
            <p className="text-lg font-black text-gray-900">42</p>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100">
              <div className="h-1.5 rounded-full bg-blue-500" style={{ width: "78%" }} />
            </div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="rounded-lg bg-purple-50 p-1 text-purple-500">
                <FileText size={12} aria-hidden />
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wide text-gray-400">Quotes</span>
            </div>
            <p className="text-lg font-black text-gray-900">9</p>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100">
              <div className="h-1.5 rounded-full bg-purple-500" style={{ width: "60%" }} />
            </div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="rounded-lg bg-emerald-50 p-1 text-emerald-500">
                <ShieldCheck size={12} aria-hidden />
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wide text-gray-400">Bound</span>
            </div>
            <p className="text-lg font-black text-gray-900">4</p>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100">
              <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "80%" }} />
            </div>
          </div>
        </div>

        {/* Dark elevated "Premium" tile — literal clone of the gray-900 card pattern */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-3.5 text-white">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wide text-gray-500">MTD Premium</span>
            <span className="text-[9px] font-bold uppercase tracking-wide text-gray-500">Pace 104%</span>
          </div>
          <p className="text-xl font-black text-white">$18,400</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-800">
            <div className="h-1.5 rounded-full bg-gray-500" style={{ width: "88%" }} />
          </div>
        </div>

        {/* Today's Production roster — literal clone of the roster table */}
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <div className="border-b border-gray-100 bg-gray-50 px-3 py-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Today&apos;s Production</p>
          </div>
          <table className="w-full text-left text-[10px]">
            <tbody className="divide-y divide-gray-50">
              {producers.map((p) => (
                <tr key={p.name}>
                  <td className="px-3 py-2 font-bold text-gray-900">{p.name}</td>
                  <td className="px-3 py-2 text-center font-black text-emerald-600">{p.apps}</td>
                  <td className="px-3 py-2 text-right font-bold text-gray-600">${p.premium.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Micro-visual: flat live pacing bar, matching the Outbound tile's blue progress bar */
function LivePacingVisual() {
  return (
    <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-gray-400">
        <span>Today&apos;s Pace</span>
        <span className="text-blue-600">92%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-[92%] rounded-full bg-blue-500" />
      </div>
    </div>
  );
}

/** Micro-visual: flat rolling trend line, matching the Quotes chart's purple stroke */
function RollingMetricsVisual() {
  return (
    <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-gray-400">
        <span>30-Day Trend</span>
        <span className="text-purple-600">+18%</span>
      </div>
      <svg viewBox="0 0 96 32" className="h-8 w-full" preserveAspectRatio="none" aria-hidden>
        <polyline
          points="0,28 12,24 24,26 36,18 48,20 60,12 72,14 84,6 96,8"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="96" cy="8" r="2.5" fill="#8b5cf6" />
      </svg>
    </div>
  );
}

/** Micro-visual: overlapping team avatars, matching the Bound/emerald active-state theme */
function TeamVisibilityVisual() {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex -space-x-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-8 w-8 rounded-full border-2 border-gray-50 ${
              i === 1 ? "bg-emerald-500 ring-2 ring-emerald-200" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] font-bold text-gray-500">4 producers online</span>
    </div>
  );
}

/** "Your Team Isn't a Call Center": literal clone of the YTD Line of Business Progress card, desensitized */
function CommissionComplexityVisual() {
  const lines = [
    { label: "Auto Apps", value: 34, target: 40, color: "bg-blue-500" },
    { label: "Fire Apps", value: 21, target: 30, color: "bg-red-500" },
    { label: "Commercial Apps", value: 14, target: 20, color: "bg-indigo-500" },
    { label: "Life Apps", value: 9, target: 15, color: "bg-amber-500" },
    { label: "Health Apps", value: 18, target: 25, color: "bg-emerald-500" },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-gray-900">
          <Compass className="text-emerald-500" size={20} aria-hidden />
          YTD Line of Business
        </h3>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">
          Demo Data
        </span>
      </div>

      <div className="space-y-4">
        {lines.map((line) => (
          <div key={line.label}>
            <div className="mb-1.5 flex items-end justify-between">
              <span className="text-xs font-bold text-gray-800">{line.label}</span>
              <span className="text-[10px] font-bold text-gray-500">
                {line.value} / {line.target}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-2 rounded-full ${line.color}`}
                style={{ width: `${Math.min(100, (line.value / line.target) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Complex Res. override — matches the app's purple "Complex Res." theme */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-purple-100 bg-purple-50 px-4 py-3">
        <div>
          <p className="text-xs font-bold text-purple-700">Complex Res. Override</p>
          <p className="text-[10px] text-purple-500">Multi-line tier adjustment</p>
        </div>
        <span className="text-sm font-black text-purple-700">×1.18</span>
      </div>

      {/* Formula strip */}
      <div className="mt-3 truncate rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 font-mono text-[10px] text-gray-500">
        <span className="text-gray-600">Base Comp</span>
        <span className="mx-1 text-gray-400">×</span>
        <span className="text-gray-600">Tier Multiplier</span>
        <span className="mx-1 text-gray-400">+</span>
        <span className="font-bold text-purple-600">CR Override</span>
        <span className="mx-1 text-gray-400">=</span>
        <span className="font-bold text-gray-900">Final Payout</span>
      </div>
    </div>
  );
}

/** "Real Coaching": literal recharts clone of the 7-Day Activity History chart, desensitized */
function CoachingTrendlineVisual() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-bold text-gray-900">
          <BarChart3 size={18} className="text-gray-400" aria-hidden />
          Cockpit — Pacing Trend
        </h3>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wide">
          <span className="flex items-center gap-1.5 text-blue-600">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Current Pacing
          </span>
          <span className="flex items-center gap-1.5 text-gray-400">
            <span className="h-0.5 w-4 rounded-full border-t-2 border-dashed border-gray-400" />
            30-Day Goal
          </span>
        </div>
      </div>
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPacing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
            <Area
              type="monotone"
              name="Current Pacing"
              dataKey="Pacing"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPacing)"
            />
            <Line type="monotone" name="30-Day Goal" dataKey="Goal" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-center text-[11px] font-semibold text-gray-400">Demo data for illustrative purposes only.</p>
    </div>
  );
}

/** Origin section: abstract blueprint geometry overlapping a stylized insurance application form */
function OriginBlueprintVisual() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-800 bg-gray-900" aria-hidden>
      <svg viewBox="0 0 320 400" className="absolute inset-0 h-full w-full" fill="none">
        {/* Blueprint grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="320" y2={i * 50} stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
        ))}

        {/* Construction geometry */}
        <circle cx="160" cy="180" r="120" fill="none" stroke="#3b82f6" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.4" />
        <circle cx="160" cy="180" r="80" fill="none" stroke="#3b82f6" strokeWidth="0.75" strokeDasharray="2 5" opacity="0.35" />
        <line x1="40" y1="180" x2="280" y2="180" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.3" />
        <line x1="160" y1="60" x2="160" y2="300" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.3" />
        <path d="M60 90 L100 90 L100 60" stroke="#3b82f6" strokeWidth="0.75" opacity="0.35" fill="none" />
        <path d="M260 270 L220 270 L220 300" stroke="#3b82f6" strokeWidth="0.75" opacity="0.35" fill="none" />
        <circle cx="60" cy="90" r="2.5" fill="#3b82f6" opacity="0.6" />
        <circle cx="260" cy="270" r="2.5" fill="#3b82f6" opacity="0.6" />

        {/* Stylized insurance application form, overlapping the blueprint */}
        <g>
          <rect x="105" y="110" width="110" height="150" rx="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="119" y="126" width="60" height="8" rx="4" fill="#3b82f6" opacity="0.85" />
          <rect x="119" y="150" width="82" height="5" rx="2.5" fill="#374151" />
          <rect x="119" y="164" width="70" height="5" rx="2.5" fill="#374151" />
          <rect x="119" y="178" width="82" height="5" rx="2.5" fill="#374151" />
          <rect x="119" y="192" width="55" height="5" rx="2.5" fill="#374151" />
          <rect x="119" y="210" width="12" height="12" rx="3" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M121.5 216 L125 219.5 L130.5 212" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="138" y="213" width="63" height="5" rx="2.5" fill="#374151" />
          <line x1="119" y1="240" x2="201" y2="240" stroke="#4b5563" strokeWidth="1" strokeDasharray="2 3" />
          <path
            d="M122 236 Q130 228 136 236 Q142 244 148 236 Q154 228 160 236"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent px-5 pb-5 pt-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-400">Engineered from the Trenches</p>
        <p className="mt-1 text-sm font-semibold text-white">Blueprint meets bind sheet</p>
      </div>
    </div>
  );
}

/** Compact engine architecture concept */
function EngineConceptGraphic() {
  return (
    <div className="flex aspect-[4/3] flex-col justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-hidden>
      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Activity Capture</p>
        <p className="mt-1 text-sm font-bold text-gray-900">Calls · Quotes · Apps · Binds</p>
      </div>
      <div className="flex justify-center">
        <div className="h-6 w-px bg-gradient-to-b from-blue-300 to-purple-300" />
      </div>
      <div className="rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Centravity Engine</p>
        <p className="mt-1 text-sm font-bold text-gray-900">Real-time multi-line math</p>
      </div>
      <div className="flex justify-center">
        <div className="h-6 w-px bg-gradient-to-b from-purple-300 to-emerald-300" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Producers", "Ops", "Owners"].map((role) => (
          <div key={role} className="rounded-lg border border-gray-100 bg-gray-50 px-2 py-2.5 text-center">
            <p className="text-[10px] font-bold text-gray-700">{role}</p>
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
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50">
              <BarChart3 size={16} className="text-blue-600" aria-hidden />
            </span>
            <span className="text-sm font-bold tracking-[0.16em] text-gray-900">CENTRAVITY</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-blue-600">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={APP_URL}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
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
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
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
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Secure Your Beta Access
                    <ArrowRight size={16} aria-hidden />
                  </button>
                  <a
                    href={APP_URL}
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
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
        <section id="features" className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">The Scoreboard Engine</p>
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
              {FEATURES.map(({ icon: Icon, title, body, iconClass }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition ${iconClass}`}>
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
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
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
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
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
        <section id="mentorship" className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Mentorship in Action</p>
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
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Role-Specific Clarity</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                One platform. Three vantage points. Zero noise.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Everyone sees what they need to win their role—nothing more. That&apos;s how you scale an agency without
                drowning in dashboards.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {ROLE_TILES.map(({ icon: Icon, role, title, body, Visual, iconClass, hoverBorder }) => (
                <article
                  key={role}
                  className={`rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:bg-white hover:shadow-sm ${hoverBorder}`}
                >
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>
                    <Icon size={20} aria-hidden />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">{role}</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
                  <Visual />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Origin / About */}
        <section id="founder" className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="mx-auto w-full max-w-sm lg:mx-0">
                <OriginBlueprintVisual />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
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
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
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
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-10 md:px-12 md:py-14">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
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
                        className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
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
        <section id="beta" className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-10 shadow-sm md:px-12 md:py-14">
              <div className="mx-auto max-w-lg text-center">
                {!betaFull ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                      Limited Access
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Centravity Private Beta
                    </h2>
                    <p className="mt-3 text-base text-gray-600">
                      Apply for early access and help shape the coaching-first scoreboard built for insurance agencies.
                    </p>

                    {formStatus === "success" ? (
                      <p className="mt-8 text-sm font-semibold text-emerald-600">
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
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
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
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
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
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
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
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                      Waitlist Open
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Beta is currently at capacity
                    </h2>
                    <p className="mt-3 text-base text-gray-600">
                      Join the waitlist and we&apos;ll notify you as soon as launch spots open.
                    </p>

                    {formStatus === "success" ? (
                      <p className="mt-8 text-sm font-semibold text-emerald-600">
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
                          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
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
            <a href="#" className="transition hover:text-blue-600">
              Privacy
            </a>
            <a href="#" className="transition hover:text-blue-600">
              Terms
            </a>
            <a href={APP_URL} className="font-medium text-blue-600 transition hover:text-blue-700">
              Sign In
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
