import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/lib/recipes";

export default function HomePage() {
  const featured = recipes.slice(0, 3);

  return (
    <PageShell
      title="Plan meals you’ll actually cook"
      description="Chefalina helps you pick inspiration for the week, save a plan, and merge ingredients into one shopping list."
    >
      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/80">
          <p className="text-2xl">1</p>
          <h2 className="mt-2 font-serif text-lg font-semibold">Browse</h2>
          <p className="mt-1 text-sm text-stone-600">Filter by tags and find weeknight winners.</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/80">
          <p className="text-2xl">2</p>
          <h2 className="mt-2 font-serif text-lg font-semibold">Plan</h2>
          <p className="mt-1 text-sm text-stone-600">Assign meals to each day — saved on this device.</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/80">
          <p className="text-2xl">3</p>
          <h2 className="mt-2 font-serif text-lg font-semibold">Shop</h2>
          <p className="mt-1 text-sm text-stone-600">Merged ingredient list (checkout comes later).</p>
        </div>
      </section>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-stone-900">Starter meals</h2>
        <Link
          href="/browse"
          className="text-sm font-medium text-terracotta hover:text-terracotta-dark"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-sage/10 p-6 text-center sm:p-8">
        <p className="font-serif text-xl font-semibold text-stone-900">Ready to plan the week?</p>
        <p className="mt-2 text-sm text-stone-600">
          Add your own recipes in <code className="rounded bg-white px-1.5 py-0.5">src/data/recipes/sample.json</code>
        </p>
        <Link
          href="/plan"
          className="mt-4 inline-block rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-terracotta-dark"
        >
          Open weekly plan
        </Link>
      </div>
    </PageShell>
  );
}
