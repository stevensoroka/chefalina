import pantryStaples from "@/data/pantry-staples.json";
import { getRecipeById } from "@/lib/recipes";
import type { DayOfWeek, WeeklyPlan } from "@/lib/types";

const staplePatterns = pantryStaples.map((item) => item.toLowerCase());

function isPantryStaple(ingredient: string): boolean {
  const lower = ingredient.toLowerCase();
  return staplePatterns.some(
    (staple) => lower === staple || lower.includes(staple) || staple.includes(lower),
  );
}

export function buildShoppingList(plan: WeeklyPlan, excludePantry = true): string[] {
  const items = new Set<string>();

  for (const recipeId of Object.values(plan)) {
    if (!recipeId) continue;
    const recipe = getRecipeById(recipeId);
    if (!recipe) continue;
    for (const ingredient of recipe.ingredients) {
      if (excludePantry && isPantryStaple(ingredient)) continue;
      items.add(ingredient);
    }
  }

  return [...items].sort((a, b) => a.localeCompare(b));
}

export function countPlannedMeals(plan: WeeklyPlan): number {
  return Object.values(plan).filter(Boolean).length;
}

export function getEmptyDays(plan: WeeklyPlan): DayOfWeek[] {
  const allDays: DayOfWeek[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return allDays.filter((day) => !plan[day]);
}
