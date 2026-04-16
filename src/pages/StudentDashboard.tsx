import { useMemo, useState } from "react";
import { RoleShell, NavItem } from "@/components/RoleShell";
import { dishes, dishById, formatTime } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import {
  Home,
  ShoppingBag,
  QrCode,
  Recycle,
  Star,
  Plus,
  Minus,
  Search,
  Clock,
  Trash2,
  CheckCircle2,
  Sparkles,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const nav: NavItem[] = [
  { to: "/student", label: "Menu du jour", icon: Home },
  { to: "/student/orders", label: "Mes commandes", icon: ShoppingBag },
  { to: "/student/qr", label: "QR à table", icon: QrCode },
  { to: "/student/antiwaste", label: "Anti-gaspi", icon: Recycle },
];

type Cart = Record<string, number>;

const categories = ["Tous", "Plat", "Entrée", "Dessert", "Boisson", "Anti-gaspi"] as const;

const StudentDashboard = () => {
  const [cart, setCart] = useState<Cart>({});
  const [cat, setCat] = useState<(typeof categories)[number]>("Tous");
  const [q, setQ] = useState("");
  const [step, setStep] = useState<"menu" | "checkout" | "tracking">("menu");
  const [slot, setSlot] = useState("12:30");
  const [orderCode] = useState(() => `FP-${2848 + Math.floor(Math.random() * 50)}`);

  const list = useMemo(() => {
    return dishes.filter((d) => {
      if (cat !== "Tous" && d.category !== cat) return false;
      if (q && !d.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  const cartItems = Object.entries(cart).map(([id, qty]) => ({ dish: dishById(id), qty }));
  const total = cartItems.reduce((s, i) => s + i.dish.price * i.qty, 0);
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);
  const estPrep = Math.max(...cartItems.map((i) => i.dish.prepTime), 0);

  const inc = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const placeOrder = () => {
    setStep("tracking");
    toast.success("Commande envoyée en cuisine", { description: `${orderCode} · retrait à ${slot}` });
  };

  if (step === "tracking") return <TrackingView code={orderCode} slot={slot} total={total} onDone={() => { setCart({}); setStep("menu"); }} />;
  if (step === "checkout")
    return <CheckoutView cart={cartItems} total={total} estPrep={estPrep} slot={slot} setSlot={setSlot} onPlace={placeOrder} onBack={() => setStep("menu")} />;

  return (
    <RoleShell
      role="Étudiant"
      user={{ name: "Léa Moreau", sub: "Étudiante · L3 Info" }}
      nav={nav}
      rightSlot={
        totalQty > 0 ? (
          <Button onClick={() => setStep("checkout")} className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="font-medium">{totalQty}</span>
            <span className="hidden sm:inline">· {total.toFixed(2)} €</span>
          </Button>
        ) : null
      }
    >
      {/* Hero strip */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Menu du jour</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Service midi · 11h30 → 14h00 · <span className="text-success font-medium">Restaurant ouvert</span>
          </p>
        </div>
      </div>

      {/* Anti-gaspi banner */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-accent-soft to-card p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">8 plats anti-gaspi disponibles à -50%</p>
            <p className="text-sm text-muted-foreground">Aidez à réduire le gaspillage tout en économisant.</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setCat("Anti-gaspi")} className="hidden sm:flex">
            Voir
          </Button>
        </div>
      </div>

      {/* Search + categories */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un plat…" className="pl-9" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => {
          const qty = cart[d.id] || 0;
          return (
            <Card key={d.id} className="group flex flex-col overflow-hidden border-border p-0 transition-all hover:border-primary/30 hover:shadow-elegant">
              <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-primary-soft to-accent-soft text-6xl">
                {d.emoji}
                {d.tag === "antiwaste" && (
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    Anti-gaspi
                  </span>
                )}
                {d.tag === "popular" && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Populaire
                  </span>
                )}
                {d.tag === "new" && (
                  <span className="absolute left-3 top-3 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
                    Nouveau
                  </span>
                )}
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  {d.rating}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{d.name}</h3>
                  <div className="text-right">
                    {d.originalPrice && <p className="text-xs text-muted-foreground line-through">{d.originalPrice.toFixed(2)} €</p>}
                    <p className="font-semibold text-primary">{d.price.toFixed(2)} €</p>
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.description}</p>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {d.prepTime} min
                  </span>
                  <span>{d.available} restants</span>
                </div>

                <div className="mt-4">
                  {qty > 0 ? (
                    <div className="flex items-center justify-between rounded-lg bg-primary-soft px-2 py-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => dec(d.id)}>
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="text-sm font-semibold text-primary">{qty}</span>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => inc(d.id)}>
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => inc(d.id)} variant="outline" size="sm" className="w-full gap-1.5">
                      <Plus className="h-3.5 w-3.5" />
                      Ajouter
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </RoleShell>
  );
};

const CheckoutView = ({
  cart, total, estPrep, slot, setSlot, onPlace, onBack,
}: {
  cart: { dish: ReturnType<typeof dishById>; qty: number }[];
  total: number; estPrep: number; slot: string; setSlot: (s: string) => void;
  onPlace: () => void; onBack: () => void;
}) => {
  const slots = ["12:15", "12:30", "12:45", "13:00", "13:15"];
  return (
    <RoleShell
      role="Étudiant"
      user={{ name: "Léa Moreau", sub: "Étudiante · L3 Info" }}
      nav={nav}
    >
      <div className="mx-auto max-w-2xl">
        <button onClick={onBack} className="mb-4 text-sm font-medium text-muted-foreground hover:text-foreground">← Retour au menu</button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Validation de commande</h1>
        <p className="mt-1 text-sm text-muted-foreground">Vérifiez votre panier et choisissez un créneau de retrait.</p>

        <Card className="mt-6 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Panier</h2>
          <ul className="mt-3 divide-y divide-border">
            {cart.map(({ dish, qty }) => (
              <li key={dish.id} className="flex items-center gap-3 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-2xl">{dish.emoji}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{dish.name}</p>
                  <p className="text-xs text-muted-foreground">x{qty} · {(dish.price * qty).toFixed(2)} €</p>
                </div>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">{total.toFixed(2)} €</span>
          </div>
        </Card>

        <Card className="mt-4 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Créneau de retrait</h2>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={cn(
                  "rounded-lg border px-2 py-2 text-sm font-medium transition-all",
                  slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">⏱ Temps de préparation estimé : <strong className="text-foreground">{estPrep} min</strong></p>
        </Card>

        <Card className="mt-4 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Paiement</h2>
          <div className="mt-3 space-y-2">
            {["Izly (carte étudiante)", "Carte bancaire", "Sur place"].map((m, i) => (
              <label key={m} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:border-primary/40">
                <input type="radio" name="pay" defaultChecked={i === 0} className="accent-primary" />
                <span className="text-sm font-medium text-foreground">{m}</span>
              </label>
            ))}
          </div>
        </Card>

        <Button onClick={onPlace} className="mt-6 h-12 w-full text-base shadow-glow">
          Valider et envoyer en cuisine · {total.toFixed(2)} €
        </Button>
      </div>
    </RoleShell>
  );
};

const TrackingView = ({ code, slot, total, onDone }: { code: string; slot: string; total: number; onDone: () => void }) => {
  const steps = [
    { key: "received", label: "Reçue", icon: CheckCircle2 },
    { key: "preparing", label: "En préparation", icon: ChefHat },
    { key: "ready", label: "Prête au retrait", icon: ShoppingBag },
  ];
  const activeIdx = 1;

  return (
    <RoleShell role="Étudiant" user={{ name: "Léa Moreau", sub: "Étudiante · L3 Info" }} nav={nav}>
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Commande confirmée 🎉</h1>
        <p className="mt-2 text-muted-foreground">Numéro <span className="font-semibold text-foreground">{code}</span> · retrait à {slot}</p>

        <Card className="mt-8 p-6 text-left">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Suivi temps réel</p>
          <div className="mt-5 space-y-4">
            {steps.map((s, i) => {
              const done = i < activeIdx;
              const active = i === activeIdx;
              return (
                <div key={s.key} className="flex items-start gap-3">
                  <div className={cn(
                    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    done && "bg-success text-success-foreground",
                    active && "bg-primary text-primary-foreground",
                    !done && !active && "bg-muted text-muted-foreground"
                  )}>
                    {active && <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-30" />}
                    <s.icon className="relative h-4 w-4" />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
                    {active && <p className="text-xs text-muted-foreground">Estimation : 5 min restantes</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
            <span className="text-muted-foreground">Total payé</span>
            <span className="font-semibold text-foreground">{total.toFixed(2)} €</span>
          </div>
        </Card>

        <Button onClick={onDone} variant="outline" className="mt-6">
          Passer une nouvelle commande
        </Button>
      </div>
    </RoleShell>
  );
};

export default StudentDashboard;
