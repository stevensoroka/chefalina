import type { Recipe } from "@/lib/types";
import Link from "next/link";

type RecipeCardProps = {
  recipe: Recipe;
  footer?: React.ReactNode;
  showMacros?: boolean;
  showHouseholdHint?: boolean;
};

export function RecipeCard({ recipe, footer, showMacros = false, showHouseholdHint = false }: RecipeCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-terracotta/40 hover:shadow-md">
      <Link href={`/recipes/${recipe.id}`} className="flex flex-1 flex-col">
        <div className="mb-3 flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-stone-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-xl font-semibold text-stone-900">{recipe.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{recipe.description}</p>
        {showHouseholdHint && recipe.supportsBaby ? (
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-terracotta">
            Baby-friendly adaptation is likely
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between text-sm text-stone-500">
          <span>{recipe.timeMinutes} min</span>
          <span>Serves {recipe.servings}</span>
        </div>
        {showMacros && recipe.proteinGrams ? (
          <div className="mt-3 text-sm text-stone-500">
            <span className="font-medium text-stone-700">{recipe.proteinGrams}g protein</span>
            {recipe.leftoverScore ? ` · leftovers ${recipe.leftoverScore}` : ""}
          </div>
        ) : null}
      </Link>
      {footer ? <div className="mt-4 flex flex-wrap gap-2 border-t border-stone-100 pt-4">{footer}</div> : null}
    </article>
  );
}
