import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, MapPin, Clock, Lock } from "lucide-react";
import { CTS_CENTERS, type User } from "./types";

const TIMES = ["08:30", "09:00", "10:00", "11:00", "13:30", "14:30", "15:30"];

export function Appointment({ user }: { user: User }) {
  const [center, setCenter] = useState(CTS_CENTERS[0]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState<{ day: number; time: string } | null>(null);
  const disabled = !!user.ineligibleOverride;

  const { label, days, startDow, today } = useMemo(() => {
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const days = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const startDow = d.getDay();
    return {
      label: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      days,
      startDow,
      today: now.getDate(),
    };
  }, [monthOffset]);

  const confirm = (day: number, time: string) => {
    if (disabled) {
      toast.error("Booking is disabled — you are currently marked as ineligible.");
      return;
    }
    setSelected({ day, time });
    toast.success(`Appointment confirmed at ${center}!`, {
      description: "A confirmation SMS has been sent to your registered Algerian phone number.",
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
          <p className="text-muted-foreground mt-1">Reserve your slot at a national CTS donation center.</p>
        </div>
      </header>

      {disabled && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 flex items-center gap-3 text-destructive">
          <Lock className="w-5 h-5" />
          <div className="text-sm">
            <span className="font-semibold">Booking disabled.</span> You're currently marked as medically ineligible.
            Booking will reopen once your eligibility is restored.
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-3xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">{label}</h2>
            <div className="flex gap-1">
              <button onClick={() => setMonthOffset(monthOffset - 1)} className="w-9 h-9 rounded-lg border border-border hover:bg-muted flex items-center justify-center"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setMonthOffset(monthOffset + 1)} className="w-9 h-9 rounded-lg border border-border hover:bg-muted flex items-center justify-center"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="text-center font-medium py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startDow }).map((_, i) => <div key={"e" + i} />)}
            {Array.from({ length: days }).map((_, i) => {
              const day = i + 1;
              const isToday = monthOffset === 0 && day === today;
              const isPast = monthOffset < 0 || (monthOffset === 0 && day < today);
              const isSel = selected?.day === day;
              return (
                <button
                  key={day}
                  disabled={isPast || disabled}
                  onClick={() => setSelected({ day, time: selected?.time ?? "" })}
                  className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                    isSel ? "bg-primary text-primary-foreground shadow" :
                    isToday ? "bg-primary-soft text-primary ring-1 ring-primary/30" :
                    isPast ? "text-muted-foreground/40" :
                    "hover:bg-muted"
                  }`}
                >{day}</button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-3xl border border-border shadow-sm p-6">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2"><MapPin className="w-3.5 h-3.5" /> Select Authorized Blood Transfusion Center (CTS)</label>
            <select value={center} onChange={(e) => setCenter(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring">
              {CTS_CENTERS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="bg-card rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold"><Clock className="w-4 h-4 text-primary" /> Available time slots</div>
            {!selected?.day ? (
              <p className="text-sm text-muted-foreground">Pick a day on the calendar to see slots.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {TIMES.map((t) => (
                  <button
                    key={t}
                    disabled={disabled}
                    onClick={() => confirm(selected.day, t)}
                    className="px-3 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}