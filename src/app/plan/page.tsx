"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { clearWeeklyPlan, loadWeeklyPlan, saveWeeklyPlan } from "@/lib/plan-storage";
import { getRandomRecipe, recipes } from "@/lib/recipes";
import { useCheckedItems } from "@/lib/shopping-checked";
import { buildShoppingList, countPlannedMeals, getEmptyDays } from "@/lib/shopping-list";
import { DAYS, type DayOfWeek, type WeeklyPlan } from "@/lib/types";

export default function PlanPage() {
  const [plan, setPlan] = useState<WeeklyPlan>({});
  const [activeDay, setActiveDay] = useState<DayOfWeek | null>(null);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [excludePantry, setExcludePantry] = useState(true);

  useEffect(() => {
    setPlan(loadWeeklyPlan());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveWeeklyPlan(plan);
  }, [plan, hydrated]);

  const shoppingList = useMemo(
    () => buildShoppingList(plan, excludePantry),
    [plan, excludePantry],
  );
  const mealCount = countPlannedMeals(plan);
  const emptyDays = getEmptyDays(plan);
  const { checked, toggle, clearChecked } = useCheckedItems(shoppingList);

  const uncheckedList = shoppingList.filter((item) => !checked.has(item));
  const checkedCount = shoppingList.length - uncheckedList.length;

  function assignMeal(day: DayOfWeek, recipeId: string) {
    setPlan((current) => ({ ...current, [day]: recipeId }));
    setActiveDay(null);
  }

  function clearDay(day: DayOfWeek) {
    setPlan((current) => {
      const next = { ...current };
      delete next[day];
      return next;
    });
  }

  function fillEmptyDays() {
    setPlan((current) => {
      const next = { ...current };
      const used = new Set(Object.values(next).filter(Boolean));

      for (const day of getEmptyDays(next)) {
        const pick = getRandomRecipe([...used]);
        if (!pick) break;
        next[day] = pick.id;
        used.add(pick.id);
      }

      return next;
    });
  }

  async function copyShoppingList() {
    const list = uncheckedList.length > 0 ? uncheckedList : shoppingList;
    if (list.length === 0) return;
    await navigator.clipboard.writeText(list.map((item) => `- ${item}`).join("\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <PageShell
      title="Weekly plan"
      description="Pick a meal for each day. Your plan saves in this browser automatically."
      action={
        <div className="flex flex-wrap gap-2">
          {emptyDays.length > 0 ? (
            <button
              type="button"
              onClick={fillEmptyDays}
              className="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Fill {emptyDays.length} empty day{emptyDays.length === 1 ? "" : "s"} ✨
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              clearWeeklyPlan();
              clearChecked();
              setPlan({});
            }}
            className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 ring-1 ring-stone-200 transition hover:bg-white"
          >
            Clear plan
          </button>
        </div>
      }
    >
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {DAYS.map(({ key, label }) => {
          const recipeId = plan[key];
          const recipe = recipes.find((item) => item.id === recipeId);

          return (
            <div
              key={key}
              className="flex min-h-40 flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200/80"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {label}
                </span>
                {recipe ? (
                  <button
                    type="button"
                    onClick={() => clearDay(key)}
                    className="text-xs text-stone-400 hover:text-stone-700"
                    aria-label={`Clear ${label}`}
                  >
                    ✕
                  </button>
                ) : null}
              </div>
              {recipe ? (
                <>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="font-serif text-base font-semibold leading-snug text-stone-900 hover:text-terracotta"
                  >
                    {recipe.title}
                  </Link>
                  <p className="mt-1 text-xs text-stone-500">{recipe.timeMinutes} min</p>
                </>
              ) : (
                <p className="text-sm text-stone-400">No meal yet</p>
              )}
              <button
                type="button"
                onClick={() => setActiveDay(key)}
                className="mt-auto pt-3 text-left text-sm font-medium text-terracotta hover:text-terracotta-dark"
              >
                {recipe ? "Change" : "Add meal"}
              </button>
            </div>
          );
        })}
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-stone-900">Shopping list</h2>
            <p className="mt-1 text-sm text-stone-600">
              {mealCount === 0
                ? "Add meals to generate a merged ingredient list."
                : `${mealCount} meal${mealCount === 1 ? "" : "s"} · ${shoppingList.length} items${checkedCount ? ` · ${checkedCount} checked off` : ""}`}
            </p>
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-stone-600">
              <input
                type="checkbox"
                checked={excludePantry}
                onChange={(event) => setExcludePantry(event.target.checked)}
                className="rounded border-stone-300 text-terracotta focus:ring-terracotta"
              />
              Hide pantry staples (oil, salt, garlic, etc.)
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={shoppingList.length === 0}
              onClick={copyShoppingList}
              className="rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white transition enabled:hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? "Copied!" : "Copy unchecked"}
            </button>
            {checkedCount > 0 ? (
              <button
                type="button"
                onClick={clearChecked}
                className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 ring-1 ring-stone-200 transition hover:bg-cream"
              >
                Uncheck all
              </button>
            ) : null}
          </div>
        </div>

        {shoppingList.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {shoppingList.map((item) => {
              const isChecked = checked.has(item);
              return (
                <li key={item}>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-cream ${isChecked ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(item)}
                      className="rounded border-stone-300 text-terracotta focus:ring-terracotta"
                    />
                    <span className={`text-sm text-stone-700 ${isChecked ? "line-through" : ""}`}>
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      {activeDay ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pick-meal-title"
        >
          <div className="max-h-[80vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <h2 id="pick-meal-title" className="font-serif text-lg font-semibold">
                Pick a meal for {DAYS.find((day) => day.key === activeDay)?.label}
              </h2>
              <button
                type="button"
                onClick={() => setActiveDay(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                Close
              </button>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <button
                    type="button"
                    onClick={() => assignMeal(activeDay, recipe.id)}
                    className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-cream"
                  >
                    <p className="font-medium text-stone-900">{recipe.title}</p>
                    <p className="text-sm text-stone-500">
                      {recipe.timeMinutes} min · {recipe.tags.slice(0, 2).join(", ")}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}
