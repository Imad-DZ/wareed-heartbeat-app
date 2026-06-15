import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert } from "lucide-react";
import type { User, TabKey } from "./types";

const QUESTIONS = [
  "Are you aged between 18 and 65?",
  "Do you weigh over 50kg?",
  "Has it been more than 90 days since your last blood donation?",
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

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Eligibility Checker</h1>
        <p className="text-muted-foreground mt-1">A quick 3-step health survey aligned with Algerian medical guidelines.</p>
      </header>

      <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
        {!done && (
          <>
            <div className="flex items-center gap-2 mb-6">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <div className="text-xs text-muted-foreground mb-2">Question {step + 1} of {QUESTIONS.length}</div>
            <h2 className="text-2xl font-semibold mb-8">{QUESTIONS[step]}</h2>
            <div className="flex gap-3">
              <button onClick={() => answer(true)} className="flex-1 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-medium hover:bg-primary-deep transition">Yes</button>
              <button onClick={() => answer(false)} className="flex-1 px-6 py-4 rounded-2xl border border-border bg-background font-medium hover:bg-muted transition">No</button>
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
    </div>
  );
}