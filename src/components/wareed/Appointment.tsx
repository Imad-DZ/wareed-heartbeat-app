import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, MapPin, Clock, Lock, Star, Phone, ChevronRight as ArrowR, CalendarClock, Check } from "lucide-react";
import { CTS_CENTERS, type User } from "./types";

const TIMES = ["08:30", "09:00", "10:00", "11:00", "13:30", "14:30", "15:30"];

const HOSPITALS = [
  { name: "CTS CHU Mustapha Pacha", address: "Place du 1er Mai, Sidi M'Hamed, Algiers", phone: "+213 21 23 55 55", rating: 4.8, distance: "2.1 km", slots: 70 },
  { name: "CTS CHU Ben Badis", address: "Boulevard Belouizdad, Constantine", phone: "+213 31 88 41 22", rating: 4.7, distance: "5.4 km", slots: 42 },
  { name: "CTS CHU Oran (CHUO)", address: "Boulevard Dr Benzerdjeb, Oran", phone: "+213 41 41 36 33", rating: 4.6, distance: "8.9 km", slots: 31 },
  { name: "CTS CHU Bab El Oued", address: "Avenue Said Touati, Bab El Oued, Algiers", phone: "+213 21 96 31 22", rating: 4.5, distance: "3.7 km", slots: 18 },
];

export function Appointment({ user }: { user: User }) {
  const [center, setCenter] = useState(CTS_CENTERS[0]);
  const [wizardStep, setWizardStep] = useState(1);
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
    setWizardStep(3);
    toast.success(`Appointment confirmed at ${center}!`, {
      description: "A confirmation SMS has been sent to your registered Algerian phone number.",
    });
  };

  const steps = [
    { n: 1, label: "Select Bank" },
    { n: 2, label: "Pick Date & Time" },
    { n: 3, label: "Confirm" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Book Appointment</h1>
          <p className="text-muted-foreground mt-1">Reserve your slot at a national CTS donation center.</p>
        </div>
      </header>

      {/* Wizard stepper */}
      <div className="flex items-center gap-2 sm:gap-4 bg-card rounded-2xl border border-border p-4 shadow-sm">
        {steps.map((s, i) => {
          const active = wizardStep === s.n;
          const done = wizardStep > s.n;
          return (
            <div key={s.n} className="flex items-center gap-3 flex-1">
              <button
                onClick={() => setWizardStep(s.n)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition hover:scale-[1.01] ${
                  active ? "bg-primary text-primary-foreground shadow" :
                  done ? "bg-emerald-50 text-emerald-700" :
                  "bg-muted text-muted-foreground"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  active ? "bg-white/20" : done ? "bg-emerald-200/60" : "bg-background"
                }`}>
                  {done ? <Check className="w-3.5 h-3.5" /> : s.n}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
            </div>
          );
        })}
      </div>

      {/* Existing appointment alert */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 p-4 flex items-start gap-3">
        <CalendarClock className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="text-sm leading-relaxed">
          <span className="font-semibold">You have an upcoming appointment:</span> CTS CHU Mustapha Pacha — Jun 18 at 10:00.
          Cancel it before booking a new one.
        </div>
      </div>

      {disabled && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 flex items-center gap-3 text-destructive">
          <Lock className="w-5 h-5" />
          <div className="text-sm">
            <span className="font-semibold">Booking disabled.</span> You're currently marked as medically ineligible.
            Booking will reopen once your eligibility is restored.
          </div>
        </div>
      )}

      {/* Hospital cards grid */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Authorized Transfusion Centers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {HOSPITALS.map((h) => {
            const isSel = center.startsWith(h.name);
            return (
              <div
                key={h.name}
                className={`group bg-card rounded-3xl border p-6 shadow-sm transition hover:shadow-md hover:scale-[1.01] ${
                  isSel ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold tracking-tight truncate">{h.name}</h3>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {h.address}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {h.phone}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {h.rating}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                      {h.distance}
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {h.slots} slots available
                  </span>
                  <button
                    onClick={() => { setCenter(h.name); setWizardStep(2); }}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-deep transition hover:scale-[1.02]"
                  >
                    Select <ArrowR className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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