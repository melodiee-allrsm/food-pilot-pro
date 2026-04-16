// Shared mock data for the Food Pilot demo. Realistic enough to impress a jury.

export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Plat" | "Entrée" | "Dessert" | "Boisson" | "Anti-gaspi";
  emoji: string;
  prepTime: number; // minutes
  rating: number;
  available: number;
  tag?: "popular" | "new" | "antiwaste";
  originalPrice?: number;
};

export type Order = {
  id: string;
  code: string;
  customer: string;
  table?: string;
  items: { dishId: string; qty: number }[];
  status: OrderStatus;
  total: number;
  placedAt: string; // ISO
  pickupSlot?: string;
  channel: "qr" | "online" | "counter";
};

export const dishes: Dish[] = [
  {
    id: "d1",
    name: "Buddha Bowl Quinoa",
    description: "Quinoa, légumes rôtis, avocat, sauce tahini",
    price: 6.5,
    category: "Plat",
    emoji: "🥗",
    prepTime: 8,
    rating: 4.8,
    available: 24,
    tag: "popular",
  },
  {
    id: "d2",
    name: "Poulet Tikka & Riz Basmati",
    description: "Poulet mariné, sauce yaourt-curry, coriandre",
    price: 7.2,
    category: "Plat",
    emoji: "🍛",
    prepTime: 12,
    rating: 4.7,
    available: 18,
  },
  {
    id: "d3",
    name: "Pâtes Pesto & Burrata",
    description: "Tagliatelles fraîches, pesto maison, burrata crémeuse",
    price: 6.9,
    category: "Plat",
    emoji: "🍝",
    prepTime: 10,
    rating: 4.6,
    available: 12,
    tag: "new",
  },
  {
    id: "d4",
    name: "Wrap Falafel",
    description: "Falafels, houmous, crudités, sauce yaourt menthe",
    price: 5.5,
    category: "Plat",
    emoji: "🌯",
    prepTime: 6,
    rating: 4.5,
    available: 30,
  },
  {
    id: "d5",
    name: "Soupe miso & légumes",
    description: "Bouillon miso, tofu, champignons, oignons verts",
    price: 3.9,
    category: "Entrée",
    emoji: "🍲",
    prepTime: 4,
    rating: 4.4,
    available: 20,
  },
  {
    id: "d6",
    name: "Salade César Légère",
    description: "Romaine, poulet grillé, parmesan, sauce maison",
    price: 5.9,
    category: "Entrée",
    emoji: "🥙",
    prepTime: 5,
    rating: 4.6,
    available: 15,
  },
  {
    id: "d7",
    name: "Tiramisu Classique",
    description: "Mascarpone, café, cacao amer",
    price: 3.5,
    category: "Dessert",
    emoji: "🍰",
    prepTime: 2,
    rating: 4.9,
    available: 22,
    tag: "popular",
  },
  {
    id: "d8",
    name: "Salade de fruits frais",
    description: "Fruits de saison, sirop léger menthe",
    price: 2.9,
    category: "Dessert",
    emoji: "🍓",
    prepTime: 2,
    rating: 4.3,
    available: 18,
  },
  {
    id: "d9",
    name: "Limonade artisanale",
    description: "Citron pressé, sirop de canne, menthe",
    price: 2.5,
    category: "Boisson",
    emoji: "🍋",
    prepTime: 2,
    rating: 4.7,
    available: 40,
  },
  {
    id: "d10",
    name: "Café espresso",
    description: "Grain torréfié artisanal",
    price: 1.5,
    category: "Boisson",
    emoji: "☕",
    prepTime: 1,
    rating: 4.8,
    available: 100,
  },
  // Anti-gaspillage
  {
    id: "aw1",
    name: "Box surprise du chef",
    description: "Surplus du jour à -50%. Composition aléatoire.",
    price: 3.5,
    originalPrice: 7.0,
    category: "Anti-gaspi",
    emoji: "♻️",
    prepTime: 3,
    rating: 4.6,
    available: 8,
    tag: "antiwaste",
  },
  {
    id: "aw2",
    name: "Plateau légumes rôtis",
    description: "Reste de service midi, à finir avant 14h30",
    price: 2.9,
    originalPrice: 5.5,
    category: "Anti-gaspi",
    emoji: "🥕",
    prepTime: 2,
    rating: 4.4,
    available: 5,
    tag: "antiwaste",
  },
];

