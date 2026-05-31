import { PLAN_STORAGE_KEY, type WeeklyPlan } from "@/lib/types";

export function loadWeeklyPlan(): WeeklyPlan {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as WeeklyPlan;
  } catch {
    return {};
  }
}

export function saveWeeklyPlan(plan: WeeklyPlan): void {
  localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
}

export function clearWeeklyPlan(): void {
  localStorage.removeItem(PLAN_STORAGE_KEY);
}
