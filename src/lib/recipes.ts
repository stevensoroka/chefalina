import sampleRecipes from "@/data/recipes/sample.json";
import type { Recipe } from "@/lib/types";

export const recipes = sampleRecipes as Recipe[];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const recipe of recipes) {
    for (const tag of recipe.tags) {
      tags.add(tag);
    }
  }
  return [...tags].sort();
}

export function getRandomRecipe(excludeIds: string[] = []): Recipe | undefined {
  const pool = recipes.filter((recipe) => !excludeIds.includes(recipe.id));
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}
