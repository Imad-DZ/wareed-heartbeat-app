import { useState } from "react";
import { Copy, Check, Lock, Droplet, Calendar, ClipboardCheck } from "lucide-react";

type Lang = "ar" | "fr" | "en";
type Theme = "burgundy" | "teal" | "dark";

const TRANSLATIONS: Record<Lang, { title: string; sub: string; cta: string; eligibility: string; appt: string }> = {
  ar: { title: "تبرع بالدم اليوم", sub: "أنقذ حياة في الجزائر", cta: "ابدأ الآن", eligibility: "فحص الأهلية", appt: "حجز موعد" },
  fr: { title: "Donnez votre sang aujourd'hui", sub: "Sauvez une vie en Algérie", cta: "Commencer", eligibility: "Vérifier l'éligibilité", appt: "Prendre rendez-vous" },
  en: { title: "Donate Blood Today", sub: "Save a life in Algeria", cta: "Get Started", eligibility: "Check Eligibility", appt: "Book Appointment" },
};

const THEMES: Record<Theme, { bg: string; accent: string; text: string; label: string }> = {
  burgundy: { bg: "#800020", accent: "#fff", text: "#fff", label: "Medical Burgundy" },
  teal: { bg: "#0d9488", accent: "#fff", text: "#fff", label: "Clean Teal" },
  dark: { bg: "#111827", accent: "#f87171", text: "#fff", label: "Dark Minimalist" },
};

export function Integration() {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("burgundy");
  const [eligibility, setEligibility] = useState(true);
  const [scheduler, setScheduler] = useState(true);
  const [copied, setCopied] = useState(false);

  const code = `<script src="https://cdn.wareed.dz/widget.js"
  data-lang="${lang}" data-theme="${theme === "burgundy" ? "burgundy" : theme}" data-country="DZ"
  data-components="${[eligibility && "eligibility", scheduler && "scheduler"].filter(Boolean).join(",")}"></script>`;

  const t = TRANSLATIONS[lang];
  const th = THEMES[theme];

  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Hospital Integration Playground</h1>
        <p className="text-muted-foreground mt-1">Configure and embed the Wareed donor widget on any CHU intranet portal.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Customizer */}
        <div className="bg-card rounded-3xl border border-border shadow-sm p-6 space-y-6">
          <h2 className="font-semibold text-lg">Widget Customizer</h2>

          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">Language</div>
            <div className="flex gap-2">
              {([
                { id: "ar", label: "العربية" },
                { id: "fr", label: "Français" },
                { id: "en", label: "English" },
              ] as { id: Lang; label: string }[]).map((l) => (
                <label key={l.id} className={`flex-1 cursor-pointer px-3 py-2 rounded-xl border text-sm text-center transition ${lang === l.id ? "border-primary bg-primary-soft text-primary font-medium" : "border-border hover:bg-muted"}`}>
                  <input type="radio" name="lang" className="sr-only" checked={lang === l.id} onChange={() => setLang(l.id)} />
                  {l.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">Widget Theme</div>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(THEMES) as Theme[]).map((id) => (
                <button key={id} onClick={() => setTheme(id)} className={`px-3 py-3 rounded-xl border text-xs font-medium transition ${theme === id ? "border-primary ring-2 ring-primary/20" : "border-border hover:bg-muted"}`}>
                  <div className="w-full h-6 rounded mb-2" style={{ background: THEMES[id].bg }} />
                  {THEMES[id].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">Core Components</div>
            <div className="space-y-2">
              <Toggle label="Eligibility System" checked={eligibility} onChange={setEligibility} />
              <Toggle label="Appointment Scheduler" checked={scheduler} onChange={setScheduler} />
            </div>
          </div>
        </div>

        {/* Right: Live preview + code */}
        <div className="space-y-5">
          <div className="bg-card rounded-3xl border border-border shadow-sm p-5">
            <div className="text-xs font-medium text-muted-foreground mb-3">Live Interactive Preview</div>
            <div dir={lang === "ar" ? "rtl" : "ltr"} className="rounded-2xl p-6 transition-all" style={{ background: th.bg, color: th.text }}>
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <Droplet className="w-5 h-5" fill={th.accent} />
                <span className="text-xs uppercase tracking-widest">Wareed Widget</span>
              </div>
              <h3 className="text-2xl font-bold">{t.title}</h3>
              <p className="text-sm opacity-90 mt-1">{t.sub}</p>
              <div className="mt-4 space-y-2">
                {eligibility && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/15 text-sm">
                    <ClipboardCheck className="w-4 h-4" /> {t.eligibility}
                  </div>
                )}
                {scheduler && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/15 text-sm">
                    <Calendar className="w-4 h-4" /> {t.appt}
                  </div>
                )}
              </div>
              <button className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: th.accent, color: th.bg }}>{t.cta}</button>
            </div>
          </div>

          <div className="bg-[#0b1020] rounded-3xl p-5 text-slate-100 shadow-lg relative">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-slate-400">Embed Snippet</div>
              <button onClick={copy} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${copied ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {copied ? <><Check className="w-3.5 h-3.5" /> ✓ Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Code</>}
              </button>
            </div>
            <pre className="text-xs leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap break-all">
<span className="text-slate-500">{`// Paste into your CHU portal <head>`}</span>{"\n"}{code}
            </pre>
          </div>
        </div>
      </div>

      <footer className="mt-4 rounded-2xl border border-border bg-muted/40 p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
          <Lock className="w-4 h-4" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">ANS-Compliant Security:</span> Fully encrypted and hosted in absolute compliance with the National Blood Agency (ANS) and Algerian digital healthcare infrastructure protocols.
        </p>
      </footer>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <label className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer">
      <span className="text-sm font-medium">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <span className="w-10 h-6 rounded-full bg-muted peer-checked:bg-primary relative transition">
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : ""}`} />
      </span>
    </label>
  );
}