import { BarChart3 } from "lucide-react";

const LOGIN_URL = "https://app.centravityhq.com/";

export default function StealthLandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center antialiased">
      <div className="flex flex-col items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20 ring-1 ring-purple-500/30">
          <BarChart3 size={26} className="text-purple-400" aria-hidden />
        </span>

        <h1 className="mt-6 text-lg font-bold tracking-[0.2em] text-white">CENTRAVITY</h1>

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Private Access
        </p>

        <a
          href={LOGIN_URL}
          className="mt-10 inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(147,51,234,0.5)] transition hover:bg-purple-500"
        >
          Member Login
        </a>
      </div>
    </div>
  );
}
