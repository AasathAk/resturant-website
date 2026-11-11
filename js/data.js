/**
 * Le Menu Santé - Data Layer
 * Nutrition reference values per 100g and 10 signature culinary dishes
 * Includes authentic ingredient photographs, nutritional roles, and descriptions.
 */

const INGREDIENTS = {
  flour: {
    kcal: 364,
    protein: 10,
    calcium: 15,
    vitamins: "B1, B3, Iron",
    image: "images/ingredients/flour.webp",
    fallbackImage: "images/ingredients/flour.jpg",
    name: {
      en: "Wheat flour",
      fr: "Farine de blé"
    },
    role: {
      en: "Carbohydrate Base",
      fr: "Base Glucidique"
    },
    desc: {
      en: "Fine unbleached French wheat flour delivering sustained energy, soft crust texture, and natural B vitamins.",
      fr: "Farine de blé français non blanchie apportant de l'énergie durable, une texture aérée et des vitamines B."
    }
  },
  chicken: {
    kcal: 165,
    protein: 31,
    calcium: 15,
    vitamins: "B3, B6, B12, Phosphorus",
    image: "images/ingredients/chicken.webp",
    fallbackImage: "images/ingredients/chicken.jpg",
    name: {
      en: "Chicken breast",
      fr: "Blanc de poulet"
    },
    role: {
      en: "Lean Muscle Protein",
      fr: "Protéine Maigre Pure"
    },
    desc: {
      en: "Tender farm-raised chicken breast loaded with complete bioavailable protein and phosphorus for muscle repair.",
      fr: "Blanc de poulet fermier tendre, concentré en acides aminés complets et phosphore pour la régénération musculaire."
    }
  },
  onion: {
    kcal: 40,
    protein: 1.1,
    calcium: 23,
    vitamins: "C, B6, Quercetin",
    image: "images/ingredients/onion.webp",
    fallbackImage: "images/ingredients/onion.jpg",
    name: {
      en: "Yellow onion",
      fr: "Oignon jaune"
    },
    role: {
      en: "Antioxidant Aromatics",
      fr: "Aromate Antioxydant"
    },
    desc: {
      en: "Slow-caramelized sweet yellow onions high in quercetin bioflavonoids that actively support vascular resilience.",
      fr: "Oignons doux caramélisés, riches en quercétine protectrice pour la fluidité sanguine et la santé vasculaire."
    }
  },
  butter: {
    kcal: 717,
    protein: 0.9,
    calcium: 24,
    vitamins: "A, E",
    image: "images/ingredients/butter.webp",
    fallbackImage: "images/ingredients/butter.jpg",
    name: {
      en: "French churned butter",
      fr: "Beurre de baratte"
    },
    role: {
      en: "Culinary Dairy Fat",
      fr: "Matière Grasse Laitière"
    },
    desc: {
      en: "Artisanal churned cream butter supplying fat-soluble vitamins A and E, velvety mouthfeel, and delicate richness.",
      fr: "Beurre de baratte artisanal apportant des vitamines A et E liposolubles, onctuosité et parfum gastronomique."
    }
  },
  cheese: {
    kcal: 350,
    protein: 25,
    calcium: 720,
    vitamins: "A, B12, Zinc, Phosphorus",
    image: "images/ingredients/cheese.webp",
    fallbackImage: "images/ingredients/cheese.jpg",
    name: {
      en: "Aged mountain cheese",
      fr: "Gruyère / Emmental affiné"
    },
    role: {
      en: "Calcium Powerhouse",
      fr: "Concentré de Calcium"
    },
    desc: {
      en: "Cave-aged Gruyère and Emmental packed with 720mg of bioavailable calcium per 100g, fortifying bone mineral density.",
      fr: "Fromage d'alpage affiné offrant 720mg de calcium biodisponible aux 100g pour la solidité osseuse et dentaire."
    }
  },
  beef: {
    kcal: 250,
    protein: 26,
    calcium: 18,
    vitamins: "B12, Heme Iron, Zinc",
    image: "images/ingredients/beef.webp",
    fallbackImage: "images/ingredients/beef.jpg",
    name: {
      en: "Minced beef",
      fr: "Bœuf haché pur muscle"
    },
    role: {
      en: "Heme Iron & Stamina",
      fr: "Fer Héminique & Vitalité"
    },
    desc: {
      en: "Flame-grilled lean beef delivering highly absorbable heme iron, zinc, and vitamin B12 for red blood cell oxygenation.",
      fr: "Bœuf haché maigre apportant un fer héminique facilement assimilable, du zinc et de la vitamine B12 énergisante."
    }
  },
  lettuce: {
    kcal: 15,
    protein: 1.4,
    calcium: 36,
    vitamins: "K, A, C, Folate",
    image: "images/ingredients/lettuce.webp",
    fallbackImage: "images/ingredients/lettuce.jpg",
    name: {
      en: "Crisp lettuce",
      fr: "Laitue croquante"
    },
    role: {
      en: "Hydration & Chlorophyll",
      fr: "Hydratation & Chlorophylle"
    },
    desc: {
      en: "Crisp organic garden greens providing cellular hydration, vitamin K for healthy coagulation, and gentle plant fiber.",
      fr: "Feuilles croquantes du jardin riches en eau végétale, en vitamine K anticoagulante et en fibres douces."
    }
  },
  tomato: {
    kcal: 18,
    protein: 0.9,
    calcium: 10,
    vitamins: "C, K, Lycopene",
    image: "images/ingredients/tomato.webp",
    fallbackImage: "images/ingredients/tomato.jpg",
    name: {
      en: "Vine-ripened tomato",
      fr: "Tomate de pleine terre"
    },
    role: {
      en: "Cardio-Protective Carotenoids",
      fr: "Lycopène Protecteur"
    },
    desc: {
      en: "Sun-ripened tomatoes bursting with antioxidant lycopene, supporting cardiovascular well-being and cellular longevity.",
      fr: "Tomates mûries au soleil gorgées de lycopène antioxydant, protectrices du système cardiovasculaire."
    }
  },
  salmon: {
    kcal: 208,
    protein: 20,
    calcium: 12,
    vitamins: "Omega-3, D, B12, Selenium",
    image: "images/ingredients/salmon.webp",
    fallbackImage: "images/ingredients/salmon.jpg",
    name: {
      en: "Fresh Atlantic salmon",
      fr: "Saumon atlantique frais"
    },
    role: {
      en: "Marine Omega-3 Fatty Acids",
      fr: "Acides Gras Oméga-3 Marins"
    },
    desc: {
      en: "Prime Atlantic salmon fillet abundant in EPA and DHA Omega-3 fatty acids, nurturing brain, heart, and joint health.",
      fr: "Filet de saumon frais d'Atlantique concentré en acides gras Oméga-3 (EPA/DHA) et vitamine D protectrice."
    }
  },
  oil: {
    kcal: 884,
    protein: 0,
    calcium: 1,
    vitamins: "E, K, Polyphenols",
    image: "images/ingredients/oil.webp",
    fallbackImage: "images/ingredients/oil.jpg",
    name: {
      en: "Extra virgin olive oil",
      fr: "Huile d'olive vierge extra"
    },
    role: {
      en: "Monounsaturated Lipids",
      fr: "Lipides Mono-insaturés"
    },
    desc: {
      en: "Cold-pressed extra virgin olive oil filled with heart-protective oleic acid and potent polyphenol antioxidants.",
      fr: "Huile d'olive de première pression à froid, source d'acide oléique protecteur et de précieux polyphénols."
    }
  },
  spinach: {
    kcal: 23,
    protein: 2.9,
    calcium: 99,
    vitamins: "K, A, Folate, Iron",
    image: "images/ingredients/spinach.webp",
    fallbackImage: "images/ingredients/spinach.jpg",
    name: {
      en: "Fresh baby spinach",
      fr: "Jeunes pousses d'épinards"
    },
    role: {
      en: "Mineral & Folate Reserve",
      fr: "Réserve de Minéraux & Folates"
    },
    desc: {
      en: "Vibrant baby spinach leaves delivering iron, magnesium, natural folate (B9), and abundant bone-friendly calcium.",
      fr: "Jeunes pousses d'épinards offrant du fer végétal, du magnésium, des folates et du calcium assimilable."
    }
  },
  potato: {
    kcal: 77,
    protein: 2,
    calcium: 12,
    vitamins: "C, B6, Potassium",
    image: "images/ingredients/potato.webp",
    fallbackImage: "images/ingredients/potato.jpg",
    name: {
      en: "Fingerling potato",
      fr: "Pommes de terre rattes"
    },
    role: {
      en: "Complex Fuel & Potassium",
      fr: "Glucides Complexes & Potassium"
    },
    desc: {
      en: "Golden roasted potatoes offering clean sustained carbohydrates, vitamin B6, and potassium to balance electrolytes.",
      fr: "Pommes rattes rôties délivrant des glucides à assimilation progressive, de la vitamine B6 et du potassium."
    }
  },
  rice: {
    kcal: 130,
    protein: 2.7,
    calcium: 10,
    vitamins: "B1, B3, Manganese",
    image: "images/ingredients/rice.webp",
    fallbackImage: "images/ingredients/rice.jpg",
    name: {
      en: "Fragrant jasmine rice",
      fr: "Riz jasmin parfumé"
    },
    role: {
      en: "Clean Digestible Energy",
      fr: "Énergie Pure & Digeste"
    },
    desc: {
      en: "Aromatic jasmine rice providing gentle, gluten-free fuel that is light on digestion and rich in trace manganese.",
      fr: "Riz jasmin cuit à la vapeur, source d'énergie propre sans gluten et de manganèse soutenant le métabolisme."
    }
  },
  prawn: {
    kcal: 99,
    protein: 24,
    calcium: 70,
    vitamins: "B12, Iodine, Selenium",
    image: "images/ingredients/prawn.webp",
    fallbackImage: "images/ingredients/prawn.jpg",
    name: {
      en: "Wild prawns",
      fr: "Crevettes sauvages"
    },
    role: {
      en: "Lean Marine Protein & Iodine",
      fr: "Protéine Marine & Iode"
    },
    desc: {
      en: "Wild-caught plump prawns offering ultralow-fat protein paired with essential thyroid-supporting iodine and selenium.",
      fr: "Crevettes sauvages associant une protéine ultra-maigre à de l'iode et du sélénium pour la fonction thyroïdienne."
    }
  },
  egg: {
    kcal: 143,
    protein: 13,
    calcium: 56,
    vitamins: "A, D, B12, Choline",
    image: "images/ingredients/egg.webp",
    fallbackImage: "images/ingredients/egg.jpg",
    name: {
      en: "Free-range organic egg",
      fr: "Œuf fermier bio"
    },
    role: {
      en: "Complete Biological Protein",
      fr: "Protéine de Référence Absolue"
    },
    desc: {
      en: "Whole farm egg delivering the reference biological amino acid spectrum, eye-protective lutein, and brain choline.",
      fr: "Œuf fermier bio entier apportant l'ensemble des acides aminés essentiels, de la choline cérébrale et de la lutéine."
    }
  },
  mushroom: {
    kcal: 22,
    protein: 3.1,
    calcium: 3,
    vitamins: "D, B2, B3, Selenium",
    image: "images/ingredients/mushroom.webp",
    fallbackImage: "images/ingredients/mushroom.jpg",
    name: {
      en: "Paris button mushrooms",
      fr: "Champignons de Paris"
    },
    role: {
      en: "Fungal Bioactives & Vitamin D",
      fr: "Composés Bioactifs & Vitamine D"
    },
    desc: {
      en: "Fresh Paris mushrooms providing cellular-protective ergothioneine, vitamin D2, and metabolism-boosting B-complex.",
      fr: "Champignons de Paris frais délivrant de l'ergothionéine antioxydante et des vitamines B stimulantes."
    }
  },
  chickpea: {
    kcal: 164,
    protein: 9,
    calcium: 49,
    vitamins: "Folate, Iron, Magnesium, Fiber",
    image: "images/ingredients/chickpea.webp",
    fallbackImage: "images/ingredients/chickpea.jpg",
    name: {
      en: "Slow-simmered chickpeas",
      fr: "Pois chiches mijotés"
    },
    role: {
      en: "Prebiotic Fiber & Plant Protein",
      fr: "Fibres Prébiotiques & Protéines"
    },
    desc: {
      en: "Plump chickpeas simmered to tenderness, delivering prebiotic soluble fiber for gut health, magnesium, and plant protein.",
      fr: "Pois chiches fondants combinant fibres prébiotiques bienfaitrices pour le microbiote, magnésium et protéines."
    }
  },
  paneer: {
    kcal: 296,
    protein: 18,
    calcium: 208,
    vitamins: "A, B12, Calcium",
    image: "images/ingredients/paneer.webp",
    fallbackImage: "images/ingredients/paneer.jpg",
    name: {
      en: "Artisanal fresh paneer",
      fr: "Paneer artisanal frais"
    },
    role: {
      en: "Vegetarian Dense Protein",
      fr: "Protéine Végétarienne Dense"
    },
    desc: {
      en: "Fresh whole-milk artisanal curd offering high-density vegetarian protein and readily assimilable skeletal calcium.",
      fr: "Fromage paneer frais entier apportant des protéines végétariennes denses et un calcium fortifiant pour l'ossature."
    }
  },
  yogurt: {
    kcal: 61,
    protein: 3.5,
    calcium: 121,
    vitamins: "B12, B2, Probiotics",
    image: "images/ingredients/yogurt.webp",
    fallbackImage: "images/ingredients/yogurt.jpg",
    name: {
      en: "Strained Greek yogurt",
      fr: "Yaourt à la grecque"
    },
    role: {
      en: "Cultured Live Probiotics",
      fr: "Ferments Lactiques Vivants"
    },
    desc: {
      en: "Silky strained Greek yogurt rich in live probiotic cultures that balance the digestive microbiome and deliver calcium.",
      fr: "Yaourt grec égoutté riche en ferments lactiques vivants favorisant l'équilibre intestinal et l'assimilation du calcium."
    }
  },
  lentil: {
    kcal: 116,
    protein: 9,
    calcium: 19,
    vitamins: "Folate, Iron, B1, Fiber",
    image: "images/ingredients/lentil.webp",
    fallbackImage: "images/ingredients/lentil.jpg",
    name: {
      en: "French green Puy lentils",
      fr: "Lentilles vertes du Puy"
    },
    role: {
      en: "Low-GI Cardio Superfood",
      fr: "Super-Aliment à Bas IG"
    },
    desc: {
      en: "Prestigious French Puy lentils possessing a very low glycemic index, abundant soluble fiber, and plant-based iron.",
      fr: "Lentilles vertes du Puy AOP reconnues pour leur index glycémique très bas, leurs fibres douces et leur fer végétal."
    }
  },
  cream: {
    kcal: 340,
    protein: 2.1,
    calcium: 65,
    vitamins: "A, D",
    image: "images/ingredients/cream.webp",
    fallbackImage: "images/ingredients/cream.jpg",
    name: {
      en: "Fresh heavy cream",
      fr: "Crème fraîche épaisse AOP"
    },
    role: {
      en: "Gastronomic Texture & Lipids",
      fr: "Onctuosité Gastronomique"
    },
    desc: {
      en: "Velvety French double cream that naturally binds sauces, carries herbal aromatics, and provides fat-soluble nutrients.",
      fr: "Crème fraîche épaisse AOP apportant la signature gastronomique française et un liant soyeux inimitable."
    }
  }
};

