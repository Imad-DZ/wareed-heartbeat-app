import { Droplet, Award, TrendingUp, Calendar, CheckCircle2, Clock } from "lucide-react";
import type { User } from "./types";

export function Dashboard({ user }: { user: User }) {
  const nextEligible = user.donations > 0 ? "May 2026" : "Anytime";
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground mt-1">Your lifesaving impact in real time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Droplet} label="Total Donations" value={user.donations} accent />
        <StatCard icon={Award} label="Total Points" value={user.points} />
        <StatCard icon={TrendingUp} label="Lives Impacted" value={user.donations * 3} />
        <StatCard icon={Calendar} label="Next Eligible" value={nextEligible} small />
      </div>

      <section className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Donation History</h2>
            <p className="text-xs text-muted-foreground">All entries verified by the Agence Nationale du Sang</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-primary-soft text-primary font-medium">{user.history.length} records</span>
        </div>
        {user.history.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-soft flex items-center justify-center mb-4">
              <Droplet className="w-7 h-7 text-primary" />
            </div>
            <p className="text-foreground font-medium">No donations registered yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Take the eligibility questionnaire to schedule your first drop!
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Center</th>
                <th className="text-left px-6 py-3 font-medium">Date</th>
                <th className="text-left px-6 py-3 font-medium">Volume</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {user.history.map((d) => (
                <tr key={d.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">{d.center}</td>
                  <td className="px-6 py-4 text-muted-foreground">{d.date}</td>
                  <td className="px-6 py-4">{d.volume}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={d.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, accent, small,
}: { icon: typeof Droplet; label: string; value: string | number; accent?: boolean; small?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${accent ? "bg-white/15" : "bg-primary-soft text-primary"}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className={`text-xs ${accent ? "text-white/80" : "text-muted-foreground"}`}>{label}</div>
      <div className={`${small ? "text-xl" : "text-3xl"} font-bold mt-1`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; Icon: typeof CheckCircle2 }> = {
    Verified: { bg: "bg-emerald-50", text: "text-emerald-700", Icon: CheckCircle2 },
    Completed: { bg: "bg-primary-soft", text: "text-primary", Icon: CheckCircle2 },
    Pending: { bg: "bg-amber-50", text: "text-amber-700", Icon: Clock },
  };
  const cfg = map[status] ?? map.Verified;
  const Icon = cfg.Icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
}