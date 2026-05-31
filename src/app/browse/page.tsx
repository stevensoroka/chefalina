import { Suspense } from "react";
import BrowsePage from "./browse-client";

export default function BrowseRoute() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-10 text-stone-500">Loading…</div>}>
      <BrowsePage />
    </Suspense>
  );
}
