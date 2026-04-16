import { useState } from "react";
import { RoleShell, NavItem } from "@/components/RoleShell";
import { orders, dishById, minutesAgo } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, ListChecks, Soup, Bell, Clock, CheckCircle2, Flame } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const nav: NavItem[] = [
  { to: "/kitchen", label: "Tickets", icon: ListChecks },
  { to: "/kitchen/menu", label: "Menu actif", icon: Soup },
  { to: "/kitchen/alerts", label: "Alertes", icon: Bell },
];

const KitchenDashboard = () => {
  const [data, setData] = useState(() => orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled"));

  const advance = (id: string) => {
    setData((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        if (o.status === "pending") return { ...o, status: "preparing" };
        if (o.status === "preparing") {
          toast.success(`Commande ${o.code} prête`, { description: "Notification envoyée au serveur" });
          return { ...o, status: "ready" };
        }
        return o;
      })
    );
  };

  const dismiss = (id: string) => setData((prev) => prev.filter((o) => o.id !== id));

  const cols: { title: string; status: "pending" | "preparing" | "ready"; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { title: "Nouvelles", status: "pending", icon: Clock, color: "text-muted-foreground" },
    { title: "En préparation", status: "preparing", icon: Flame, color: "text-accent" },
    { title: "Prêtes", status: "ready", icon: CheckCircle2, color: "text-primary" },
  ];

  const stats = [
    { label: "Tickets actifs", value: data.length },
    { label: "En préparation", value: data.filter((o) => o.status === "preparing").length },
    { label: "Plats vendus aujourd'hui", value: 184 },
    { label: "Temps moyen", value: "8 min" },
  ];

  return (
    <RoleShell role="Cuisine" user={{ name: "Chef Antoine", sub: "Brigade · Cuisine centrale" }} nav={nav}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Tickets de cuisine</h1>
          <p className="mt-1 text-sm text-muted-foreground">Service midi en cours · synchronisé en temps réel</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-sm font-medium text-foreground">Live</span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1.5 text-2xl font-bold text-foreground">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {cols.map((col) => {
          const tickets = data.filter((o) => o.status === col.status);
          return (
            <div key={col.status} className="rounded-2xl border border-border bg-secondary/30 p-3">
              <header className="mb-3 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <col.icon className={cn("h-4 w-4", col.color)} />
                  <h2 className="text-sm font-semibold text-foreground">{col.title}</h2>
                  <span className="rounded-full bg-card px-2 py-0.5 text-xs font-medium text-muted-foreground">{tickets.length}</span>
                </div>
              </header>

              <div className="space-y-3">
                {tickets.map((o) => (
                  <Card key={o.id} className="overflow-hidden p-0 transition-all hover:shadow-md">
                    <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-foreground">{o.code}</span>
                        {o.table && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">{o.table}</span>}
                        {o.pickupSlot && <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">↗ {o.pickupSlot}</span>}
                      </div>
                      <StatusBadge status={o.status} animated={o.status === "preparing"} />
                    </div>

                    <ul className="space-y-2 p-4">
                      {o.items.map((it, i) => {
                        const d = dishById(it.dishId);
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <span className="text-2xl">{d.emoji}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">
                                <span className="font-bold text-primary">{it.qty}×</span> {d.name}
                              </p>
                              <p className="text-xs text-muted-foreground">⏱ {d.prepTime} min</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-2.5">
                      <span className="text-xs text-muted-foreground">{minutesAgo(o.placedAt)}</span>
                      <div className="flex gap-1.5">
                        {o.status === "ready" ? (
                          <Button size="sm" variant="outline" onClick={() => dismiss(o.id)}>
                            Servi
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => advance(o.id)} className="gap-1">
                            {o.status === "pending" ? "Démarrer" : "Marquer prête"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
                {tickets.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border py-10 text-center text-xs text-muted-foreground">
                    Aucun ticket
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </RoleShell>
  );
};

export default KitchenDashboard;
