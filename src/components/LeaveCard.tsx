import type { LeaveRequest } from "@/data/mockData";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-warning", label: "Menunggu" },
  approved: { icon: CheckCircle2, color: "text-success", label: "Disetujui" },
  rejected: { icon: XCircle, color: "text-destructive", label: "Ditolak" },
};

const typeLabels: Record<string, string> = {
  Sick: "Sakit",
  Personal: "Pribadi",
  Emergency: "Darurat",
};

export function LeaveCard({ request }: { request: LeaveRequest }) {
  const config = statusConfig[request.status];
  const Icon = config.icon;
  const fromDate = new Date(request.from).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  const toDate = new Date(request.to).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  const dateRange = request.from === request.to ? fromDate : `${fromDate} — ${toDate}`;

  return (
    <div className="rounded-xl bg-card border border-border p-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {typeLabels[request.type] || request.type}
          </span>
          <p className="mt-2 text-sm font-medium text-foreground">{dateRange}</p>
          <p className="mt-1 text-xs text-muted-foreground">{request.reason}</p>
        </div>
        <div className={`flex items-center gap-1 ${config.color}`}>
          <Icon size={16} />
          <span className="text-xs font-medium">{config.label}</span>
        </div>
      </div>
    </div>
  );
}
