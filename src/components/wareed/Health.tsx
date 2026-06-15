import { Bell, HeartPulse, Droplet, Apple, Moon, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import type { User } from "./types";

export function Health({ user }: { user: User }) {
  const tips = [
    { icon: Apple, title: "Iron-rich diet", body: "Eat dates, liver, lentils, and spinach the week before donating." },
    { icon: Droplet, title: "Stay hydrated", body: "Drink at least 2L of water in the 24 hours before your appointment." },
    { icon: Moon, title: "Rest well", body: "Get 7-8 hours of sleep the night before to keep your blood pressure stable." },
    { icon: Activity, title: "Light exercise only", body: "Avoid heavy lifting and intense workouts 24h before and after donating." },
  ];
  const reminders = [
    { date: "Today · 19:00", text: "Hydration check — finish your second liter of water." },
    { date: "In 87 days", text: "You'll be eligible for your next donation." },
    { date: "Quarterly", text: "Free hemoglobin & blood pressure check at your CTS." },
  ];

  const eligible = !user.ineligibleOverride;
  const stats = [
    { label: "Days Since Last Donation", value: "57" },
    { label: "Days Until Eligible", value: eligible ? "0 🎉" : "33" },
    { label: "Total Donations", value: String(user.donations ?? 0) },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Health & Reminders</h1>
        <p className="text-muted-foreground mt-1">Stay donation-ready, {user.name.split(" ")[0]}.</p>
      </header>

      {/* Eligibility hero */}
      {eligible ? (
        <div className="space-y-3">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-8 shadow-lg flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider font-medium opacity-90">Eligibility Status</div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">You Can Donate Today! 🎉</div>
            </div>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary-deep transition hover:scale-[1.01] shadow">
            Book Donation Appointment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="rounded-3xl bg-destructive/10 border border-destructive/30 text-destructive p-6">
          <div className="font-semibold">You are currently marked ineligible. Booking is disabled.</div>
        </div>
      )}

      {/* Stat row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border shadow-sm p-5 transition hover:shadow-md hover:scale-[1.01]">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</div>
            <div className="mt-2 text-3xl font-bold tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Post-donation checklist */}
      <div className="bg-card rounded-3xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <HeartPulse className="w-5 h-5 text-primary" />
          <h2 className="font-semibold tracking-tight">Post-Donation Care Checklist</h2>
        </div>
        <ul className="space-y-3">
          {tips.map((t) => (
            <li key={t.title} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:bg-muted/40 transition hover:scale-[1.01]">
              <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{t.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.body}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider">
                High
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-3xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5"><HeartPulse className="w-5 h-5 text-primary" /><h2 className="font-semibold">Wellness guidelines</h2></div>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((t) => (
              <div key={t.title} className="p-4 rounded-2xl bg-muted/40 border border-border">
                <div className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-2"><t.icon className="w-4 h-4" /></div>
                <div className="font-semibold text-sm">{t.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5"><Bell className="w-5 h-5 text-primary" /><h2 className="font-semibold">Reminders</h2></div>
          <ul className="space-y-3">
            {reminders.map((r, i) => (
              <li key={i} className="p-3 rounded-xl border border-border">
                <div className="text-xs text-primary font-semibold">{r.date}</div>
                <div className="text-sm mt-1">{r.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}