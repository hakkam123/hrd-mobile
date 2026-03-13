import { MapPin, Clock } from "lucide-react";
import type { Shift } from "@/data/mockData";

const statusColors: Record<string, string> = {
  "on-shift": "bg-success",
  upcoming: "bg-info",
  completed: "bg-muted-foreground",
  missed: "bg-destructive",
};

const statusLabels: Record<string, string> = {
  "on-shift": "Sedang Shift",
  upcoming: "Akan Datang",
  completed: "Selesai",
  missed: "Terlewat",
};

export function ShiftCard({ shift }: { shift: Shift }) {
  const startTime = new Date(shift.start).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const endTime = new Date(shift.end).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="gradient-card rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{shift.outlet}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${statusColors[shift.status]}`} />
          <span className="text-xs text-muted-foreground">{statusLabels[shift.status]}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-foreground">
        <Clock size={16} className="text-muted-foreground" />
        <span className="text-lg font-semibold">{startTime} — {endTime}</span>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        {shift.role} • {new Date(shift.start).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" })}
      </div>
    </div>
  );
}
