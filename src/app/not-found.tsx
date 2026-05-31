import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-4xl">🍽️</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-stone-900">Recipe not found</h1>
      <p className="mt-2 text-stone-600">That meal might have been swapped out of the rotation.</p>
      <Link
        href="/browse"
        className="mt-6 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terracotta-dark"
      >
        Browse meals
      </Link>
    </div>
  );
}