const DISHES = [
  {
    id: 1,
    type: "nonveg",
    image: "images/1.webp",
    thumb: "images/1-thumb.webp",
    name: {
      en: "Artisanal Chicken Bun",
      fr: "Brioche Vapeur au Poulet"
    },
    description: {
      en: "Soft, golden steamed bun filled with tender spiced chicken, sweet onions, and a touch of melted cheese.",
      fr: "Brioche moelleuse cuite à la vapeur, garnie d'effiloché de poulet fermier épicé, oignons doux et touche de fromage."
    },
    ingredients: [
      { key: "flour", grams: 90 },
      { key: "chicken", grams: 80 },
      { key: "onion", grams: 30 },
      { key: "butter", grams: 10 },
      { key: "cheese", grams: 15 }
    ],
    good: {
      en: "Chicken provides high-quality lean protein for cellular repair; cheese contributes valuable bioavailable calcium.",
      fr: "Le poulet procure des protéines maigres de haute valeur biologique; le fromage apporte un calcium bien assimilé."
    },
    caution: {
      en: "Refined wheat flour and butter add fast-acting carbohydrates and saturated fats. Moderate portion recommended for low-carb diets.",
      fr: "La farine de blé et le beurre ajoutent des glucides rapides et des acides gras saturés. Portion à modérer lors d'un régime pauvre en glucides."
    }
  },
  {
    id: 2,
    type: "nonveg",
    image: "images/2.webp",
    thumb: "images/2-thumb.webp",
    name: {
      en: "Gourmet Beef Burger",
      fr: "Burger Gourmet au Bœuf"
    },
    description: {
      en: "Char-grilled beef patty, aged French cheese, crisp lettuce, and ripe tomatoes on a lightly toasted bun.",
      fr: "Steak haché de bœuf grillé à la flamme, fromage affiné, laitue croquante et tomates du potager dans un pain doré."
    },
    ingredients: [
      { key: "flour", grams: 80 },
      { key: "beef", grams: 120 },
      { key: "cheese", grams: 25 },
      { key: "lettuce", grams: 20 },
      { key: "tomato", grams: 30 }
    ],
    good: {
      en: "Excellent source of highly bioavailable heme iron, zinc, and vitamin B12, supporting red blood cell formation and stamina.",
      fr: "Excellente source de fer héminique, de zinc et de vitamine B12, essentiels à l'oxygénation cellulaire et à la vitalité."
    },
    caution: {
      en: "Substantial calorie and saturated fat content; enjoy mindfully if monitoring dietary cholesterol or cardiovascular risk.",
      fr: "Apport calorique et teneur en graisses saturées élevés; à savourer avec modération en cas de vigilance cardiovasculaire."
    }
  },
  {
    id: 3,
    type: "nonveg",
    image: "images/3.webp",
    thumb: "images/3-thumb.webp",
    name: {
      en: "Pan-Seared Salmon Fillet",
      fr: "Pavé de Saumon Rôti"
    },
    description: {
      en: "Fresh Atlantic salmon seared with virgin olive oil, served alongside sautéed baby spinach and roasted potatoes.",
      fr: "Pavé de saumon atlantique poêlé à l'huile d'olive vierge, servi sur lit d'épinards frais et pommes rattes rôties."
    },
    ingredients: [
      { key: "salmon", grams: 150 },
      { key: "oil", grams: 10 },
      { key: "spinach", grams: 60 },
      { key: "potato", grams: 120 }
    ],
    good: {
      en: "Packed with marine Omega-3 fatty acids (EPA/DHA), vitamin D, and potassium for cardiovascular, brain, and joint well-being.",
      fr: "Riche en acides gras Oméga-3 marins (EPA/DHA), en vitamine D et potassium, hautement bénéfiques pour le cœur et le cerveau."
    },
    caution: {
      en: "Olive oil and salmon are naturally energy-dense; balance with a light starter if watching total daily energy intake.",
      fr: "L'huile d'olive et le saumon sont naturellement denses en énergie; à équilibrer avec une entrée légère si vous suivez vos calories."
    }
  },
  {
    id: 4,
    type: "nonveg",
    image: "images/4.webp",
    thumb: "images/4-thumb.webp",
    name: {
      en: "Wok-Tossed Prawn Fried Rice",
      fr: "Riz Sauté aux Crevettes Sauvages"
    },
    description: {
      en: "Fragrant jasmine rice flash-fried with wild prawns, farm-fresh egg, caramelised onions, and scallions.",
      fr: "Riz jasmin sauté au wok avec de succulentes crevettes sauvages, œuf de ferme, oignons caramélisés et ciboulette."
    },
    ingredients: [
      { key: "rice", grams: 180 },
      { key: "prawn", grams: 80 },
      { key: "egg", grams: 50 },
      { key: "onion", grams: 30 },
      { key: "oil", grams: 12 }
    ],
    good: {
      en: "High-protein and rich in essential iodine and selenium, which actively support healthy thyroid hormone synthesis.",
      fr: "Riche en protéines complètes, iode et sélénium indispensables au bon équilibre des hormones thyroïdiennes."
    },
    caution: {
      en: "Shellfish is naturally higher in dietary cholesterol; strictly contraindicated for individuals with crustacean allergies.",
      fr: "Les crustacés contiennent du cholestérol alimentaire; strictement contre-indiqué en cas d'allergie avérée aux fruits de mer."
    }
  },
  {
    id: 5,
    type: "nonveg",
    image: "images/5.webp",
    thumb: "images/5-thumb.webp",
    name: {
      en: "Rustic Mushroom Omelette",
      fr: "Omelette Rustique aux Champignons"
    },
    description: {
      en: "Fluffy baveuse omelette folded with sautéed Paris mushrooms, churned butter, and a sprinkle of Gruyère.",
      fr: "Omelette baveuse aux œufs bio pliée avec champignons de Paris sautés, beurre de baratte et pointe de Gruyère."
    },
    ingredients: [
      { key: "egg", grams: 120 },
      { key: "mushroom", grams: 70 },
      { key: "butter", grams: 8 },
      { key: "cheese", grams: 20 }
    ],
    good: {
      en: "Complete biological protein with natural vitamin D and choline, promoting long-lasting satiety and cognitive focus.",
      fr: "Protéines complètes avec vitamine D naturelle et choline, favorisant une satiété durable et la clarté mentale."
    },
    caution: {
      en: "Butter and aged cheese contribute saturated lipids and moderate sodium. Keep within overall daily dietary targets.",
      fr: "Le beurre et le fromage ajoutent des lipides saturés et du sodium. À intégrer dans l'équilibre lipidique de la journée."
    }
  },
  {
    id: 6,
    type: "veg",
    image: "images/6.webp",
    thumb: "images/6-thumb.webp",
    name: {
      en: "Four-Cheese Margherita Pizza",
      fr: "Pizza Artisanal Quatre-Fromages"
    },
    description: {
      en: "Hand-stretched sourdough crust topped with slow-reduced tomato sauce, fresh mozzarella, and melted French cheeses.",
      fr: "Pâte au levain étirée à la main, coulis de tomates mijoté, mozzarella fraîche et sélection de fromages fondus."
    },
    ingredients: [
      { key: "flour", grams: 120 },
      { key: "tomato", grams: 60 },
      { key: "cheese", grams: 70 },
      { key: "oil", grams: 8 }
    ],
    good: {
      en: "Significant calcium supply for skeletal strength; gently cooked tomato sauce concentrates antioxidant lycopene.",
      fr: "Apport calcique majeur pour l'ossature; la cuisson douce des tomates décuple la biodisponibilité du lycopène antioxydant."
    },
    caution: {
      en: "High carbohydrate density and sodium content. Savor in mindful portions as a satisfying treat.",
      fr: "Forte densité glucidique et sel. À savourer en portion raisonnable pour un plaisir gastronomique équilibré."
    }
  },
  {
    id: 7,
    type: "veg",
    image: "images/7.webp",
    thumb: "images/7-thumb.webp",
    name: {
      en: "Provencal Chickpea Curry",
      fr: "Curry de Pois Chiches Provençal"
    },
    description: {
      en: "Plump chickpeas simmered in a warm tomato and sweet onion reduction, finished with fresh baby spinach and olive oil.",
      fr: "Pois chiches fondants mijotés dans une compotée de tomates et oignons doux, relevés de pousses d'épinards et d'huile d'olive."
    },
    ingredients: [
      { key: "chickpea", grams: 150 },
      { key: "tomato", grams: 80 },
      { key: "onion", grams: 40 },
      { key: "spinach", grams: 50 },
      { key: "oil", grams: 10 }
    ],
    good: {
      en: "Plant-based protein rich in prebiotic dietary fiber, folate, and magnesium, promoting gut microbiome health and stable glycemic levels.",
      fr: "Protéines végétales riches en fibres prébiotiques, folates et magnésium, garantissant une glycémie stable et un microbiote sain."
    },
    caution: {
      en: "High oligosaccharide content can cause temporary bloating in sensitive digestive systems unaccustomed to pulses.",
      fr: "Riche en oligosaccharides pouvant occasionner de légers ballonnements chez les personnes peu habituées aux légumineuses."
    }
  },
  {
    id: 8,
    type: "veg",
    image: "images/8.webp",
    thumb: "images/8-thumb.webp",
    name: {
      en: "Grilled Paneer & Herb Wrap",
      fr: "Wrap de Paneer Grillé aux Fines Herbes"
    },
    description: {
      en: "Seared artisanal paneer tossed with crunchy lettuce, sweet onions, and a creamy herb-infused Greek yogurt dressing.",
      fr: "Paneer artisanal doré à la poêle, crudités fraîches, oignons croquants et sauce onctueuse au yaourt grec et herbes fraîches."
    },
    ingredients: [
      { key: "flour", grams: 70 },
      { key: "paneer", grams: 90 },
      { key: "onion", grams: 25 },
      { key: "lettuce", grams: 25 },
      { key: "yogurt", grams: 40 }
    ],
    good: {
      en: "Exceptional vegetarian protein source with abundant calcium and gut-friendly probiotics from strained Greek yogurt.",
      fr: "Excellente source de protéines végétariennes avec calcium abondant et probiotiques vivants issus du yaourt égoutté."
    },
    caution: {
      en: "Paneer has a naturally dense fat profile; ensure adequate hydration and pair with a fresh side salad.",
      fr: "Le paneer est naturellement riche en lipides laitiers; veillez à une bonne hydratation et accompagnez d'une salade verte."
    }
  },
  {
    id: 9,
    type: "veg",
    image: "images/9.webp",
    thumb: "images/9-thumb.webp",
    name: {
      en: "Velvety Green Lentil Velouté",
      fr: "Velouté de Lentilles Vertes du Puy"
    },
    description: {
      en: "Warm, earthy French Puy lentils cooked gently with sweet onions, sun-drenched tomatoes, and a light olive oil drizzle.",
      fr: "Lentilles vertes du Puy mijotées doucement avec oignons fondants, tomates gorgées de soleil et filet d'huile d'olive."
    },
    ingredients: [
      { key: "lentil", grams: 120 },
      { key: "onion", grams: 40 },
      { key: "tomato", grams: 60 },
      { key: "oil", grams: 6 }
    ],
    good: {
      en: "Naturally low in saturated fat, exceptionally rich in slow-digesting complex carbohydrates, plant iron, and natural folate.",
      fr: "Très pauvre en graisses saturées, remarquable teneur en glucides complexes à digestion lente, fer végétal et vitamine B9."
    },
    caution: {
      en: "Non-heme iron has lower absorption rates; enjoy with a vitamin C rich food or beverage to enhance uptake.",
      fr: "Le fer végétal s'assimile moins vite; associez à des aliments riches en vitamine C pour optimiser son absorption."
    }
  },
  {
    id: 10,
    type: "veg",
    image: "images/10.webp",
    thumb: "images/10-thumb.webp",
    name: {
      en: "Creamy Truffled Mushroom Tagliatelle",
      fr: "Tagliatelles Crémeuses aux Champignons"
    },
    description: {
      en: "Durum wheat pasta coated in a rich French double cream and sautéed mushroom sauce, topped with grated aged cheese.",
      fr: "Pâtes au blé dur enrobées d'une réduction de crème fraîche AOP et champignons sautés, saupoudrées de fromage affiné."
    },
    ingredients: [
      { key: "flour", grams: 110 },
      { key: "mushroom", grams: 90 },
      { key: "cream", grams: 50 },
      { key: "cheese", grams: 25 }
    ],
    good: {
      en: "Mushrooms provide B vitamins, ergothioneine antioxidants, and immune-supporting bioactives in a comforting dish.",
      fr: "Les champignons offrent des vitamines B, de l'ergothionéine antioxydante et des composés bioactifs stimulant les défenses."
    },
    caution: {
      en: "Traditional heavy dairy cream makes this plate rich in saturated lipids; savor as an indulgent gourmet meal.",
      fr: "L'onctuosité de la crème double en fait un plat riche en lipides saturés; idéal comme repas plaisir réconfortant."
    }
  }
];

// Recommended Daily Intake reference standards (Adult, 2000 kcal diet)
const DAILY_TARGETS = {
  kcal: 2000,
  protein: 50,  // g
  calcium: 1000 // mg
};

/**
 * Calculates accurate total nutrition for any dish based on ingredient weight (grams)
 */
function calculateDishNutrition(dish) {
  let kcal = 0;
  let protein = 0;
  let calcium = 0;

  dish.ingredients.forEach(item => {
    const ref = INGREDIENTS[item.key];
    if (ref) {
      const factor = item.grams / 100;
      kcal += ref.kcal * factor;
      protein += ref.protein * factor;
      calcium += ref.calcium * factor;
    }
  });

  return {
    kcal: Math.round(kcal),
    protein: Math.round(protein * 10) / 10,
    calcium: Math.round(calcium)
  };
}
