import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, UserRound } from "lucide-react";
import type { User, TabKey } from "./types";

const QUESTIONS = [
  { full: "How old are you?", short: "How old are" },
  { full: "What is your weight (kg)?", short: "What is your" },
  { full: "When was your last donation?", short: "When was your" },
  { full: "Are you feeling well today?", short: "Are you feeling" },
  { full: "Are you currently on medication?", short: "Are you currently" },
  { full: "Have you traveled abroad in the last 4 months?", short: "Have you traveled" },
];

export function Eligibility({ user, onNavigate }: { user: User; onNavigate: (t: TabKey) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const failed = answers.includes(false) || user.ineligibleOverride;
  const done = step >= QUESTIONS.length || failed;
  const passed = done && !failed && answers.length === QUESTIONS.length;

  useEffect(() => {
    if (user.ineligibleOverride) {
      setAnswers([false]);
      setStep(QUESTIONS.length);
    }
  }, [user.ineligibleOverride]);

  const answer = (val: boolean) => {
    const next = [...answers, val];
    setAnswers(next);
    setStep(step + 1);
  };

  const reset = () => { setAnswers([]); setStep(0); };

  const pct = Math.round((step / QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Eligibility Checker</h1>
        <p className="text-muted-foreground mt-2 text-base">
          Donation Eligibility Checker: Answer a few quick questions to see if you can donate today.
        </p>
      </header>

      {!done && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Step {step + 1} of {QUESTIONS.length}</span>
            <span>{pct}% complete</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="bg-card rounded-3xl border border-border shadow-sm p-10 transition hover:shadow-md">
        {!done && (
          <>
            <div className="flex items-start gap-5 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center shrink-0">
                <UserRound className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold tracking-tight">{QUESTIONS[step].full}</h2>
                <p className="text-sm text-muted-foreground mt-1">Your answer stays private and secure.</p>
              </div>
            </div>
            <input
              type="text"
              placeholder={step === 0 ? "Enter your age ... years" : "Type your answer..."}
              className="w-full px-5 py-4 rounded-2xl border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring mb-6"
            />
            <div className="flex gap-3">
              <button onClick={() => answer(true)} className="flex-1 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary-deep transition hover:scale-[1.01]">Yes</button>
              <button onClick={() => answer(false)} className="flex-1 px-6 py-4 rounded-2xl border border-border bg-background font-semibold hover:bg-muted transition hover:scale-[1.01]">No</button>
            </div>
          </>
        )}

        {failed && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-destructive">🚨 Safety Restriction</h2>
            <p className="mt-3 text-foreground max-w-lg mx-auto">
              You do not currently meet the required medical criteria to donate blood in Algeria.
              Your health comes first. Please consult your CHU physician.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4" /> Booking has been disabled for your safety.
            </div>
            <button onClick={reset} className="mt-6 px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted">Retake survey</button>
          </div>
        )}

        {passed && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-700">✅ Fully Eligible!</h2>
            <p className="mt-3 text-foreground max-w-lg mx-auto">
              You meet all national medical guidelines for blood donation.
            </p>
            <button
              onClick={() => onNavigate("appointment")}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-deep transition shadow"
            >
              Proceed to Schedule Appointment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {!done && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              className={`px-4 py-3 rounded-xl border text-xs font-medium truncate transition ${
                i === step
                  ? "bg-primary-soft border-primary/30 text-primary"
                  : i < step
                  ? "bg-muted border-border text-foreground/70 line-through"
                  : "bg-muted/40 border-border text-muted-foreground"
              }`}
            >
              {i + 1}. {q.short}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}