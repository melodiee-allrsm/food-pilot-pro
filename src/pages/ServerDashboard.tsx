import { useState } from "react";
import { RoleShell, NavItem } from "@/components/RoleShell";
import { orders, tables, dishById, minutesAgo } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, ClipboardList, ScanLine, Receipt, Users, Plus } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

const nav: NavItem[] = [
  { to: "/server", label: "Plan de salle", icon: LayoutGrid },
  { to: "/server/orders", label: "Commandes", icon: ClipboardList },
  { to: "/server/scan", label: "Scan QR", icon: ScanLine },
  { to: "/server/billing", label: "Facturation", icon: Receipt },
];

const ServerDashboard = () => {
  const [selected, setSelected] = useState<string | null>("T-07");

  const occupancy = Math.round((tables.filter((t) => t.occupied).length / tables.length) * 100);
  const myOrders = orders.filter((o) => o.table).slice(0, 4);

  return (
    <RoleShell role="Serveur" user={{ name: "Karim Belkacem", sub: "Service midi" }} nav={nav}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Plan de salle</h1>
          <p className="mt-1 text-sm text-muted-foreground">Salle principale · {tables.filter((t) => t.occupied).length} / {tables.length} tables occupées</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Nouvelle commande</Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Taux d'occupation", value: `${occupancy}%` },
          { label: "Couverts servis", value: 142 },
          { label: "Ticket moyen", value: "8,40 €" },
          { label: "Tables à libérer", value: 3 },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1.5 text-2xl font-bold text-foreground">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr,360px]">
        {/* Floor plan */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Plan de la salle</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary-soft border border-primary/30" />Libre</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accent" />Occupée</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {tables.map((t) => {
              const isSelected = selected === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={cn(
                    "group relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 p-2 text-xs font-semibold transition-all",
                    t.occupied
                      ? "border-accent/60 bg-accent/15 text-accent-foreground"
                      : "border-primary/30 bg-primary-soft text-primary",
                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-card"
                  )}
                >
                  <span>{t.id}</span>
                  <span className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-medium opacity-70">
                    <Users className="h-2.5 w-2.5" />{t.current?.people ?? t.seats}
                  </span>
                  {t.occupied && t.current && (
                    <span className="absolute -top-1.5 right-1 rounded-full bg-card px-1.5 py-0.5 text-[9px] font-semibold text-foreground shadow">
                      {t.current.since}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Side panel */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Table {selected}</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Statut</span><span className="font-medium text-foreground">Occupée</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Couverts</span><span className="font-medium text-foreground">2</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Depuis</span><span className="font-medium text-foreground">14 min</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total en cours</span><span className="font-semibold text-primary">8,70 €</span></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline">Ajouter</Button>
              <Button size="sm">Encaisser</Button>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Mes commandes</h3>
            <ul className="mt-3 space-y-3">
              {myOrders.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-secondary/40 p-3">
                  <div>
                    <p className="font-mono text-xs font-bold text-foreground">{o.code} · {o.table}</p>
                    <p className="text-xs text-muted-foreground">{o.items.length} plat(s) · {minutesAgo(o.placedAt)}</p>
                  </div>
                  <StatusBadge status={o.status} animated={o.status === "preparing"} />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </RoleShell>
  );
};

export default ServerDashboard;
