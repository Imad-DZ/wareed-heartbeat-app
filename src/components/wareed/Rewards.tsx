import { useState } from "react";
import { Award, Gift, Lock, X, Copy, Check } from "lucide-react";
import type { User } from "./types";

type Reward = {
  id: string;
  title: string;
  badge: string;
  reward: string;
  pointsNeeded: number;
  donationsNeeded: number;
  code: string;
  modalText: string;
};

const REWARDS: Reward[] = [
  {
    id: "first",
    title: "First Drop Badge",
    badge: "🥉",
    reward: "🎁 2 GB Free Internet Flexy (Mobilis / Djezzy / Ooredoo)",
    pointsNeeded: 100,
    donationsNeeded: 1,
    code: "WAREED_FLEXY_2026",
    modalText: "Your Flexy Voucher: WAREED_FLEXY_2026. Present this code at any local telecom branch.",
  },
  {
    id: "bronze",
    title: "Bronze Lifesaver Badge",
    badge: "🎖️",
    reward: "🎁 30% Discount Code on Yassir / Heetch Rides",
    pointsNeeded: 1000,
    donationsNeeded: 3,
    code: "YASSIR_WAREED_30",
    modalText: "Your Promo Code: YASSIR_WAREED_30",
  },
  {
    id: "silver",
    title: "Silver Hero Badge",
    badge: "🏅",
    reward: "🎁 500 DA Shopping Voucher at Uno Hypermarket",
    pointsNeeded: 1500,
    donationsNeeded: 5,
    code: "UNO_WAREED_500DA",
    modalText: "Your Uno Hypermarket Voucher: UNO_WAREED_500DA. Valid at all Uno stores nationwide.",
  },
];

export function Rewards({ user }: { user: User }) {
  const [open, setOpen] = useState<Reward | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards Hub</h1>
          <p className="text-muted-foreground mt-1">Real CSR partners, real perks — earned drop by drop.</p>
        </div>
        <div className="rounded-2xl px-5 py-3 text-white shadow-lg" style={{ background: "linear-gradient(135deg, var(--primary-deep), var(--primary))" }}>
          <div className="text-xs uppercase tracking-widest opacity-80">Balance</div>
          <div className="text-2xl font-bold">{user.points} <span className="text-sm font-medium opacity-80">pts</span></div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-5">
        {REWARDS.map((r) => {
          const unlocked = user.donations >= r.donationsNeeded && user.points >= r.pointsNeeded;
          const donationsShort = Math.max(0, r.donationsNeeded - user.donations);
          return (
            <div key={r.id} className={`relative rounded-3xl border p-6 overflow-hidden transition ${unlocked ? "bg-card border-primary/30 shadow-lg" : "bg-muted/40 border-border"}`}>
              {unlocked && (
                <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Unlocked</div>
              )}
              {!unlocked && (
                <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1"><Lock className="w-3 h-3" />Locked</div>
              )}
              <div className="text-4xl mb-3">{r.badge}</div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Unlocked at {r.donationsNeeded} donations / {r.pointsNeeded} points</p>
              <p className="text-sm mt-4">{r.reward}</p>
              <div className="mt-5">
                {unlocked ? (
                  <button onClick={() => setOpen(r)} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-deep transition">
                    <Gift className="w-4 h-4" /> Redeem Voucher
                  </button>
                ) : (
                  <button disabled className="w-full px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed">
                    {donationsShort > 0 ? `Requires ${donationsShort} more donation${donationsShort > 1 ? "s" : ""} to unlock` : "Keep earning points"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button onClick={() => setOpen(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"><X className="w-4 h-4" /></button>
            <div className="w-14 h-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-4"><Award className="w-7 h-7" /></div>
            <h3 className="text-xl font-bold">{open.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{open.modalText}</p>
            <div className="mt-5 p-4 rounded-2xl bg-muted border border-border flex items-center justify-between">
              <code className="font-mono text-sm font-semibold text-primary">{open.code}</code>
              <button onClick={() => copy(open.code)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary-deep">
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}