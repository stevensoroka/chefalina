# chefalina

Meal inspiration for the week — browse recipes, build a plan, merge a shopping list.

Built as a cozy vibecode project. One day: carts and checkout. Tonight: something live on the internet.

## Quick start

```bash
cd chefalina
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push this repo to GitHub
2. [vercel.com](https://vercel.com) → Import `stevensoroka/chefalina`
3. Deploy (defaults are fine for Next.js)

Every push to `main` auto-deploys.

## Project structure

```
src/app/          → pages (home, browse, plan)
src/components/   → UI building blocks
src/data/recipes/ → JSON recipes (edit these!)
docs/             → taste profile & roadmap
```

## Customize tonight

- **Recipes:** `src/data/recipes/sample.json`
- **Pantry staples:** `src/data/pantry-staples.json`
- **House rules:** `docs/taste-profile.md`
- **Plan:** saves in browser localStorage (no account yet)

## Pages

| Route | What it does |
|-------|----------------|
| `/` | Home + featured meals |
| `/browse` | Search, filter, inspire, add to plan |
| `/recipes/[id]` | Full recipe view |
| `/plan` | Weekly board + shopping list |

## Stack

Next.js · TypeScript · Tailwind CSS · GitHub · Vercel
