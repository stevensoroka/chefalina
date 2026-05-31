import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/lib/recipes";

const promptIdeas = [
  "Plan a five-day high-protein dinner menu with easy lunches",
  "Use my CSA vegetables first and keep dinners under 35 minutes",
  "Find one cozy vegetarian dinner that still makes good leftovers",
];

export default function HomePage() {
  const featured = recipes.slice(0, 3);

  return (
    <PageShell
      title="Plan meals you'll actually cook"
      description="Start with the kind of help you need: one dinner tonight or a plan for the week. Chefalina should understand your household, ingredients, and tastes without making you manage the recipe sources yourself."
    >
      <section className="mb-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Choose the job
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/browse?mode=meal&basis=ingredients"
              className="rounded-2xl bg-cream p-5 transition hover:bg-terracotta hover:text-white"
            >
              <p className="font-serif text-xl font-semibold">Find one meal</p>
              <p className="mt-2 text-sm text-inherit/80">
                Best when you need dinner tonight and want to start from ingredients on hand.
              </p>
            </Link>
            <Link
              href="/browse?mode=week&basis=prompt&goal=Plan%20a%20five-day%20high-protein%20dinner%20menu"
              className="rounded-2xl bg-stone-900 p-5 text-white transition hover:bg-terracotta-dark"
            >
              <p className="font-serif text-xl font-semibold">Plan the week</p>
              <p className="mt-2 text-sm text-white/80">
                Best when you want a full menu, smarter leftovers, and one merged grocery list.
              </p>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-sage/10 p-6 ring-1 ring-sage/20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Built-in context
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
            <li>Ingredient-led flow for CSA boxes, market hauls, and whatever is already in the fridge.</li>
            <li>Prompt-led flow for asks like &quot;plan a five-day dinner menu&quot; or &quot;give me one high-protein dinner.&quot;</li>
            <li>Household context for adults, kids, baby-friendly adaptations, leftovers, and macro visibility.</li>
            <li>Trusted recipe sources stay in the background as the app&apos;s knowledge base, not a chore list for the user.</li>
          </ul>
        </div>
      </section>

      <section className="mb-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Starting point
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900">
                Use what I have or tell it what I want
              </h2>
            </div>
            <Link href="/browse" className="text-sm font-medium text-terracotta hover:text-terracotta-dark">
              Open browse →
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="font-medium text-stone-900">Ingredient-led</p>
              <p className="mt-2 text-sm text-stone-600">
                Type what is in the fridge or your CSA and let the planner narrow the field.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="font-medium text-stone-900">Prompt-led</p>
              <p className="mt-2 text-sm text-stone-600">
                Start with the outcome you want and let Chefalina decide which recipes fit.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-cream p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Prompt ideas
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {promptIdeas.map((idea) => (
                <Link
                  key={idea}
                  href={`/browse?mode=week&basis=prompt&goal=${encodeURIComponent(idea)}`}
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-stone-700 ring-1 ring-stone-200 transition hover:bg-terracotta hover:text-white"
                >
                  {idea}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Weekly flow
          </p>
          <div className="mt-4 grid gap-3">
            {[
              ["Browse", "Ask for one meal or a whole plan, then set your starting point."],
              ["Plan", "Save meals by day, keep leftovers in mind, and leave room for eating out."],
              ["Shop", "Merge the ingredients that are actually missing into a single grocery list."],
            ].map(([title, copy], index) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-stone-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold text-stone-900">{title}</p>
                  <p className="mt-1 text-sm text-stone-600">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-stone-900">Starter meals</h2>
        <Link href="/browse" className="text-sm font-medium text-terracotta hover:text-terracotta-dark">
          View all →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </PageShell>
  );
}
