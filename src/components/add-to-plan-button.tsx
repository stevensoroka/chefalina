"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loadWeeklyPlan, saveWeeklyPlan } from "@/lib/plan-storage";
import { DAYS, type DayOfWeek } from "@/lib/types";

type AddToPlanButtonProps = {
  recipeId: string;
  variant?: "primary" | "secondary";
};

export function AddToPlanButton({ recipeId, variant = "primary" }: AddToPlanButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [savedDay, setSavedDay] = useState<string | null>(null);

  const baseClass =
    variant === "primary"
      ? "rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white transition hover:bg-terracotta-dark"
      : "rounded-full px-4 py-2 text-sm font-medium text-terracotta ring-1 ring-terracotta/30 transition hover:bg-cream";

  function assignDay(day: DayOfWeek) {
    const plan = loadWeeklyPlan();
    plan[day] = recipeId;
    saveWeeklyPlan(plan);
    setSavedDay(DAYS.find((d) => d.key === day)?.label ?? day);
    setOpen(false);
    window.setTimeout(() => setSavedDay(null), 2500);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={baseClass}>
        {savedDay ? `Added to ${savedDay}` : "Add to plan"}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold">Which day?</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DAYS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => assignDay(key)}
                  className="rounded-xl bg-cream px-3 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-terracotta hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push("/plan");
              }}
              className="mt-4 w-full text-center text-sm text-stone-500 hover:text-terracotta"
            >
              View full weekly plan →
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
