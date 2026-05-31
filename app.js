const state = {
  selectedMode: "Balanced healthy",
  scope: "week",
  basis: "sources",
  useLeftovers: true,
  adults: "2",
  kids: "0",
  preferences: new Set(["balanced", "high-protein", "show-macros", "baby-friendly"]),
  ingredients: [
    { name: "zucchini", source: "CSA box" },
    { name: "cherry tomatoes", source: "Farmer's market" },
    { name: "basil", source: "Farmer's market" },
    { name: "eggs", source: "Fridge" },
    { name: "lentils", source: "Pantry" },
    { name: "peaches", source: "CSA box" }
  ],
  sources: [
    { name: "What's Gaby Cooking", type: "Food blog", focus: "California-style dinners, salads, entertaining", active: true },
    { name: "Pinch of Yum", type: "Food blog", focus: "Weeknight-friendly bowls, soups, family meals", active: true },
    { name: "The Defined Dish", type: "Food blog / cookbooks", focus: "Balanced comfort food, Whole30-friendly ideas", active: true },
    { name: "Erica Vetrini", type: "Instagram creator", focus: "Italian-inspired home cooking and family food", active: true },
    { name: "Wishbone Kitchen", type: "Instagram / cookbook-style", focus: "Seasonal market cooking, hosting, produce-first meals", active: true },
    { name: "Violet Witchel / Violet Cooks", type: "Instagram creator", focus: "Simple, clever, social-first recipes", active: true }
  ]
};

const recipes = [
  {
    title: "Zucchini, basil, and tomato frittata",
    source: "Saved recipe slot from your trusted library",
    meal: "Breakfast or lunch",
    tags: ["uses eggs", "CSA-friendly", "baby-adaptable"],
    match: 94,
    macros: { calories: 410, protein: 25, carbs: 18, fat: 27 }
  },
  {
    title: "Lentil chopped salad with herby yogurt",
    source: "Pinch of Yum reference",
    meal: "Lunch",
    tags: ["high fiber", "leftovers", "vegetarian"],
    match: 91,
    macros: { calories: 520, protein: 28, carbs: 58, fat: 19 }
  },
  {
    title: "Market tomato pasta with basil and chicken",
    source: "What's Gaby Cooking reference",
    meal: "Dinner",
    tags: ["family dinner", "leftovers", "high protein"],
    match: 88,
    macros: { calories: 640, protein: 42, carbs: 66, fat: 22 }
  },
  {
    title: "Defined Dish-style turkey lettuce bowls",
    source: "The Defined Dish reference",
    meal: "Dinner",
    tags: ["lower carb", "quick", "sauce on side"],
    match: 84,
    macros: { calories: 560, protein: 46, carbs: 34, fat: 28 }
  },
  {
    title: "Peach, yogurt, and oat breakfast jars",
    source: "Household staple",
    meal: "Breakfast",
    tags: ["repeat breakfast", "baby-adaptable", "make ahead"],
    match: 82,
    macros: { calories: 390, protein: 24, carbs: 48, fat: 11 }
  },
  {
    title: "Wishbone-style seasonal grain bowls",
    source: "Wishbone Kitchen reference",
    meal: "Lunch or dinner",
    tags: ["market produce", "flexible", "leftovers"],
    match: 80,
    macros: { calories: 610, protein: 31, carbs: 72, fat: 21 }
  }
];

