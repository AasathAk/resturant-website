/**
 * Le Menu Santé - Internationalization (i18n)
 * Full bilingual support (English & French) with zero hardcoded text in HTML.
 */

const TRANSLATIONS = {
  en: {
    brandName: "Le Menu Santé",
    brandSubtitle: "Parisian Bistro & Nutrition",
    langEn: "English",
    langFr: "Français",
    themeToggleAria: "Toggle light / dark mode",
    heroTitle: "Gourmet French Cuisine with Total Nutritional Clarity",
    heroSubtitle: "Explore chef-crafted dishes with full ingredient transparency, accurate micronutrient breakdowns, and evidence-based wellness notes.",
    heroBadge: "Artisanal House-Crafted • Nutritional Clarity",
    filterAll: "All Dishes",
    filterVeg: "Vegetarian",
    filterNonVeg: "Non-Vegetarian",
    searchPlaceholder: "Search dish or ingredient (e.g. salmon, spinach)...",
    dishesFound: "Showing {count} culinary creations",
    noResultsTitle: "No dishes found",
    noResultsSub: "Try adjusting your search query or filter selection.",
    vegBadge: "VEGETARIAN",
    nonVegBadge: "NON-VEG",
    viewDetails: "View Nutrition Details",
    cardKcal: "kcal",
    cardProtein: "g protein",
    cardCalcium: "mg calcium",
    modalServingSize: "Portion size",
    orbitHeading: "Fresh Ingredients & Recipe Composition",
    orbitSubtext: "Touch any fresh ingredient around the dish to inspect its portion weight, nutrition details, and culinary purpose.",
    orbitCenterDishBadge: "Plated Recipe",
    spotlightHeading: "Selected Ingredient Insight",
    spotlightTapHint: "Tap an ingredient in the orbit circle to inspect its exact contribution.",
    modalIngredientsHeading: "Ingredient Breakdown & Nutrition per Serving",
    toggleTableView: "View Detailed Nutrition Table",
    toggleTableViewHide: "Hide Detailed Table",
    colIngredient: "Ingredient",
    colQuantity: "Quantity",
    colCalories: "Calories",
    colProtein: "Protein",
    colCalcium: "Calcium",
    colVitamins: "Key Micronutrients",
    rowTotalServing: "Total per serving",
    dailyCoverageHeading: "Daily Body Need Coverage (Adult 2,000 kcal diet)",
    dailyNote: "Percentage of Recommended Daily Value (% DV) provided in one complete serving:",
    goodForBody: "Good for your body",
    beCareful: "Mindful considerations",
    closeModal: "Close window",
    footerText: "Nutritional figures are computed directly from recipe ingredient weights using reference biochemical food tables (CIQUAL / USDA). For informational guidance, not clinical medical advice.",
    creditsLink: "Image Credits & Photographers"
  },
  fr: {
    brandName: "Le Menu Santé",
    brandSubtitle: "Bistrot Parisien & Nutrition",
    langEn: "English",
    langFr: "Français",
    themeToggleAria: "Basculer le mode clair / sombre",
    heroTitle: "Haute Gastronomie Française & Transparence Nutritionnelle",
    heroSubtitle: "Découvrez nos plats signatures avec la transparence absolue de chaque ingrédient, le détail des macronutriments et des conseils bien-être ciblés.",
    heroBadge: "Cuisine Faite Maison • Transparence Culinaire",
    filterAll: "Tous les Plats",
    filterVeg: "Végétarien",
    filterNonVeg: "Non Végétarien",
    searchPlaceholder: "Rechercher un plat ou ingrédient (ex: saumon, épinards)...",
    dishesFound: "Affichage de {count} créations culinaires",
    noResultsTitle: "Aucun plat trouvé",
    noResultsSub: "Essayez de modifier votre recherche ou le filtre sélectionné.",
    vegBadge: "VÉGÉTARIEN",
    nonVegBadge: "NON VÉGÉ",
    viewDetails: "Détails Nutritionnels",
    cardKcal: "kcal",
    cardProtein: "g protéines",
    cardCalcium: "mg calcium",
    modalServingSize: "Taille de la portion",
    orbitHeading: "Ingrédients Frais & Composition de la Recette",
    orbitSubtext: "Touchez un ingrédient autour du plat pour découvrir son grammage, ses apports nutritionnels et son rôle gustatif.",
    orbitCenterDishBadge: "Création du Chef",
    spotlightHeading: "Zoom sur l'Ingrédient Sélectionné",
    spotlightTapHint: "Touchez un ingrédient dans le cercle pour inspecter ses apports détaillés.",
    modalIngredientsHeading: "Composition Détaillée & Valeurs par Portion",
    toggleTableView: "Consulter la Table Nutritionnelle Détaillée",
    toggleTableViewHide: "Masquer la Table Détaillée",
    colIngredient: "Ingrédient",
    colQuantity: "Quantité",
    colCalories: "Calories",
    colProtein: "Protéines",
    colCalcium: "Calcium",
    colVitamins: "Micronutriments clés",
    rowTotalServing: "Total par portion",
    dailyCoverageHeading: "Couverture des Besoins Quotidiens (Adulte 2000 kcal)",
    dailyNote: "Pourcentage des apports journaliers recommandés (% AJR) couverts par une portion :",
    goodForBody: "Bénéfique pour votre corps",
    beCareful: "Vigilance & Précautions",
    closeModal: "Fermer la fenêtre",
    footerText: "Valeurs nutritionnelles calculées selon les poids réels de la recette et les tables biochimiques de référence (CIQUAL / USDA). À titre indicatif, ne remplace pas un conseil médical.",
    creditsLink: "Crédits Photographiques"
  }
};

const I18N = {
  currentLang: "en",

  init() {
    const saved = localStorage.getItem("menu_sante_lang");
    if (saved === "fr" || saved === "en") {
      this.currentLang = saved;
    } else {
      const navLang = navigator.language || "";
      if (navLang.toLowerCase().startsWith("fr")) {
        this.currentLang = "fr";
      }
    }
    this.apply();
  },

  setLang(lang) {
    if (lang !== "en" && lang !== "fr") return;
    this.currentLang = lang;
    localStorage.setItem("menu_sante_lang", lang);
    this.apply();
  },

  t(key, replacements = {}) {
    let str = (TRANSLATIONS[this.currentLang] && TRANSLATIONS[this.currentLang][key]) ||
              (TRANSLATIONS.en && TRANSLATIONS.en[key]) || key;

    Object.keys(replacements).forEach(k => {
      str = str.replace(`{${k}}`, replacements[k]);
    });
    return str;
  },

  apply() {
    document.documentElement.lang = this.currentLang;

    // Translate all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      el.textContent = text;
    });

    // Translate placeholder attributes
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = this.t(key);
    });

    // Translate aria-label attributes
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
      const key = el.dataset.i18nAria;
      el.setAttribute("aria-label", this.t(key));
    });

    // Update active button state on language toggles
    document.querySelectorAll("[data-lang-btn]").forEach(btn => {
      const btnLang = btn.dataset.langBtn;
      btn.classList.toggle("active", btnLang === this.currentLang);
      btn.setAttribute("aria-pressed", btnLang === this.currentLang ? "true" : "false");
    });
  }
};
