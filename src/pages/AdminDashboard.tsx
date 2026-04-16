import { RoleShell, NavItem } from "@/components/RoleShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Package, Users2, BarChart3, Recycle, TrendingUp, TrendingDown,
  Sparkles, ArrowUpRight, AlertTriangle, Boxes, Star,
} from "lucide-react";
import { dailyTraffic, weeklyMeals, topDishes } from "@/data/mock";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend,
} from "recharts";

const nav: NavItem[] = [
  { to: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/inventory", label: "Stocks", icon: Boxes },
  { to: "/admin/staff", label: "Équipe", icon: Users2 },
  { to: "/admin/antiwaste", label: "Anti-gaspi", icon: Recycle },
];

const kpis = [
  { label: "Repas servis aujourd'hui", value: "418", delta: "+12%", up: true, hint: "vs hier" },
  { label: "Affluence en temps réel", value: "127", delta: "75% capacité", up: true, hint: "personnes présentes" },
  { label: "Taux de gaspillage", value: "4,2%", delta: "−38%", up: false, hint: "vs sem. dernière", good: true },
  { label: "Satisfaction étudiante", value: "4,7/5", delta: "+0,3 pt", up: true, hint: "284 avis" },
];

const predictions = [
  { day: "Aujourd'hui", forecast: 712, confidence: 94, weather: "☀️", note: "Pic à 12h45" },
  { day: "Demain", forecast: 684, confidence: 91, weather: "🌤", note: "Mardi standard" },
  { day: "Mercredi", forecast: 528, confidence: 88, weather: "🌧", note: "Pluie prévue" },
];

const stockAlerts = [
  { item: "Quinoa bio", level: 12, unit: "kg", status: "low" },
  { item: "Tomates cerises", level: 4, unit: "kg", status: "critical" },
  { item: "Burrata", level: 8, unit: "pièces", status: "low" },
];

const antiwaste = [
  { dish: "Box surprise du chef", saved: 8, revenue: 28, target: 15 },
  { dish: "Plateau légumes rôtis", saved: 5, revenue: 14.5, target: 8 },
  { dish: "Salade de fruits XL", saved: 4, revenue: 11.6, target: 6 },
];

const AdminDashboard = () => {
  return (
    <RoleShell role="Gérant" user={{ name: "Sophie Laurent", sub: "Direction du restaurant" }} nav={nav}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Vue d'ensemble</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Restaurant U Campus Centre · Service midi en cours
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Aujourd'hui</Button>
          <Button size="sm" className="gap-1.5"><ArrowUpRight className="h-3.5 w-3.5" /> Exporter</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const positive = k.good ? !k.up : k.up;
          return (
            <Card key={k.label} className="p-5 transition-all hover:shadow-elegant">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold tracking-tight text-foreground">{k.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${positive ? "text-success" : "text-destructive"}`}>
                  {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {k.delta}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="mb-6 grid gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">Affluence du jour</h2>
              <p className="text-xs text-muted-foreground">Visiteurs vs servis · pic à 12h30</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Visiteurs</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" />Servis</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={dailyTraffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cServed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#cVisitors)" />
                <Area type="monotone" dataKey="served" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#cServed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Predictions */}
        <Card className="overflow-hidden p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Prédictions IA</h2>
              <p className="text-xs text-muted-foreground">Repas à préparer</p>
            </div>
          </div>

          <ul className="space-y-3">
            {predictions.map((p) => (
              <li key={p.day} className="rounded-xl border border-border bg-secondary/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{p.day} {p.weather}</span>
                  <span className="text-xs font-semibold text-primary">{p.confidence}%</span>
                </div>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{p.forecast}<span className="text-sm font-normal text-muted-foreground"> repas</span></p>
                <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${p.confidence}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Weekly meals */}
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">Production hebdomadaire</h2>
              <p className="text-xs text-muted-foreground">Réel vs prédit · gaspillage</p>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer>
              <BarChart data={weeklyMeals} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="meals" name="Servis" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="predicted" name="Prédit" fill="hsl(var(--primary-glow))" radius={[6, 6, 0, 0]} opacity={0.55} />
                <Bar dataKey="waste" name="Gaspillage" fill="hsl(var(--destructive))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top dishes */}
        <Card className="p-5">
          <h2 className="text-base font-semibold text-foreground">Plats stars</h2>
          <p className="text-xs text-muted-foreground">Cette semaine</p>

          <ul className="mt-4 space-y-3">
            {topDishes.map((d, i) => (
              <li key={d.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-muted-foreground">#{i + 1}</span>
                    <span className="font-medium text-foreground">{d.name}</span>
                  </span>
                  <span className="text-xs font-semibold text-foreground">{d.sold}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${d.share * 4}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Stock + anti-waste */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-foreground" />
              <h2 className="text-base font-semibold text-foreground">Alertes de stock</h2>
            </div>
            <Button variant="outline" size="sm">Voir tout</Button>
          </div>
          <ul className="space-y-3">
            {stockAlerts.map((s) => (
              <li key={s.item} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.status === "critical" ? "bg-destructive/10 text-destructive" : "bg-warning/15 text-warning"}`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.item}</p>
                  <p className="text-xs text-muted-foreground">Reste {s.level} {s.unit}</p>
                </div>
                <Button size="sm" variant="outline">Commander</Button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Recycle className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Anti-gaspi du jour</h2>
            </div>
            <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">17 plats sauvés</span>
          </div>
          <ul className="space-y-3">
            {antiwaste.map((a) => {
              const pct = Math.round((a.saved / a.target) * 100);
              return (
                <li key={a.dish}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{a.dish}</span>
                    <span className="text-xs text-muted-foreground">{a.saved}/{a.target} · {a.revenue.toFixed(2)} €</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${Math.min(100, pct)}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <Button variant="outline" className="mt-5 w-full gap-2">
            <Sparkles className="h-4 w-4" />
            Suggérer un nouveau plat anti-gaspi
          </Button>
        </Card>
      </div>
    </RoleShell>
  );
};

export default AdminDashboard;
