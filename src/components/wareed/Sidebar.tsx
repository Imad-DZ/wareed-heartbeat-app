import { Droplet, LayoutDashboard, ClipboardCheck, CalendarDays, HeartPulse, Gift, Code2, LogOut } from "lucide-react";
import type { TabKey, User } from "./types";

const TABS: { key: TabKey; label: string; icon: typeof Droplet }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "eligibility", label: "Eligibility Checker", icon: ClipboardCheck },
  { key: "appointment", label: "Book Appointment", icon: CalendarDays },
  { key: "health", label: "Health & Reminders", icon: HeartPulse },
  { key: "rewards", label: "Rewards Hub", icon: Gift },
  { key: "integration", label: "Hospital Integration", icon: Code2 },
];

export function Sidebar({
  active,
  onSelect,
  user,
  onLogout,
}: {
  active: TabKey;
  onSelect: (t: TabKey) => void;
  user: User;
  onLogout: () => void;
}) {
  return (
    <aside className="w-72 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--primary)" }}>
            <Droplet className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <div className="font-bold text-lg text-primary">وَرِيد · Wareed</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Donor Portal</div>
          </div>
        </div>
      </div>

      {/* User card */}
      <div className="p-4">
        <div className="rounded-2xl p-4 bg-primary-soft border border-primary/15">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              {user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.wilaya}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              <Droplet className="w-3 h-3" fill="white" /> {user.bloodType}
            </span>
            <span className="text-xs text-muted-foreground">{user.points} pts</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onSelect(t.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={onLogout}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}