import { Bell, HeartPulse, Droplet, Apple, Moon, Activity } from "lucide-react";
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
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Health & Reminders</h1>
        <p className="text-muted-foreground mt-1">Stay donation-ready, {user.name.split(" ")[0]}.</p>
      </header>

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