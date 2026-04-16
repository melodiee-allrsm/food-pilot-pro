import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  ArrowRight,
  Sparkles,
  Recycle,
  Clock,
  QrCode,
  BarChart3,
  ChefHat,
  GraduationCap,
  Users,
  CheckCircle2,
  Zap,
  ShieldCheck,
} from "lucide-react";
import heroImage from "@/assets/hero-bowl.jpg";

const features = [
  {
    icon: Sparkles,
    title: "Prédictions IA",
    desc: "Anticipez la fréquentation et le nombre de plats à préparer chaque jour avec une précision >92%.",
  },
  {
    icon: Recycle,
    title: "Anti-gaspillage",
    desc: "Détection automatique des surplus, transformation en plats spéciaux à prix réduit.",
  },
  {
    icon: Clock,
    title: "Temps réel",
    desc: "Synchronisation cuisine ↔ serveur ↔ étudiant. Chaque commande suivie à la seconde près.",
  },
  {
    icon: QrCode,
    title: "Commande sans friction",
    desc: "QR code à table, retrait pré-commandé, paiement en ligne. 3 clics suffisent.",
  },
  {
    icon: BarChart3,
    title: "Analytics avancés",
    desc: "Affluence, satisfaction, taux de gaspillage. Tous vos KPIs dans un seul dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-rôles sécurisé",
    desc: "Étudiants, serveurs, cuisine, gérants. Chacun son interface, ses droits, ses outils.",
  },
];

const stats = [
  { value: "−42%", label: "de gaspillage alimentaire" },
  { value: "3 min", label: "temps d'attente moyen" },
  { value: "+28%", label: "satisfaction étudiante" },
  { value: "92%", label: "précision des prédictions" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Fonctionnalités
            </a>
            <a href="#roles" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Pour qui ?
            </a>
            <a href="#impact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Impact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/login">Connexion</Link>
            </Button>
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/login">
                Démo live <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="container relative grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary animate-fade-in">
              <Sparkles className="h-3.5 w-3.5" />
              IA × Restauration universitaire
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up">
              Le système d'exploitation des <span className="text-primary">restos U</span> intelligents.
            </h1>

            <p className="mt-5 max-w-xl text-lg text-muted-foreground animate-fade-in-up [animation-delay:80ms]">
              Food Pilot connecte étudiants, serveurs, cuisine et gérants en temps réel.
              Moins d'attente, moins de gaspillage, plus de satisfaction.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-in-up [animation-delay:160ms]">
              <Button size="lg" asChild className="h-12 px-6 text-base shadow-glow">
                <Link to="/login">
                  Lancer la démo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-6 text-base">
                <a href="#features">Découvrir le produit</a>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in [animation-delay:240ms]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Setup en 24h
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Sans matériel
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                RGPD-compliant
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-scale-in">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
                <img
                  src={heroImage}
                  alt="Bowl healthy servi par Food Pilot"
                  width={1280}
                  height={1280}
                  className="aspect-square w-full object-cover"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -left-4 top-8 hidden w-56 rounded-2xl border border-border bg-card p-4 shadow-lg sm:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Temps d'attente</p>
                    <p className="text-lg font-semibold text-foreground">
                      3 min <span className="text-xs font-normal text-success">−40%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-8 hidden w-60 rounded-2xl border border-border bg-card p-4 shadow-lg sm:block animate-float [animation-delay:1s]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Anti-gaspi aujourd'hui</span>
                  <Recycle className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">23 plats sauvés</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section id="impact" className="border-y border-border bg-card">
        <div className="container py-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="text-3xl font-bold tracking-tight text-primary lg:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Plateforme</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce qu'il faut pour un resto U du XXIᵉ siècle.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une seule plateforme. Quatre interfaces métier. Un impact mesurable dès le premier service.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elegant"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="bg-secondary/40 py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Quatre rôles, une plateforme</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Une expérience pensée pour chacun.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: GraduationCap, title: "Étudiant", desc: "Commande mobile, QR code, anti-gaspi à prix mini.", to: "/student" },
              { icon: Users, title: "Serveur", desc: "Tablette terrain, scan tables, suivi des commandes.", to: "/server" },
              { icon: ChefHat, title: "Cuisine", desc: "Tickets temps réel, priorisation, validation rapide.", to: "/kitchen" },
              { icon: BarChart3, title: "Gérant", desc: "Analytics, prédictions IA, gestion stocks et flux.", to: "/admin" },
            ].map((r) => (
              <Link
                key={r.title}
                to={r.to}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-hero opacity-0 transition-opacity group-hover:opacity-100" />
                <r.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Voir la démo <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-center shadow-glow lg:p-16">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <Zap className="mx-auto h-10 w-10 text-primary-foreground" />
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Prêt à voir Food Pilot en action ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
              Explorez les 4 dashboards en mode démo. Aucune inscription nécessaire.
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-8 h-12 px-8 text-base">
              <Link to="/login">
                Lancer la démo interactive <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Food Pilot. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
