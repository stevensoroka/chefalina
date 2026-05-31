"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AddToPlanButton } from "@/components/add-to-plan-button";
import { InspireMe, TagFilter } from "@/components/tag-filter";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { getAllTags, getRandomRecipe, recipes } from "@/lib/recipes";

type BrowseMode = "meal" | "week";
type BrowseBasis = "ingredients" | "prompt";

function pickMode(value: string | null): BrowseMode {
  return value === "meal" ? "meal" : "week";
}

function pickBasis(value: string | null): BrowseBasis {
  return value === "ingredients" ? "ingredients" : "prompt";
}

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get("tag");
  const initialMode = pickMode(searchParams.get("mode"));
  const initialBasis = pickBasis(searchParams.get("basis"));
  const initialGoal = searchParams.get("goal") ?? "";

  const [mode, setMode] = useState<BrowseMode>(initialMode);
  const [basis, setBasis] = useState<BrowseBasis>(initialBasis);
  const [query, setQuery] = useState("");
  const [goalPrompt, setGoalPrompt] = useState(initialGoal);
  const [ingredientsOnHand, setIngredientsOnHand] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
  const [inspiredRecipeId, setInspiredRecipeId] = useState<string | null>(null);

  const tags = useMemo(() => getAllTags(), []);
  const ingredientTokens = useMemo(
    () =>
      ingredientsOnHand
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean),
    [ingredientsOnHand],
  );
  const promptTokens = useMemo(
    () =>
      `${goalPrompt} ${query}`
        .toLowerCase()
        .split(/[\s,.-]+/)
        .map((item) => item.trim())
        .filter((item) => item.length > 2),
    [goalPrompt, query],
  );

  const filtered = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesTag = !activeTag || recipe.tags.includes(activeTag);

      let matchesIntent = true;
      if (basis === "ingredients" && ingredientTokens.length > 0) {
        matchesIntent = ingredientTokens.some((token) =>
          recipe.ingredients.some((item) => item.toLowerCase().includes(token)),
        );
      }

      if (basis === "prompt" && promptTokens.length > 0) {
        matchesIntent = promptTokens.some((token) => {
          const haystack = [
            recipe.title,
            recipe.description,
            recipe.tags.join(" "),
            recipe.ingredients.join(" "),
            recipe.cuisines?.join(" ") ?? "",
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(token);
        });
      }

      return matchesTag && matchesIntent;
    });
  }, [activeTag, basis, ingredientTokens, promptTokens]);

  const inspiredRecipe = inspiredRecipeId
    ? recipes.find((recipe) => recipe.id === inspiredRecipeId)
    : undefined;

  const helperDescription =
    basis === "ingredients"
      ? "Start from what is already in your kitchen. Great for CSA boxes, farmers market hauls, and random fridge odds and ends."
      : "Start from the outcome you want. Great for asks like a five-day dinner menu, one high-protein meal, or a baby-friendly weeknight.";

  return (
    <PageShell
      title={mode === "week" ? "Plan the week" : "Find one meal"}
      description="The trusted-source knowledge stays in the background. Your job is just to describe what you need."
    >
      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Step 1
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMode("meal")}
                  className={`rounded-2xl p-4 text-left transition ${
                    mode === "meal"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-50 text-stone-700 ring-1 ring-stone-200 hover:bg-cream"
                  }`}
                >
                  <p className="font-serif text-xl font-semibold">Find one meal</p>
                  <p className="mt-1 text-sm text-inherit/80">Solve tonight&apos;s dinner.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("week")}
                  className={`rounded-2xl p-4 text-left transition ${
                    mode === "week"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-50 text-stone-700 ring-1 ring-stone-200 hover:bg-cream"
                  }`}
                >
                  <p className="font-serif text-xl font-semibold">Plan the week</p>
                  <p className="mt-1 text-sm text-inherit/80">Build a realistic menu and shopping list.</p>
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Step 2
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setBasis("ingredients")}
                  className={`rounded-2xl p-4 text-left transition ${
                    basis === "ingredients"
                      ? "bg-cream text-stone-900 ring-2 ring-terracotta/70"
                      : "bg-stone-50 text-stone-700 ring-1 ring-stone-200 hover:bg-cream"
                  }`}
                >
                  <p className="font-serif text-xl font-semibold">Use what I have</p>
                  <p className="mt-1 text-sm text-inherit/80">Let ingredients lead the search.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setBasis("prompt")}
                  className={`rounded-2xl p-4 text-left transition ${
                    basis === "prompt"
                      ? "bg-cream text-stone-900 ring-2 ring-terracotta/70"
                      : "bg-stone-50 text-stone-700 ring-1 ring-stone-200 hover:bg-cream"
                  }`}
                >
                  <p className="font-serif text-xl font-semibold">Tell it what I want</p>
                  <p className="mt-1 text-sm text-inherit/80">Let a plain-language ask lead the search.</p>
                </button>
              </div>
            </div>

            {basis === "ingredients" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">
                  What do you have on hand?
                </span>
                <textarea
                  value={ingredientsOnHand}
                  onChange={(event) => setIngredientsOnHand(event.target.value)}
                  placeholder="CSA zucchini, cherry tomatoes, basil, yogurt, salmon..."
                  className="min-h-28 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none ring-terracotta/0 transition focus:ring-2 focus:ring-terracotta/30"
                />
              </label>
            ) : (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">
                  What should the plan aim for?
                </span>
                <textarea
                  value={goalPrompt}
                  onChange={(event) => setGoalPrompt(event.target.value)}
                  placeholder="Plan a five-day high-protein dinner menu with easy lunches and one dinner out..."
                  className="min-h-28 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none ring-terracotta/0 transition focus:ring-2 focus:ring-terracotta/30"
                />
              </label>
            )}

            <p className="rounded-2xl bg-sage/10 px-4 py-3 text-sm leading-6 text-stone-700">
              {helperDescription}
            </p>
          </div>

          <div className="space-y-4 rounded-3xl bg-stone-50 p-5 ring-1 ring-stone-200">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                How to think about this
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-stone-600">
                <li>Use ingredients when you want the app to work around what is already in the kitchen.</li>
                <li>Use a prompt when you know the outcome you want but not the exact recipe.</li>
                <li>Macros and baby-friendly adaptations can show up inside recipes instead of cluttering this first screen.</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Quietly informing results
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Recipe sources and taste profile stay behind the scenes. The app should already know the blogs,
                creators, and recipe style it is drawing from.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-8 space-y-6">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Refine by cuisine, ingredient, or mood..."
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-terracotta/0 transition placeholder:text-stone-400 focus:ring-2 focus:ring-terracotta/30"
        />
        <TagFilter tags={tags} activeTag={activeTag} onChange={setActiveTag} />
        <InspireMe
          title={mode === "week" ? "Need a strong starting point?" : "Need dinner inspiration?"}
          description={
            mode === "week"
              ? "Pull one solid candidate from the recipe library and add it to your plan."
              : "Pull one recipe from the background library without fussing with source selection."
          }
          onInspire={() => {
            const pick = getRandomRecipe();
            if (pick) setInspiredRecipeId(pick.id);
          }}
          recipe={inspiredRecipe}
          action={
            inspiredRecipe ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <AddToPlanButton recipeId={inspiredRecipe.id} />
                <Link
                  href={`/recipes/${inspiredRecipe.id}`}
                  className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 ring-1 ring-stone-200 transition hover:bg-cream"
                >
                  View recipe
                </Link>
              </div>
            ) : null
          }
        />
      </div>

      <p className="mb-4 text-sm text-stone-500">
        {filtered.length} meal{filtered.length === 1 ? "" : "s"}
        {activeTag ? ` · ${activeTag}` : ""}
        {basis === "ingredients" && ingredientTokens.length > 0 ? ` · using ${ingredientTokens.length} ingredient notes` : ""}
        {basis === "prompt" && goalPrompt ? " · guided by your prompt" : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            showMacros
            footer={
              <>
                <AddToPlanButton recipeId={recipe.id} variant="secondary" />
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:text-terracotta"
                >
                  Details →
                </Link>
              </>
            }
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-stone-200/80">
          <p className="font-serif text-lg font-semibold text-stone-900">No matches yet</p>
          <p className="mt-2 text-sm text-stone-600">
            Try a broader prompt, fewer ingredients, or clear a filter and let the library breathe a little.
          </p>
        </div>
      ) : null}
    </PageShell>
  );
}
