/**
 * Le Menu Santé - Core Application Logic
 * Senior Frontend Architecture: Vanilla JS, Reactive State, Accessible UI
 * Includes Interactive Circular Orbit Ingredient Ecosystem
 */

(function () {
  'use strict';

  // State Management
  const state = {
    filter: 'all', // 'all' | 'veg' | 'nonveg'
    searchQuery: '',
    currentDishId: null,
    activeIngredientKey: null,
    isModalOpen: false,
    isTableVisible: false,
    theme: 'system' // 'light' | 'dark' | 'system'
  };

  // DOM Elements Cache
  const elements = {
    grid: document.getElementById('dishGrid'),
    catalogCount: document.getElementById('catalogCount'),
    searchInput: document.getElementById('searchInput'),
    searchClear: document.getElementById('searchClear'),
    filterChips: document.querySelectorAll('.filter-chip'),
    langButtons: document.querySelectorAll('[data-lang-btn]'),
    themeToggle: document.getElementById('themeToggle'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalWindow: document.getElementById('modalWindow'),
    modalHeroContainer: document.getElementById('modalHeroContainer'),
    modalBodyContainer: document.getElementById('modalBodyContainer'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    creditsBtn: document.getElementById('creditsBtn'),
    creditsModal: document.getElementById('creditsModal'),
    creditsCloseBtn: document.getElementById('creditsCloseBtn')
  };

  /**
   * Theme Controller
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('menu_sante_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      state.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      state.theme = 'system';
      document.documentElement.removeAttribute('data-theme');
    }
    updateThemeIcon();

    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen to OS scheme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (state.theme === 'system') {
        updateThemeIcon();
      }
    });
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const newTheme = isDark ? 'light' : 'dark';
    state.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('menu_sante_theme', newTheme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    if (!elements.themeToggle) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    elements.themeToggle.textContent = isDark ? '☀️' : '🌙';
  }

  /**
   * Language Controller
   */
  function initLanguage() {
    I18N.init();

    elements.langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.langBtn;
        if (lang !== I18N.currentLang) {
          I18N.setLang(lang);
          renderCatalog();
          if (state.isModalOpen && state.currentDishId) {
            renderModalContent(state.currentDishId);
          }
        }
      });
    });
  }

  /**
   * Filter & Search Handlers
   */
  function initFilters() {
    elements.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        elements.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.filter = chip.dataset.filter;
        renderCatalog();
      });
    });

    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (elements.searchClear) {
          elements.searchClear.classList.toggle('visible', state.searchQuery.length > 0);
        }
        renderCatalog();
      });
    }

    if (elements.searchClear) {
      elements.searchClear.addEventListener('click', () => {
        elements.searchInput.value = '';
        state.searchQuery = '';
        elements.searchClear.classList.remove('visible');
        elements.searchInput.focus();
        renderCatalog();
      });
    }
  }

  /**
   * Render Dish Catalog Grid
   */
  function renderCatalog() {
    const lang = I18N.currentLang;
    const q = state.searchQuery;

    const filtered = DISHES.filter(dish => {
      if (state.filter === 'veg' && dish.type !== 'veg') return false;
      if (state.filter === 'nonveg' && dish.type !== 'nonveg') return false;

      if (q) {
        const nameMatch = (dish.name.en.toLowerCase().includes(q) || dish.name.fr.toLowerCase().includes(q));
        const descMatch = (dish.description.en.toLowerCase().includes(q) || dish.description.fr.toLowerCase().includes(q));
        const ingMatch = dish.ingredients.some(item => {
          const ing = INGREDIENTS[item.key];
          return ing && (
            ing.name.en.toLowerCase().includes(q) ||
            ing.name.fr.toLowerCase().includes(q) ||
            item.key.toLowerCase().includes(q)
          );
        });
        if (!nameMatch && !descMatch && !ingMatch) return false;
      }

      return true;
    });

    if (elements.catalogCount) {
      elements.catalogCount.textContent = I18N.t('dishesFound', { count: filtered.length });
    }

    if (filtered.length === 0) {
      elements.grid.innerHTML = `
        <div class="no-results">
          <span class="no-results-icon">🍽️</span>
          <h3>${I18N.t('noResultsTitle')}</h3>
          <p>${I18N.t('noResultsSub')}</p>
        </div>
      `;
      return;
    }

    elements.grid.innerHTML = filtered.map((dish, idx) => {
      const nutri = calculateDishNutrition(dish);
      const dishName = dish.name[lang];
      const dishDesc = dish.description[lang];
      const isVeg = dish.type === 'veg';
      const badgeText = isVeg ? I18N.t('vegBadge') : I18N.t('nonVegBadge');
      const badgeIcon = isVeg ? '🌱' : '🥩';

      return `
        <article class="dish-card" data-id="${dish.id}" tabindex="0" role="button" aria-haspopup="dialog" style="animation-delay: ${idx * 60}ms">
          <div class="card-media">
            <span class="diet-badge ${dish.type}">
              <span>${badgeIcon}</span> ${badgeText}
            </span>
            <picture>
              <source srcset="${dish.thumb}" type="image/webp">
              <img 
                src="images/${dish.id}-thumb.jpg" 
                alt="${dishName}" 
                class="card-img" 
                loading="lazy" 
                decoding="async" 
                width="600" 
                height="450"
              >
            </picture>
          </div>
          <div class="card-body">
            <h3 class="card-title">${dishName}</h3>
            <p class="card-desc">${dishDesc}</p>
            <div class="nutrition-pills">
              <span class="nutri-pill kcal"><b>${nutri.kcal}</b> ${I18N.t('cardKcal')}</span>
              <span class="nutri-pill"><b>${nutri.protein}</b> ${I18N.t('cardProtein')}</span>
              <span class="nutri-pill"><b>${nutri.calcium}</b> ${I18N.t('cardCalcium')}</span>
            </div>
            <div class="card-footer">
              <span>${I18N.t('viewDetails')}</span>
              <span class="card-cta-icon" aria-hidden="true">→</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card event listeners
    elements.grid.querySelectorAll('.dish-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id, 10);
        openDishModal(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = parseInt(card.dataset.id, 10);
          openDishModal(id);
        }
      });
    });
  }

  /**
   * Modal Dialog Controller
   */
  function openDishModal(dishId) {
    state.currentDishId = dishId;
    state.isModalOpen = true;
    state.isTableVisible = false;

    // Set first ingredient active by default
    const dish = DISHES.find(d => d.id === dishId);
    if (dish && dish.ingredients.length > 0) {
      state.activeIngredientKey = dish.ingredients[0].key;
    }

    renderModalContent(dishId);

    elements.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (elements.modalCloseBtn) elements.modalCloseBtn.focus();
    }, 100);
  }

  function closeDishModal() {
    state.isModalOpen = false;
    state.currentDishId = null;
    state.activeIngredientKey = null;
    elements.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Render Modal Details with Circular Orbit Ingredient Ecosystem
   */
  function renderModalContent(dishId) {
    const dish = DISHES.find(d => d.id === dishId);
    if (!dish) return;

    const lang = I18N.currentLang;
    const totals = calculateDishNutrition(dish);
    const dishName = dish.name[lang];
    const dishDesc = dish.description[lang];
    const isVeg = dish.type === 'veg';
    const badgeText = isVeg ? I18N.t('vegBadge') : I18N.t('nonVegBadge');
    const badgeIcon = isVeg ? '🌱' : '🥩';
    const totalGrams = dish.ingredients.reduce((sum, item) => sum + item.grams, 0);

    // Ensure valid active ingredient key
    if (!state.activeIngredientKey || !dish.ingredients.some(i => i.key === state.activeIngredientKey)) {
      state.activeIngredientKey = dish.ingredients[0].key;
    }

    // 1. Render Hero Banner
    elements.modalHeroContainer.innerHTML = `
      <picture>
        <source srcset="${dish.image}" type="image/webp">
        <img 
          src="images/${dish.id}.jpg" 
          alt="${dishName}" 
          decoding="async" 
          width="1200" 
          height="900"
        >
      </picture>
      <div class="modal-hero-gradient"></div>
      <div class="modal-hero-content">
        <span class="modal-diet-badge ${dish.type}">
          <span>${badgeIcon}</span> ${badgeText}
        </span>
        <h2 class="modal-title">${dishName}</h2>
        <p class="modal-desc">${dishDesc}</p>
      </div>
    `;

    // 2. Build Circular Orbit Geometry & Nodes
    const numIngredients = dish.ingredients.length;
    const orbitRadiusPercent = 38; // Radius percentage inside the 380x380 arena
    const svgCenter = 190;
    const svgRadius = 144;

    let svgConnectorsHtml = `
      <circle cx="${svgCenter}" cy="${svgCenter}" r="${svgRadius}" class="orbit-track-circle" />
    `;

    let orbitNodesHtml = '';

    dish.ingredients.forEach((item, index) => {
      const ing = INGREDIENTS[item.key];
      if (!ing) return;

      const angle = (-Math.PI / 2) + (index * 2 * Math.PI / numIngredients);
      const posX = 50 + (orbitRadiusPercent * Math.cos(angle));
      const posY = 50 + (orbitRadiusPercent * Math.sin(angle));

      const svgNodeX = svgCenter + (svgRadius * Math.cos(angle));
      const svgNodeY = svgCenter + (svgRadius * Math.sin(angle));

      const isActive = item.key === state.activeIngredientKey;
      const ingName = ing.name[lang] || ing.name.en;

      // SVG connector line from center to node
      svgConnectorsHtml += `
        <line 
          x1="${svgCenter}" 
          y1="${svgCenter}" 
          x2="${svgNodeX}" 
          y2="${svgNodeY}" 
          class="orbit-connector-line ${isActive ? 'active' : ''}" 
          id="connector-${item.key}"
        />
      `;

      // Circular HTML node
      orbitNodesHtml += `
        <div 
          class="orbit-node ${isActive ? 'active' : ''}" 
          style="left: ${posX}%; top: ${posY}%;" 
          data-key="${item.key}"
          tabindex="0"
          role="button"
          aria-label="${ingName} (${item.grams}g)"
        >
          <div class="node-img-wrap">
            <img src="${ing.image}" alt="${ingName}" loading="lazy" decoding="async">
          </div>
          <span class="node-qty-badge">${item.grams}g</span>
          <span class="node-name-label">${ingName}</span>
        </div>
      `;
    });

    // 3. Render Active Ingredient Spotlight Card
    const activeItem = dish.ingredients.find(i => i.key === state.activeIngredientKey) || dish.ingredients[0];
    const activeIng = INGREDIENTS[activeItem.key];
    const activeFactor = activeItem.grams / 100;
    const activeKcal = Math.round(activeIng.kcal * activeFactor);
    const activeProtein = (activeIng.protein * activeFactor).toFixed(1);
    const activeCalcium = Math.round(activeIng.calcium * activeFactor);
    const activeName = activeIng.name[lang] || activeIng.name.en;
    const activeRole = activeIng.role ? (activeIng.role[lang] || activeIng.role.en) : I18N.t('colIngredient');
    const activeDesc = activeIng.desc ? (activeIng.desc[lang] || activeIng.desc.en) : '';

    const spotlightCardHtml = `
      <div class="ingredient-spotlight" id="ingredientSpotlight">
        <div class="spotlight-top">
          <div class="spotlight-photo-wrap">
            <img src="${activeIng.image}" alt="${activeName}">
          </div>
          <div class="spotlight-header-info">
            <h4 class="spotlight-title">${activeName}</h4>
            <div class="spotlight-meta-tags">
              <span class="spotlight-role-badge">${activeRole}</span>
              <span class="spotlight-qty-pill">${activeItem.grams} g</span>
            </div>
          </div>
        </div>
        <p class="spotlight-desc">${activeDesc}</p>
        <div class="spotlight-macros-grid">
          <div class="spotlight-macro-item">
            <div class="spotlight-macro-val">${activeKcal}</div>
            <div class="spotlight-macro-lbl">${I18N.t('colCalories')} (kcal)</div>
          </div>
          <div class="spotlight-macro-item">
            <div class="spotlight-macro-val">${activeProtein} g</div>
            <div class="spotlight-macro-lbl">${I18N.t('colProtein')}</div>
          </div>
          <div class="spotlight-macro-item">
            <div class="spotlight-macro-val">${activeCalcium} mg</div>
            <div class="spotlight-macro-lbl">${I18N.t('colCalcium')}</div>
          </div>
        </div>
        <div class="spotlight-vitamins">
          <strong>${I18N.t('colVitamins')}:</strong> ${activeIng.vitamins}
        </div>
      </div>
    `;

    // 4. Ingredient Table Rows (for optional table view)
    const tableRowsHtml = dish.ingredients.map(item => {
      const ref = INGREDIENTS[item.key];
      if (!ref) return '';
      const factor = item.grams / 100;
      const ingKcal = Math.round(ref.kcal * factor);
      const ingProtein = (ref.protein * factor).toFixed(1);
      const ingCalcium = Math.round(ref.calcium * factor);
      const ingName = ref.name[lang] || ref.name.en;

      return `
        <tr>
          <td>
            <div class="table-ing-cell">
              <img src="${ref.image}" alt="" class="table-ing-thumb">
              <strong>${ingName}</strong>
            </div>
          </td>
          <td>${item.grams} g</td>
          <td>${ingKcal} kcal</td>
          <td>${ingProtein} g</td>
          <td>${ingCalcium} mg</td>
          <td>${ref.vitamins}</td>
        </tr>
      `;
    }).join('');

    // 5. Daily Need Percentages
    const pctKcal = Math.min(100, Math.round((totals.kcal / DAILY_TARGETS.kcal) * 100));
    const pctProtein = Math.min(100, Math.round((totals.protein / DAILY_TARGETS.protein) * 100));
    const pctCalcium = Math.min(100, Math.round((totals.calcium / DAILY_TARGETS.calcium) * 100));

    // 6. Assemble Full Modal Body
    elements.modalBodyContainer.innerHTML = `
      <!-- Quick Serving Summary Bar -->
      <div class="serving-summary-bar">
        <div class="stat-item stat-kcal">
          <div class="summary-stat-value">${totals.kcal}</div>
          <div class="summary-stat-label">${I18N.t('colCalories')} (kcal)</div>
        </div>
        <div class="stat-item">
          <div class="summary-stat-value">${totals.protein} g</div>
          <div class="summary-stat-label">${I18N.t('colProtein')}</div>
        </div>
        <div class="stat-item">
          <div class="summary-stat-value">${totals.calcium} mg</div>
          <div class="summary-stat-label">${I18N.t('colCalcium')}</div>
        </div>
      </div>

      <!-- Fresh Ingredients Composition -->
      <section class="orbit-wrapper">
        <div class="orbit-header">
          <h3 class="section-heading">
            <span>🌿</span> ${I18N.t('orbitHeading')}
          </h3>
          <p class="orbit-subtext">${I18N.t('orbitSubtext')}</p>
        </div>

        <div class="orbit-stage-container">
          <!-- Circular Orbit Arena -->
          <div class="orbit-stage" id="orbitStage">
            <svg class="orbit-svg" viewBox="0 0 380 380">
              ${svgConnectorsHtml}
            </svg>

            <!-- Center Main Dish Circle -->
            <div class="orbit-center-dish" title="${dishName}">
              <div class="center-dish-img-wrap">
                <img src="${dish.thumb}" alt="${dishName}">
              </div>
              <div class="center-dish-badge">
                <span>${I18N.t('orbitCenterDishBadge')}</span>
              </div>
            </div>

            <!-- Orbiting Circular Ingredients -->
            <div class="orbit-nodes-layer">
              ${orbitNodesHtml}
            </div>
          </div>

          <!-- Active Ingredient Spotlight Card -->
          ${spotlightCardHtml}
        </div>

        <!-- Optional Comprehensive Table Toggle -->
        <div style="display: flex; justify-content: center; margin-top: 14px;">
          <button type="button" class="table-toggle-btn" id="tableToggleBtn">
            ${state.isTableVisible ? I18N.t('toggleTableViewHide') : I18N.t('toggleTableView')}
          </button>
        </div>

        <!-- Collapsible Detailed Table -->
        <div class="table-wrapper ${state.isTableVisible ? '' : 'collapsed'}" id="tableWrapper" style="margin-top: 16px;">
          <table class="nutrition-table">
            <thead>
              <tr>
                <th>${I18N.t('colIngredient')}</th>
                <th>${I18N.t('colQuantity')}</th>
                <th>${I18N.t('colCalories')}</th>
                <th>${I18N.t('colProtein')}</th>
                <th>${I18N.t('colCalcium')}</th>
                <th>${I18N.t('colVitamins')}</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
              <tr class="table-total-row">
                <td>${I18N.t('rowTotalServing')}</td>
                <td><strong>${totalGrams} g</strong></td>
                <td class="stat-total-kcal"><strong>${totals.kcal} kcal</strong></td>
                <td><strong>${totals.protein} g</strong></td>
                <td><strong>${totals.calcium} mg</strong></td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Daily Need Coverage Progress Bars -->
      <section class="daily-coverage-card">
        <h3 class="section-heading">📊 ${I18N.t('dailyCoverageHeading')}</h3>
        <p class="daily-subtext">${I18N.t('dailyNote')}</p>
        <div class="coverage-bars-list">
          <!-- Calories -->
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">${I18N.t('colCalories')}</span>
              <span class="progress-numbers">
                <strong>${totals.kcal}</strong> / ${DAILY_TARGETS.kcal} kcal
                <span class="progress-percent">(${pctKcal}%)</span>
              </span>
            </div>
            <div class="progress-track">
              <div class="progress-fill fill-kcal" data-target-width="${pctKcal}"></div>
            </div>
          </div>

          <!-- Protein -->
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">${I18N.t('colProtein')}</span>
              <span class="progress-numbers">
                <strong>${totals.protein}</strong> / ${DAILY_TARGETS.protein} g
                <span class="progress-percent">(${pctProtein}%)</span>
              </span>
            </div>
            <div class="progress-track">
              <div class="progress-fill fill-protein" data-target-width="${pctProtein}"></div>
            </div>
          </div>

          <!-- Calcium -->
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">${I18N.t('colCalcium')}</span>
              <span class="progress-numbers">
                <strong>${totals.calcium}</strong> / ${DAILY_TARGETS.calcium} mg
                <span class="progress-percent">(${pctCalcium}%)</span>
              </span>
            </div>
            <div class="progress-track">
              <div class="progress-fill fill-calcium" data-target-width="${pctCalcium}"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Health Notes (Good & Caution) -->
      <section class="insights-grid">
        <div class="insight-card good">
          <div class="insight-header">
            <span>🍏</span> ${I18N.t('goodForBody')}
          </div>
          <p class="insight-text">${dish.good[lang]}</p>
        </div>
        <div class="insight-card caution">
          <div class="insight-header">
            <span>⚠️</span> ${I18N.t('beCareful')}
          </div>
          <p class="insight-text">${dish.caution[lang]}</p>
        </div>
      </section>
    `;

    // 7. Attach Interactive Handlers for Orbit Nodes & Strip
    attachOrbitListeners(dish);

    // 8. Attach Table Toggle Handler
    const tableBtn = document.getElementById('tableToggleBtn');
    const tableWrap = document.getElementById('tableWrapper');
    if (tableBtn && tableWrap) {
      tableBtn.addEventListener('click', () => {
        state.isTableVisible = !state.isTableVisible;
        tableWrap.classList.toggle('collapsed', !state.isTableVisible);
        tableBtn.textContent = state.isTableVisible ? I18N.t('toggleTableViewHide') : I18N.t('toggleTableView');
      });
    }

    // 9. Animate progress bars
    setTimeout(() => {
      elements.modalBodyContainer.querySelectorAll('.progress-fill').forEach(fill => {
        fill.style.width = fill.dataset.targetWidth + '%';
      });
    }, 80);
  }

  /**
   * Orbit Node & Strip Click / Hover Interactions
   */
  function attachOrbitListeners(dish) {
    const lang = I18N.currentLang;

    function selectIngredient(key) {
      state.activeIngredientKey = key;

      // Update active class on orbit nodes
      document.querySelectorAll('.orbit-node').forEach(node => {
        node.classList.toggle('active', node.dataset.key === key);
      });

      // Update active class on SVG lines
      document.querySelectorAll('.orbit-connector-line').forEach(line => {
        line.classList.toggle('active', line.id === `connector-${key}`);
      });

      // Update Spotlight Card
      const item = dish.ingredients.find(i => i.key === key);
      const ing = INGREDIENTS[key];
      if (item && ing) {
        const factor = item.grams / 100;
        const ingKcal = Math.round(ing.kcal * factor);
        const ingProtein = (ing.protein * factor).toFixed(1);
        const ingCalcium = Math.round(ing.calcium * factor);
        const ingName = ing.name[lang] || ing.name.en;
        const ingRole = ing.role ? (ing.role[lang] || ing.role.en) : I18N.t('colIngredient');
        const ingDesc = ing.desc ? (ing.desc[lang] || ing.desc.en) : '';

        const spotlight = document.getElementById('ingredientSpotlight');
        if (spotlight) {
          spotlight.innerHTML = `
            <div class="spotlight-top">
              <div class="spotlight-photo-wrap">
                <img src="${ing.image}" alt="${ingName}">
              </div>
              <div class="spotlight-header-info">
                <h4 class="spotlight-title">${ingName}</h4>
                <div class="spotlight-meta-tags">
                  <span class="spotlight-role-badge">${ingRole}</span>
                  <span class="spotlight-qty-pill">${item.grams} g</span>
                </div>
              </div>
            </div>
            <p class="spotlight-desc">${ingDesc}</p>
            <div class="spotlight-macros-grid">
              <div class="spotlight-macro-item">
                <div class="spotlight-macro-val">${ingKcal}</div>
                <div class="spotlight-macro-lbl">${I18N.t('colCalories')} (kcal)</div>
              </div>
              <div class="spotlight-macro-item">
                <div class="spotlight-macro-val">${ingProtein} g</div>
                <div class="spotlight-macro-lbl">${I18N.t('colProtein')}</div>
              </div>
              <div class="spotlight-macro-item">
                <div class="spotlight-macro-val">${ingCalcium} mg</div>
                <div class="spotlight-macro-lbl">${I18N.t('colCalcium')}</div>
              </div>
            </div>
            <div class="spotlight-vitamins">
              <strong>${I18N.t('colVitamins')}:</strong> ${ing.vitamins}
            </div>
          `;
        }
      }
    }

    // Node click & hover
    document.querySelectorAll('.orbit-node').forEach(node => {
      node.addEventListener('click', () => selectIngredient(node.dataset.key));
      node.addEventListener('mouseenter', () => selectIngredient(node.dataset.key));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectIngredient(node.dataset.key);
        }
      });
    });
  }

  /**
   * Credits Modal Handlers
   */
  function initCreditsModal() {
    if (elements.creditsBtn && elements.creditsModal) {
      elements.creditsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        elements.creditsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (elements.creditsCloseBtn && elements.creditsModal) {
      elements.creditsCloseBtn.addEventListener('click', () => {
        elements.creditsModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (elements.creditsModal) {
      elements.creditsModal.addEventListener('click', (e) => {
        if (e.target === elements.creditsModal) {
          elements.creditsModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /**
   * Modal General Events
   */
  function initModalEvents() {
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closeDishModal);
    }

    if (elements.modalOverlay) {
      elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) {
          closeDishModal();
        }
      });
    }

    // Escape Key Listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.isModalOpen) {
          closeDishModal();
        }
        if (elements.creditsModal && elements.creditsModal.classList.contains('active')) {
          elements.creditsModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  /**
   * Bootstrap App
   */
  function init() {
    initTheme();
    initLanguage();
    initFilters();
    initModalEvents();
    initCreditsModal();
    renderCatalog();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
