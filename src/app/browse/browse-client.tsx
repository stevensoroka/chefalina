"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AddToPlanButton } from "@/components/add-to-plan-button";
import { InspireMe, TagFilter } from "@/components/tag-filter";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { getAllTags, getRandomRecipe, recipes } from "@/lib/recipes";
import Link from "next/link";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get("tag");

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
  const [inspiredRecipeId, setInspiredRecipeId] = useState<string | null>(null);

  const tags = useMemo(() => getAllTags(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesTag = !activeTag || recipe.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        recipe.title.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        recipe.ingredients.some((item) => item.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  const inspiredRecipe = inspiredRecipeId
    ? recipes.find((recipe) => recipe.id === inspiredRecipeId)
    : undefined;

  return (
    <PageShell
      title="Browse meals"
      description="Filter by vibe, search ingredients, and add favorites to your week."
    >
      <div className="mb-8 space-y-6">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search meals, tags, or ingredients…"
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-terracotta/0 transition placeholder:text-stone-400 focus:ring-2 focus:ring-terracotta/30"
        />
        <TagFilter tags={tags} activeTag={activeTag} onChange={setActiveTag} />
        <InspireMe
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
        {query ? ` · “${query}”` : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
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
          <p className="font-serif text-lg font-semibold text-stone-900">No matches</p>
          <p className="mt-2 text-sm text-stone-600">Try clearing filters or a broader search.</p>
        </div>
      ) : null}
    </PageShell>
  );
}
