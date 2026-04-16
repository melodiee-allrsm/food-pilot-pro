import { cn } from "@/lib/utils";

type Status = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

const map: Record<Status, { label: string; className: string; dot: string }> = {
  pending: {
    label: "En attente",
    className: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  preparing: {
    label: "En préparation",
    className: "bg-accent-soft text-accent-foreground",
    dot: "bg-accent",
  },
  ready: {
    label: "Prête",
    className: "bg-primary-soft text-primary",
    dot: "bg-primary",
  },
  delivered: {
    label: "Servie",
    className: "bg-secondary text-secondary-foreground",
    dot: "bg-success",
  },
  cancelled: {
    label: "Annulée",
    className: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
};

export const StatusBadge = ({ status, className, animated }: { status: Status; className?: string; animated?: boolean }) => {
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", s.className, className)}>
      <span className="relative inline-flex h-1.5 w-1.5">
        {animated && <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", s.dot)} />}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", s.dot)} />
      </span>
      {s.label}
    </span>
  );
};
