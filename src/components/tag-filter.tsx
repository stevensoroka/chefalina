import type { Recipe } from "@/lib/types";

type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onChange: (tag: string | null) => void;
};

export function TagFilter({ tags, activeTag, onChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
          activeTag === null
            ? "bg-terracotta text-white"
            : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-cream"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag === activeTag ? null : tag)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            activeTag === tag
              ? "bg-terracotta text-white"
              : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-cream"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

type InspireButtonProps = {
  onInspire: () => void;
  recipe?: Recipe;
  action?: React.ReactNode;
  title?: string;
  description?: string;
};

export function InspireMe({
  onInspire,
  recipe,
  action,
  title = "Need inspiration?",
  description = "Pull a random meal from the starter library.",
}: InspireButtonProps) {
  return (
    <div className="rounded-2xl border border-dashed border-terracotta/40 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900">{title}</h2>
          <p className="mt-1 text-sm text-stone-600">{description}</p>
        </div>
        <button
          type="button"
          onClick={onInspire}
          className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terracotta-dark"
        >
          Inspire me ✨
        </button>
      </div>
      {recipe ? (
        <div className="mt-4 rounded-xl bg-cream p-4">
          <p className="text-sm font-medium text-terracotta">Tonight&apos;s pick</p>
          <p className="mt-1 font-serif text-lg font-semibold text-stone-900">{recipe.title}</p>
          <p className="mt-1 text-sm text-stone-600">{recipe.description}</p>
          {action}
        </div>
      ) : null}
    </div>
  );
}
