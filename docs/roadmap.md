# Roadmap

## Phase 0 — Vibecode MVP (now)

- [x] Browse starter recipes with tags
- [x] Weekly plan with localStorage
- [x] Merged shopping list + copy to clipboard
- [x] Recipe detail pages (`/recipes/[id]`)
- [x] Search + add-to-plan from browse
- [x] Fill empty days + checkable shopping list
- [x] Pantry staples hidden from shopping list
- [ ] Wife adds real meals to `src/data/recipes/sample.json`
- [x] Deploy on Vercel

## Phase 1 — Shared & persistent

- [ ] Supabase (Postgres + auth) for shared plans across devices
- [ ] Recipe photos in storage
- [ ] Pantry staples subtracted from shopping list

## Phase 2 — Inspiration engine

- [ ] LLM API using `docs/taste-profile.md` as context
- [ ] Cache generated meals in the database
- [ ] Optional recipe API (Spoonacular / Edamam)

## Phase 3 — Shopping

- [ ] Smarter ingredient normalization (merge duplicates)
- [ ] Export to Reminders / Notes / PDF
- [ ] PostHog analytics on what you actually cook

## Phase 4 — Checkout (later)

- [ ] Grocery deep links or partner APIs
- [ ] Product matching & substitutions
