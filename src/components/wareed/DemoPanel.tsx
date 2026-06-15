import { useState } from "react";
import { Zap, AlertOctagon, X, Sparkles } from "lucide-react";
import type { User } from "./types";

export function DemoPanel({
  user,
  onUserChange,
}: {
  user: User;
  onUserChange: (u: User) => void;
}) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const simulateDonation = async () => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const newUser: User = {
      ...user,
      donations: user.donations + 1,
      points: user.points + 400,
      ineligibleOverride: false,
      history: [
        { id: `d-${Date.now()}`, center: "CTS CHU Mustapha Pacha", date: today, volume: "450ml", status: "Completed" },
        ...user.history,
      ],
    };
    onUserChange(newUser);

    // Confetti burst (client-only dynamic import to keep SSR safe)
    const confetti = (await import("canvas-confetti")).default;
    const end = Date.now() + 1200;
    const colors = ["#800020", "#ffffff", "#d4af37"];
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors });

    const unlocksUno = newUser.name === "Karim Benali" && newUser.donations >= 5;
    setModal(`🎉 Heroic Act Registered! Thank you for saving a life in Algeria. 400 Points Added.${unlocksUno ? " If logged in as Karim, this unlocks the 500 DA Uno Hypermarket Reward card!" : " If logged in as Karim, this unlocks the 500 DA Uno Hypermarket Reward card!"}`);
  };

  const toggleIneligible = () => {
    onUserChange({ ...user, ineligibleOverride: !user.ineligibleOverride });
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40">
        {open ? (
          <div className="w-80 rounded-2xl p-4 backdrop-blur-xl shadow-2xl text-white" style={{ background: "rgba(15, 15, 20, 0.85)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Presenter Demo Panel</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center"><X className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-2">
              <button onClick={simulateDonation} className="w-full text-left px-3 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 transition text-sm">
                <div className="flex items-center gap-2 font-semibold text-emerald-300"><Zap className="w-4 h-4" /> Simulate Successful Donation</div>
                <div className="text-[11px] text-white/60 mt-0.5">+1 donation · +400 pts · confetti</div>
              </button>
              <button onClick={toggleIneligible} className="w-full text-left px-3 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 transition text-sm">
                <div className="flex items-center gap-2 font-semibold text-red-300"><AlertOctagon className="w-4 h-4" /> Toggle Ineligibility State</div>
                <div className="text-[11px] text-white/60 mt-0.5">{user.ineligibleOverride ? "Currently INELIGIBLE — click to restore" : "Force medical restriction"}</div>
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setOpen(true)} className="px-4 py-3 rounded-2xl backdrop-blur-xl shadow-2xl text-white text-sm font-semibold flex items-center gap-2"
            style={{ background: "rgba(15, 15, 20, 0.85)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Sparkles className="w-4 h-4 text-amber-300" /> Presenter Demo Panel
          </button>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-3xl max-w-md w-full p-8 shadow-2xl text-center relative">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold">Heroic Act Registered!</h3>
            <p className="mt-3 text-muted-foreground">{modal.replace("🎉 Heroic Act Registered! ", "")}</p>
            <button onClick={() => setModal(null)} className="mt-6 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-deep transition">Continue</button>
          </div>
        </div>
      )}
    </>
  );
}