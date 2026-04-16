import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { LogOut, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

export type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

interface RoleShellProps {
  role: string;
  roleColor?: string;
  user: { name: string; sub: string };
  nav: NavItem[];
  children: ReactNode;
  rightSlot?: ReactNode;
}

export const RoleShell = ({ role, user, nav, children, rightSlot }: RoleShellProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Logo />
        </div>

        <div className="px-3 py-4">
          <div className="rounded-lg bg-primary-soft px-3 py-2 text-xs font-medium uppercase tracking-wider text-primary">
            Espace {role}
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.sub}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/login")}
              aria-label="Changer de rôle"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Logo size="sm" />
          </div>
          <div className="hidden lg:block">
            {rightSlot ? null : (
              <h2 className="text-sm text-muted-foreground">
                Bienvenue, <span className="font-medium text-foreground">{user.name.split(" ")[0]}</span>
              </h2>
            )}
          </div>
          <div className="flex items-center gap-2">
            {rightSlot}
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate("/login")} className="hidden sm:flex">
              Changer de rôle
            </Button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-background px-3 py-2 lg:hidden">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
};
