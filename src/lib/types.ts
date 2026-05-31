export type Recipe = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  timeMinutes: number;
  servings: number;
  ingredients: string[];
  steps: string[];
};

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type WeeklyPlan = Partial<Record<DayOfWeek, string>>;

export const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: "monday", label: "Mon" },
  { key: "tuesday", label: "Tue" },
  { key: "wednesday", label: "Wed" },
  { key: "thursday", label: "Thu" },
  { key: "friday", label: "Fri" },
  { key: "saturday", label: "Sat" },
  { key: "sunday", label: "Sun" },
];

export const PLAN_STORAGE_KEY = "chefalina-weekly-plan";