const weeklyPlans = [
  [
    ["Mon", "Yogurt, peaches, oats", "Lentil chopped salad", "Tomato basil chicken pasta"],
    ["Tue", "Oatmeal with peaches", "Leftover tomato basil pasta", "Turkey lettuce bowls"],
    ["Wed", "Yogurt, peaches, oats", "Zucchini frittata and greens", "Seasonal grain bowls"],
    ["Thu", "Oatmeal with nut butter", "Leftover grain bowls", "Dinner out / open night"],
    ["Fri", "Yogurt, peaches, oats", "Lentil salad wraps", "Zucchini frittata with tomato salad"],
    ["Sat", "Eggs and market fruit", "Flexible leftovers", "Dinner out with friends"],
    ["Sun", "Simple breakfast jars", "Pantry lunch", "Batch cook lentils and roasted vegetables"]
  ],
  [
    ["Mon", "Peach yogurt jars", "Tomato frittata slice", "Defined Dish-style turkey bowls"],
    ["Tue", "Oatmeal", "Leftover turkey bowl", "Gaby-style chicken tomato pasta"],
    ["Wed", "Yogurt and fruit", "Lentil chopped salad", "Seasonal grain bowls"],
    ["Thu", "Oatmeal", "Leftover grain bowl", "Quick eggs, zucchini, basil"],
    ["Fri", "Peach yogurt jars", "Lentil salad with toast", "Dinner out / open night"],
    ["Sat", "Eggs and fruit", "Farmer's market snack lunch", "Wishbone-style produce dinner"],
    ["Sun", "Oatmeal", "Leftovers", "Batch prep breakfast jars and lentils"]
  ]
];

const oneMealIdeas = {
  ingredients: [
    ["Tonight", "Meal idea", "Zucchini, basil, and egg frittata with cherry tomato salad", "Source logic", "Built from what is already in your kitchen"],
    ["Why it fits", "Uses", "Zucchini, cherry tomatoes, basil, eggs", "Baby variation", "Pull an unsalted wedge before adding flaky salt or spicy sauce"],
    ["Next step", "Optional protein", "Greek yogurt or rotisserie chicken if you want it heartier", "Shopping", "No full grocery run needed"]
  ],
  sources: [
    ["Tonight", "Meal idea", "Defined Dish-style turkey lettuce bowls", "Source logic", "Starts from a trusted creator instead of your pantry"],
    ["Why it fits", "Source-led", "The Defined Dish style reference", "Baby variation", "Serve plain turkey, avocado, and soft rice separately"],
    ["Next step", "Shopping", "Ground turkey, lettuce, avocado, mild salsa", "Prep note", "Keep sauces on the side"]
  ]
};

const basisLabels = {
  ingredients: "Ingredient-led",
  sources: "Source-led"
};

const logicCards = {
  week: {
    ingredients: [
      ["What it optimizes for", "Use the produce, proteins, and staples already in your kitchen before sending you shopping."],
      ["How recipes are found", "Search your trusted sources for recipes that feature your on-hand ingredients and fit your household."],
      ["Why this matters", "The weekly plan becomes more realistic because it respects leftovers, repeat breakfasts, and food you already bought."]
    ],
    sources: [
      ["What it optimizes for", "Build a week from the blogs, creators, and cookbooks you already trust."],
      ["How recipes are found", "Search your source library by meal type, household preferences, and dietary filters instead of making you paste recipe links one by one."],
      ["Why this matters", "V1 becomes a planning destination, not just a recipe bookmark board."]
    ]
  },
  meal: {
    ingredients: [
      ["What it optimizes for", "Solve tonight's dinner with what you already have on hand."],
      ["How recipes are found", "Prioritize recipes from your trusted sources that use overlapping ingredients from your kitchen."],
      ["Why this matters", "One-off meal mode feels useful when you are short on time and trying to avoid waste."]
    ],
    sources: [
      ["What it optimizes for", "Find a strong single meal from your favorite food people first."],
      ["How recipes are found", "Search your source library by craving, dietary fit, and household needs, then surface the best match."],
      ["Why this matters", "This keeps the app aspirational without losing the practical planning angle."]
    ]
  }
};

const babyNoteSets = [
  [
    "Set aside unsalted zucchini, tomato, lentils, and egg before seasoning the adult portions.",
    "Offer soft strips or mashed pieces; keep spicy sauces and salty cheeses separate.",
    "Use yogurt as a cooling sauce for lentils or grain bowls, checking allergens with your pediatrician's guidance."
  ],
  [
    "Turn dinner components into a tiny plate: soft chicken shreds, smashed lentils, ripe peach slices, and cooked zucchini.",
    "Keep texture varied but manageable; avoid hard raw vegetables and large round tomato pieces.",
    "Batch-cook a plain portion of grains or oats to reuse across breakfast and dinner adaptations."
  ]
];

