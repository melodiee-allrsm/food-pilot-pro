import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { GraduationCap, ChefHat, Users, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";

const roles = [
  {
    id: "student",
    title: "Étudiant",
    desc: "Commande mobile, QR code, anti-gaspi.",
    to: "/student",
    icon: GraduationCap,
    accent: "bg-primary-soft text-primary",
    user: "Léa Moreau",
    sub: "Étudiante · L3 Informatique",
  },
  {
    id: "server",
    title: "Serveur",
    desc: "Prise de commande sur tablette, gestion des tables.",
    to: "/server",
    icon: Users,
    accent: "bg-accent-soft text-accent-foreground",
    user: "Karim Belkacem",
    sub: "Serveur · Service midi",
  },
  {
    id: "kitchen",
    title: "Cuisine",
    desc: "Tickets temps réel, priorisation des plats.",
    to: "/kitchen",
    icon: ChefHat,
    accent: "bg-primary-soft text-primary",
    user: "Chef Antoine",
    sub: "Brigade · Cuisine centrale",
  },
  {
    id: "admin",
    title: "Gérant",
    desc: "Analytics, prédictions IA, anti-gaspi, stocks.",
    to: "/admin",
    icon: BarChart3,
    accent: "bg-accent-soft text-accent-foreground",
    user: "Sophie Laurent",
    sub: "Direction du restaurant",
  },
];

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background bg-mesh">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <Link to="/" aria-label="Retour à l'accueil">
            <Logo />
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            ← Retour au site
          </Link>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center py-12">
          <div className="mb-12 text-center animate-fade-in-up">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Mode démo · accès libre
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Choisissez votre rôle
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
              Chaque interface est pensée pour son métier. Sélectionnez un profil pour explorer la démo.
            </p>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, i) => (
              <button
                key={role.id}
                onClick={() => navigate(role.to)}
                style={{ animationDelay: `${i * 80}ms` }}
                className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated animate-fade-in-up"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-hero opacity-0 transition-opacity group-hover:opacity-100" />

                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${role.accent}`}>
                  <role.icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground">{role.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{role.desc}</p>

                <div className="mt-6 w-full border-t border-border pt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Compte démo</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{role.user}</p>
                  <p className="text-xs text-muted-foreground">{role.sub}</p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-70 transition-opacity group-hover:opacity-100">
                  Entrer <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            🔒 En mode production, l'accès est sécurisé par authentification email + rôle vérifié côté serveur.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Login;
