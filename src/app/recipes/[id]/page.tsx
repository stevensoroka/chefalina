import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToPlanButton } from "@/components/add-to-plan-button";
import { PageShell } from "@/components/page-shell";
import { getRecipeById, recipes } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) notFound();

  return (
    <PageShell
      title={recipe.title}
      description={recipe.description}
      action={<AddToPlanButton recipeId={recipe.id} />}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <Link
            key={tag}
            href={`/browse?tag=${encodeURIComponent(tag)}`}
            className="rounded-full bg-cream px-3 py-1 text-sm font-medium text-stone-600 transition hover:bg-terracotta hover:text-white"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="mb-8 flex gap-6 text-sm text-stone-500">
        <span>{recipe.timeMinutes} min</span>
        <span>Serves {recipe.servings}</span>
        {recipe.proteinGrams ? <span>{recipe.proteinGrams}g protein</span> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
          <h2 className="font-serif text-xl font-semibold text-stone-900">Ingredients</h2>
          <ul className="mt-4 space-y-2">
            {recipe.ingredients.map((item) => (
              <li key={item} className="flex gap-2 text-stone-700">
                <span className="text-terracotta">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
          <h2 className="font-serif text-xl font-semibold text-stone-900">Steps</h2>
          <ol className="mt-4 space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-stone-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-sm font-semibold text-terracotta">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="mt-6 rounded-2xl bg-sage/10 p-6 ring-1 ring-sage/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-stone-900">Make this baby-friendly</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Keep this as an in-recipe helper instead of a global preference. The goal is to adapt the meal you already want to make, not filter the whole app around it.
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sage ring-1 ring-sage/20">
            {recipe.supportsBaby ? "Good candidate" : "Needs a little more adaptation"}
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-sage/15">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Texture</p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              Soften, shred, mash, or cut the finished meal into baby-safe pieces before serving.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-sage/15">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Seasoning</p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              Pull out a plain portion before extra salt, heat, or finishing sauces.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-sage/15">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Serving idea</p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              Offer the core ingredients separately so the meal still works for the rest of the household.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <AddToPlanButton recipeId={recipe.id} />
        <Link
          href="/browse"
          className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 ring-1 ring-stone-200 transition hover:bg-white"
        >
          ← Back to browse
        </Link>
      </div>
    </PageShell>
  );
}