const shopping = {
  Produce: ["romaine or butter lettuce", "avocados", "lemons", "cucumbers", "greens"],
  Protein: ["chicken breast or thighs", "ground turkey", "Greek yogurt"],
  Pantry: ["rolled oats", "brown rice or farro", "tortillas", "olive oil"],
  "Herbs & flavor": ["garlic", "ginger", "mild salsa", "low-sodium broth"]
};

let planIndex = 0;
let babyIndex = 0;

function renderWeek() {
  const weekList = document.querySelector("#weekList");
  const rows = state.scope === "week" ? weeklyPlans[planIndex] : oneMealIdeas[state.basis];
  if (state.scope === "week") {
    weekList.innerHTML = rows.map(([day, breakfast, lunch, dinner]) => `
      <div class="day-card">
        <div class="day-name">${day}</div>
        <div class="meal-lines">
          <div class="meal-line"><strong>Breakfast</strong><span>${breakfast}</span></div>
          <div class="meal-line"><strong>Lunch</strong><span>${lunch}</span></div>
          <div class="meal-line"><strong>Dinner</strong><span>${dinner}</span></div>
        </div>
      </div>
    `).join("");
    return;
  }

  weekList.innerHTML = rows.map(([heading, labelOne, valueOne, labelTwo, valueTwo]) => `
    <div class="day-card meal-idea-card">
      <div class="day-name">${heading}</div>
      <div class="meal-lines">
        <div class="meal-line"><strong>${labelOne}</strong><span>${valueOne}</span></div>
        <div class="meal-line"><strong>${labelTwo}</strong><span>${valueTwo}</span></div>
      </div>
    </div>
  `).join("");
}

function renderRecipes() {
  const recipeGrid = document.querySelector("#recipeGrid");
  const filteredRecipes = recipes.filter((recipe) => {
    if (state.scope === "meal" && state.basis === "ingredients") {
      return recipe.tags.some((tag) => tag.includes("CSA") || tag.includes("uses") || tag.includes("market"));
    }
    if (state.basis === "sources") {
      return !recipe.source.includes("Household staple");
    }
    return true;
  });
  document.querySelector("#matchCount").textContent = `${filteredRecipes.length} matches`;
  recipeGrid.innerHTML = filteredRecipes.map((recipe) => `
    <article class="recipe-card">
      <div>
        <p class="eyebrow">${recipe.meal}</p>
        <h4>${recipe.title}</h4>
        <p class="recipe-meta">${recipe.source}</p>
      </div>
      <div class="tag-row">${recipe.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      <p class="recipe-meta">${recipe.match}% match | est. ${recipe.macros.calories} cal, ${recipe.macros.protein}g protein</p>
    </article>
  `).join("");
}

