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
