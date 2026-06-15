import { useEffect, useState } from "react";
import { AuthPage } from "./AuthPage";
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./Dashboard";
import { Eligibility } from "./Eligibility";
import { Appointment } from "./Appointment";
import { Health } from "./Health";
import { Rewards } from "./Rewards";
import { Integration } from "./Integration";
import { DemoPanel } from "./DemoPanel";
import type { TabKey, User } from "./types";

const STORAGE_KEY = "wareed.user.v1";
const TAB_KEY = "wareed.tab.v1";

export function WareedApp() {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
      const t = localStorage.getItem(TAB_KEY) as TabKey | null;
      if (t) setTab(t);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(TAB_KEY, tab);
  }, [tab, hydrated]);

  if (!hydrated) return null;
  if (!user) return <AuthPage onLogin={(u) => { setUser(u); setTab("dashboard"); }} />;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active={tab} onSelect={setTab} user={user} onLogout={() => setUser(null)} />
      <main className="flex-1 p-8 lg:p-12 max-w-[1400px] mx-auto w-full">
        {tab === "dashboard" && <Dashboard user={user} />}
        {tab === "eligibility" && <Eligibility user={user} onNavigate={setTab} />}
        {tab === "appointment" && <Appointment user={user} />}
        {tab === "health" && <Health user={user} />}
        {tab === "rewards" && <Rewards user={user} />}
        {tab === "integration" && <Integration />}
      </main>
      <DemoPanel user={user} onUserChange={setUser} />
    </div>
  );
}