function renderExperience() {
  const weekMode = state.scope === "week";
  document.querySelector("#heroTitle").textContent = weekMode
    ? "Meal planning that starts with how you actually cook."
    : "Find the right meal for tonight without starting from scratch.";
  document.querySelector("#heroSubcopy").textContent = weekMode
    ? "Tell the app whether you need one meal or a whole week, then let it search your trusted food world for the right fit."
    : "Use what is in the fridge or search your favorite cooks for a meal that fits tonight.";
  document.querySelector("#planEyebrow").textContent = weekMode ? "Weekly menu" : "One-meal inspiration";
  document.querySelector("#planTitle").textContent = weekMode ? "May 31 - Jun 6" : "Tonight's best path";
  document.querySelector("#recipeHeading").textContent = weekMode ? "Best matches for this week" : "Best matches for this meal";
  document.querySelector("#basisPill").textContent = basisLabels[state.basis];
  document.querySelector("#logicTitle").textContent = weekMode
    ? "Search your food universe in the right way."
    : "Search your food universe for one strong answer.";
  document.querySelector("#logicCopy").textContent = weekMode
    ? "For v1, the job is meal planning. The app should understand your sources, search them intelligently, and match results to your household and preferences."
    : "One-meal mode still uses your preferences and sources, but it narrows the goal to a single good fit for tonight.";

  document.querySelectorAll("[data-choice-group='scope']").forEach((button) => {
    button.classList.toggle("active", button.dataset.choiceValue === state.scope);
  });
  document.querySelectorAll("[data-choice-group='basis']").forEach((button) => {
    button.classList.toggle("active", button.dataset.choiceValue === state.basis);
  });

  document.querySelector("#modeSelect").value = state.selectedMode;
  const showBaby = state.preferences.has("baby-friendly");
  document.querySelector(".baby-panel").style.display = showBaby ? "block" : "none";
  document.querySelector("#babyToggle").checked = showBaby;
  document.querySelector("#leftoverToggle").checked = state.useLeftovers;
  document.querySelector("#adultCount").value = state.adults;
  document.querySelector("#kidCount").value = state.kids;
  document.querySelectorAll(".pref-chip").forEach((button) => {
    button.classList.toggle("active", state.preferences.has(button.dataset.pref));
  });

  const logicList = document.querySelector("#logicList");
  logicList.innerHTML = logicCards[state.scope][state.basis].map(([title, copy]) => `
    <div class="logic-item">
      <strong>${title}</strong>
      <span>${copy}</span>
    </div>
  `).join("");

  const householdBits = [
    `${state.adults} adult${state.adults === "1" ? "" : "s"}`
  ];
  if (state.kids !== "0") householdBits.push(`${state.kids} kid${state.kids === "1" ? "" : "s"}`);
  if (state.preferences.has("baby-friendly")) householdBits.push("Baby-friendly notes on");
  if (state.preferences.has("show-macros")) householdBits.push("Macros visible");
  if (state.useLeftovers && weekMode) householdBits.push("Leftovers planned");
  document.querySelector(".household-card").innerHTML = householdBits.map((bit) => `<span>${bit}</span>`).join("");

  renderWeek();
  renderRecipes();
  refreshStats();
}

function renderSources() {
  const sourceGrid = document.querySelector("#sourceGrid");
  sourceGrid.innerHTML = state.sources.map((source, index) => `
    <button class="source-card ${source.active ? "active" : ""}" data-source-index="${index}">
      <div class="source-title">${source.name}</div>
      <div class="source-meta">${source.type}</div>
      <p class="source-meta">${source.focus}</p>
    </button>
  `).join("");
}

function renderIngredients() {
  const ingredientChips = document.querySelector("#ingredientChips");
  ingredientChips.innerHTML = state.ingredients.map((ingredient, index) => `
    <button class="ingredient-chip" data-ingredient-index="${index}">${ingredient.name} | ${ingredient.source}</button>
  `).join("");

  const priorityList = document.querySelector("#priorityList");
  const scores = state.ingredients.slice(0, 5).map((ingredient, index) => ({
    name: ingredient.name,
    score: 94 - (index * 7)
  }));
  priorityList.innerHTML = scores.map((item) => `
    <div class="priority-item">
      <strong>${item.name}</strong>
      <div class="bar" aria-label="${item.score}% priority"><span style="width: ${item.score}%"></span></div>
    </div>
  `).join("");
}

function renderBabyNotes() {
  const babyNotes = document.querySelector("#babyNotes");
  babyNotes.innerHTML = babyNoteSets[babyIndex].map((note) => `<li>${note}</li>`).join("");
}

