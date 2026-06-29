export type FlavorNote =
  | "citrus" | "peach" | "spice"
  | "honey" | "almond" | "bitter" | "smoke"
  | "strawberry" | "violet" | "rose"
  | "grapefruit" | "passion" | "arak"
  | "basil" | "cucumber" | "chartreuse";

export type Cocktail = {
  id: string;
  name: string;
  description: string;
  taste: string;
  color: string;
  bgGradient: string;
  bgDark: string;
  accentPrimary: string;
  accentSecondary: string;
  accentLight: string;
  image: string;
  glassImage: string;
  ingredients: string[];
  flavorNotes: FlavorNote[];
};

export const cocktails: Cocktail[] = [
  {
    id: "spicy-saint",
    name: "Spicy Saint",
    description: "A bold citrus kick with a fiery finish",
    taste: "Sweet & Sour",
    color: "#f5a878",
    bgGradient: "linear-gradient(145deg, #2d0a05 0%, #5c1a08 20%, #c4501a 45%, #e8824a 60%, #d4603a 75%, #3d1008 100%)",
    bgDark: "#2d0a05",
    accentPrimary: "#f5a878",
    accentSecondary: "#cc3418",
    accentLight: "#f5c498",
    image: "/images/spicy-saint.jpg",
    glassImage: "/images/glasses/spicy-saint-glass.png",
    ingredients: ["Tequila San German", "Freshly Squeezed Lemon", "Peach Syrup", "Tabasco Drops"],
    flavorNotes: ["citrus", "peach", "spice"],
  },
  {
    id: "golden-barrel",
    name: "Golden Barrel",
    description: "Rich, warm and deeply aromatic",
    taste: "Bittersweet & Aromatic",
    color: "#c9a84c",
    bgGradient: "linear-gradient(145deg, #1a0e04 0%, #3d1f08 20%, #8b4513 45%, #c17f3a 60%, #c9a84c 72%, #2d1506 100%)",
    bgDark: "#1a0e04",
    accentPrimary: "#c9a84c",
    accentSecondary: "#c17f3a",
    accentLight: "#e8d090",
    image: "/images/golden-barrel.jpg",
    glassImage: "/images/glasses/golden-barrel-glass.png",
    ingredients: ["Whiskey", "Almond Liqueur", "Honey Liqueur", "Angostura Bitters"],
    flavorNotes: ["honey", "almond", "bitter", "smoke"],
  },
  {
    id: "bad-habit",
    name: "Bad Habit",
    description: "Dangerously delicate — a floral sip you won't forget",
    taste: "Sweet · Fruity · Delicate",
    color: "#9b3a6e",
    bgGradient: "linear-gradient(145deg, #1a0510 0%, #3d0f28 20%, #6b1a44 42%, #9b3a6e 58%, #c47aaa 72%, #2d0820 100%)",
    bgDark: "#1a0510",
    accentPrimary: "#9b3a6e",
    accentSecondary: "#c47aaa",
    accentLight: "#e8c0d8",
    image: "/images/bad-habit.jpg",
    glassImage: "/images/glasses/bad-habit-glass.png",
    ingredients: ["Vodka", "Violet Liqueur", "Rosé Vermouth", "Strawberry Syrup", "Fresh Lemon"],
    flavorNotes: ["strawberry", "violet", "rose"],
  },
  {
    id: "nise-anise",
    name: "Nise & Anise",
    description: "Surprising, aromatic and alive — it hits different every time",
    taste: "Sour · Sweet · Aromatic",
    color: "#e8405a",
    bgGradient: "linear-gradient(145deg, #1a0508 0%, #4a0e18 18%, #c42840 38%, #e8405a 55%, #f06878 70%, #3a0c18 100%)",
    bgDark: "#1a0508",
    accentPrimary: "#e8405a",
    accentSecondary: "#f06878",
    accentLight: "#f5c8d0",
    image: "/images/nise-anise.jpg",
    glassImage: "/images/glasses/nise-anise-glass.png",
    ingredients: ["Arak", "Passion Fruit Liqueur", "Red Grapefruit Syrup", "Fresh Lemon"],
    flavorNotes: ["grapefruit", "passion", "arak"],
  },
  {
    id: "1933",
    name: "1933",
    description: "A herbal time capsule — crisp, aromatic and surprisingly complex",
    taste: "Sour · Herbal · Refreshing",
    color: "#7aaa3a",
    bgGradient: "linear-gradient(145deg, #081a05 0%, #143d08 18%, #2a6e10 38%, #5aaa28 55%, #8acc48 68%, #3a7818 82%, #0d2808 100%)",
    bgDark: "#081a05",
    accentPrimary: "#7aaa3a",
    accentSecondary: "#8acc48",
    accentLight: "#d4f090",
    image: "/images/1933.jpg",
    glassImage: "/images/glasses/1933-glass.png",
    ingredients: ["Gin", "Chartreuse Liqueur", "Basil Syrup", "Cucumber Syrup", "Fresh Lemon"],
    flavorNotes: ["basil", "cucumber", "chartreuse"],
  },
];

export const heroContent = {
  tagline: "Where every sip tells a story",
  cta: "Explore the Menu",
  welcomeText: "Welcome to our",
};