export const orders: Order[] = [
  {
    id: "o1",
    code: "FP-2841",
    customer: "Léa M.",
    items: [{ dishId: "d1", qty: 1 }, { dishId: "d9", qty: 1 }],
    status: "preparing",
    total: 9.0,
    placedAt: new Date(Date.now() - 4 * 60_000).toISOString(),
    pickupSlot: "12:30",
    channel: "online",
  },
  {
    id: "o2",
    code: "FP-2842",
    customer: "Karim B.",
    table: "T-07",
    items: [{ dishId: "d2", qty: 1 }, { dishId: "d10", qty: 1 }],
    status: "preparing",
    total: 8.7,
    placedAt: new Date(Date.now() - 6 * 60_000).toISOString(),
    channel: "qr",
  },
  {
    id: "o3",
    code: "FP-2843",
    customer: "Sofia D.",
    items: [{ dishId: "d3", qty: 1 }, { dishId: "d7", qty: 1 }],
    status: "ready",
    total: 10.4,
    placedAt: new Date(Date.now() - 12 * 60_000).toISOString(),
    pickupSlot: "12:35",
    channel: "online",
  },
  {
    id: "o4",
    code: "FP-2844",
    customer: "Théo R.",
    table: "T-12",
    items: [{ dishId: "d4", qty: 2 }],
    status: "pending",
    total: 11.0,
    placedAt: new Date(Date.now() - 1 * 60_000).toISOString(),
    channel: "counter",
  },
  {
    id: "o5",
    code: "FP-2845",
    customer: "Inès P.",
    items: [{ dishId: "aw1", qty: 1 }],
    status: "ready",
    total: 3.5,
    placedAt: new Date(Date.now() - 8 * 60_000).toISOString(),
    pickupSlot: "12:40",
    channel: "online",
  },
  {
    id: "o6",
    code: "FP-2846",
    customer: "Yanis F.",
    table: "T-03",
    items: [{ dishId: "d6", qty: 1 }, { dishId: "d8", qty: 1 }],
    status: "delivered",
    total: 8.8,
    placedAt: new Date(Date.now() - 22 * 60_000).toISOString(),
    channel: "qr",
  },
  {
    id: "o7",
    code: "FP-2847",
    customer: "Maya L.",
    items: [{ dishId: "d1", qty: 1 }, { dishId: "d7", qty: 1 }],
    status: "preparing",
    total: 10.0,
    placedAt: new Date(Date.now() - 3 * 60_000).toISOString(),
    pickupSlot: "12:45",
    channel: "online",
  },
];

export const dishById = (id: string) => dishes.find((d) => d.id === id)!;

// Analytics mock data
export const dailyTraffic = [
  { hour: "11h", visitors: 42, served: 38 },
  { hour: "11h30", visitors: 88, served: 76 },
  { hour: "12h", visitors: 156, served: 142 },
  { hour: "12h30", visitors: 218, served: 198 },
  { hour: "13h", visitors: 184, served: 172 },
  { hour: "13h30", visitors: 96, served: 92 },
  { hour: "14h", visitors: 38, served: 36 },
];

export const weeklyMeals = [
  { day: "Lun", meals: 612, predicted: 590, waste: 18 },
  { day: "Mar", meals: 684, predicted: 670, waste: 14 },
  { day: "Mer", meals: 528, predicted: 540, waste: 22 },
  { day: "Jeu", meals: 712, predicted: 700, waste: 11 },
  { day: "Ven", meals: 748, predicted: 720, waste: 9 },
  { day: "Sam", meals: 312, predicted: 320, waste: 16 },
];

export const topDishes = [
  { name: "Buddha Bowl Quinoa", sold: 184, share: 22 },
  { name: "Poulet Tikka", sold: 142, share: 17 },
  { name: "Pâtes Pesto Burrata", sold: 118, share: 14 },
  { name: "Wrap Falafel", sold: 96, share: 12 },
  { name: "Salade César", sold: 78, share: 9 },
];

export const tables = Array.from({ length: 24 }, (_, i) => ({
  id: `T-${String(i + 1).padStart(2, "0")}`,
  seats: i % 3 === 0 ? 4 : 2,
  occupied: [0, 2, 6, 11, 14, 15, 18, 20, 22].includes(i),
  current: [0, 2, 6, 11, 14, 15, 18, 20, 22].includes(i)
    ? { since: `${10 + (i % 25)} min`, people: i % 3 === 0 ? 3 : 2 }
    : null,
}));

export const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
};

export const minutesAgo = (iso: string) => {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  return m <= 0 ? "à l'instant" : `il y a ${m} min`;
};