function renderShopping() {
  const shoppingGrid = document.querySelector("#shoppingGrid");
  shoppingGrid.innerHTML = Object.entries(shopping).map(([category, items]) => `
    <article class="shopping-card">
      <h4>${category}</h4>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function refreshStats() {
  const highProtein = state.selectedMode === "High protein";
  const macroPanel = document.querySelector(".stats-panel");
  macroPanel.style.display = state.preferences.has("show-macros") ? "block" : "none";
  document.querySelector("#proteinStat").textContent = highProtein ? "122g" : "104g";
  document.querySelector("#calStat").textContent = highProtein ? "1,940" : "1,820";
  document.querySelector("#carbStat").textContent = state.selectedMode === "Lower carb" ? "118g" : "164g";
  document.querySelector("#fatStat").textContent = state.selectedMode === "Lower carb" ? "82g" : "71g";
}

function copyShoppingList() {
  const text = Object.entries(shopping)
    .map(([category, items]) => `${category}\n${items.map((item) => `- ${item}`).join("\n")}`)
    .join("\n\n");
  navigator.clipboard?.writeText(text);
  document.querySelector("#copyList").textContent = "Copied";
  window.setTimeout(() => {
    document.querySelector("#copyList").textContent = "Copy list";
  }, 1200);
}

function wireEvents() {
  document.querySelectorAll(".nav-pill").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-pill").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".section").forEach((section) => section.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`#${button.dataset.section}`).classList.add("active");
    });
  });

  document.querySelector("#generatePlan").addEventListener("click", () => {
    planIndex = (planIndex + 1) % weeklyPlans.length;
    babyIndex = (babyIndex + 1) % babyNoteSets.length;
    renderExperience();
    renderBabyNotes();
  });

  document.querySelectorAll("[data-choice-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.choiceGroup;
      const value = button.dataset.choiceValue;
      if (group === "scope") state.scope = value;
      if (group === "basis") state.basis = value;
      renderExperience();
    });
  });

  document.querySelector("#ingredientForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#ingredientInput");
    const source = document.querySelector("#ingredientSource");
    const name = input.value.trim();
    if (!name) return;
    state.ingredients.unshift({ name, source: source.value });
    input.value = "";
    renderIngredients();
  });

  document.querySelector("#sourceGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-source-index]");
    if (!card) return;
    const source = state.sources[Number(card.dataset.sourceIndex)];
    source.active = !source.active;
    renderSources();
  });

  document.querySelector("#sourceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.querySelector("#sourceName");
    const typeInput = document.querySelector("#sourceType");
    const focusInput = document.querySelector("#sourceFocus");
    const name = nameInput.value.trim();
    if (!name) return;
    state.sources.push({
      name,
      type: typeInput.value,
      focus: focusInput.value.trim() || "Saved for future recipe matching.",
      active: true
    });
    nameInput.value = "";
    focusInput.value = "";
    renderSources();
  });

  document.querySelector("#modeSelect").addEventListener("change", (event) => {
    state.selectedMode = event.target.value;
    renderExperience();
  });

  document.querySelector("#babyToggle").addEventListener("change", (event) => {
    if (event.target.checked) state.preferences.add("baby-friendly");
    else state.preferences.delete("baby-friendly");
    renderExperience();
  });

  document.querySelector("#leftoverToggle").addEventListener("change", (event) => {
    state.useLeftovers = event.target.checked;
    renderExperience();
  });

  document.querySelector("#adultCount").addEventListener("change", (event) => {
    state.adults = event.target.value;
    renderExperience();
  });

  document.querySelector("#kidCount").addEventListener("change", (event) => {
    state.kids = event.target.value;
    renderExperience();
  });

  document.querySelector("#preferenceChips").addEventListener("click", (event) => {
    const button = event.target.closest("[data-pref]");
    if (!button) return;
    const pref = button.dataset.pref;
    if (state.preferences.has(pref)) state.preferences.delete(pref);
    else state.preferences.add(pref);

    if (pref === "high-protein") state.selectedMode = state.preferences.has(pref) ? "High protein" : "Balanced healthy";
    renderExperience();
  });

  document.querySelector("#copyList").addEventListener("click", copyShoppingList);
}

function init() {
  renderExperience();
  renderSources();
  renderIngredients();
  renderBabyNotes();
  renderShopping();
  wireEvents();
}

init();
