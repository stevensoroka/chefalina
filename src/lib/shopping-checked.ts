"use client";

import { useEffect, useState } from "react";

const CHECKED_KEY = "chefalina-shopping-checked";

export function useCheckedItems(items: string[]) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHECKED_KEY);
      if (raw) setChecked(new Set(JSON.parse(raw) as string[]));
    } catch {
      setChecked(new Set());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CHECKED_KEY, JSON.stringify([...checked]));
  }, [checked, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const valid = new Set(items);
    setChecked((prev) => {
      const next = new Set([...prev].filter((item) => valid.has(item)));
      return next.size === prev.size ? prev : next;
    });
  }, [items, hydrated]);

  function toggle(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  function clearChecked() {
    setChecked(new Set());
  }

  return { checked, toggle, clearChecked, hydrated };
}
