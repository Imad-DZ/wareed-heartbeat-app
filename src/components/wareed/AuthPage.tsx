import { useState } from "react";
import { Droplet, Heart, Shield, Sparkles, ArrowRight } from "lucide-react";
import { BLOOD_TYPES, WILAYAS, type User } from "./types";

const KARIM: User = {
  name: "Karim Benali",
  email: "karim.benali@wareed.dz",
  phone: "+213 555 12 34 56",
  wilaya: "Algiers",
  bloodType: "O+",
  donations: 4,
  points: 1240,
  history: [
    { id: "k1", center: "CTS CHU Mustapha Pacha", date: "12 Feb 2026", volume: "450ml", status: "Verified" },
    { id: "k2", center: "CTS CHU Bab El Oued", date: "15 Oct 2025", volume: "450ml", status: "Verified" },
    { id: "k3", center: "CTS CHU Mustapha Pacha", date: "03 Jun 2025", volume: "450ml", status: "Verified" },
    { id: "k4", center: "Centre de Transfusion Sanguine Tipaza", date: "11 Jan 2025", volume: "450ml", status: "Verified" },
  ],
};

const YACINE: User = {
  name: "Yacine Bouazi",
  email: "yacine.bouazi@wareed.dz",
  phone: "+213 661 78 90 12",
  wilaya: "Constantine",
  bloodType: "AB-",
  donations: 0,
  points: 0,
  history: [],
};

export function AuthPage({ onLogin }: { onLogin: (u: User) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    wilaya: WILAYAS[0],
    bloodType: BLOOD_TYPES[0],
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: form.name || "New Donor",
      email: form.email,
      phone: form.phone,
      wilaya: form.wilaya,
      bloodType: form.bloodType,
      donations: 0,
      points: 0,
      history: [],
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ ...KARIM, email: form.email || KARIM.email });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left dark burgundy panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden"
           style={{ background: "linear-gradient(140deg, var(--primary-deep), var(--primary) 60%, #4a0014)" }}>
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl" style={{ background: "white" }} />
        <div className="absolute -bottom-40 -left-20 w-[32rem] h-[32rem] rounded-full opacity-10 blur-3xl" style={{ background: "white" }} />

        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/20">
            <Droplet className="w-6 h-6 text-white" fill="white" />
          </div>
          <div className="font-semibold tracking-wide">Wareed Health</div>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 text-xs mb-6">
            <Sparkles className="w-3.5 h-3.5" /> National Blood Donation Platform
          </div>
          <h1 className="text-6xl font-bold leading-tight" style={{ fontFeatureSettings: '"ss01"' }}>
            وَرِيد
            <span className="block text-3xl font-light opacity-90 mt-2">— Wareed —</span>
          </h1>
          <p dir="rtl" className="mt-6 text-lg leading-relaxed text-white/90 max-w-md">
            إنهاء عشوائية نداءات الطوارئ وتأمين مخزون الدم في الجزائر
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { icon: Heart, label: "12,400+", sub: "Lives saved" },
              { icon: Droplet, label: "48", sub: "Active CTS" },
              { icon: Shield, label: "ANS", sub: "Compliant" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/15 p-4">
                <s.icon className="w-5 h-5 mb-2" />
                <div className="font-semibold text-lg">{s.label}</div>
                <div className="text-xs text-white/70">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-white/60">© 2026 Wareed · In partnership with Agence Nationale du Sang</div>
      </div>

      {/* Right login/signup */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary">وَرِيد · Wareed</h1>
          </div>

          <div className="bg-card rounded-3xl shadow-xl ring-1 ring-border p-8">
            <div className="flex bg-muted rounded-full p-1 mb-6">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
                    mode === m ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
                  }`}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <h2 className="text-2xl font-semibold">Welcome back</h2>
                <p className="text-sm text-muted-foreground -mt-2">Sign in to your donor profile</p>
                <Field label="Email">
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="you@wareed.dz" />
                </Field>
                <Field label="Password">
                  <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputCls} placeholder="••••••••" />
                </Field>
                <button type="submit" className={primaryBtn}>Sign In <ArrowRight className="w-4 h-4" /></button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-3">
                <h2 className="text-2xl font-semibold">Become a donor</h2>
                <p className="text-sm text-muted-foreground -mt-1">Join Algeria's life-saving network</p>
                <Field label="Full Name">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Email">
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Password">
                  <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Phone Number">
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+213 ..." />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Wilaya">
                    <select value={form.wilaya} onChange={(e) => setForm({ ...form, wilaya: e.target.value })} className={inputCls}>
                      {WILAYAS.map((w) => <option key={w}>{w}</option>)}
                    </select>
                  </Field>
                  <Field label="Blood Type">
                    <select value={form.bloodType} onChange={(e) => setForm({ ...form, bloodType: e.target.value })} className={inputCls}>
                      {BLOOD_TYPES.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>
                <button type="submit" className={primaryBtn}>Create Account <ArrowRight className="w-4 h-4" /></button>
              </form>
            )}

            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Jury Quick Access</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onLogin(KARIM)}
                className="w-full text-left p-3 rounded-xl border border-primary/30 bg-primary-soft hover:bg-primary-soft/70 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary">Login as Karim Benali</div>
                    <div className="text-xs text-primary/70">Pre-filled Demo · O+ · 4 donations · 1240 pts</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button
                type="button"
                onClick={() => onLogin(YACINE)}
                className="w-full text-left p-3 rounded-xl border border-border bg-muted hover:bg-muted/70 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Login as New Donor</div>
                    <div className="text-xs text-muted-foreground">Empty state · Yacine Bouazi · AB- · Constantine</div>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Protected by ANS-grade encryption · Agence Nationale du Sang
          </p>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition";
const primaryBtn =
  "w-full mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl px-4 py-3 text-sm font-medium hover:bg-primary-deep transition-all shadow-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}